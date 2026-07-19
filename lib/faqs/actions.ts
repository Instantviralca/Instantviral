/**
 * Prepared admin FAQ actions — Document 14.04.
 * Pure transforms only; no backend CRUD.
 */

import type { FaqModerationActionId, FaqRecord, FaqRelatedLink } from '@/types/faq';
import type { FAQCategoryId, FaqPageLocation, FaqStatus } from '@/types/faq';
import type { PlatformId } from '@/types/platform';

export const FAQ_MODERATION_ACTIONS: readonly FaqModerationActionId[] = [
  'create',
  'edit',
  'approve',
  'hide',
  'archive',
  'assign_category',
  'assign_platform',
  'assign_service',
  'assign_page_location',
  'reorder',
  'feature',
  'toggle_schema_eligible',
  'add_related_links',
] as const;

function stamp(faq: FaqRecord): FaqRecord {
  return {
    ...faq,
    updatedAt: new Date().toISOString(),
  };
}

export function approveFaq(faq: FaqRecord): FaqRecord {
  return stamp({ ...faq, status: 'approved' satisfies FaqStatus });
}

export function hideFaq(faq: FaqRecord): FaqRecord {
  return stamp({ ...faq, status: 'hidden' });
}

export function archiveFaq(faq: FaqRecord): FaqRecord {
  return stamp({ ...faq, status: 'archived' });
}

export function assignFaqCategory(faq: FaqRecord, category: FAQCategoryId): FaqRecord {
  return stamp({ ...faq, category });
}

export function assignFaqPlatform(
  faq: FaqRecord,
  platform: PlatformId | undefined,
): FaqRecord {
  return stamp({ ...faq, platform });
}

export function assignFaqServices(faq: FaqRecord, serviceSlugs: string[]): FaqRecord {
  return stamp({ ...faq, serviceSlugs: [...serviceSlugs] });
}

export function assignFaqPageLocations(
  faq: FaqRecord,
  pageLocations: FaqPageLocation[],
): FaqRecord {
  return stamp({ ...faq, pageLocations: [...pageLocations] });
}

export function reorderFaq(faq: FaqRecord, order: number): FaqRecord {
  return stamp({ ...faq, order });
}

export function setFaqFeatured(faq: FaqRecord, featured: boolean): FaqRecord {
  return stamp({ ...faq, featured });
}

export function toggleFaqSchemaEligible(faq: FaqRecord): FaqRecord {
  return stamp({ ...faq, schemaEligible: !faq.schemaEligible });
}

export function addFaqRelatedLinks(
  faq: FaqRecord,
  links: FaqRelatedLink[],
): FaqRecord {
  const existingIds = new Set(faq.relatedLinks.map((link) => link.id));
  const merged = [
    ...faq.relatedLinks,
    ...links.filter((link) => !existingIds.has(link.id)),
  ];
  return stamp({ ...faq, relatedLinks: merged });
}

export function applyFaqEdit(
  faq: FaqRecord,
  patch: Partial<
    Pick<
      FaqRecord,
      | 'question'
      | 'answer'
      | 'shortAnswer'
      | 'keywords'
      | 'category'
      | 'platform'
      | 'serviceSlugs'
      | 'pageLocations'
      | 'relatedLinks'
      | 'order'
      | 'featured'
      | 'schemaEligible'
      | 'status'
    >
  >,
): FaqRecord {
  return stamp({ ...faq, ...patch });
}
