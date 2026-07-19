/**
 * Typed TikTok Views service analytics (Document 09.23 §22).
 * No vendor integration — wire data-analytics / trackTikTokViewsEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const tiktokViewsAnalyticsEvents = {
  tiktok_views_view_packages: 'tiktok_views_view_packages',
  tiktok_views_package_impression: 'tiktok_views_package_impression',
  tiktok_views_package_select: 'tiktok_views_package_select',
  tiktok_views_url_submit: 'tiktok_views_url_submit',
  tiktok_views_checkout_start: 'tiktok_views_checkout_start',
  tiktok_views_related_service_click: 'tiktok_views_related_service_click',
  tiktok_views_faq_open: 'tiktok_views_faq_open',
  tiktok_views_track_order_click: 'tiktok_views_track_order_click',
} as const;

export type TikTokViewsAnalyticsEvent =
  (typeof tiktokViewsAnalyticsEvents)[keyof typeof tiktokViewsAnalyticsEvents];

export type TikTokViewsAnalyticsPayload = {
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
export function trackTikTokViewsEvent(
  event: TikTokViewsAnalyticsEvent,
  payload?: TikTokViewsAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
