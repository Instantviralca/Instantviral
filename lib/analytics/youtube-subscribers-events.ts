/**
 * Typed YouTube Subscribers service analytics (Document 09.41).
 * No vendor integration — wire trackYouTubeSubscribersEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const youtubeSubscribersAnalyticsEvents = {
  youtube_subscribers_view_packages: 'youtube_subscribers_view_packages',
  youtube_subscribers_package_impression: 'youtube_subscribers_package_impression',
  youtube_subscribers_package_select: 'youtube_subscribers_package_select',
  youtube_subscribers_url_submit: 'youtube_subscribers_url_submit',
  youtube_subscribers_checkout_start: 'youtube_subscribers_checkout_start',
  youtube_subscribers_related_service_click: 'youtube_subscribers_related_service_click',
  youtube_subscribers_faq_open: 'youtube_subscribers_faq_open',
  youtube_subscribers_track_order_click: 'youtube_subscribers_track_order_click',
} as const;

export type YouTubeSubscribersAnalyticsEvent =
  (typeof youtubeSubscribersAnalyticsEvents)[keyof typeof youtubeSubscribersAnalyticsEvents];

export type YouTubeSubscribersAnalyticsPayload = {
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
export function trackYouTubeSubscribersEvent(
  event: YouTubeSubscribersAnalyticsEvent,
  payload?: YouTubeSubscribersAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
