import { AdminCard } from '@/components/admin/cards/admin-card';
import type { DashboardRevenueSummary } from '@/types/admin-dashboard';

type RevenueWidgetProps = {
  revenue: DashboardRevenueSummary;
  loading?: boolean;
};

/** Simple totals for v1 — charts deferred. */
export function RevenueWidget({ revenue, loading }: RevenueWidgetProps) {
  return (
    <AdminCard title="Revenue" description={`Currency: ${revenue.currency}`}>
      {loading ? (
        <div className="grid gap-3 sm:grid-cols-2" aria-busy="true">
          <div className="h-16 animate-pulse rounded bg-muted" />
          <div className="h-16 animate-pulse rounded bg-muted" />
        </div>
      ) : (
        <dl className="grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="text-sm text-muted-foreground">Today</dt>
            <dd className="text-xl font-semibold">{revenue.today}</dd>
          </div>
          <div>
            <dt className="text-sm text-muted-foreground">This month</dt>
            <dd className="text-xl font-semibold">{revenue.month}</dd>
          </div>
        </dl>
      )}
    </AdminCard>
  );
}
