/**
 * Typed About page analytics (Document 13.01).
 * No vendor integration — wire trackAboutEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const aboutAnalyticsEvents = {
  about_page_view: 'about_page_view',
  about_cta_click: 'about_cta_click',
} as const;

export type AboutAnalyticsEvent =
  (typeof aboutAnalyticsEvents)[keyof typeof aboutAnalyticsEvents];

export type AboutAnalyticsPayload = {
  href?: string;
  cta?: 'primary' | 'secondary';
  location?: 'hero' | 'final';
};

/**
 * No-op tracker until an analytics vendor is configured.
 * Safe to call from client event handlers.
 */
export function trackAboutEvent(
  event: AboutAnalyticsEvent,
  payload?: AboutAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
