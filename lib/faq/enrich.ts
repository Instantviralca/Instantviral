/**
 * Legacy FAQ enrich path — re-exports the shared FAQ enricher.
 */

import { enrichFaqAnswer } from '@/lib/faqs/enrich';
import type { FAQItem } from '@/types/content';

export function enrichFaqItemAnswer(item: FAQItem): FAQItem {
  return {
    ...item,
    answer: enrichFaqAnswer(item.answer, item.id),
  };
}

export function enrichFaqItems(items: FAQItem[]): FAQItem[] {
  return items.map(enrichFaqItemAnswer);
}
