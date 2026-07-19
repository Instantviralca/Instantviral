/**
 * Typed CTA analytics — Document 14.06.
 * No vendor integration unless already configured.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const ctaAnalyticsEvents = {
  cta_view: 'cta_view',
  cta_click: 'cta_click',
  cross_sell_click: 'cross_sell_click',
  support_cta_click: 'support_cta_click',
  checkout_cta_click: 'checkout_cta_click',
} as const;

export type CtaAnalyticsEvent =
  (typeof ctaAnalyticsEvents)[keyof typeof ctaAnalyticsEvents];

export type CtaAnalyticsPayload = {
  ctaId?: string;
  href?: string;
  label?: string;
  variant?: string;
  surface?: string;
  serviceSlug?: string;
};

export function trackCtaEvent(
  event: CtaAnalyticsEvent,
  payload?: CtaAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}

export function resolveCtaClickEvent(
  variant: string,
  surface?: string,
): CtaAnalyticsEvent {
  if (variant === 'cross_sell') return ctaAnalyticsEvents.cross_sell_click;
  if (surface === 'checkout' || variant === 'checkout') {
    return ctaAnalyticsEvents.checkout_cta_click;
  }
  if (
    surface === 'support' ||
    surface === 'faq' ||
    surface === 'contact' ||
    surface === 'track_order'
  ) {
    return ctaAnalyticsEvents.support_cta_click;
  }
  return ctaAnalyticsEvents.cta_click;
}
