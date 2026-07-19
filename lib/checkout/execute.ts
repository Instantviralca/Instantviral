/**
 * Checkout orchestration — validate → persist pending order → Stripe session / mock.
 */

import {
  allowMockPayments,
  getSiteUrl,
  isProductionRuntime,
  isStripeConfigured,
} from '@/lib/config/env';
import { getCheckoutUrl, getSiteUrlPath } from '@/lib/config/hosts';
import { placeOrder, type PlaceOrderInput } from '@/lib/orders/create';
import { saveOrder } from '@/lib/orders/store';
import { paymentGatewayManager } from '@/lib/payments/manager';
import type { Order } from '@/types/order';
import type { PaymentProviderId } from '@/types/payment';

export type PlaceOrderResult = {
  ok: true;
  orderId: string;
  email: string;
  status: Order['status'];
  paymentStatus: string;
  redirectUrl?: string;
  paymentConfigured: boolean;
  mode: 'stripe' | 'mock' | 'disabled';
  message?: string;
};

export type PlaceOrderFailure = {
  ok: false;
  error: string;
  code?: 'payments_disabled' | 'validation' | 'provider_error';
};

export async function executeCheckout(
  input: PlaceOrderInput,
): Promise<PlaceOrderResult | PlaceOrderFailure> {
  try {
    if (input.paymentMethodId !== 'stripe') {
      return {
        ok: false,
        error: 'Only Stripe is supported for live checkout at this time.',
        code: 'validation',
      };
    }

    const stripeReady = isStripeConfigured();
    const mockOk = allowMockPayments();

    if (!stripeReady && !mockOk) {
      return {
        ok: false,
        error: isProductionRuntime()
          ? 'Payments are not configured. Checkout is unavailable.'
          : 'Stripe is not configured. Set Stripe keys, or IV_PAYMENTS_MODE=mock for local testing.',
        code: 'payments_disabled',
      };
    }

    const order = await placeOrder(input);
    const siteUrl = getSiteUrl();
    const successUrl = getSiteUrlPath(
      `/order-success?orderId=${encodeURIComponent(order.id)}&email=${encodeURIComponent(order.guestEmail)}&session_id={CHECKOUT_SESSION_ID}`,
    );
    const cancelUrl = `${getCheckoutUrl('/')}?cancelled=1&orderId=${encodeURIComponent(order.id)}`;

    if (stripeReady) {
      const payment = await paymentGatewayManager.createPayment('stripe', {
        orderId: order.id,
        amount: order.total,
        customerEmail: order.guestEmail,
        description: `InstantViral order ${order.id}`,
        metadata: { orderId: order.id },
        successUrl,
        cancelUrl,
      });

      const updated: Order = {
        ...order,
        payment: {
          provider: 'stripe' as PaymentProviderId,
          paymentId: payment.paymentId,
          status: payment.status,
          amount: order.total,
        },
        updatedAt: new Date().toISOString(),
      };
      await saveOrder(updated);

      return {
        ok: true,
        orderId: updated.id,
        email: updated.guestEmail,
        status: updated.status,
        paymentStatus: updated.payment?.status ?? 'pending',
        redirectUrl: payment.redirectUrl,
        paymentConfigured: true,
        mode: 'stripe',
      };
    }

    // Dev mock: mark paid immediately so fulfilment queue can be exercised locally.
    const now = new Date().toISOString();
    const mockPaid: Order = {
      ...order,
      payment: {
        provider: 'stripe',
        paymentId: `mock_${order.id}`,
        status: 'paid',
        amount: order.total,
        paidAt: now,
      },
      timeline: [
        ...order.timeline,
        {
          id: `evt_${order.id}_mock_paid`,
          orderId: order.id,
          type: 'payment_confirmed',
          message: 'Mock payment confirmed (IV_PAYMENTS_MODE=mock).',
          publicMessage: 'Payment confirmed.',
          updatedBy: { type: 'system', id: 'mock-payments' },
          at: now,
        },
      ],
      updatedAt: now,
    };
    await saveOrder(mockPaid);

    return {
      ok: true,
      orderId: mockPaid.id,
      email: mockPaid.guestEmail,
      status: mockPaid.status,
      paymentStatus: 'paid',
      redirectUrl: `${siteUrl}/order-success?orderId=${encodeURIComponent(mockPaid.id)}&email=${encodeURIComponent(mockPaid.guestEmail)}&verified=1`,
      paymentConfigured: false,
      mode: 'mock',
      message: 'Mock payment accepted for local development only.',
    };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unable to place order.',
      code: 'validation',
    };
  }
}
