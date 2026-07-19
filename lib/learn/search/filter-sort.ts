/**
 * Filter & sort article search documents — Document 15.05.
 */

import type {
  ArticleSearchDocument,
  LearnReadingTimeFilter,
  LearnSearchFilters,
  LearnSortOption,
} from '@/types/learn-search';

function matchesReadingTime(
  minutes: number,
  filter: LearnReadingTimeFilter,
): boolean {
  switch (filter) {
    case 'under-5':
      return minutes < 5;
    case '5-10':
      return minutes >= 5 && minutes <= 10;
    case '10-15':
      return minutes > 10 && minutes <= 15;
    case 'over-15':
      return minutes > 15;
    default:
      return true;
  }
}

export function filterArticles(
  documents: readonly ArticleSearchDocument[],
  filters: LearnSearchFilters,
): ArticleSearchDocument[] {
  return documents.filter((document) => {
    if (filters.category && document.categorySlug !== filters.category) {
      return false;
    }
    if (filters.tag && !document.tags.includes(filters.tag)) {
      return false;
    }
    if (filters.platform && document.platform !== filters.platform) {
      return false;
    }
    if (
      filters.readingTime &&
      !matchesReadingTime(document.readingTime, filters.readingTime)
    ) {
      return false;
    }
    if (filters.featured === true && !document.featured) {
      return false;
    }
    return true;
  });
}

function byIdThenTitle(a: ArticleSearchDocument, b: ArticleSearchDocument) {
  const titleCmp = a.title.localeCompare(b.title);
  if (titleCmp !== 0) return titleCmp;
  return a.id.localeCompare(b.id);
}

export function sortArticles(
  documents: readonly ArticleSearchDocument[],
  sort: LearnSortOption,
  options?: { hasQuery?: boolean },
): ArticleSearchDocument[] {
  const items = [...documents];

  switch (sort) {
    case 'relevance':
      // Relevance order is preserved from rankSearchResults when a query exists.
      // Without a query, fall back to newest.
      if (options?.hasQuery) return items;
      return items.sort((a, b) => {
        const diff =
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        if (diff !== 0) return diff;
        return byIdThenTitle(a, b);
      });
    case 'newest':
      return items.sort((a, b) => {
        const diff =
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        if (diff !== 0) return diff;
        return byIdThenTitle(a, b);
      });
    case 'oldest':
      return items.sort((a, b) => {
        const diff =
          new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        if (diff !== 0) return diff;
        return byIdThenTitle(a, b);
      });
    case 'updated':
      return items.sort((a, b) => {
        const diff =
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        if (diff !== 0) return diff;
        return byIdThenTitle(a, b);
      });
    case 'shortest':
      return items.sort((a, b) => {
        if (a.readingTime !== b.readingTime) {
          return a.readingTime - b.readingTime;
        }
        return byIdThenTitle(a, b);
      });
    case 'longest':
      return items.sort((a, b) => {
        if (a.readingTime !== b.readingTime) {
          return b.readingTime - a.readingTime;
        }
        return byIdThenTitle(a, b);
      });
    default:
      return items.sort(byIdThenTitle);
  }
}
