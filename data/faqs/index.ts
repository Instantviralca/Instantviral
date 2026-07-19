/**
 * Shared FAQ catalogue — Document 14.04.
 * Source content remains in data/content/faq.ts; this layer normalizes to FaqRecord.
 */

import { faqItems } from '@/data/content/faq';
import { normalizeFaqItems } from '@/data/faqs/normalize';
import type { FaqRecord } from '@/types/faq';

export { FAQ_CATEGORIES, FAQ_CATEGORY_LABELS, getFaqCategoryMeta } from '@/data/faqs/categories';
export {
  HOMEPAGE_FEATURED_FAQ_IDS,
  normalizeFaqItem,
  normalizeFaqItems,
} from '@/data/faqs/normalize';
export {
  isAllowedFaqInternalHref,
  faqServiceHref,
  faqLearnHref,
} from '@/data/faqs/related-links';

/** Canonical FAQ records (status, featured, schemaEligible, assignments). */
export const faqCatalogue: FaqRecord[] = normalizeFaqItems(faqItems);

export function getAllFaqRecords(): FaqRecord[] {
  return faqCatalogue;
}

export function getFaqRecordById(id: string): FaqRecord | undefined {
  return faqCatalogue.find((faq) => faq.id === id);
}
