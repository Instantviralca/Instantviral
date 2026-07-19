/**
 * Legacy FAQ search for FAQItem — wraps shared search helpers.
 */

import { FAQ_CATEGORY_LABELS } from '@/data/faqs/categories';
import { normalizeFaqSearchQuery, searchFaqs } from '@/lib/faqs/search';
import type { FAQItem } from '@/types/content';
import type { FAQCategoryId, PublicFaq } from '@/types/faq';

export { normalizeFaqSearchQuery };

function toPublicShape(item: FAQItem): PublicFaq {
  return {
    id: item.id,
    category: (item.category ?? 'general') as FAQCategoryId,
    question: item.question,
    answer: item.answer,
    keywords: item.keywords ?? [],
    serviceSlugs: item.relatedServiceSlugs ?? [],
    pageLocations: [],
    relatedLinks: [],
    order: item.order ?? 0,
    featured: false,
    schemaEligible: true,
  };
}

/**
 * Client-side FAQ search across question, answer, category label, and keywords.
 */
export function filterFaqsBySearch(
  items: FAQItem[],
  query: string,
  _categoryLabels?: Partial<Record<FAQCategoryId, string>>,
): FAQItem[] {
  void _categoryLabels;
  void FAQ_CATEGORY_LABELS;
  const matched = new Set(searchFaqs(items.map(toPublicShape), query).map((faq) => faq.id));
  return items.filter((item) => matched.has(item.id));
}
