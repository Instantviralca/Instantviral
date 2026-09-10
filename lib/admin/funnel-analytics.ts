/**
 * First-party commerce analytics reporting.
 * Revenue/order KPIs use paid orders (server truth).
 * Funnel/session KPIs use analytics_events (+ sessions when available).
 * Abandoned cart KPIs use abandoned_carts tables.
 */

import {
  CART_EVENT_NAMES,
  CHECKOUT_EVENT_NAMES,
  countryDisplayName,
  isCheckoutPath,
  LANDING_EVENT_NAMES,
  PURCHASE_EVENT_NAMES,
} from '@/lib/analytics/funnel-events';
import { normalizePath } from '@/lib/analytics/attribution';
import { getAbandonedCartMetrics } from '@/lib/abandoned-cart/repository';
import { isAbandonedCartDbAvailable } from '@/lib/abandoned-cart/repository';
import { getDb, isDbReady } from '@/lib/db/client';
import { abandonedCartRecoveryEmails, abandonedCarts } from '@/lib/db/schema';
import { getPersistence } from '@/lib/persistence';
import { listOrders } from '@/lib/orders/store';
import { isEligibleForFulfilmentQueue } from '@/lib/payments/mark-paid';
import { and, eq, gte, lte, sql } from 'drizzle-orm';
import type {
  AnalyticsRangeId,
  FunnelAnalyticsViewModel,
  FunnelCountryRow,
  FunnelStageStats,
  KpiValue,
  NamedMetricRow,
  RecoveryEmailStepStats,
  TimeSeriesPoint,
} from '@/types/admin-funnel-analytics';
import type { AnalyticsEventRecord } from '@/lib/persistence/types';
import type { Order } from '@/types/order';

const RANGE_LABELS: Record<AnalyticsRangeId, string> = {
  today: 'Today',
  yesterday: 'Yesterday',
  '7d': 'Last 7 days',
  '30d': 'Last 30 days',
  this_month: 'This month',
  prev_month: 'Previous month',
};

export function parseFunnelRange(raw: string | undefined | null): AnalyticsRangeId {
  if (
    raw === 'today' ||
    raw === 'yesterday' ||
    raw === '7d' ||
    raw === '30d' ||
    raw === 'this_month' ||
    raw === 'prev_month'
  ) {
    return raw;
  }
  return '7d';
}

export function getFunnelRangeBounds(
  range: AnalyticsRangeId,
  now = new Date(),
): { sinceIso: string; untilIso: string; previousSinceIso: string; previousUntilIso: string } {
  const until = new Date(now);
  const since = new Date(now);

  if (range === 'today') {
    since.setHours(0, 0, 0, 0);
  } else if (range === 'yesterday') {
    since.setDate(since.getDate() - 1);
    since.setHours(0, 0, 0, 0);
    until.setHours(0, 0, 0, 0);
  } else if (range === '7d') {
    since.setTime(since.getTime() - 7 * 24 * 60 * 60 * 1000);
  } else if (range === '30d') {
    since.setTime(since.getTime() - 30 * 24 * 60 * 60 * 1000);
  } else if (range === 'this_month') {
    since.setDate(1);
    since.setHours(0, 0, 0, 0);
  } else {
    // prev_month
    until.setDate(1);
    until.setHours(0, 0, 0, 0);
    since.setMonth(since.getMonth() - 1, 1);
    since.setHours(0, 0, 0, 0);
  }

  const duration = until.getTime() - since.getTime();
  const previousUntil = new Date(since);
  const previousSince = new Date(since.getTime() - duration);

  return {
    sinceIso: since.toISOString(),
    untilIso: until.toISOString(),
    previousSinceIso: previousSince.toISOString(),
    previousUntilIso: previousUntil.toISOString(),
  };
}

function pct(numerator: number, denominator: number): number | null {
  if (denominator <= 0) return null;
  return Math.round((numerator / denominator) * 1000) / 10;
}

function changePct(current: number, previous: number): number | null {
  if (previous === 0) return current === 0 ? 0 : null;
  return Math.round(((current - previous) / previous) * 1000) / 10;
}

function kpi(current: number, previous: number, format: KpiValue['format'] = 'number'): KpiValue {
  return {
    value: current,
    previous,
    changePct: changePct(current, previous),
    format,
  };
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

function paidOrdersInRange(orders: Order[], sinceIso: string, untilIso: string): Order[] {
  return orders.filter(
    (order) =>
      isEligibleForFulfilmentQueue(order) &&
      order.createdAt >= sinceIso &&
      order.createdAt <= untilIso,
  );
}

function sumRevenue(orders: Order[]): number {
  return orders.reduce((sum, order) => sum + (order.total?.amount ?? 0), 0);
}

function dayKey(iso: string): string {
  return iso.slice(0, 10);
}

async function loadRecoveryEmailStats(
  sinceIso: string,
  untilIso: string,
): Promise<RecoveryEmailStepStats[]> {
  const empty: RecoveryEmailStepStats[] = [1, 2, 3].map((step) => ({
    step,
    sent: 0,
    clicks: 0,
    recoveredOrders: 0,
    recoveredRevenue: 0,
  }));
  if (!isAbandonedCartDbAvailable() || !isDbReady()) return empty;

  try {
    const db = getDb();
    const since = new Date(sinceIso);
    const until = new Date(untilIso);

    const sentRows = await db
      .select({
        step: abandonedCartRecoveryEmails.sequenceNumber,
        count: sql<number>`count(*)::int`,
      })
      .from(abandonedCartRecoveryEmails)
      .where(
        and(
          eq(abandonedCartRecoveryEmails.status, 'sent'),
          gte(abandonedCartRecoveryEmails.sentAt, since),
          lte(abandonedCartRecoveryEmails.sentAt, until),
        ),
      )
      .groupBy(abandonedCartRecoveryEmails.sequenceNumber);

    const recoveredRows = await db
      .select({
        step: abandonedCarts.recoveryClickSequence,
        count: sql<number>`count(*)::int`,
        revenue: sql<number>`coalesce(sum(${abandonedCarts.totalAmount}), 0)::int`,
      })
      .from(abandonedCarts)
      .where(
        and(
          eq(abandonedCarts.status, 'recovered'),
          gte(abandonedCarts.recoveredAt, since),
          lte(abandonedCarts.recoveredAt, until),
        ),
      )
      .groupBy(abandonedCarts.recoveryClickSequence);

    const clickRows = await db
      .select({
        step: abandonedCarts.recoveryClickSequence,
        count: sql<number>`count(*)::int`,
      })
      .from(abandonedCarts)
      .where(
        and(
          gte(abandonedCarts.recoveryClickedAt, since),
          lte(abandonedCarts.recoveryClickedAt, until),
        ),
      )
      .groupBy(abandonedCarts.recoveryClickSequence);

    const byStep = new Map(empty.map((row) => [row.step, { ...row }]));
    for (const row of sentRows) {
      const target = byStep.get(row.step);
      if (target) target.sent = Number(row.count);
    }
    for (const row of clickRows) {
      const step = row.step ?? 0;
      const target = byStep.get(step);
      if (target) target.clicks = Number(row.count);
    }
    for (const row of recoveredRows) {
      // Deterministic attribution: recovery_click_sequence when present, else last email.
      const step = row.step && row.step > 0 ? row.step : 0;
      if (step >= 1 && step <= 3) {
        const target = byStep.get(step)!;
        target.recoveredOrders = Number(row.count);
        target.recoveredRevenue = Number(row.revenue);
      } else {
        // Unattributed recovery — put on step 0 bucket ignored in UI, or distribute to unknown.
      }
    }
    return [1, 2, 3].map((step) => byStep.get(step)!);
  } catch {
    return empty;
  }
}

/**
 * Build Admin → Analytics view model.
 */
export async function getFunnelAnalyticsViewModel(
  rangeInput?: string | null,
): Promise<FunnelAnalyticsViewModel> {
  const range = parseFunnelRange(rangeInput);
  const { sinceIso, untilIso, previousSinceIso, previousUntilIso } = getFunnelRangeBounds(range);
  const persistence = getPersistence();

  let events: AnalyticsEventRecord[] = [];
  let previousEvents: AnalyticsEventRecord[] = [];
  let setupNotice: string | undefined;
  try {
    const all = await persistence.listAnalyticsEvents(previousSinceIso);
    events = all.filter((e) => e.createdAt >= sinceIso && e.createdAt <= untilIso);
    previousEvents = all.filter(
      (e) => e.createdAt >= previousSinceIso && e.createdAt < previousUntilIso,
    );
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('[funnel-analytics] listAnalyticsEvents failed:', message);
    setupNotice = /relation|does not exist|analytics_events/i.test(message)
      ? 'Analytics table is missing. Run drizzle/0003_analytics_events.sql (and 0006 if upgrading), then refresh.'
      : 'Analytics event store is temporarily unavailable. Order totals below may still be accurate.';
  }

  function summarize(list: AnalyticsEventRecord[]) {
    const bySession = new Map<string, AnalyticsEventRecord[]>();
    const visitors = new Set<string>();
    let pageViews = 0;
    for (const event of list) {
      const bucket = bySession.get(event.sessionId) ?? [];
      bucket.push(event);
      bySession.set(event.sessionId, bucket);
      if (event.visitorId) visitors.add(event.visitorId);
      if (LANDING_EVENT_NAMES.has(event.eventName) || event.eventName === 'page_view') {
        pageViews += 1;
      }
    }
    const landed = new Set<string>();
    const cart = new Set<string>();
    const checkout = new Set<string>();
    const purchase = new Set<string>();
    const countries = new Map<string, string>();
    for (const [sessionId, sessionEvents] of bySession) {
      countries.set(sessionId, sessionCountry(sessionEvents));
      if (sessionEvents.some(isLandingEvent)) landed.add(sessionId);
      if (sessionEvents.some(isCartEvent)) cart.add(sessionId);
      if (sessionEvents.some(isCheckoutEvent)) checkout.add(sessionId);
      if (sessionEvents.some(isPurchaseEvent)) purchase.add(sessionId);
    }
    return {
      bySession,
      visitors: visitors.size || bySession.size,
      sessions: bySession.size,
      pageViews,
      landed,
      cart,
      checkout,
      purchase,
      countries,
    };
  }

  const current = summarize(events);
  const previous = summarize(previousEvents);

  let allOrders: Order[] = [];
  try {
    allOrders = await listOrders();
  } catch (error) {
    console.error('[funnel-analytics] listOrders failed:', error);
    if (!setupNotice) setupNotice = 'Could not load orders for this range.';
  }

  const paidCurrent = paidOrdersInRange(allOrders, sinceIso, untilIso);
  const paidPrevious = paidOrdersInRange(allOrders, previousSinceIso, previousUntilIso);
  const revenueCurrent = sumRevenue(paidCurrent);
  const revenuePrevious = sumRevenue(paidPrevious);
  const aovCurrent =
    paidCurrent.length > 0 ? Math.round(revenueCurrent / paidCurrent.length) : 0;
  const aovPrevious =
    paidPrevious.length > 0 ? Math.round(revenuePrevious / paidPrevious.length) : 0;
  const conversionCurrent = pct(paidCurrent.length, current.sessions);
  const conversionPrevious = pct(paidPrevious.length, previous.sessions);

  let abandonedCurrent = {
    abandonedCarts: 0,
    recoveredCarts: 0,
    recoveredRevenue: 0,
    activeCheckouts: 0,
  };
  const abandonedPrevious = { abandonedCarts: 0, recoveredCarts: 0, recoveredRevenue: 0 };
  try {
    if (isAbandonedCartDbAvailable()) {
      const metrics = await getAbandonedCartMetrics();
      abandonedCurrent = {
        abandonedCarts: metrics.abandonedCarts,
        recoveredCarts: metrics.recoveredCarts,
        recoveredRevenue: metrics.recoveredRevenue,
        activeCheckouts: metrics.activeCheckouts,
      };
    }
  } catch {
    // optional
  }

  const completedCount =
    paidCurrent.length > 0 ? paidCurrent.length : current.purchase.size;

  const stages: FunnelStageStats[] = [
    { id: 'landed', label: 'Landed', sessions: current.landed.size, conversionFromPrevious: null },
    { id: 'cart', label: 'Added to cart', sessions: current.cart.size, conversionFromPrevious: null },
    {
      id: 'checkout',
      label: 'Reached checkout',
      sessions: current.checkout.size,
      conversionFromPrevious: null,
    },
    {
      id: 'payment',
      label: 'Payment started',
      sessions: events.filter((e) => e.eventName === 'payment_started').reduce((set, e) => {
        set.add(e.sessionId);
        return set;
      }, new Set<string>()).size,
      conversionFromPrevious: null,
    },
    {
      id: 'orders',
      label: 'Paid orders',
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
      row = { landed: new Set(), cart: new Set(), checkout: new Set(), orders: new Set() };
      countryMap.set(key, row);
    }
    return row;
  };
  for (const sessionId of current.landed) {
    ensureCountry(current.countries.get(sessionId) || 'XX').landed.add(sessionId);
  }
  for (const sessionId of current.cart) {
    ensureCountry(current.countries.get(sessionId) || 'XX').cart.add(sessionId);
  }
  for (const sessionId of current.checkout) {
    ensureCountry(current.countries.get(sessionId) || 'XX').checkout.add(sessionId);
  }
  for (const sessionId of current.purchase) {
    ensureCountry(current.countries.get(sessionId) || 'XX').orders.add(sessionId);
  }
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

  // Sales breakdowns from paid orders — allocate line revenue without double-counting GMV.
  const byPlatform = new Map<string, { orders: number; revenue: number }>();
  const byService = new Map<string, { orders: number; revenue: number; label: string }>();
  const byPackage = new Map<string, { orders: number; revenue: number; label: string }>();
  for (const order of paidCurrent) {
    const amount = order.total?.amount ?? 0;
    const lines = order.items.length
      ? order.items
      : [
          {
            platformId: 'unknown',
            serviceSlug: 'unknown',
            serviceId: 'unknown',
            serviceName: 'Unknown',
            packageId: 'unknown',
            packageTitle: 'Unknown',
            unitPrice: amount,
            lineTotal: amount,
            cartQuantity: 1,
          },
        ];
    const lineSum = lines.reduce((sum, item) => {
      const qty =
        typeof item.cartQuantity === 'number' && item.cartQuantity > 0 ? item.cartQuantity : 1;
      const line =
        typeof item.lineTotal === 'number' && item.lineTotal >= 0
          ? item.lineTotal
          : (item.unitPrice ?? 0) * qty;
      return sum + line;
    }, 0);

    const touchedPlatform = new Set<string>();
    const touchedService = new Set<string>();
    const touchedPackage = new Set<string>();

    lines.forEach((item, index) => {
      const qty =
        typeof item.cartQuantity === 'number' && item.cartQuantity > 0 ? item.cartQuantity : 1;
      const line =
        typeof item.lineTotal === 'number' && item.lineTotal >= 0
          ? item.lineTotal
          : (item.unitPrice ?? 0) * qty;
      // Proportional share of paid order total (handles coupons without over-counting GMV).
      const share =
        lineSum > 0
          ? Math.round((amount * line) / lineSum)
          : index === 0
            ? amount
            : 0;
      const platform = item.platformId || 'unknown';
      const service = item.serviceSlug || item.serviceId || 'unknown';
      const pkg = item.packageId || 'unknown';

      byPlatform.set(platform, {
        orders: (byPlatform.get(platform)?.orders ?? 0) + (touchedPlatform.has(platform) ? 0 : 1),
        revenue: (byPlatform.get(platform)?.revenue ?? 0) + share,
      });
      touchedPlatform.add(platform);

      byService.set(service, {
        orders: (byService.get(service)?.orders ?? 0) + (touchedService.has(service) ? 0 : 1),
        revenue: (byService.get(service)?.revenue ?? 0) + share,
        label: item.serviceName || service,
      });
      touchedService.add(service);

      byPackage.set(pkg, {
        orders: (byPackage.get(pkg)?.orders ?? 0) + (touchedPackage.has(pkg) ? 0 : 1),
        revenue: (byPackage.get(pkg)?.revenue ?? 0) + share,
        label: item.packageTitle || pkg,
      });
      touchedPackage.add(pkg);
    });
  }

  const salesByPlatform: NamedMetricRow[] = [...byPlatform.entries()]
    .map(([key, value]) => ({
      key,
      label: key,
      orders: value.orders,
      revenue: value.revenue,
    }))
    .sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0));

  const salesByService: NamedMetricRow[] = [...byService.entries()]
    .map(([key, value]) => ({
      key,
      label: value.label,
      orders: value.orders,
      revenue: value.revenue,
    }))
    .sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0))
    .slice(0, 15);

  const topPackages: NamedMetricRow[] = [...byPackage.entries()]
    .map(([key, value]) => ({
      key,
      label: value.label,
      orders: value.orders,
      revenue: value.revenue,
    }))
    .sort((a, b) => (b.revenue ?? 0) - (a.revenue ?? 0))
    .slice(0, 15);

  // Acquisition / landing / device from events
  const channelSessions = new Map<string, Set<string>>();
  const landingSessions = new Map<string, Set<string>>();
  const deviceSessions = new Map<string, Set<string>>();
  for (const [sessionId, sessionEvents] of current.bySession) {
    const first = [...sessionEvents].sort((a, b) => a.createdAt.localeCompare(b.createdAt))[0];
    const channel = first?.channel || (first?.metadata?.channel as string) || 'Unattributed';
    const landing = normalizePath(first?.pagePath || '/');
    const device = first?.deviceCategory || 'other';
    if (!channelSessions.has(channel)) channelSessions.set(channel, new Set());
    channelSessions.get(channel)!.add(sessionId);
    if (!landingSessions.has(landing)) landingSessions.set(landing, new Set());
    landingSessions.get(landing)!.add(sessionId);
    if (!deviceSessions.has(device)) deviceSessions.set(device, new Set());
    deviceSessions.get(device)!.add(sessionId);
  }

  const acquisition: NamedMetricRow[] = [...channelSessions.entries()]
    .map(([key, sessions]) => ({
      key,
      label: key,
      sessions: sessions.size,
      conversionRate: pct(0, sessions.size),
    }))
    .sort((a, b) => (b.sessions ?? 0) - (a.sessions ?? 0));

  const landingPages: NamedMetricRow[] = [...landingSessions.entries()]
    .map(([key, sessions]) => {
      const checkouts = [...sessions].filter((id) => current.checkout.has(id)).length;
      return {
        key,
        label: key,
        sessions: sessions.size,
        checkouts,
        conversionRate: pct(checkouts, sessions.size),
      };
    })
    .sort((a, b) => (b.sessions ?? 0) - (a.sessions ?? 0))
    .slice(0, 20);

  const devices: NamedMetricRow[] = [...deviceSessions.entries()]
    .map(([key, sessions]) => ({
      key,
      label: key,
      sessions: sessions.size,
    }))
    .sort((a, b) => (b.sessions ?? 0) - (a.sessions ?? 0));

  // Time series
  const seriesMap = new Map<string, TimeSeriesPoint>();
  for (const event of events) {
    const key = dayKey(event.createdAt);
    const point = seriesMap.get(key) ?? { date: key, sessions: 0, visitors: 0, orders: 0, revenue: 0 };
    seriesMap.set(key, point);
  }
  for (const [sessionId, sessionEvents] of current.bySession) {
    const first = [...sessionEvents].sort((a, b) => a.createdAt.localeCompare(b.createdAt))[0];
    if (!first) continue;
    const key = dayKey(first.createdAt);
    const point = seriesMap.get(key) ?? { date: key, sessions: 0, visitors: 0, orders: 0, revenue: 0 };
    point.sessions = (point.sessions ?? 0) + 1;
    seriesMap.set(key, point);
    void sessionId;
  }
  for (const order of paidCurrent) {
    const key = dayKey(order.createdAt);
    const point = seriesMap.get(key) ?? { date: key, sessions: 0, visitors: 0, orders: 0, revenue: 0 };
    point.orders = (point.orders ?? 0) + 1;
    point.revenue = (point.revenue ?? 0) + (order.total?.amount ?? 0);
    seriesMap.set(key, point);
  }
  const series = [...seriesMap.values()].sort((a, b) => a.date.localeCompare(b.date));

  const recoveryEmailSteps = await loadRecoveryEmailStats(sinceIso, untilIso);

  return {
    range,
    rangeLabel: RANGE_LABELS[range],
    sinceIso,
    untilIso,
    previousSinceIso,
    previousUntilIso,
    stages,
    countries,
    eventCount: events.length,
    storageDriver: persistence.driver,
    setupNotice,
    kpis: {
      visitors: kpi(current.visitors, previous.visitors),
      sessions: kpi(current.sessions, previous.sessions),
      pageViews: kpi(current.pageViews, previous.pageViews),
      orders: kpi(paidCurrent.length, paidPrevious.length),
      paidOrders: kpi(paidCurrent.length, paidPrevious.length),
      revenue: kpi(revenueCurrent, revenuePrevious, 'currency'),
      conversionRate: {
        value: conversionCurrent ?? 0,
        previous: conversionPrevious,
        changePct:
          conversionPrevious == null || conversionCurrent == null
            ? null
            : changePct(conversionCurrent, conversionPrevious),
        format: 'percent',
      },
      aov: kpi(aovCurrent, aovPrevious, 'currency'),
      checkoutStarts: kpi(current.checkout.size, previous.checkout.size),
      abandonedCarts: kpi(abandonedCurrent.abandonedCarts, abandonedPrevious.abandonedCarts),
      recoveredCarts: kpi(abandonedCurrent.recoveredCarts, abandonedPrevious.recoveredCarts),
      recoveredRevenue: kpi(
        abandonedCurrent.recoveredRevenue,
        abandonedPrevious.recoveredRevenue,
        'currency',
      ),
    },
    salesByPlatform,
    salesByService,
    topPackages,
    acquisition,
    landingPages,
    devices,
    recoveryEmailSteps,
    series,
    abandonedCartLink: '/admin/abandoned-carts',
  };
}
