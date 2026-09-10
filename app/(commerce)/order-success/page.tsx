import type { Metadata } from 'next';
import Link from 'next/link';

import { ConversionTracker } from '@/components/analytics/ConversionTracker';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { allowMockPayments } from '@/lib/config/env';
import {
  normalizeOrderLineItem,
  resolveCartQuantity,
  resolveLineTotal,
  resolveTargetFromConfig,
} from '@/lib/orders/line-items';
import { getOrderById } from '@/lib/orders/store';
import { formatMoney } from '@/lib/pricing/format';
import { buildPageMetadataForRoute } from '@/lib/seo/metadata';
import type { Order } from '@/types/order';

export const metadata: Metadata = buildPageMetadataForRoute(routes.orderSuccess);

export const dynamic = 'force-dynamic';

type OrderSuccessPageProps = {
  searchParams: Promise<{
    orderId?: string;
    email?: string;
    verified?: string;
  }>;
};

export default async function OrderSuccessPage({ searchParams }: OrderSuccessPageProps) {
  const params = await searchParams;
  const orderId = params.orderId?.trim();
  const email = params.email?.trim();

  let verified = false;
  let paymentPending = false;
  let order: Order | null = null;

  if (orderId) {
    const found = await getOrderById(orderId);

    if (found && email && found.guestEmail.toLowerCase() === email.toLowerCase()) {
      order = found;
      verified = found.payment?.status === 'paid';
      paymentPending =
        found.payment?.status === 'pending' || found.payment?.status === 'processing';
    } else if (allowMockPayments() && params.verified === '1' && found) {
      order = found;
      verified = found.payment?.status === 'paid';
    }
  }

  const orderTotal = order?.total.amount;
  const currency = order?.total.currency ?? 'USD';

  return (
    <Section aria-label="Order success">
      <Container size="md" className="space-y-6">
        <Heading as="h1" size="h1">
          {verified ? 'Payment confirmed' : paymentPending ? 'Confirming payment' : 'Order status'}
        </Heading>
        <MutedText>
          {verified
            ? 'Thanks — your payment was verified and your order is in the fulfilment queue.'
            : paymentPending
              ? 'We are confirming your payment. This page will show success once payment is verified.'
              : 'We could not verify this order yet. Use your order ID and email to track status.'}
        </MutedText>
        {orderId ? (
          <div className="rounded-lg border bg-card p-4 text-sm">
            <p>
              <span className="font-medium">Order ID:</span> {orderId}
            </p>
            {email ? (
              <p className="mt-1">
                <span className="font-medium">Email:</span> {email}
              </p>
            ) : null}
          </div>
        ) : null}

        {order ? (
          <div className="rounded-lg border bg-card p-4 text-sm">
            <h2 className="mb-3 font-semibold">Order items</h2>
            <ul className="space-y-3">
              {order.items.map((raw) => {
                const item = normalizeOrderLineItem(raw);
                const target = resolveTargetFromConfig(item.configuration);
                return (
                  <li key={item.id} className="rounded-md border p-3">
                    <p className="font-medium">{item.serviceName}</p>
                    <p className="text-muted-foreground">
                      Package: {item.packageTitle} ({item.quantityLabel})
                    </p>
                    <p>Qty: {resolveCartQuantity(item)}</p>
                    <p>Unit price: {formatMoney(item.unitPrice, order.currency)}</p>
                    <p>Line total: {formatMoney(resolveLineTotal(item), order.currency)}</p>
                    {target ? <p className="break-all">Profile / URL: {target}</p> : null}
                  </li>
                );
              })}
            </ul>
            <p className="mt-4 font-semibold">
              Order total: {formatMoney(order.total.amount, order.currency)}
            </p>
          </div>
        ) : null}

        {verified && orderId ? (
          <ConversionTracker
            enabled
            verification={{
              verified: true,
              source: 'payment_confirmed',
              idempotencyKey: `purchase:${orderId}`,
              anonymousTransactionRef: orderId.slice(-8),
            }}
            payload={{
              value: orderTotal !== undefined ? orderTotal / 100 : undefined,
              currency: currency as 'USD',
            }}
          />
        ) : null}
        <div className="flex flex-wrap gap-3">
          <Button asChild>
            <Link
              href={
                orderId && email
                  ? `${routes.trackOrder}?orderId=${encodeURIComponent(orderId)}&email=${encodeURIComponent(email)}`
                  : routes.trackOrder
              }
            >
              Track order
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href={routes.home}>Back to home</Link>
          </Button>
        </div>
      </Container>
    </Section>
  );
}
