import type { PublicTrackedOrder } from '@/types/tracking';
import { cn } from '@/lib/utils';

type OrderSummaryProps = {
  order: PublicTrackedOrder;
  className?: string;
};

export function OrderSummary({ order, className }: OrderSummaryProps) {
  return (
    <dl className={cn('grid gap-3 rounded-lg border p-6 text-sm sm:grid-cols-2', className)}>
      <div>
        <dt className="text-muted-foreground">Order ID</dt>
        <dd className="font-medium">{order.orderId}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Service</dt>
        <dd className="font-medium">{order.serviceName}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Package</dt>
        <dd className="font-medium">{order.packageTitle}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Quantity</dt>
        <dd className="font-medium">{order.quantityLabel}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Target</dt>
        <dd className="font-medium">{order.targetDisplay}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Order date</dt>
        <dd className="font-medium">
          <time dateTime={order.createdAt}>
            {new Date(order.createdAt).toLocaleDateString()}
          </time>
        </dd>
      </div>
      {order.estimatedDelivery ? (
        <div className="sm:col-span-2">
          <dt className="text-muted-foreground">Estimated delivery</dt>
          <dd className="font-medium">{order.estimatedDelivery}</dd>
        </div>
      ) : null}
    </dl>
  );
}
