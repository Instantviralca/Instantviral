/**
 * Mark orders paid after verified Stripe (or mock) payment.
 * Only paid orders enter the fulfilment queue.
 */

import { markAbandonedCartRecoveredFromOrder } from '@/lib/abandoned-cart';
import { recordServerAnalyticsEvent } from '@/lib/analytics/server-track';
import { getPersistence } from '@/lib/persistence';
import { getOrderById, getOrderByPaymentId, saveOrder } from '@/lib/orders/store';
import { notifyOrderPaid } from '@/lib/notifications/order-hooks';
import type { Order } from '@/types/order';
import type { PaymentStatus } from '@/types/payment';

export async function markOrderPaymentStatus(input: {
  paymentId: string;
  status: PaymentStatus;
  orderId?: string;
  providerReference?: string;
  amountMinor?: number;
}): Promise<{ order: Order | null; duplicate: boolean; applied: boolean }> {
  const existing =
    (input.orderId ? await getOrderById(input.orderId) : null) ??
    (await getOrderByPaymentId(input.paymentId));

  if (!existing) {
    return { order: null, duplicate: false, applied: false };
  }

  if (existing.payment?.status === 'paid' && input.status === 'paid') {
    try {
      await markAbandonedCartRecoveredFromOrder({
        orderId: existing.id,
        email: existing.guestEmail,
      });
    } catch {
      // best-effort on webhook retries
    }
    return { order: existing, duplicate: true, applied: false };
  }

  // Reject cross-order binding once a real Stripe session is attached.
  // Pending placeholder ids (`pending_*`) / mock ids may be replaced by the Checkout Session id.
  const storedPaymentId = existing.payment?.paymentId;
  const hasBoundCheckoutSession =
    typeof storedPaymentId === 'string' &&
    storedPaymentId.length > 0 &&
    !storedPaymentId.startsWith('pending_') &&
    !storedPaymentId.startsWith('mock_');
  if (
    input.status === 'paid' &&
    hasBoundCheckoutSession &&
    storedPaymentId !== input.paymentId
  ) {
    throw new Error('Payment session does not match this order.');
  }

  if (
    input.amountMinor !== undefined &&
    input.amountMinor !== existing.total.amount &&
    input.status === 'paid'
  ) {
    throw new Error('Paid amount does not match order total.');
  }

  const now = new Date().toISOString();
  const updated: Order = {
    ...existing,
    payment: {
      provider: existing.payment?.provider ?? 'mollie-remote',
      paymentId: input.paymentId,
      status: input.status,
      amount: existing.total,
      paidAt: input.status === 'paid' ? now : existing.payment?.paidAt,
    },
    timeline:
      input.status === 'paid' && existing.payment?.status !== 'paid'
        ? [
            ...existing.timeline,
            {
              id: `evt_${existing.id}_paid_${Date.now()}`,
              orderId: existing.id,
              type: 'payment_confirmed',
              message: 'Payment verified.',
              publicMessage: 'Payment confirmed. Your order is awaiting fulfilment.',
              updatedBy: { type: 'system', id: 'payments' },
              at: now,
            },
          ]
        : existing.timeline,
    updatedAt: now,
  };

  const saved = await saveOrder(updated);

  if (input.status === 'paid' && existing.payment?.status !== 'paid') {
    try {
      await notifyOrderPaid(saved);
    } catch (error) {
      console.error('[payments] notification failed', {
        orderId: saved.id,
        message: error instanceof Error ? error.message : 'unknown',
      });
    }

    try {
      const recovered = await markAbandonedCartRecoveredFromOrder({
        orderId: saved.id,
        email: saved.guestEmail,
      });
      if (recovered) {
        await recordServerAnalyticsEvent({
          eventName: 'cart_recovered',
          eventId: `cart_recovered_${recovered.id}`,
          pagePath: '/order-success',
          metadata: {
            orderId: saved.id,
            cartId: recovered.id,
            recoveryStep: recovered.recoveryClickSequence ?? recovered.lastRecoverySequence,
          },
        });
      }
    } catch (error) {
      console.error('[payments] abandoned-cart recovery update failed', {
        orderId: saved.id,
        message: error instanceof Error ? error.message : 'unknown',
      });
    }

    // Idempotent conversion events — event id is stable per order.
    const provider = saved.payment?.provider ?? 'unknown';
    const normalizedProvider = provider.startsWith('mollie')
      ? 'mollie'
      : provider.startsWith('stripe')
        ? 'stripe'
        : provider;
    await recordServerAnalyticsEvent({
      eventName: 'payment_completed',
      eventId: `payment_completed_${saved.id}`,
      pagePath: '/order-success',
      metadata: {
        orderId: saved.id,
        paymentProvider: normalizedProvider,
        paymentStatus: 'paid',
      },
    });
    await recordServerAnalyticsEvent({
      eventName: 'order_completed',
      eventId: `order_completed_${saved.id}`,
      pagePath: '/order-success',
      metadata: {
        orderId: saved.id,
        paymentProvider: normalizedProvider,
      },
    });
    await recordServerAnalyticsEvent({
      eventName: 'purchase',
      eventId: `purchase_${saved.id}`,
      pagePath: '/order-success',
      metadata: {
        orderId: saved.id,
        paymentProvider: normalizedProvider,
      },
    });
  }

  if (
    input.status !== 'paid' &&
    input.status !== existing.payment?.status &&
    (input.status === 'failed' || input.status === 'cancelled')
  ) {
    await recordServerAnalyticsEvent({
      eventName: 'payment_failed',
      eventId: `payment_${input.status}_${saved.id}`.slice(0, 80),
      pagePath: '/checkout',
      metadata: {
        orderId: saved.id,
        paymentStatus: input.status,
      },
    });
  }

  return { order: saved, duplicate: false, applied: true };
}

export async function isWebhookAlreadyProcessed(
  provider: string,
  eventId: string,
): Promise<boolean> {
  return getPersistence().hasProcessed(provider, eventId);
}

export async function recordWebhookProcessed(input: {
  provider: string;
  eventId: string;
  eventType: string;
  paymentId?: string;
}): Promise<void> {
  await getPersistence().markProcessed({
    id: `wh_${input.provider}_${input.eventId}`,
    provider: input.provider,
    eventId: input.eventId,
    eventType: input.eventType,
    paymentId: input.paymentId,
    processedAt: new Date().toISOString(),
  });
}

/** Fulfilment queue: paid + pending review (or later statuses). */
export function isEligibleForFulfilmentQueue(order: Order): boolean {
  return order.payment?.status === 'paid' && order.status !== 'cancelled';
}
