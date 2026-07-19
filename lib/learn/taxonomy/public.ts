/**
 * Category & tag public projections — Document 15.04.
 */

import { categoryPath, tagPath } from '@/lib/learn/taxonomy/paths';
import type { LearnCategory, LearnTag, PublicLearnCategory, PublicLearnTag } from '@/types/learn';

export function toPublicCategory(
  category: LearnCategory,
  articleCount: number,
): PublicLearnCategory {
  return {
    id: category.id,
    slug: category.slug,
    name: category.name,
    description: category.description,
    seo: category.seo,
    featuredImage: category.featuredImage,
    icon: category.icon,
    featured: category.featured,
    active: true,
    createdAt: category.createdAt,
    updatedAt: category.updatedAt,
    platformId: category.platformId,
    order: category.order,
    articleCount,
    href: categoryPath(category.slug),
  };
}

export function toPublicTag(tag: LearnTag, articleCount: number): PublicLearnTag {
  return {
    id: tag.id,
    slug: tag.slug,
    name: tag.name,
    description: tag.description,
    active: true,
    articleCount,
    href: tagPath(tag.slug),
  };
}
