/**
 * Build lightweight article search index — Document 15.05.
 * Published metadata only — never includes full bodies or private fields.
 */

import { getAuthorById } from '@/lib/authors';
import { getCategoryById } from '@/lib/learn/taxonomy';
import type { PublicLearnArticle } from '@/types/learn';
import type {
  ArticleSearchDocument,
  LearnSearchPlatform,
} from '@/types/learn-search';

function resolvePlatform(
  categoryId: PublicLearnArticle['category'],
): LearnSearchPlatform {
  const category = getCategoryById(categoryId);
  return category?.platformId ?? 'general';
}

/**
 * Build a searchable document from a published public article.
 * Callers must pass published-only articles.
 */
export function toArticleSearchDocument(
  article: PublicLearnArticle,
): ArticleSearchDocument {
  const author = getAuthorById(article.authorId);
  const category = getCategoryById(article.category);

  return {
    id: article.id,
    slug: article.slug,
    title: article.title,
    excerpt: article.excerpt,
    categoryId: article.category,
    categorySlug: category?.slug ?? article.category,
    categoryName: article.categoryName,
    tags: [...article.tags],
    platform: resolvePlatform(article.category),
    authorName: author?.name ?? '',
    keywords: [...(article.seo.keywords ?? [])],
    summary: article.excerpt,
    readingTime: article.readingTime,
    publishedAt: article.publishedAt,
    updatedAt: article.updatedAt,
    featured: article.featured,
    href: article.href,
  };
}

export function buildArticleSearchIndex(
  articles: readonly PublicLearnArticle[],
): ArticleSearchDocument[] {
  return articles
    .filter((article) => article.status === 'published')
    .map(toArticleSearchDocument);
}
