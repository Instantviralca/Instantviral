/**
 * Content Design System helpers — Document 16.00.
 */

import {
  CONTENT_ARTICLE_STRUCTURE,
  CONTENT_CALLOUT_TYPES,
  CONTENT_DESIGN_CTA_RULES,
  CONTENT_DESIGN_FAQ_RULES,
  CONTENT_DESIGN_IMAGE_RULES,
  CONTENT_DESIGN_LINK_RULES,
  CONTENT_TONE_RULES,
} from '@/types/content-design-system';

export function getContentDesignSystemSummary() {
  return {
    tone: [...CONTENT_TONE_RULES],
    structure: CONTENT_ARTICLE_STRUCTURE.map((s) => s.label),
    callouts: CONTENT_CALLOUT_TYPES.map((c) => c.label),
    cta: CONTENT_DESIGN_CTA_RULES,
    links: CONTENT_DESIGN_LINK_RULES,
    faq: CONTENT_DESIGN_FAQ_RULES,
    images: CONTENT_DESIGN_IMAGE_RULES,
  };
}

export function isValidCalloutType(value: string): boolean {
  return CONTENT_CALLOUT_TYPES.some((c) => c.id === value);
}

export function validateHeadingHierarchyLevels(
  levels: number[],
): { ok: boolean; message?: string } {
  if (levels.filter((l) => l === 1).length !== 1) {
    return { ok: false, message: 'Exactly one H1 is required.' };
  }
  let previous = 0;
  for (const level of levels) {
    if (level < 1 || level > 3) {
      return { ok: false, message: 'Only H1–H3 are used in Learn articles.' };
    }
    if (previous > 0 && level > previous + 1) {
      return { ok: false, message: 'Heading levels must not skip.' };
    }
    previous = level;
  }
  return { ok: true };
}
