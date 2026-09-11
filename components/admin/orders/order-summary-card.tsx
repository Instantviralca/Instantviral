'use client';

import type { AdminOrderDetails } from '@/types/admin-orders';

type OrderSummaryCardProps = {
  order: AdminOrderDetails;
};

function CopyableValue({ value }: { value: string }) {
  const isUrl = /^https?:\/\//i.test(value);
  return (
    <dd className="break-all font-medium">
      {isUrl ? (
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--brand)] underline-offset-2 hover:underline"
        >
          {value}
        </a>
      ) : (
        value
      )}
    </dd>
  );
}

export function OrderSummaryCard({ order }: OrderSummaryCardProps) {
  const lineItems = order.lineItems?.length
    ? order.lineItems
    : [
        {
          id: 'legacy',
          platformId: order.platformId,
          serviceName: order.serviceName,
          packageTitle: order.packageTitle,
          packageQuantityLabel: order.quantityLabel,
          cartQuantity: 1,
          unitPriceDisplay: order.totalDisplay,
          lineTotalDisplay: order.totalDisplay,
          unitPrice: 0,
          lineTotal: 0,
          currency: 'USD',
          targetDisplay: order.targetDisplay,
          fulfillmentFields: order.fulfillmentFields,
        },
      ];

  return (
    <div className="space-y-4">
      <dl className="grid gap-3 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted-foreground">Order number</dt>
          <dd className="font-medium">{order.orderNumberDisplay}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Customer</dt>
          <dd className="font-medium">{order.customerEmail}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Items</dt>
          <dd className="font-medium">{order.itemsSummary}</dd>
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

      <div className="rounded-lg border border-[var(--border-subtle)] bg-muted/30 p-3">
        <h4 className="mb-3 text-sm font-semibold">Order items</h4>
        <div className="space-y-4">
          {lineItems.map((item) => (
            <article
              key={item.id}
              className="rounded-md border border-[var(--border-subtle)] bg-background p-3 text-sm"
            >
              <p className="font-semibold">{item.serviceName}</p>
              <dl className="mt-2 grid gap-2 sm:grid-cols-2">
                <div>
                  <dt className="text-muted-foreground">Package</dt>
                  <dd className="font-medium">
                    {item.packageTitle}
                    {item.packageQuantityLabel ? ` (${item.packageQuantityLabel})` : ''}
                  </dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Platform</dt>
                  <dd className="font-medium capitalize">{item.platformId}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Qty</dt>
                  <dd className="font-medium">{item.cartQuantity}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Unit Price</dt>
                  <dd className="font-medium">{item.unitPriceDisplay}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">Line Total</dt>
                  <dd className="font-medium">{item.lineTotalDisplay}</dd>
                </div>
                {item.deliveryTime ? (
                  <div>
                    <dt className="text-muted-foreground">Delivery</dt>
                    <dd className="font-medium">{item.deliveryTime}</dd>
                  </div>
                ) : null}
              </dl>
              {item.fulfillmentFields.length > 0 ? (
                <div className="mt-3 border-t pt-3">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Delivery details
                  </p>
                  <dl className="space-y-2">
                    {item.fulfillmentFields.map((field) => (
                      <div key={`${item.id}-${field.key}`}>
                        <dt className="text-muted-foreground">{field.label}</dt>
                        <CopyableValue value={field.value} />
                      </div>
                    ))}
                  </dl>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">
                  Target: {item.targetDisplay}
                </p>
              )}
            </article>
          ))}
        </div>
        <dl className="mt-4 grid gap-2 border-t pt-3 text-sm sm:grid-cols-3">
          <div>
            <dt className="text-muted-foreground">Subtotal</dt>
            <dd className="font-medium">{order.subtotalDisplay}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Discount</dt>
            <dd className="font-medium">{order.discountDisplay}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Order Total</dt>
            <dd className="font-medium">{order.totalDisplay}</dd>
          </div>
        </dl>
        {order.customerNotes ? (
          <div className="mt-3 border-t pt-3 text-sm">
            <p className="text-muted-foreground">Customer notes</p>
            <p className="whitespace-pre-wrap font-medium">{order.customerNotes}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}
