import { AdminStatCard } from '@/components/admin/cards/admin-stat-card';
import type { DashboardKpi } from '@/types/admin-dashboard';

type KPIWidgetProps = {
  kpi: DashboardKpi;
  loading?: boolean;
};

export function KPIWidget({ kpi, loading }: KPIWidgetProps) {
  return (
    <AdminStatCard
      label={kpi.label}
      value={kpi.value}
      trend={kpi.trend}
      loading={loading}
    />
  );
}

type KPIGridProps = {
  kpis: DashboardKpi[];
  loading?: boolean;
};

export function KPIGrid({ kpis, loading }: KPIGridProps) {
  return (
    <section aria-label="Key metrics">
      <h2 className="mb-3 text-sm font-semibold">Overview</h2>
      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {kpis.map((kpi) => (
          <KPIWidget key={kpi.id} kpi={kpi} loading={loading} />
        ))}
      </div>
    </section>
  );
}
