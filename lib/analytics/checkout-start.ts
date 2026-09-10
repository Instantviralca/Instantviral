/**
 * Shared checkout-start analytics — commerce funnel event `checkout_started`.
 * Service-page legacy names (e.g. ig_followers_checkout_start) alias here.
 *
 * Semantic: cart / order configuration is not checkout. Emit only when the
 * customer has entered /checkout with a non-empty, hydrated cart.
 */

import { trackEvent } from '@/lib/analytics/core/track';
import type { AnalyticsEventInput, AnalyticsTrackResult } from '@/types/analytics';
import type { CartItem } from '@/types/cart';

export const CHECKOUT_STARTED_EVENT = 'checkout_started' as const;

export type CheckoutStartCartSnapshot = {
  isHydrated: boolean;
  isBootstrapping?: boolean;
  items: ReadonlyArray<Pick<CartItem, 'id' | 'packageId' | 'serviceSlug'>>;
};

/** True when /checkout has a valid cart ready for checkout intent. */
export function canEmitCheckoutStarted(cart: CheckoutStartCartSnapshot): boolean {
  return Boolean(cart.isHydrated && !cart.isBootstrapping && cart.items.length > 0);
}

/** Stable signature for one logical checkout start (one event for multi-item carts). */
export function buildCheckoutStartedSignature(
  items: CheckoutStartCartSnapshot['items'],
): string {
  return items
    .map((item) => `${item.serviceSlug}:${item.packageId}`)
    .sort()
    .join('|');
}

export function buildCheckoutStartedInput(
  items?: CheckoutStartCartSnapshot['items'],
): AnalyticsEventInput {
  const signature = items?.length ? buildCheckoutStartedSignature(items) : undefined;
  return {
    eventName: CHECKOUT_STARTED_EVENT,
    pageType: 'checkout',
    pagePath: '/checkout',
    // Dedupes React Strict Mode remounts / rapid re-emits for the same cart.
    idempotencyKey: signature ? `checkout_started:${signature}` : undefined,
  };
}

type TrackFn = (input: AnalyticsEventInput) => AnalyticsTrackResult;

/**
 * Emit `checkout_started` once for the cart (not once per line item).
 * Payload matches the existing checkout analytics shape — no username/configuration.
 */
export function emitCheckoutStarted(
  cart: CheckoutStartCartSnapshot,
  track: TrackFn = trackEvent,
): AnalyticsTrackResult | null {
  if (!canEmitCheckoutStarted(cart)) return null;
  return track(buildCheckoutStartedInput(cart.items));
}
