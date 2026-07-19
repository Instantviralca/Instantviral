/**
 * FAQ sort helpers — Document 14.04.
 */

import { FAQ_CATEGORIES } from '@/data/faqs/categories';
import type { FAQCategoryId, FaqRecord, PublicFaq } from '@/types/faq';

type SortableFaq = Pick<FaqRecord | PublicFaq, 'order' | 'category' | 'question' | 'id'>;

const categoryOrder = new Map(
  FAQ_CATEGORIES.map((category, index) => [category.id, index]),
);

export function sortFaqs<T extends SortableFaq>(faqs: T[]): T[] {
  return [...faqs].sort((a, b) => {
    const categoryA = categoryOrder.get(a.category as FAQCategoryId) ?? 999;
    const categoryB = categoryOrder.get(b.category as FAQCategoryId) ?? 999;
    if (categoryA !== categoryB) return categoryA - categoryB;
    if (a.order !== b.order) return a.order - b.order;
    const questionCompare = a.question.localeCompare(b.question);
    if (questionCompare !== 0) return questionCompare;
    return a.id.localeCompare(b.id);
  });
}
