import { AdminCard } from '@/components/admin/cards/admin-card';
import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import type { DashboardActivityItem } from '@/types/admin-dashboard';

type ActivityFeedProps = {
  items: DashboardActivityItem[];
  loading?: boolean;
};

export function ActivityFeed({ items, loading }: ActivityFeedProps) {
  return (
    <AdminCard title="Latest activity" description="Recent operational events">
      {loading ? (
        <div className="space-y-2" aria-busy="true">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-8 animate-pulse rounded bg-muted" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <AdminEmptyState
          title="No recent activity"
          description="Order and content events will appear here."
        />
      ) : (
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.id} className="text-sm">
              <p>{item.message}</p>
              <time className="text-xs text-muted-foreground" dateTime={item.at}>
                {new Date(item.at).toLocaleString()}
              </time>
            </li>
          ))}
        </ul>
      )}
    </AdminCard>
  );
}
