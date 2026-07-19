/**
 * Admin FAQ moderation helpers — Document 14.04.
 * Architecture only; no backend persistence.
 */

import type { AdminFaqFilters, AdminFaqRow } from '@/types/admin-faqs';
import type { FaqRecord } from '@/types/faq';
import { FAQ_STATUS_LABELS } from '@/lib/faqs/status';
import { normalizeFaqSearchQuery } from '@/lib/faqs/search';
import { sortFaqs } from '@/lib/faqs/sort';

export function statusLabel(status: FaqRecord['status']): string {
  return FAQ_STATUS_LABELS[status];
}

export function toAdminFaqRow(faq: FaqRecord): AdminFaqRow {
  return {
    id: faq.id,
    question: faq.question,
    category: faq.category,
    status: faq.status,
    featured: faq.featured,
    schemaEligible: faq.schemaEligible,
    platform: faq.platform,
    serviceCount: faq.serviceSlugs.length,
    updatedAt: faq.updatedAt,
  };
}

export function filterAdminFaqs(
  faqs: FaqRecord[],
  filters: AdminFaqFilters,
): FaqRecord[] {
  const query = normalizeFaqSearchQuery(filters.query ?? '');

  let result = faqs.filter((faq) => {
    if (filters.status && filters.status !== 'all' && faq.status !== filters.status) {
      return false;
    }
    if (
      filters.category &&
      filters.category !== 'all' &&
      faq.category !== filters.category
    ) {
      return false;
    }
    if (
      filters.platform &&
      filters.platform !== 'all' &&
      faq.platform !== filters.platform
    ) {
      return false;
    }
    if (filters.featured === true && !faq.featured) return false;
    if (filters.featured === false && faq.featured) return false;
    if (filters.schemaEligible === true && !faq.schemaEligible) return false;
    if (filters.schemaEligible === false && faq.schemaEligible) return false;
    if (
      filters.pageLocation &&
      filters.pageLocation !== 'all' &&
      !faq.pageLocations.includes(filters.pageLocation)
    ) {
      return false;
    }
    if (query) {
      const haystack = [
        faq.question,
        faq.answer,
        faq.shortAnswer ?? '',
        ...faq.keywords,
        faq.category,
        faq.platform ?? '',
        ...faq.serviceSlugs,
      ]
        .join(' ')
        .toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  switch (filters.sort) {
    case 'newest':
      result = [...result].sort((a, b) => b.updatedAt.localeCompare(a.updatedAt));
      break;
    case 'oldest':
      result = [...result].sort((a, b) => a.updatedAt.localeCompare(b.updatedAt));
      break;
    case 'question':
      result = [...result].sort((a, b) => a.question.localeCompare(b.question));
      break;
    case 'order':
    default:
      result = sortFaqs(result);
      break;
  }

  return result;
}
