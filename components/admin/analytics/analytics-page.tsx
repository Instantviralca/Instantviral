import Link from 'next/link';

import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { AdminStatCard } from '@/components/admin/cards/admin-stat-card';
import { formatMoney } from '@/lib/pricing/format';
import { cn } from '@/lib/utils';
import type {
  AnalyticsRangeId,
  FunnelAnalyticsViewModel,
  KpiValue,
} from '@/types/admin-funnel-analytics';

const RANGES: Array<{ id: AnalyticsRangeId; label: string }> = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
  { id: 'this_month', label: 'This month' },
  { id: 'prev_month', label: 'Prev month' },
];

type AnalyticsPageProps = {
  data: FunnelAnalyticsViewModel;
};

function formatKpi(kpi: KpiValue): string {
  if (kpi.format === 'currency') return formatMoney(kpi.value, 'USD');
  if (kpi.format === 'percent') return `${kpi.value}%`;
  return String(kpi.value);
}

function formatChange(kpi: KpiValue): string | undefined {
  if (kpi.changePct === null || kpi.previous === null) return undefined;
  const sign = kpi.changePct > 0 ? '+' : '';
  return `${sign}${kpi.changePct}% vs previous period`;
}

function formatRate(rate: number | null): string | undefined {
  if (rate === null) return undefined;
  return `${rate}% from previous stage`;
}

function SimpleBars({
  rows,
  valueKey,
}: {
  rows: Array<{ label: string; value: number }>;
  valueKey?: string;
}) {
  const max = Math.max(...rows.map((r) => r.value), 1);
  return (
    <div className="space-y-2" aria-label={valueKey || 'chart'}>
      {rows.map((row) => (
        <div key={row.label} className="grid grid-cols-[8rem_1fr_auto] items-center gap-2 text-sm">
          <span className="truncate text-muted-foreground">{row.label}</span>
          <div className="h-2 rounded bg-muted">
            <div
              className="h-2 rounded bg-foreground/80"
              style={{ width: `${Math.max(4, (row.value / max) * 100)}%` }}
            />
          </div>
          <span className="tabular-nums">{row.value}</span>
        </div>
      ))}
    </div>
  );
}

export function AnalyticsPage({ data }: AnalyticsPageProps) {
  const revenueSeries = data.series.map((point) => ({
    label: point.date.slice(5),
    value: Math.round((point.revenue ?? 0) / 100),
  }));

  return (
    <div className="space-y-8">
      <AdminPageHeader
        title="Analytics"
        description="First-party traffic, checkout funnel, paid revenue, and abandoned-cart recovery. Revenue uses paid orders only."
      />

      {data.setupNotice ? (
        <div
          className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-950"
          role="status"
        >
          {data.setupNotice}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="inline-flex flex-wrap rounded-lg border p-1" role="group" aria-label="Date range">
          {RANGES.map((range) => (
            <Link
              key={range.id}
              href={`/admin/analytics?range=${range.id}`}
              className={cn(
                'rounded-md px-3 py-1.5 text-sm transition-colors',
                data.range === range.id
                  ? 'bg-foreground text-background'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {range.label}
            </Link>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          {data.rangeLabel} · {data.eventCount} events · store: {data.storageDriver}
        </p>
      </div>

      <section aria-label="Overview KPIs">
        <h2 className="mb-3 text-sm font-semibold">Overview</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard label="Visitors" value={formatKpi(data.kpis.visitors)} trend={formatChange(data.kpis.visitors)} />
          <AdminStatCard label="Sessions" value={formatKpi(data.kpis.sessions)} trend={formatChange(data.kpis.sessions)} />
          <AdminStatCard label="Page views" value={formatKpi(data.kpis.pageViews)} trend={formatChange(data.kpis.pageViews)} />
          <AdminStatCard label="Paid orders" value={formatKpi(data.kpis.paidOrders)} trend={formatChange(data.kpis.paidOrders)} />
          <AdminStatCard label="Revenue" value={formatKpi(data.kpis.revenue)} trend={formatChange(data.kpis.revenue)} />
          <AdminStatCard
            label="Conversion rate"
            value={formatKpi(data.kpis.conversionRate)}
            trend="Paid orders ÷ sessions"
          />
          <AdminStatCard label="AOV" value={formatKpi(data.kpis.aov)} trend={formatChange(data.kpis.aov)} />
          <AdminStatCard
            label="Checkout starts"
            value={formatKpi(data.kpis.checkoutStarts)}
            trend={formatChange(data.kpis.checkoutStarts)}
          />
        </div>
      </section>

      <section aria-label="Funnel overview">
        <h2 className="mb-3 text-sm font-semibold">Checkout funnel</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
          {data.stages.map((stage) => (
            <AdminStatCard
              key={stage.id}
              label={stage.label}
              value={stage.sessions}
              trend={formatRate(stage.conversionFromPrevious)}
            />
          ))}
        </div>
      </section>

      <section aria-label="Abandoned cart analytics" className="space-y-3">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-sm font-semibold">Abandoned carts</h2>
          <Link href={data.abandonedCartLink} className="text-sm text-muted-foreground underline-offset-4 hover:underline">
            Open Abandoned Carts
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <AdminStatCard label="Abandoned carts" value={formatKpi(data.kpis.abandonedCarts)} />
          <AdminStatCard label="Recovered carts" value={formatKpi(data.kpis.recoveredCarts)} />
          <AdminStatCard label="Recovered revenue" value={formatKpi(data.kpis.recoveredRevenue)} />
          <AdminStatCard
            label="Recovery rate"
            value={
              data.kpis.abandonedCarts.value + data.kpis.recoveredCarts.value > 0
                ? `${Math.round(
                    (data.kpis.recoveredCarts.value /
                      (data.kpis.abandonedCarts.value +
                        data.kpis.recoveredCarts.value +
                        0)) *
                      1000,
                  ) / 10}%`
                : '0%'
            }
            trend="From abandoned-cart store"
          />
        </div>
        <div className="overflow-x-auto rounded-lg border">
          <table className="w-full min-w-[32rem] text-left text-sm">
            <thead className="border-b bg-muted/40 text-muted-foreground">
              <tr>
                <th className="px-3 py-2 font-medium">Email step</th>
                <th className="px-3 py-2 font-medium tabular-nums">Sent</th>
                <th className="px-3 py-2 font-medium tabular-nums">Clicks</th>
                <th className="px-3 py-2 font-medium tabular-nums">Recovered orders</th>
                <th className="px-3 py-2 font-medium tabular-nums">Recovered revenue</th>
              </tr>
            </thead>
            <tbody>
              {data.recoveryEmailSteps.map((row) => (
                <tr key={row.step} className="border-b last:border-0">
                  <td className="px-3 py-2">Email {row.step}</td>
                  <td className="px-3 py-2 tabular-nums">{row.sent}</td>
                  <td className="px-3 py-2 tabular-nums">{row.clicks}</td>
                  <td className="px-3 py-2 tabular-nums">{row.recoveredOrders}</td>
                  <td className="px-3 py-2 tabular-nums">{formatMoney(row.recoveredRevenue, 'USD')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section aria-label="Revenue over time" className="space-y-3">
        <h2 className="text-sm font-semibold">Revenue over time (USD)</h2>
        {revenueSeries.length === 0 ? (
          <AdminEmptyState title="No paid orders in range" description="Revenue charts use confirmed paid orders only." />
        ) : (
          <SimpleBars rows={revenueSeries} valueKey="revenue" />
        )}
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section aria-label="Acquisition" className="space-y-3">
          <h2 className="text-sm font-semibold">Traffic sources</h2>
          {data.acquisition.length === 0 ? (
            <AdminEmptyState title="No acquisition data" description="UTM/referrer capture starts with new sessions." />
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/40 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-medium">Channel</th>
                    <th className="px-3 py-2 font-medium tabular-nums">Sessions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.acquisition.map((row) => (
                    <tr key={row.key} className="border-b last:border-0">
                      <td className="px-3 py-2">{row.label}</td>
                      <td className="px-3 py-2 tabular-nums">{row.sessions ?? 0}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section aria-label="Devices" className="space-y-3">
          <h2 className="text-sm font-semibold">Devices</h2>
          {data.devices.length === 0 ? (
            <AdminEmptyState title="No device data" description="Device class is inferred from user-agent on collect." />
          ) : (
            <SimpleBars
              rows={data.devices.map((row) => ({ label: row.label, value: row.sessions ?? 0 }))}
            />
          )}
        </section>
      </div>

      <section aria-label="Landing pages" className="space-y-3">
        <h2 className="text-sm font-semibold">Landing pages</h2>
        {data.landingPages.length === 0 ? (
          <AdminEmptyState title="No landing pages yet" description="Entry paths appear after first-party page views." />
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="border-b bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Landing page</th>
                  <th className="px-3 py-2 font-medium tabular-nums">Sessions</th>
                  <th className="px-3 py-2 font-medium tabular-nums">Checkouts</th>
                  <th className="px-3 py-2 font-medium tabular-nums">Conv.</th>
                </tr>
              </thead>
              <tbody>
                {data.landingPages.map((row) => (
                  <tr key={row.key} className="border-b last:border-0">
                    <td className="px-3 py-2 font-mono text-xs">{row.label}</td>
                    <td className="px-3 py-2 tabular-nums">{row.sessions ?? 0}</td>
                    <td className="px-3 py-2 tabular-nums">{row.checkouts ?? 0}</td>
                    <td className="px-3 py-2 tabular-nums">
                      {row.conversionRate == null ? '—' : `${row.conversionRate}%`}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        <section aria-label="Sales by service" className="space-y-3">
          <h2 className="text-sm font-semibold">Top services (paid)</h2>
          {data.salesByService.length === 0 ? (
            <AdminEmptyState title="No paid service sales" description="Uses confirmed paid orders." />
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/40 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-medium">Service</th>
                    <th className="px-3 py-2 font-medium tabular-nums">Orders</th>
                    <th className="px-3 py-2 font-medium tabular-nums">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {data.salesByService.map((row) => (
                    <tr key={row.key} className="border-b last:border-0">
                      <td className="px-3 py-2">{row.label}</td>
                      <td className="px-3 py-2 tabular-nums">{row.orders ?? 0}</td>
                      <td className="px-3 py-2 tabular-nums">{formatMoney(row.revenue ?? 0, 'USD')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <section aria-label="Top packages" className="space-y-3">
          <h2 className="text-sm font-semibold">Top packages (paid)</h2>
          {data.topPackages.length === 0 ? (
            <AdminEmptyState title="No paid package sales" description="Uses confirmed paid orders." />
          ) : (
            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full text-left text-sm">
                <thead className="border-b bg-muted/40 text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2 font-medium">Package</th>
                    <th className="px-3 py-2 font-medium tabular-nums">Orders</th>
                    <th className="px-3 py-2 font-medium tabular-nums">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {data.topPackages.map((row) => (
                    <tr key={row.key} className="border-b last:border-0">
                      <td className="px-3 py-2">{row.label}</td>
                      <td className="px-3 py-2 tabular-nums">{row.orders ?? 0}</td>
                      <td className="px-3 py-2 tabular-nums">{formatMoney(row.revenue ?? 0, 'USD')}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </div>

      <section aria-label="Visitors by country" className="space-y-3">
        <h2 className="text-sm font-semibold">By country</h2>
        {data.countries.length === 0 ? (
          <AdminEmptyState
            title="No visitor data yet"
            description="Browse the site, add to cart, and open checkout — funnel events will appear here."
          />
        ) : (
          <div className="overflow-x-auto rounded-lg border">
            <table className="w-full min-w-[36rem] text-left text-sm">
              <thead className="border-b bg-muted/40 text-muted-foreground">
                <tr>
                  <th className="px-3 py-2 font-medium">Country</th>
                  <th className="px-3 py-2 font-medium tabular-nums">Landed</th>
                  <th className="px-3 py-2 font-medium tabular-nums">Cart</th>
                  <th className="px-3 py-2 font-medium tabular-nums">Checkout</th>
                  <th className="px-3 py-2 font-medium tabular-nums">Orders</th>
                </tr>
              </thead>
              <tbody>
                {data.countries.map((row) => (
                  <tr key={row.countryCode} className="border-b last:border-0">
                    <td className="px-3 py-2">
                      <span className="font-medium">{row.countryName}</span>
                      <span className="ml-2 text-xs text-muted-foreground">{row.countryCode}</span>
                    </td>
                    <td className="px-3 py-2 tabular-nums">{row.landed}</td>
                    <td className="px-3 py-2 tabular-nums">{row.cart}</td>
                    <td className="px-3 py-2 tabular-nums">{row.checkout}</td>
                    <td className="px-3 py-2 tabular-nums">{row.orders}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
