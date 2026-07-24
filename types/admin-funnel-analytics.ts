/**
 * Admin funnel analytics view model — first-party events + paid orders.
 */

export type FunnelRangeId = 'today' | '7d' | '30d';

export type FunnelStageStats = {
  id: 'landed' | 'cart' | 'checkout' | 'orders';
  label: string;
  sessions: number;
  conversionFromPrevious: number | null;
};

export type FunnelCountryRow = {
  countryCode: string;
  countryName: string;
  landed: number;
  cart: number;
  checkout: number;
  orders: number;
};

export type FunnelAnalyticsViewModel = {
  range: FunnelRangeId;
  rangeLabel: string;
  sinceIso: string;
  untilIso: string;
  stages: FunnelStageStats[];
  countries: FunnelCountryRow[];
  eventCount: number;
  storageDriver: string;
  /** Present when event store is unavailable (e.g. missing DB migration). */
  setupNotice?: string;
};
