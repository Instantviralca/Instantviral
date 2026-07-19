/**
 * Typed YouTube Views service analytics (Document 09.42).
 * No vendor integration — wire trackYouTubeViewsEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const youtubeViewsAnalyticsEvents = {
  youtube_views_view_packages: 'youtube_views_view_packages',
  youtube_views_package_impression: 'youtube_views_package_impression',
  youtube_views_package_select: 'youtube_views_package_select',
  youtube_views_url_submit: 'youtube_views_url_submit',
  youtube_views_checkout_start: 'youtube_views_checkout_start',
  youtube_views_related_service_click: 'youtube_views_related_service_click',
  youtube_views_faq_open: 'youtube_views_faq_open',
  youtube_views_track_order_click: 'youtube_views_track_order_click',
} as const;

export type YouTubeViewsAnalyticsEvent =
  (typeof youtubeViewsAnalyticsEvents)[keyof typeof youtubeViewsAnalyticsEvents];

export type YouTubeViewsAnalyticsPayload = {
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
export function trackYouTubeViewsEvent(
  event: YouTubeViewsAnalyticsEvent,
  payload?: YouTubeViewsAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
