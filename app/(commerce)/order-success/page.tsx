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
import { getOrderById } from '@/lib/orders/store';
import { buildPageMetadataForRoute } from '@/lib/seo/metadata';

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
  let orderTotal: number | undefined;
  let currency = 'USD';

  if (orderId) {
    const order = await getOrderById(orderId);

    if (order && email && order.guestEmail.toLowerCase() === email.toLowerCase()) {
      verified = order.payment?.status === 'paid';
      paymentPending = order.payment?.status === 'pending' || order.payment?.status === 'processing';
      orderTotal = order.total.amount;
      currency = order.total.currency;
    } else if (allowMockPayments() && params.verified === '1' && order) {
      verified = order.payment?.status === 'paid';
      orderTotal = order.total.amount;
      currency = order.total.currency;
    }
  }

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
              ? 'We are confirming your payment. This page will show success once Stripe verifies the charge.'
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
