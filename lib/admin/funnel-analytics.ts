import {
  CART_EVENT_NAMES,
  CHECKOUT_EVENT_NAMES,
  countryDisplayName,
  isCheckoutPath,
  LANDING_EVENT_NAMES,
  PURCHASE_EVENT_NAMES,
} from '@/lib/analytics/funnel-events';
import { getPersistence } from '@/lib/persistence';
import { listOrders } from '@/lib/orders/store';
import { isEligibleForFulfilmentQueue } from '@/lib/payments/mark-paid';
import type {
  FunnelAnalyticsViewModel,
  FunnelCountryRow,
  FunnelRangeId,
  FunnelStageStats,
} from '@/types/admin-funnel-analytics';
import type { AnalyticsEventRecord } from '@/lib/persistence/types';

const RANGE_LABELS: Record<FunnelRangeId, string> = {
  today: 'Today',
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
};

export function parseFunnelRange(raw: string | undefined | null): FunnelRangeId {
  if (raw === '7d' || raw === '30d' || raw === 'today') return raw;
  return '7d';
}

export function getFunnelRangeBounds(range: FunnelRangeId, now = new Date()): {
  sinceIso: string;
  untilIso: string;
} {
  const until = new Date(now);
  const since = new Date(now);
  if (range === 'today') {
    since.setHours(0, 0, 0, 0);
  } else if (range === '7d') {
    since.setTime(since.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else {
    since.setTime(since.getTime() - 30 * 24 * 60 * 60 * 1000);
  }
  return { sinceIso: since.toISOString(), untilIso: until.toISOString() };
}

function pct(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return Math.round((numerator / denominator) * 1000) / 10;
}

function isLandingEvent(event: AnalyticsEventRecord): boolean {
  return LANDING_EVENT_NAMES.has(event.eventName);
}

function isCartEvent(event: AnalyticsEventRecord): boolean {
  return CART_EVENT_NAMES.has(event.eventName);
}

function isCheckoutEvent(event: AnalyticsEventRecord): boolean {
  if (CHECKOUT_EVENT_NAMES.has(event.eventName)) return true;
  return (
    (event.eventName === 'page_view' || event.eventName === 'home_page_view') &&
    isCheckoutPath(event.pagePath)
  );
}

function isPurchaseEvent(event: AnalyticsEventRecord): boolean {
  return PURCHASE_EVENT_NAMES.has(event.eventName);
}

function sessionCountry(events: AnalyticsEventRecord[]): string {
  const landing = events.find((e) => isLandingEvent(e));
  return (landing ?? events[0])?.country || 'XX';
}

function rateFromPrevious(stages: FunnelStageStats[], index: number): number | null {
  if (index === 0) return null;
  return pct(stages[index]!.sessions, stages[index - 1]!.sessions);
}

/**
 * Build Admin → Analytics funnel view model.
 */
export async function getFunnelAnalyticsViewModel(
  rangeInput?: string | null,
): Promise<FunnelAnalyticsViewModel> {
  const range = parseFunnelRange(rangeInput);
  const { sinceIso, untilIso } = getFunnelRangeBounds(range);
  const persistence = getPersistence();

  let events: AnalyticsEventRecord[] = [];
  let setupNotice: string | undefined;
  try {
    events = (await persistence.listAnalyticsEvents(sinceIso)).filter(
      (event) => event.createdAt <= untilIso,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[funnel-analytics] listAnalyticsEvents failed:', message);
    setupNotice =
      /relation|does not exist|analytics_events/i.test(message)
        ? 'Analytics table is missing. Run drizzle/0003_analytics_events.sql on the production database, then refresh.'
        : 'Analytics event store is temporarily unavailable. Order totals below may still be accurate.';
    events = [];
  }

  const bySession = new Map<string, AnalyticsEventRecord[]>();
  for (const event of events) {
    const list = bySession.get(event.sessionId) ?? [];
    list.push(event);
    bySession.set(event.sessionId, list);
  }

  const landedSessions = new Set<string>();
  const cartSessions = new Set<string>();
  const checkoutSessions = new Set<string>();
  const purchaseSessions = new Set<string>();
  const sessionCountries = new Map<string, string>();

  for (const [sessionId, sessionEvents] of bySession) {
    sessionCountries.set(sessionId, sessionCountry(sessionEvents));
    if (sessionEvents.some(isLandingEvent)) landedSessions.add(sessionId);
    if (sessionEvents.some(isCartEvent)) cartSessions.add(sessionId);
    if (sessionEvents.some(isCheckoutEvent)) checkoutSessions.add(sessionId);
    if (sessionEvents.some(isPurchaseEvent)) purchaseSessions.add(sessionId);
  }

  let paidOrders: Awaited<ReturnType<typeof listOrders>> = [];
  try {
    paidOrders = (await listOrders()).filter(
      (order) =>
        isEligibleForFulfilmentQueue(order) &&
        order.createdAt >= sinceIso &&
        order.createdAt <= untilIso,
    );
  } catch (error) {
    console.error('[funnel-analytics] listOrders failed:', error);
    if (!setupNotice) {
      setupNotice = 'Could not load orders for this range.';
    }
  }

  const orderCount = paidOrders.length;
  // Prefer order store for completion KPI; fall back to purchase events when no orders.
  const completedCount = orderCount > 0 ? orderCount : purchaseSessions.size;

  const stages: FunnelStageStats[] = [
    { id: 'landed', label: 'Landed', sessions: landedSessions.size, conversionFromPrevious: null },
    { id: 'cart', label: 'Added to cart', sessions: cartSessions.size, conversionFromPrevious: null },
    {
      id: 'checkout',
      label: 'Reached checkout',
      sessions: checkoutSessions.size,
      conversionFromPrevious: null,
    },
    {
      id: 'orders',
      label: 'Orders completed',
      sessions: completedCount,
      conversionFromPrevious: null,
    },
  ];
  stages.forEach((stage, index) => {
    stage.conversionFromPrevious = rateFromPrevious(stages, index);
  });

  const countryMap = new Map<
    string,
    { landed: Set<string>; cart: Set<string>; checkout: Set<string>; orders: Set<string> }
  >();

  const ensureCountry = (code: string) => {
    const key = code || 'XX';
    let row = countryMap.get(key);
    if (!row) {
      row = {
        landed: new Set(),
        cart: new Set(),
        checkout: new Set(),
        orders: new Set(),
      };
      countryMap.set(key, row);
    }
    return row;
  };

  for (const sessionId of landedSessions) {
    ensureCountry(sessionCountries.get(sessionId) || 'XX').landed.add(sessionId);
  }
  for (const sessionId of cartSessions) {
    ensureCountry(sessionCountries.get(sessionId) || 'XX').cart.add(sessionId);
  }
  for (const sessionId of checkoutSessions) {
    ensureCountry(sessionCountries.get(sessionId) || 'XX').checkout.add(sessionId);
  }
  for (const sessionId of purchaseSessions) {
    ensureCountry(sessionCountries.get(sessionId) || 'XX').orders.add(sessionId);
  }

  // If we have paid orders but no purchase events, keep country order counts from events only.
  const countries: FunnelCountryRow[] = [...countryMap.entries()]
    .map(([countryCode, sets]) => ({
      countryCode,
      countryName: countryDisplayName(countryCode),
      landed: sets.landed.size,
      cart: sets.cart.size,
      checkout: sets.checkout.size,
      orders: sets.orders.size,
    }))
    .sort((a, b) => b.landed - a.landed || a.countryName.localeCompare(b.countryName));

  return {
    range,
    rangeLabel: RANGE_LABELS[range],
    sinceIso,
    untilIso,
    stages,
    countries,
    eventCount: events.length,
    storageDriver: persistence.driver,
    setupNotice,
  };
}
