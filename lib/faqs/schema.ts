/**
 * FAQPage JSON-LD from the exact visible FAQ set — Document 14.04.
 * Generate server-side where possible. No schema-only copy.
 */

import { getSchemaEligibleFaqs } from '@/lib/faqs/getters';
import type { PublicFaq } from '@/types/faq';
import type { JsonLd } from '@/schemas/organization';

export type FaqSchemaItem = {
  id: string;
  question: string;
  answer: string;
};

/** Strip `[label](/path)` markdown so FAQPage schema uses plain readable text. */
export function stripMarkdownLinksForSchema(answer: string): string {
  return answer.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '$1');
}

/**
 * Build FAQPage schema from FAQs that are both visible on the page and schema-eligible.
 */
export function buildFaqPageSchemaFromVisible(
  visibleFaqs: PublicFaq[],
): JsonLd | null {
  const eligible = getSchemaEligibleFaqs(visibleFaqs);
  if (eligible.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: eligible.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: stripMarkdownLinksForSchema(faq.answer),
      },
    })),
  };
}

/** Map public FAQs to the legacy schema helper shape. */
export function toFaqSchemaItems(visibleFaqs: PublicFaq[]): FaqSchemaItem[] {
  return getSchemaEligibleFaqs(visibleFaqs).map((faq) => ({
    id: faq.id,
    question: faq.question,
    answer: stripMarkdownLinksForSchema(faq.answer),
  }));
}
