/**
 * Stripe Checkout Session provider — Document 10.06.
 * Disabled until STRIPE_* env vars are present (see lib/config/env.ts).
 */

import Stripe from 'stripe';

import { isStripeConfigured } from '@/lib/config/env';
import { normalizePaymentStatus } from '@/lib/payments/normalize-status';
import type {
  CancelPaymentInput,
  CreatePaymentInput,
  CreatePaymentResult,
  PaymentProvider,
  VerifyPaymentInput,
  VerifyPaymentResult,
  WebhookEvent,
} from '@/types/payment';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) {
    throw new Error('STRIPE_SECRET_KEY is not configured.');
  }
  return new Stripe(key, { typescript: true });
}

export const stripeProvider: PaymentProvider = {
  id: 'stripe',
  displayName: 'Stripe',

  async createPayment(input: CreatePaymentInput): Promise<CreatePaymentResult> {
    if (!isStripeConfigured()) {
      throw new Error('Stripe is not configured.');
    }
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create(
      {
        mode: 'payment',
        customer_email: input.customerEmail,
        client_reference_id: input.orderId,
        line_items: [
          {
            quantity: 1,
            price_data: {
              currency: input.amount.currency.toLowerCase(),
              unit_amount: input.amount.amount,
              product_data: {
                name: input.description ?? `Order ${input.orderId}`,
              },
            },
          },
        ],
        success_url: input.successUrl,
        cancel_url: input.cancelUrl,
        metadata: {
          orderId: input.orderId,
          ...(input.metadata ?? {}),
        },
      },
      {
        idempotencyKey: `checkout_${input.orderId}`,
      },
    );

    return {
      paymentId: session.id,
      status: 'pending',
      provider: 'stripe',
      redirectUrl: session.url ?? undefined,
      clientSecret: undefined,
    };
  },

  async verifyPayment(input: VerifyPaymentInput): Promise<VerifyPaymentResult> {
    if (!isStripeConfigured()) {
      return { paymentId: input.paymentId, status: 'pending' };
    }
    const stripe = getStripe();
    const session = await stripe.checkout.sessions.retrieve(input.paymentId);
    const status =
      session.payment_status === 'paid'
        ? 'paid'
        : normalizePaymentStatus(session.status ?? 'pending');

    const metadataOrderId =
      typeof session.metadata?.orderId === 'string' ? session.metadata.orderId.trim() : '';
    const referenceOrderId =
      typeof session.client_reference_id === 'string' ? session.client_reference_id.trim() : '';

    return {
      paymentId: session.id,
      status,
      amount: session.amount_total
        ? {
            amount: session.amount_total,
            currency: (session.currency?.toUpperCase() ?? 'USD') as 'USD',
          }
        : undefined,
      providerReference: typeof session.payment_intent === 'string'
        ? session.payment_intent
        : session.payment_intent?.id,
      orderId: metadataOrderId || referenceOrderId || undefined,
    };
  },

  async cancelPayment(input: CancelPaymentInput) {
    if (!isStripeConfigured()) {
      return { status: 'cancelled' as const, paymentId: input.paymentId };
    }
    const stripe = getStripe();
    try {
      await stripe.checkout.sessions.expire(input.paymentId);
    } catch {
      // Session may already be complete/expired — treat as cancelled for UX.
    }
    return { status: 'cancelled' as const, paymentId: input.paymentId };
  },

  async webhookHandler(rawBody: string, headers: Record<string, string>): Promise<WebhookEvent> {
    if (!isStripeConfigured()) {
      throw new Error('Stripe webhook secret is not configured.');
    }
    const stripe = getStripe();
    const secret = process.env.STRIPE_WEBHOOK_SECRET!.trim();
    const signature =
      headers['stripe-signature'] || headers['Stripe-Signature'] || '';
    if (!signature) {
      throw new Error('Missing Stripe-Signature header.');
    }

    const event = stripe.webhooks.constructEvent(rawBody, signature, secret);
    let paymentId: string | undefined;
    let status: WebhookEvent['status'];

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      paymentId = session.id;
      status = session.payment_status === 'paid' ? 'paid' : 'processing';
    } else if (event.type === 'checkout.session.expired') {
      const session = event.data.object as Stripe.Checkout.Session;
      paymentId = session.id;
      status = 'cancelled';
    } else if (event.type === 'payment_intent.payment_failed') {
      const intent = event.data.object as Stripe.PaymentIntent;
      paymentId = intent.id;
      status = 'failed';
    }

    return {
      provider: 'stripe',
      eventType: event.type,
      paymentId,
      status,
      raw: { id: event.id, type: event.type },
      receivedAt: new Date().toISOString(),
    };
  },
};

export function getStripeEventId(raw: unknown): string | undefined {
  if (raw && typeof raw === 'object' && 'id' in raw && typeof (raw as { id: unknown }).id === 'string') {
    return (raw as { id: string }).id;
  }
  return undefined;
}
