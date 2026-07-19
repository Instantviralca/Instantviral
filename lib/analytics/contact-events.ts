/**
 * Typed Contact page analytics (Document 13.02).
 * No vendor integration — wire trackContactEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const contactAnalyticsEvents = {
  contact_page_view: 'contact_page_view',
  contact_form_submit: 'contact_form_submit',
  contact_track_order_click: 'contact_track_order_click',
} as const;

export type ContactAnalyticsEvent =
  (typeof contactAnalyticsEvents)[keyof typeof contactAnalyticsEvents];

export type ContactAnalyticsPayload = {
  href?: string;
  cta?: 'primary' | 'secondary';
  location?: 'hero' | 'final' | 'form';
  hasOrderId?: boolean;
};

/**
 * No-op tracker until an analytics vendor is configured.
 * Safe to call from client event handlers.
 */
export function trackContactEvent(
  event: ContactAnalyticsEvent,
  payload?: ContactAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
