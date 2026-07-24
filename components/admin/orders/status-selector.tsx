'use client';

import { Button } from '@/components/ui/button';
import { getAllowedTransitions, getAdminStatusLabel } from '@/lib/orders/status';
import type { OrderStatus } from '@/types/order-status';

type StatusSelectorProps = {
  current: OrderStatus;
  onChange: (next: OrderStatus) => void;
  disabled?: boolean;
  busy?: boolean;
};

export function StatusSelector({
  current,
  onChange,
  disabled,
  busy,
}: StatusSelectorProps) {
  const allowed = getAllowedTransitions(current);
  const locked = disabled || busy || allowed.length === 0;

  return (
    <div className="space-y-3">
      <p className="text-sm">
        Current status:{' '}
        <span className="font-medium capitalize">{getAdminStatusLabel(current)}</span>
      </p>
      {allowed.length === 0 ? (
        <Button type="button" size="sm" variant="outline" disabled>
          Terminal status
        </Button>
      ) : (
        <div className="flex flex-wrap gap-2">
          {allowed.map((status) => (
            <Button
              key={status}
              type="button"
              size="sm"
              variant={status === 'cancelled' || status === 'refunded' ? 'outline' : 'default'}
              disabled={locked}
              onClick={() => onChange(status)}
            >
              {getAdminStatusLabel(status)}
            </Button>
          ))}
        </div>
      )}
      {busy ? (
        <p className="text-xs text-muted-foreground">Updating order…</p>
      ) : null}
      {current === 'pending' ? (
        <p className="text-xs text-muted-foreground">
          Pending orders must move to Processing first, then Completed.
        </p>
      ) : null}
    </div>
  );
}
