/**
 * Learn Center getters & projections — Document 15.01 / 15.02.
 */

import { learnArticlePath } from '@/config/routes';
import {
  getActiveLearnCategories,
  getFeaturedLearnArticles,
  getLearnArticlesByCategory,
  getLearnCategoryById,
  getLearnCategoryBySlug,
  getPublishedLearnArticleBySlug,
  getPublishedLearnArticleRecords,
  isLearnCategorySlug,
} from '@/data/learn';
import { toPublicCategory } from '@/lib/learn/taxonomy/public';
import type {
  LearnSegmentResolution,
  PublicLearnArticle,
  PublicLearnCategory,
} from '@/types/learn';

export function toPublicLearnArticle(
  article: NonNullable<ReturnType<typeof getPublishedLearnArticleBySlug>>,
): PublicLearnArticle {
  const category = getLearnCategoryById(article.category);
  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    content: article.content,
    blocks: [...article.blocks],
    category: article.category,
    categoryName: category?.name ?? article.category,
    platformId: category?.platformId,
    tags: [...article.tags],
    authorId: article.authorId,
    featuredImage: article.featuredImage,
    readingTime: article.readingTime,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    showModifiedDate: article.showModifiedDate,
    seo: article.seo,
    relatedServices: [...article.relatedServices],
    relatedArticles: [...article.relatedArticles],
    featured: article.featured,
    href: learnArticlePath(article.slug),
    keyTakeaways: [...(article.keyTakeaways ?? [])],
    faqs: [...(article.faqs ?? [])],
    serviceCta: article.serviceCta,
    status: 'published',
  };
}

export function toPublicLearnCategory(
  category: NonNullable<ReturnType<typeof getLearnCategoryBySlug>>,
): PublicLearnCategory {
  return toPublicCategory(
    category,
    getLearnArticlesByCategory(category.id).length,
  );
}

export function listPublicLearnCategories(): PublicLearnCategory[] {
  return getActiveLearnCategories().map(toPublicLearnCategory);
}

export function listPublicLearnArticles(): PublicLearnArticle[] {
  return getPublishedLearnArticleRecords().map(toPublicLearnArticle);
}

export function listFeaturedPublicLearnArticles(): PublicLearnArticle[] {
  return getFeaturedLearnArticles().map(toPublicLearnArticle);
}

export function listPublicLearnArticlesByCategory(
  categorySlug: string,
): PublicLearnArticle[] {
  const category = getLearnCategoryBySlug(categorySlug);
  if (!category || !category.active) return [];
  return getLearnArticlesByCategory(category.id).map(toPublicLearnArticle);
}

export function getPublicLearnArticleBySlug(
  slug: string,
): PublicLearnArticle | undefined {
  const article = getPublishedLearnArticleBySlug(slug);
  return article ? toPublicLearnArticle(article) : undefined;
}

export function getPublicLearnCategoryBySlug(
  slug: string,
): PublicLearnCategory | undefined {
  const category = getLearnCategoryBySlug(slug);
  if (!category || !category.active) return undefined;
  return toPublicLearnCategory(category);
}

/**
 * Resolve `/learn/[slug]` as category or published article.
 * Category slugs and article slugs must remain disjoint.
 */
export function resolveLearnSegment(slug: string): LearnSegmentResolution {
  if (isLearnCategorySlug(slug)) {
    const category = getPublicLearnCategoryBySlug(slug);
    if (category) return { kind: 'category', category };
    return { kind: 'unknown', slug };
  }

  const article = getPublicLearnArticleBySlug(slug);
  if (article) return { kind: 'article', article };

  return { kind: 'unknown', slug };
}

export function getRelatedPublicArticles(
  article: PublicLearnArticle,
  limit = 6,
): PublicLearnArticle[] {
  const preferred = article.relatedArticles
    .map((relatedSlug) => getPublicLearnArticleBySlug(relatedSlug))
    .filter((item): item is PublicLearnArticle => Boolean(item))
    .filter((item) => item.slug !== article.slug);

  const merged: PublicLearnArticle[] = [];
  const seen = new Set<string>();

  const push = (item: PublicLearnArticle) => {
    if (item.slug === article.slug || seen.has(item.slug)) return;
    seen.add(item.slug);
    merged.push(item);
  };

  for (const item of preferred) {
    push(item);
    if (merged.length >= limit) return merged;
  }

  // Same category first
  const categorySlug = getLearnCategoryById(article.category)?.slug ?? '';
  for (const item of listPublicLearnArticlesByCategory(categorySlug)) {
    push(item);
    if (merged.length >= limit) return merged;
  }

  // Same platform (when category is not the platform category)
  const platformId =
    article.platformId ?? getLearnCategoryById(article.category)?.platformId;
  if (platformId) {
    for (const item of listPublicLearnArticles()) {
      const itemPlatform =
        item.platformId ?? getLearnCategoryById(item.category)?.platformId;
      if (itemPlatform === platformId) {
        push(item);
        if (merged.length >= limit) return merged;
      }
    }
  }

  // Guides, then social-media-marketing
  for (const fillCategory of ['guides', 'social-media-marketing'] as const) {
    for (const item of listPublicLearnArticlesByCategory(fillCategory)) {
      push(item);
      if (merged.length >= limit) return merged;
    }
  }

  return merged;
}
