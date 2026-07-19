/**
 * Author getters — Document 15.03.
 * Inactive authors never surface publicly.
 */

import { AUTHORS } from '@/data/authors';
import { LEARN_ARTICLES } from '@/data/learn/articles';
import {
  getLearnCategoryById,
  getLearnCategoryBySlug,
} from '@/data/learn/categories';
import { learnArticlePath } from '@/config/routes';
import { authorPath } from '@/lib/authors/paths';
import { toPublicAuthor } from '@/lib/authors/public';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';
import type { AuthorRecord, PublicAuthor } from '@/types/author';
import type {
  LearnArticleRecord,
  LearnCategory,
  PublicLearnArticle,
} from '@/types/learn';

function publishedArticlesForAuthor(authorId: string): LearnArticleRecord[] {
  return LEARN_ARTICLES.filter(
    (article) =>
      article.authorId === authorId && isPublicLiveArticle(article),
  );
}

function articleCountFor(authorId: string): number {
  return publishedArticlesForAuthor(authorId).length;
}

function projectActive(record: AuthorRecord): PublicAuthor {
  return toPublicAuthor(record, articleCountFor(record.id));
}

/** Local projection to avoid import cycles with lib/learn/getters. */
function toAuthorArticle(article: LearnArticleRecord): PublicLearnArticle {
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

/** Active author by slug — undefined when missing or inactive. */
export function getAuthorBySlug(slug: string): PublicAuthor | undefined {
  const record = AUTHORS.find((author) => author.slug === slug && author.active);
  return record ? projectActive(record) : undefined;
}

/** Active author by id — undefined when missing or inactive. */
export function getAuthorById(id: string): PublicAuthor | undefined {
  const record = AUTHORS.find((author) => author.id === id && author.active);
  return record ? projectActive(record) : undefined;
}

/** Raw registry lookup for validation/admin — includes inactive. Never use for public pages. */
export function getAuthorRecordById(id: string): AuthorRecord | undefined {
  return AUTHORS.find((author) => author.id === id);
}

export function getAuthorRecordBySlug(slug: string): AuthorRecord | undefined {
  return AUTHORS.find((author) => author.slug === slug);
}

export function getActiveAuthors(): PublicAuthor[] {
  return AUTHORS.filter((author) => author.active).map(projectActive);
}

export function getFeaturedAuthors(): PublicAuthor[] {
  return AUTHORS.filter((author) => author.active && author.featured).map(
    projectActive,
  );
}

/** Published articles only for an active author. */
export function getAuthorArticles(authorIdOrSlug: string): PublicLearnArticle[] {
  const author =
    getAuthorById(authorIdOrSlug) ?? getAuthorBySlug(authorIdOrSlug);
  if (!author) {
    return [];
  }

  return publishedArticlesForAuthor(author.id)
    .slice()
    .sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime(),
    )
    .map(toAuthorArticle);
}

/** Categories related via the author's published articles. */
export function getAuthorRelatedCategories(authorIdOrSlug: string): LearnCategory[] {
  const author =
    getAuthorById(authorIdOrSlug) ?? getAuthorBySlug(authorIdOrSlug);
  if (!author) {
    return [];
  }

  const seen = new Set<string>();
  const categories: LearnCategory[] = [];

  for (const article of publishedArticlesForAuthor(author.id)) {
    if (seen.has(article.category)) continue;
    seen.add(article.category);
    const category = getLearnCategoryById(article.category);
    if (category && category.active) {
      categories.push(category);
    }
  }

  return categories.sort((a, b) => a.order - b.order);
}

/**
 * Active authors who have published articles in a category.
 * Category → Author linking without hardcoded profiles.
 */
export function getAuthorsForCategory(categoryIdOrSlug: string): PublicAuthor[] {
  const category =
    getLearnCategoryById(categoryIdOrSlug) ??
    getLearnCategoryBySlug(categoryIdOrSlug);
  if (!category || !category.active) {
    return [];
  }

  const authorIds = new Set<string>();
  for (const article of LEARN_ARTICLES) {
    if (article.category === category.id && isPublicLiveArticle(article)) {
      authorIds.add(article.authorId);
    }
  }

  return [...authorIds]
    .map((id) => getAuthorById(id))
    .filter((author): author is PublicAuthor => Boolean(author));
}

export function getAuthorProfilePath(slug: string): string {
  return authorPath(slug);
}

export function getAllAuthorSlugsForStaticParams(): { slug: string }[] {
  return AUTHORS.filter((author) => author.active).map((author) => ({
    slug: author.slug,
  }));
}
