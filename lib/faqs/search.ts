/**
 * FAQ search — Document 14.04.
 */

import { FAQ_CATEGORY_LABELS } from '@/data/faqs/categories';
import { getServiceBySlug } from '@/data/services';
import type { PublicFaq } from '@/types/faq';

export function normalizeFaqSearchQuery(query: string): string {
  return query.trim().toLowerCase().replace(/\s+/g, ' ');
}

function faqSearchHaystack(faq: PublicFaq): string {
  const categoryLabel = FAQ_CATEGORY_LABELS[faq.category] ?? faq.category;
  const serviceNames = faq.serviceSlugs
    .map((slug) => getServiceBySlug(slug)?.name ?? slug)
    .join(' ');

  return [
    faq.question,
    faq.answer,
    faq.shortAnswer ?? '',
    categoryLabel,
    faq.platform ?? '',
    serviceNames,
    ...faq.keywords,
  ]
    .join(' ')
    .toLowerCase();
}

/**
 * Case-insensitive, trimmed FAQ search across question, answer, short answer,
 * keywords, category, platform, and service name.
 */
export function searchFaqs(faqs: PublicFaq[], query: string): PublicFaq[] {
  const normalized = normalizeFaqSearchQuery(query);
  if (!normalized) return faqs;

  return faqs.filter((faq) => faqSearchHaystack(faq).includes(normalized));
}
