/**
 * Typed Learn search analytics — Documents 15.05 + 14.09.
 * Never forwards raw search queries (privacy).
 */

import { trackEvent } from '@/lib/analytics/core/track';

export const learnSearchAnalyticsEvents = {
  learn_search_start: 'learn_search_start',
  learn_search_submit: 'learn_search_submit',
  learn_search_no_results: 'learn_search_no_results',
  learn_filter_open: 'learn_filter_open',
  learn_filter_apply: 'learn_filter_apply',
  learn_filter_remove: 'learn_filter_remove',
  learn_filters_clear: 'learn_filters_clear',
  learn_sort_change: 'learn_sort_change',
  learn_article_result_click: 'learn_article_result_click',
  learn_pagination_click: 'learn_pagination_click',
} as const;

export type LearnSearchAnalyticsEvent =
  (typeof learnSearchAnalyticsEvents)[keyof typeof learnSearchAnalyticsEvents];

export type LearnSearchAnalyticsPayload = {
  /** Raw query — never forwarded to providers. */
  query?: string;
  queryLength?: number;
  resultCount?: number;
  category?: string;
  tag?: string;
  platform?: string;
  readingTime?: string;
  featured?: boolean;
  sort?: string;
  filterField?: string;
  page?: number;
  articleSlug?: string;
  activeFilterCount?: number;
};

function privacySafeMetadata(payload?: LearnSearchAnalyticsPayload) {
  return {
    queryLength: payload?.queryLength ?? payload?.query?.length ?? 0,
    resultCount: payload?.resultCount,
    category: payload?.category,
    tag: payload?.tag,
    platform: payload?.platform,
    readingTime: payload?.readingTime,
    featured: payload?.featured,
    sort: payload?.sort,
    filterField: payload?.filterField,
    page: payload?.page,
    articleSlug: payload?.articleSlug,
    activeFilterCount: payload?.activeFilterCount,
  };
}

export function trackLearnSearchEvent(
  event: LearnSearchAnalyticsEvent,
  payload?: LearnSearchAnalyticsPayload,
): void {
  trackEvent({
    eventName: event,
    category: 'engagement',
    pageType: 'learn',
    metadata: privacySafeMetadata(payload),
  });
}
