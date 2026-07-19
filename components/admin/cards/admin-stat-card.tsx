import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

type AdminStatCardProps = {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: string;
  loading?: boolean;
  className?: string;
};

export function AdminStatCard({
  label,
  value,
  icon,
  trend,
  loading,
  className,
}: AdminStatCardProps) {
  return (
    <div className={cn('rounded-lg border p-4', className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm text-muted-foreground">{label}</p>
          {loading ? (
            <div className="h-8 w-20 animate-pulse rounded bg-muted" />
          ) : (
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
          )}
          {trend ? <p className="text-xs text-muted-foreground">{trend}</p> : null}
        </div>
        {icon ? <div className="text-muted-foreground">{icon}</div> : null}
      </div>
    </div>
  );
}
