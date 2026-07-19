/**
 * Typed Facebook Followers service analytics (Document 09.31).
 * No vendor integration — wire trackFacebookFollowersEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const facebookFollowersAnalyticsEvents = {
  facebook_followers_view_packages: 'facebook_followers_view_packages',
  facebook_followers_package_impression: 'facebook_followers_package_impression',
  facebook_followers_package_select: 'facebook_followers_package_select',
  facebook_followers_url_submit: 'facebook_followers_url_submit',
  facebook_followers_checkout_start: 'facebook_followers_checkout_start',
  facebook_followers_related_service_click: 'facebook_followers_related_service_click',
  facebook_followers_faq_open: 'facebook_followers_faq_open',
  facebook_followers_track_order_click: 'facebook_followers_track_order_click',
} as const;

export type FacebookFollowersAnalyticsEvent =
  (typeof facebookFollowersAnalyticsEvents)[keyof typeof facebookFollowersAnalyticsEvents];

export type FacebookFollowersAnalyticsPayload = {
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
export function trackFacebookFollowersEvent(
  event: FacebookFollowersAnalyticsEvent,
  payload?: FacebookFollowersAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
