/**
 * Typed internal-linking analytics — Document 14.05.
 * No vendor integration unless already configured.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
export const linkingAnalyticsEvents = {
  internal_link_click: 'internal_link_click',
  related_service_click: 'related_service_click',
  policy_link_click: 'policy_link_click',
  breadcrumb_click: 'breadcrumb_click',
} as const;

export type LinkingAnalyticsEvent =
  (typeof linkingAnalyticsEvents)[keyof typeof linkingAnalyticsEvents];

export type LinkingAnalyticsPayload = {
  href?: string;
  label?: string;
  slug?: string;
  sourceSlug?: string;
  surface?: string;
};

export function trackLinkingEvent(
  event: LinkingAnalyticsEvent,
  payload?: LinkingAnalyticsPayload,
): void {
  emitLegacyAnalyticsEvent(event, payload);
}
