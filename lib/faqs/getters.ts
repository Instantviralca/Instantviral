/**
 * FAQ getters — Document 14.04.
 */

import { getAllFaqRecords, getFaqRecordById } from '@/data/faqs';
import { sanitizeFaqForPublic, sanitizeFaqsForPublic } from '@/lib/faqs/public';
import { sortFaqs } from '@/lib/faqs/sort';
import { isApprovedFaq } from '@/lib/faqs/status';
import type {
  FAQCategoryId,
  FaqPageLocation,
  FaqRecord,
  PublicFaq,
} from '@/types/faq';
import type { PlatformId } from '@/types/platform';

function approvedRecords(source?: FaqRecord[]): FaqRecord[] {
  return (source ?? getAllFaqRecords()).filter(isApprovedFaq);
}

/** Approved FAQs only, sorted, public projection. */
export function getApprovedFaqs(source?: FaqRecord[]): PublicFaq[] {
  return sortFaqs(sanitizeFaqsForPublic(approvedRecords(source)));
}

/** Approved featured FAQs (homepage mix). */
export function getFeaturedFaqs(options?: {
  source?: FaqRecord[];
  min?: number;
  max?: number;
}): PublicFaq[] {
  const min = options?.min ?? 6;
  const max = options?.max ?? 8;
  const featured = sortFaqs(
    sanitizeFaqsForPublic(
      approvedRecords(options?.source).filter((faq) => faq.featured),
    ),
  );

  if (featured.length >= min) {
    return featured.slice(0, Math.min(max, featured.length));
  }

  // Fill from homepage page location if fewer than min featured
  const homepage = getFaqsByPageLocation('homepage', options?.source);
  const byId = new Map(featured.map((faq) => [faq.id, faq]));
  for (const faq of homepage) {
    if (byId.size >= min) break;
    if (!byId.has(faq.id)) byId.set(faq.id, faq);
  }

  return Array.from(byId.values()).slice(0, Math.min(max, Math.max(min, byId.size)));
}

export function getFaqsByCategory(
  category: FAQCategoryId,
  source?: FaqRecord[],
): PublicFaq[] {
  return sortFaqs(
    sanitizeFaqsForPublic(
      approvedRecords(source).filter((faq) => faq.category === category),
    ),
  );
}

export function getFaqsByPlatform(
  platform: PlatformId,
  source?: FaqRecord[],
): PublicFaq[] {
  return sortFaqs(
    sanitizeFaqsForPublic(
      approvedRecords(source).filter((faq) => faq.platform === platform),
    ),
  );
}

export function getFaqsByService(
  serviceSlug: string,
  source?: FaqRecord[],
): PublicFaq[] {
  return sortFaqs(
    sanitizeFaqsForPublic(
      approvedRecords(source).filter((faq) => faq.serviceSlugs.includes(serviceSlug)),
    ),
  );
}

export function getFaqsByPageLocation(
  location: FaqPageLocation,
  source?: FaqRecord[],
): PublicFaq[] {
  return sortFaqs(
    sanitizeFaqsForPublic(
      approvedRecords(source).filter((faq) => faq.pageLocations.includes(location)),
    ),
  );
}

/**
 * Schema-eligible FAQs from an already-visible public set.
 * Only Approved + schemaEligible + present in `visibleFaqs`.
 */
export function getSchemaEligibleFaqs(visibleFaqs: PublicFaq[]): PublicFaq[] {
  return visibleFaqs.filter((faq) => faq.schemaEligible);
}

export function getFaqById(id: string, source?: FaqRecord[]): PublicFaq | null {
  const record = source
    ? source.find((faq) => faq.id === id)
    : getFaqRecordById(id);
  if (!record) return null;
  return sanitizeFaqForPublic(record);
}
