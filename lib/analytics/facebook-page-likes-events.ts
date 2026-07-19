/**
 * Typed Facebook Page Likes service analytics (Document 09.32).
 * No vendor integration — wire trackFacebookPageLikesEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const facebookPageLikesAnalyticsEvents = {
  facebook_page_likes_view_packages: 'facebook_page_likes_view_packages',
  facebook_page_likes_package_impression: 'facebook_page_likes_package_impression',
  facebook_page_likes_package_select: 'facebook_page_likes_package_select',
  facebook_page_likes_url_submit: 'facebook_page_likes_url_submit',
  facebook_page_likes_checkout_start: 'facebook_page_likes_checkout_start',
  facebook_page_likes_related_service_click: 'facebook_page_likes_related_service_click',
  facebook_page_likes_faq_open: 'facebook_page_likes_faq_open',
  facebook_page_likes_track_order_click: 'facebook_page_likes_track_order_click',
} as const;

export type FacebookPageLikesAnalyticsEvent =
  (typeof facebookPageLikesAnalyticsEvents)[keyof typeof facebookPageLikesAnalyticsEvents];

export type FacebookPageLikesAnalyticsPayload = {
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
export function trackFacebookPageLikesEvent(
  event: FacebookPageLikesAnalyticsEvent,
  payload?: FacebookPageLikesAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
