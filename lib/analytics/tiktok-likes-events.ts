/**
 * Typed TikTok Likes service analytics (Document 09.22 §22).
 * No vendor integration — wire data-analytics / trackTikTokLikesEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const tiktokLikesAnalyticsEvents = {
  tiktok_likes_view_packages: 'tiktok_likes_view_packages',
  tiktok_likes_package_impression: 'tiktok_likes_package_impression',
  tiktok_likes_package_select: 'tiktok_likes_package_select',
  tiktok_likes_url_submit: 'tiktok_likes_url_submit',
  tiktok_likes_checkout_start: 'tiktok_likes_checkout_start',
  tiktok_likes_related_service_click: 'tiktok_likes_related_service_click',
  tiktok_likes_faq_open: 'tiktok_likes_faq_open',
  tiktok_likes_track_order_click: 'tiktok_likes_track_order_click',
} as const;

export type TikTokLikesAnalyticsEvent =
  (typeof tiktokLikesAnalyticsEvents)[keyof typeof tiktokLikesAnalyticsEvents];

export type TikTokLikesAnalyticsPayload = {
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
export function trackTikTokLikesEvent(
  event: TikTokLikesAnalyticsEvent,
  payload?: TikTokLikesAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
