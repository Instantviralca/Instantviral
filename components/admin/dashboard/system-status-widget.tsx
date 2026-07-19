import { AdminCard } from '@/components/admin/cards/admin-card';
import type { DashboardSystemStatus } from '@/types/admin-dashboard';
import { cn } from '@/lib/utils';

type SystemStatusWidgetProps = {
  items: DashboardSystemStatus[];
};

export function SystemStatusWidget({ items }: SystemStatusWidgetProps) {
  return (
    <AdminCard title="System status" description="Operational health overview">
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
            <div>
              <p className="font-medium">{item.label}</p>
              {item.detail ? (
                <p className="text-xs text-muted-foreground">{item.detail}</p>
              ) : null}
            </div>
            <span
              className={cn(
                'rounded-md px-2 py-0.5 text-xs font-medium capitalize',
                item.status === 'operational' && 'bg-secondary text-secondary-foreground',
                item.status === 'degraded' && 'bg-secondary text-secondary-foreground',
                item.status === 'down' && 'bg-destructive text-white',
                item.status === 'unknown' && 'bg-muted text-muted-foreground',
              )}
            >
              {item.status}
            </span>
          </li>
        ))}
      </ul>
    </AdminCard>
  );
}
