/**
 * Typed Instagram Views service analytics (Document 09.13 §22).
 * No vendor integration — wire data-analytics / trackIgViewsEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const igViewsAnalyticsEvents = {
  ig_views_view_packages: 'ig_views_view_packages',
  ig_views_package_impression: 'ig_views_package_impression',
  ig_views_package_select: 'ig_views_package_select',
  ig_views_url_submit: 'ig_views_url_submit',
  ig_views_checkout_start: 'ig_views_checkout_start',
  ig_views_related_service_click: 'ig_views_related_service_click',
  ig_views_faq_open: 'ig_views_faq_open',
  ig_views_track_order_click: 'ig_views_track_order_click',
} as const;

export type IgViewsAnalyticsEvent =
  (typeof igViewsAnalyticsEvents)[keyof typeof igViewsAnalyticsEvents];

export type IgViewsAnalyticsPayload = {
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
export function trackIgViewsEvent(
  event: IgViewsAnalyticsEvent,
  payload?: IgViewsAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
