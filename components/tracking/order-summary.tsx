import type { PublicTrackedOrder } from '@/types/tracking';
import { cn } from '@/lib/utils';

type OrderSummaryProps = {
  order: PublicTrackedOrder;
  className?: string;
};

export function OrderSummary({ order, className }: OrderSummaryProps) {
  const items = order.items?.length
    ? order.items
    : [
        {
          serviceName: order.serviceName,
          packageTitle: order.packageTitle,
          packageQuantityLabel: order.quantityLabel,
          cartQuantity: 1,
          lineTotalDisplay: order.orderTotalDisplay ?? '—',
          targetDisplay: order.targetDisplay,
        },
      ];

  return (
    <div className={cn('space-y-4 rounded-lg border p-6 text-sm', className)}>
      <dl className="grid gap-3 sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Order ID</dt>
          <dd className="font-medium">{order.orderId}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Order date</dt>
          <dd className="font-medium">
            <time dateTime={order.createdAt}>
              {new Date(order.createdAt).toLocaleDateString()}
            </time>
          </dd>
        </div>
        {order.orderTotalDisplay ? (
          <div>
            <dt className="text-muted-foreground">Order total</dt>
            <dd className="font-medium">{order.orderTotalDisplay}</dd>
          </div>
        ) : null}
        {order.estimatedDelivery ? (
          <div>
            <dt className="text-muted-foreground">Estimated delivery</dt>
            <dd className="font-medium">{order.estimatedDelivery}</dd>
          </div>
        ) : null}
      </dl>

      <div>
        <h3 className="mb-2 font-semibold">Order items</h3>
        <ul className="space-y-3">
          {items.map((item, index) => (
            <li key={`${item.serviceName}-${index}`} className="rounded-md border p-3">
              <p className="font-medium">{item.serviceName}</p>
              <p className="text-muted-foreground">
                Package: {item.packageTitle}
                {item.packageQuantityLabel ? ` (${item.packageQuantityLabel})` : ''}
              </p>
              <p>Qty: {item.cartQuantity}</p>
              <p>Line total: {item.lineTotalDisplay}</p>
              <p className="break-all">Target: {item.targetDisplay}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
