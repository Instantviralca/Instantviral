/**
 * Typed Learn content analytics events — Document 16.10.
 * Thin bridge into recordContentEvent + provider trackEvent.
 */

import { recordContentEvent } from '@/lib/content-analytics/core';
import type { ContentAnalyticsEvent } from '@/types/content-analytics';

export const contentAnalyticsEvents = {
  content_article_view: 'content_article_view',
  content_engaged_session: 'content_engaged_session',
  content_scroll_depth: 'content_scroll_depth',
  content_cta_click: 'content_cta_click',
  content_related_article_click: 'content_related_article_click',
  content_faq_interaction: 'content_faq_interaction',
  content_internal_search: 'content_internal_search',
  content_organic_landing: 'content_organic_landing',
  content_conversion_assist: 'content_conversion_assist',
  content_social_share: 'content_social_share',
} as const;

export type ContentAnalyticsEventName =
  (typeof contentAnalyticsEvents)[keyof typeof contentAnalyticsEvents];

export type ContentEventPayload = Omit<ContentAnalyticsEvent, 'eventName'>;

export function trackContentAnalyticsEvent(
  eventName: ContentAnalyticsEventName,
  payload: ContentEventPayload,
) {
  return recordContentEvent({
    eventName,
    ...payload,
  });
}
