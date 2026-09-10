/**
 * Admin commerce + first-party analytics view model.
 * Revenue always comes from paid orders — never from client events.
 */

export type AnalyticsRangeId =
  | 'today'
  | 'yesterday'
  | '7d'
  | '30d'
  | 'this_month'
  | 'prev_month';

export type FunnelRangeId = AnalyticsRangeId;

export type FunnelStageStats = {
  id: string;
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

export type KpiValue = {
  value: number;
  previous: number | null;
  changePct: number | null;
  format?: 'number' | 'currency' | 'percent';
};

export type NamedMetricRow = {
  key: string;
  label: string;
  sessions?: number;
  orders?: number;
  revenue?: number;
  conversionRate?: number | null;
  checkouts?: number;
};

export type RecoveryEmailStepStats = {
  step: number;
  sent: number;
  clicks: number;
  recoveredOrders: number;
  recoveredRevenue: number;
};

export type TimeSeriesPoint = {
  date: string;
  visitors?: number;
  sessions?: number;
  orders?: number;
  revenue?: number;
};

export type FunnelAnalyticsViewModel = {
  range: AnalyticsRangeId;
  rangeLabel: string;
  sinceIso: string;
  untilIso: string;
  previousSinceIso: string;
  previousUntilIso: string;
  stages: FunnelStageStats[];
  countries: FunnelCountryRow[];
  eventCount: number;
  storageDriver: string;
  setupNotice?: string;
  kpis: {
    visitors: KpiValue;
    sessions: KpiValue;
    pageViews: KpiValue;
    orders: KpiValue;
    paidOrders: KpiValue;
    revenue: KpiValue;
    conversionRate: KpiValue;
    aov: KpiValue;
    checkoutStarts: KpiValue;
    abandonedCarts: KpiValue;
    recoveredCarts: KpiValue;
    recoveredRevenue: KpiValue;
  };
  salesByPlatform: NamedMetricRow[];
  salesByService: NamedMetricRow[];
  topPackages: NamedMetricRow[];
  acquisition: NamedMetricRow[];
  landingPages: NamedMetricRow[];
  devices: NamedMetricRow[];
  recoveryEmailSteps: RecoveryEmailStepStats[];
  series: TimeSeriesPoint[];
  abandonedCartLink: string;
};
