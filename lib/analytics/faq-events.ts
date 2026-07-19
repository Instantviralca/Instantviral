/**
 * Typed FAQ analytics events — Document 14.04 / 14.09.
 * Never send raw search text — only length, result count, and category.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
import { trackEvent } from '@/lib/analytics/core/track';

export const faqAnalyticsEvents = {
  faq_section_view: 'faq_section_view',
  faq_question_open: 'faq_question_open',
  faq_search: 'faq_search',
  faq_search_no_results: 'faq_search_no_results',
  faq_category_select: 'faq_category_select',
  faq_related_link_click: 'faq_related_link_click',
  faq_support_click: 'faq_support_click',
  faq_admin_approve: 'faq_admin_approve',
  faq_admin_hide: 'faq_admin_hide',
  faq_admin_duplicate_warning: 'faq_admin_duplicate_warning',
} as const;

export type FaqAnalyticsEvent =
  (typeof faqAnalyticsEvents)[keyof typeof faqAnalyticsEvents];

export type FaqAnalyticsPayload = {
  faqId?: string;
  /** Raw query — never forwarded to analytics providers. */
  query?: string;
  categoryId?: string;
  resultCount?: number;
  href?: string;
  linkId?: string;
  surface?: string;
  warningKind?: string;
};

/**
 * FAQ tracker with search privacy rules — Document 14.09.
 */
export function trackFaqEvent(
  event: FaqAnalyticsEvent,
  payload?: FaqAnalyticsPayload,
): void {
  const isSearch =
    event === faqAnalyticsEvents.faq_search ||
    event === faqAnalyticsEvents.faq_search_no_results;

  if (isSearch) {
    trackEvent({
      eventName: event,
      metadata: {
        queryLength: payload?.query?.length ?? 0,
        resultCount: payload?.resultCount ?? 0,
        categoryId: payload?.categoryId,
        faqId: payload?.faqId,
        surface: payload?.surface,
      },
    });
    return;
  }

  const isAdmin = event.startsWith('faq_admin_');
  if (isAdmin) {
    trackEvent({
      eventName: event,
      channel: 'admin',
      consentCategory: 'essential',
      metadata: {
        faqId: payload?.faqId,
        warningKind: payload?.warningKind,
        surface: payload?.surface,
      },
    });
    return;
  }

  emitLegacyAnalyticsEvent(event, {
    href: payload?.href,
    faqId: payload?.faqId,
    label: payload?.categoryId ?? payload?.linkId,
    serviceSlug: undefined,
  });
}
