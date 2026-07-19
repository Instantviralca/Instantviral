/**
 * Typed Facebook Post Likes service analytics (Document 09.33).
 * No vendor integration — wire trackFacebookPostLikesEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const facebookPostLikesAnalyticsEvents = {
  facebook_post_likes_view_packages: 'facebook_post_likes_view_packages',
  facebook_post_likes_package_impression: 'facebook_post_likes_package_impression',
  facebook_post_likes_package_select: 'facebook_post_likes_package_select',
  facebook_post_likes_url_submit: 'facebook_post_likes_url_submit',
  facebook_post_likes_checkout_start: 'facebook_post_likes_checkout_start',
  facebook_post_likes_related_service_click: 'facebook_post_likes_related_service_click',
  facebook_post_likes_faq_open: 'facebook_post_likes_faq_open',
  facebook_post_likes_track_order_click: 'facebook_post_likes_track_order_click',
} as const;

export type FacebookPostLikesAnalyticsEvent =
  (typeof facebookPostLikesAnalyticsEvents)[keyof typeof facebookPostLikesAnalyticsEvents];

export type FacebookPostLikesAnalyticsPayload = {
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
export function trackFacebookPostLikesEvent(
  event: FacebookPostLikesAnalyticsEvent,
  payload?: FacebookPostLikesAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
