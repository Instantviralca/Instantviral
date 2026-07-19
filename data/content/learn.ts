/**
 * Learn article presentation content — Document 15.01 / content architecture.
 * Empty until real articles are approved. Do not add placeholder shells.
 */

import type { LearnArticleContent } from '@/types/content';

/** Shared Learn content map — keyed by article slug. */
export const learnContent: Record<string, LearnArticleContent> = {};

export function getAllLearnContent(): LearnArticleContent[] {
  return Object.values(learnContent);
}

export function getLearnContentBySlug(slug: string): LearnArticleContent | undefined {
  return learnContent[slug];
}
