/**
 * Typed Trust Center analytics (Document 14.01).
 * No vendor integration — wire trackTrustEvent when a provider exists.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const trustAnalyticsEvents = {
  trust_component_view: 'trust_component_view',
  trust_cta_click: 'trust_cta_click',
  refund_policy_click: 'refund_policy_click',
  support_click: 'support_click',
} as const;

export type TrustAnalyticsEvent =
  (typeof trustAnalyticsEvents)[keyof typeof trustAnalyticsEvents];

export type TrustAnalyticsPayload = {
  href?: string;
  cta?: 'primary' | 'secondary';
  location?: 'final' | 'refund' | 'support';
  surface?: string;
};

/**
 * No-op tracker until an analytics vendor is configured.
 * Safe to call from client event handlers.
 */
export function trackTrustEvent(
  event: TrustAnalyticsEvent,
  payload?: TrustAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
