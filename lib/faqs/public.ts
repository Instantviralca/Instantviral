/**
 * Public FAQ projection — Document 14.04.
 * Strips moderation notes and non-public fields.
 */

import { enrichPublicFaq } from '@/lib/faqs/enrich';
import { sanitizeFaqText } from '@/lib/faqs/sanitize';
import { isPubliclyRenderableFaq } from '@/lib/faqs/status';
import type { FaqRecord, PublicFaq } from '@/types/faq';

export function sanitizeFaqForPublic(faq: FaqRecord): PublicFaq | null {
  if (!isPubliclyRenderableFaq(faq)) return null;

  const base: PublicFaq = {
    id: faq.id,
    category: faq.category,
    question: sanitizeFaqText(faq.question),
    answer: sanitizeFaqText(faq.answer),
    shortAnswer: faq.shortAnswer ? sanitizeFaqText(faq.shortAnswer) : undefined,
    keywords: faq.keywords.map((keyword) => sanitizeFaqText(keyword)).filter(Boolean),
    platform: faq.platform,
    serviceSlugs: [...faq.serviceSlugs],
    pageLocations: [...faq.pageLocations],
    relatedLinks: faq.relatedLinks.map((link) => ({
      id: link.id,
      label: sanitizeFaqText(link.label),
      href: link.href.trim(),
    })),
    order: faq.order,
    featured: faq.featured,
    schemaEligible: faq.schemaEligible,
  };

  return enrichPublicFaq(base);
}

export function sanitizeFaqsForPublic(faqs: FaqRecord[]): PublicFaq[] {
  return faqs
    .map(sanitizeFaqForPublic)
    .filter((faq): faq is PublicFaq => faq !== null);
}
