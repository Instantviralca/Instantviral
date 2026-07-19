import type { AdminOrderDetails } from '@/types/admin-orders';

type OrderSummaryCardProps = {
  order: AdminOrderDetails;
};

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  return (
    <dl className="grid gap-3 text-sm sm:grid-cols-2">
      <div>
        <dt className="text-muted-foreground">Order ID</dt>
        <dd className="font-medium">{order.id}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Customer</dt>
        <dd className="font-medium">{order.customerEmail}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Platform</dt>
        <dd className="font-medium capitalize">{order.platformId}</dd>
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
        <dt className="text-muted-foreground">Total</dt>
        <dd className="font-medium">{order.totalDisplay}</dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Payment</dt>
        <dd className="font-medium">
          {order.paymentMethod ?? '—'} · {order.paymentStatus}
        </dd>
      </div>
      <div>
        <dt className="text-muted-foreground">Updated</dt>
        <dd className="font-medium">{new Date(order.updatedAt).toLocaleString()}</dd>
      </div>
    </dl>
  );
}
