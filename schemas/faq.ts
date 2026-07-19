import type { FaqItem } from '@/types/components';
import type { PublicFaq } from '@/types/faq';
import type { JsonLd } from '@/schemas/organization';
import { buildFaqPageSchemaFromVisible } from '@/lib/faqs/schema';

/**
 * Legacy FAQPage schema helper.
 * Prefer buildFaqPageSchemaFromVisible() with the exact visible PublicFaq set.
 */
export function faqPageSchema(items: FaqItem[]): JsonLd | null {
  if (!items.length) return null;

  const asPublic: PublicFaq[] = items.map((item) => ({
    id: item.id,
    category: 'general',
    question: item.question,
    answer: item.answer,
    keywords: [],
    serviceSlugs: [],
    pageLocations: [],
    relatedLinks: [],
    order: 0,
    featured: false,
    schemaEligible: true,
  }));

  return buildFaqPageSchemaFromVisible(asPublic);
}
