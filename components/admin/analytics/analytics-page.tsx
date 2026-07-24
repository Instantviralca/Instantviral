import Link from 'next/link';

import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { AdminStatCard } from '@/components/admin/cards/admin-stat-card';
import { cn } from '@/lib/utils';
import type { FunnelAnalyticsViewModel, FunnelRangeId } from '@/types/admin-funnel-analytics';

const RANGES: Array<{ id: FunnelRangeId; label: string }> = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
];

type AnalyticsPageProps = {
  data: FunnelAnalyticsViewModel;
};

function formatRate(rate: number | null): string | undefined {
  if (rate === null) return undefined;
  return `${rate}% from previous`;
}

export function AnalyticsPage({ data }: AnalyticsPageProps) {
  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Analytics"
        description="Visitor funnel: landings, cart adds, checkout, and completed orders."
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
        <div className="inline-flex rounded-lg border p-1" role="group" aria-label="Date range">
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

      <section aria-label="Funnel overview">
        <h2 className="mb-3 text-sm font-semibold">Funnel</h2>
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
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
