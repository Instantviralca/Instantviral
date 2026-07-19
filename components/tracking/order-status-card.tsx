import { getOrderStatusMetadata } from '@/lib/orders/status';
import type { PublicTrackedOrder } from '@/types/tracking';
import { cn } from '@/lib/utils';

type OrderStatusCardProps = {
  order: PublicTrackedOrder;
  className?: string;
};

export function OrderStatusCard({ order, className }: OrderStatusCardProps) {
  const meta = getOrderStatusMetadata(order.status);

  return (
    <section
      className={cn('rounded-lg border p-6 space-y-2', className)}
      aria-label="Order status"
      data-status={order.status}
      data-color-token={meta.colorToken}
    >
      <p className="text-sm text-muted-foreground">Current status</p>
      <h2 className="text-xl font-semibold">{order.statusLabel}</h2>
      <p className="text-sm text-muted-foreground">{order.statusMessage}</p>
      <p className="text-xs text-muted-foreground">
        Last updated{' '}
        <time dateTime={order.updatedAt}>
          {new Date(order.updatedAt).toLocaleString()}
        </time>
      </p>
    </section>
  );
}
