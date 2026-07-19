/**
 * Typed Instagram Comments service analytics (Document 09.14 §22).
 * No vendor integration — wire data-analytics / trackIgCommentsEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const igCommentsAnalyticsEvents = {
  ig_comments_view_packages: 'ig_comments_view_packages',
  ig_comments_package_impression: 'ig_comments_package_impression',
  ig_comments_package_select: 'ig_comments_package_select',
  ig_comments_url_submit: 'ig_comments_url_submit',
  ig_comments_custom_text_submit: 'ig_comments_custom_text_submit',
  ig_comments_checkout_start: 'ig_comments_checkout_start',
  ig_comments_related_service_click: 'ig_comments_related_service_click',
  ig_comments_faq_open: 'ig_comments_faq_open',
  ig_comments_track_order_click: 'ig_comments_track_order_click',
} as const;

export type IgCommentsAnalyticsEvent =
  (typeof igCommentsAnalyticsEvents)[keyof typeof igCommentsAnalyticsEvents];

export type IgCommentsAnalyticsPayload = {
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
export function trackIgCommentsEvent(
  event: IgCommentsAnalyticsEvent,
  payload?: IgCommentsAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
