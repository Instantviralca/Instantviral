/**
 * Internal-link plan registry — Document 16.01.
 */

import { PLANNED_ARTICLES } from '@/data/content-plan/articles';
import type { ContentInternalLinkPlan } from '@/types/content-plan';

export type InternalLinkPlanEntry = {
  slug: string;
  plan: ContentInternalLinkPlan;
};

export const INTERNAL_LINK_PLANS: readonly InternalLinkPlanEntry[] =
  PLANNED_ARTICLES.map((article) => ({
    slug: article.slug,
    plan: article.internalLinkPlan,
  }));

export function getInternalLinkPlan(
  slug: string,
): ContentInternalLinkPlan | undefined {
  return INTERNAL_LINK_PLANS.find((entry) => entry.slug === slug)?.plan;
}
