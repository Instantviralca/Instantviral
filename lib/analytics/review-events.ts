/**
 * Typed testimonials / reviews analytics — Document 14.02.
 * No vendor integration — wire trackReviewEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const reviewAnalyticsEvents = {
  testimonial_section_view: 'testimonial_section_view',
  testimonial_card_view: 'testimonial_card_view',
  testimonial_service_click: 'testimonial_service_click',
  review_source_click: 'review_source_click',
  review_expand: 'review_expand',
  review_admin_approve: 'review_admin_approve',
  review_admin_reject: 'review_admin_reject',
  review_admin_feature: 'review_admin_feature',
} as const;

export type ReviewAnalyticsEvent =
  (typeof reviewAnalyticsEvents)[keyof typeof reviewAnalyticsEvents];

export type ReviewAnalyticsPayload = {
  reviewId?: string;
  serviceSlug?: string;
  platform?: string;
  href?: string;
  surface?: string;
};

export function trackReviewEvent(
  event: ReviewAnalyticsEvent,
  payload?: ReviewAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
