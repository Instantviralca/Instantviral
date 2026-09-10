/**
 * Checkout capture helpers — validate + persist active checkout tracking.
 */

import type { AppliedCoupon, CartItem } from '@/types/cart';
import type { CustomerInformation } from '@/types/checkout';
import type { CurrencyCode } from '@/types/pricing';
import { recordServerAnalyticsEvent } from '@/lib/analytics/server-track';
import {
  isAbandonedCartDbAvailable,
  upsertActiveCheckout,
} from '@/lib/abandoned-cart/repository';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isTrackableEmail(email: string): boolean {
  return EMAIL_RE.test(email.trim());
}

export type TrackCheckoutPayload = {
  checkoutSessionId: string;
  customer: CustomerInformation;
  items: CartItem[];
  coupon?: AppliedCoupon | null;
  currency?: CurrencyCode;
  totals?: {
    subtotal: { amount: number; currency: CurrencyCode };
    discount: { amount: number; currency: CurrencyCode };
    total: { amount: number; currency: CurrencyCode };
  };
};

export async function captureCheckoutActivity(payload: TrackCheckoutPayload): Promise<{
  ok: boolean;
  skipped?: boolean;
  reason?: string;
  cartId?: string;
}> {
  if (!isAbandonedCartDbAvailable()) {
    return { ok: true, skipped: true, reason: 'database_unavailable' };
  }

  const email = payload.customer?.email?.trim() ?? '';
  if (!isTrackableEmail(email)) {
    return { ok: false, reason: 'invalid_email' };
  }

  if (!payload.checkoutSessionId?.trim()) {
    return { ok: false, reason: 'missing_session' };
  }

  if (!Array.isArray(payload.items) || payload.items.length === 0) {
    return { ok: false, reason: 'empty_cart' };
  }

  // Strip anything that must never be persisted.
  const safeItems = payload.items.map((item) => ({
    id: item.id,
    packageId: item.packageId,
    serviceId: item.serviceId,
    serviceSlug: item.serviceSlug,
    serviceName: item.serviceName,
    platformId: item.platformId,
    packageTitle: item.packageTitle,
    quantity: item.quantity,
    quantityLabel: item.quantityLabel,
    unitPrice: item.unitPrice,
    currency: item.currency,
    deliveryTime: item.deliveryTime,
    configuration: item.configuration,
    addedAt: item.addedAt,
  }));

  const currency =
    payload.totals?.total.currency ??
    payload.currency ??
    safeItems[0]?.currency ??
    'USD';

  const subtotalAmount =
    payload.totals?.subtotal.amount ??
    safeItems.reduce((sum, item) => sum + item.unitPrice, 0);
  const discountAmount = payload.totals?.discount.amount ?? 0;
  const totalAmount = payload.totals?.total.amount ?? Math.max(0, subtotalAmount - discountAmount);

  const name = [payload.customer.firstName, payload.customer.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();

  const { cart } = await upsertActiveCheckout({
    checkoutSessionId: payload.checkoutSessionId.trim(),
    email,
    customerName: name || null,
    currency,
    subtotalAmount,
    discountAmount,
    totalAmount,
    snapshot: {
      items: safeItems,
      coupon: payload.coupon ?? null,
      customer: {
        email,
        firstName: payload.customer.firstName,
        lastName: payload.customer.lastName,
        marketingOptIn: Boolean(payload.customer.marketingOptIn),
      },
      currency,
    },
  });

  await recordServerAnalyticsEvent({
    eventName: 'cart_tracking_started',
    eventId: `cart_tracking_${cart.id}`,
    pagePath: '/checkout',
    metadata: {
      cartId: cart.id,
      packageId: cart.packageId,
      platformId: cart.platformId,
    },
  });

  return { ok: true, cartId: cart.id };
}
