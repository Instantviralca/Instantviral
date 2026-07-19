/**
 * Category internal linking — Documents 15.04 + 14.05.
 */

import {
  getCategoryBySlug,
  getRelatedCategories,
} from '@/lib/learn/taxonomy/getters';
import { getRelatedServices } from '@/lib/linking/related-services';
import type { PublicLearnCategory } from '@/types/learn';
import type { InternalLink } from '@/types/linking';

/**
 * Related services for a category via the Internal Linking Engine.
 * Uses the learn/{slug} registry page — never hardcodes service hrefs.
 */
export function getCategoryRelatedServices(
  categorySlug: string,
  limit = 4,
): InternalLink[] {
  const category = getCategoryBySlug(categorySlug);
  if (!category) return [];

  return getRelatedServices(`learn/${category.slug}`, { limit });
}

export function getCategoryRelatedCategoryLinks(
  categorySlug: string,
  limit = 4,
): PublicLearnCategory[] {
  return getRelatedCategories(categorySlug, limit);
}
