/**
 * Typed TikTok Followers service analytics (Document 09.21 §22).
 * No vendor integration — wire data-analytics / trackTikTokFollowersEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const tiktokFollowersAnalyticsEvents = {
  tiktok_followers_view_packages: 'tiktok_followers_view_packages',
  tiktok_followers_package_impression: 'tiktok_followers_package_impression',
  tiktok_followers_package_select: 'tiktok_followers_package_select',
  tiktok_followers_username_submit: 'tiktok_followers_username_submit',
  tiktok_followers_checkout_start: 'tiktok_followers_checkout_start',
  tiktok_followers_related_service_click: 'tiktok_followers_related_service_click',
  tiktok_followers_faq_open: 'tiktok_followers_faq_open',
  tiktok_followers_track_order_click: 'tiktok_followers_track_order_click',
} as const;

export type TikTokFollowersAnalyticsEvent =
  (typeof tiktokFollowersAnalyticsEvents)[keyof typeof tiktokFollowersAnalyticsEvents];

export type TikTokFollowersAnalyticsPayload = {
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
export function trackTikTokFollowersEvent(
  event: TikTokFollowersAnalyticsEvent,
  payload?: TikTokFollowersAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
