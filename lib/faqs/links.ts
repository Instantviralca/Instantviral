/**
 * FAQ related-link validation — Document 14.04.
 */

import { isAllowedFaqInternalHref } from '@/data/faqs/related-links';
import type { FaqLinkValidationResult, FaqRecord, PublicFaq } from '@/types/faq';

type LinkBearer = Pick<FaqRecord | PublicFaq, 'id' | 'relatedLinks'>;

export function validateFaqLinks(faqs: LinkBearer[]): FaqLinkValidationResult[] {
  const results: FaqLinkValidationResult[] = [];

  for (const faq of faqs) {
    for (const link of faq.relatedLinks) {
      const href = link.href.trim();
      if (!href) {
        results.push({
          faqId: faq.id,
          linkId: link.id,
          href,
          valid: false,
          reason: 'Empty href',
        });
        continue;
      }

      if (href.startsWith('http://') || href.startsWith('https://')) {
        results.push({
          faqId: faq.id,
          linkId: link.id,
          href,
          valid: false,
          reason: 'External URLs are not allowed in FAQ related links',
        });
        continue;
      }

      const valid = isAllowedFaqInternalHref(href);
      results.push({
        faqId: faq.id,
        linkId: link.id,
        href,
        valid,
        reason: valid ? undefined : 'Unknown or disallowed internal path',
      });
    }
  }

  return results;
}

export function getInvalidFaqLinks(faqs: LinkBearer[]): FaqLinkValidationResult[] {
  return validateFaqLinks(faqs).filter((result) => !result.valid);
}
