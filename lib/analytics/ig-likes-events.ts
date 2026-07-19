/**
 * Typed Instagram Likes service analytics (Document 09.12 §22).
 * No vendor integration — wire data-analytics / trackIgLikesEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const igLikesAnalyticsEvents = {
  ig_likes_view_packages: 'ig_likes_view_packages',
  ig_likes_package_impression: 'ig_likes_package_impression',
  ig_likes_package_select: 'ig_likes_package_select',
  ig_likes_url_submit: 'ig_likes_url_submit',
  ig_likes_checkout_start: 'ig_likes_checkout_start',
  ig_likes_related_service_click: 'ig_likes_related_service_click',
  ig_likes_faq_open: 'ig_likes_faq_open',
  ig_likes_track_order_click: 'ig_likes_track_order_click',
} as const;

export type IgLikesAnalyticsEvent =
  (typeof igLikesAnalyticsEvents)[keyof typeof igLikesAnalyticsEvents];

export type IgLikesAnalyticsPayload = {
  href?: string;
  packageId?: string;
  serviceSlug?: string;
  faqId?: string;
  cta?: 'primary' | 'secondary';
};

/**
 * No-op tracker until an analytics vendor is configured.
 * Safe to call from client event handlers.
 */
export function trackIgLikesEvent(
  event: IgLikesAnalyticsEvent,
  payload?: IgLikesAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
