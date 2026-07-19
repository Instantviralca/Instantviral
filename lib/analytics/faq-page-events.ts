/**
 * Typed FAQ page analytics (Document 13.03 / 14.09).
 * Search queries are never sent — only length and result count.
 */

import { emitLegacyAnalyticsEvent } from '@/lib/analytics/core/bridge';
import { trackEvent } from '@/lib/analytics/core/track';

export const faqPageAnalyticsEvents = {
  faq_page_view: 'faq_page_view',
  faq_search: 'faq_search',
  faq_category_select: 'faq_category_select',
  faq_question_open: 'faq_question_open',
  faq_track_order_click: 'faq_track_order_click',
  faq_contact_support_click: 'faq_contact_support_click',
} as const;

export type FaqPageAnalyticsEvent =
  (typeof faqPageAnalyticsEvents)[keyof typeof faqPageAnalyticsEvents];

export type FaqPageAnalyticsPayload = {
  href?: string;
  /** Raw query — never forwarded. */
  query?: string;
  categoryId?: string;
  faqId?: string;
  resultCount?: number;
  cta?: 'primary' | 'secondary';
};

export function trackFaqPageEvent(
  event: FaqPageAnalyticsEvent,
  payload?: FaqPageAnalyticsPayload,
): void {
  if (event === faqPageAnalyticsEvents.faq_search) {
    trackEvent({
      eventName: event,
      metadata: {
        queryLength: payload?.query?.length ?? 0,
        resultCount: payload?.resultCount ?? 0,
        categoryId: payload?.categoryId,
        faqId: payload?.faqId,
      },
    });
    return;
  }

  emitLegacyAnalyticsEvent(event, {
    href: payload?.href,
    faqId: payload?.faqId,
    cta: payload?.cta,
    label: payload?.categoryId,
  });
}
