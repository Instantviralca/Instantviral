/**
 * Typed homepage analytics events (Document 08.11 §19).
 * No vendor integration — wire `data-analytics` / trackHomepageEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const homepageAnalyticsEvents = {
  home_hero_get_started_click: 'home_hero_get_started_click',
  home_explore_services_click: 'home_explore_services_click',
  home_platform_click: 'home_platform_click',
  home_service_click: 'home_service_click',
  home_about_click: 'home_about_click',
  home_track_order_click: 'home_track_order_click',
  home_faq_open: 'home_faq_open',
  home_final_cta_click: 'home_final_cta_click',
} as const;

export type HomepageAnalyticsEvent =
  (typeof homepageAnalyticsEvents)[keyof typeof homepageAnalyticsEvents];

export type HomepageAnalyticsPayload = {
  href?: string;
  platformId?: string;
  serviceSlug?: string;
  faqId?: string;
  cta?: 'primary' | 'secondary';
};

/**
 * No-op tracker until an analytics vendor is configured.
 * Safe to call from client event handlers.
 */
export function trackHomepageEvent(
  event: HomepageAnalyticsEvent,
  payload?: HomepageAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
