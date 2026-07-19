/**
 * Learn Center data barrel — Document 15.01.
 * Includes legacy helpers for SEO/linking compatibility.
 */

export {
  LEARN_CATEGORIES,
  getLearnCategoryBySlug,
  getLearnCategoryById,
  getActiveLearnCategories,
  getLearnCategorySlugs,
  isLearnCategorySlug,
} from '@/data/learn/categories';

export {
  LEARN_TAGS,
  getLearnTagBySlug,
  getLearnTagById,
  getActiveLearnTags,
  getLearnTagSlugs,
  isLearnTagSlug,
} from '@/data/learn/tags';

export {
  LEARN_AUTHORS,
  getLearnAuthorById,
  getActiveLearnAuthors,
} from '@/data/learn/authors';

export {
  LEARN_ARTICLES,
  getAllLearnArticleRecords,
  getPublishedLearnArticleRecords,
  getLearnArticleRecordBySlug,
  getPublishedLearnArticleBySlug,
  getDraftLearnArticleBySlug,
  getFeaturedLearnArticles,
  getLearnArticlesByCategory,
  getPublishedLearnArticleSlugs,
} from '@/data/learn/articles';

import { getPublishedLearnArticleRecords } from '@/data/learn/articles';
import { getLearnCategoryById } from '@/data/learn/categories';
import type { LegacyLearnArticle } from '@/types/learn';

/**
 * Legacy article list for older SEO/linking call sites.
 * Empty until published articles exist — no placeholders.
 */
export const learnArticles: LegacyLearnArticle[] = [];

export function getAllLearnArticles(): LegacyLearnArticle[] {
  return getPublishedLearnArticleRecords().map((article) => {
    const category = getLearnCategoryById(article.category);
    return {
      slug: article.slug,
      title: article.title,
      platformId: category?.platformId,
      relatedServiceSlugs: [...article.relatedServices],
    };
  });
}

export function getLearnArticleBySlug(slug: string): LegacyLearnArticle | undefined {
  return getAllLearnArticles().find((article) => article.slug === slug);
}

export function getLearnSlugs(): string[] {
  return getAllLearnArticles().map((article) => article.slug);
}
