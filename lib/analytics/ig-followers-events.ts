/**
 * Typed Instagram Followers service analytics (Document 09.11 §22).
 * No vendor integration — wire data-analytics / trackIgFollowersEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const igFollowersAnalyticsEvents = {
  ig_followers_view_packages: 'ig_followers_view_packages',
  ig_followers_package_impression: 'ig_followers_package_impression',
  ig_followers_package_select: 'ig_followers_package_select',
  ig_followers_username_submit: 'ig_followers_username_submit',
  ig_followers_checkout_start: 'ig_followers_checkout_start',
  ig_followers_related_service_click: 'ig_followers_related_service_click',
  ig_followers_faq_open: 'ig_followers_faq_open',
  ig_followers_track_order_click: 'ig_followers_track_order_click',
} as const;

export type IgFollowersAnalyticsEvent =
  (typeof igFollowersAnalyticsEvents)[keyof typeof igFollowersAnalyticsEvents];

export type IgFollowersAnalyticsPayload = {
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
export function trackIgFollowersEvent(
  event: IgFollowersAnalyticsEvent,
  payload?: IgFollowersAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
