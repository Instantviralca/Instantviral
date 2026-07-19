/**
 * Pagination for Learn search results — Document 15.05.
 */

import { LEARN_SEARCH_PAGE_SIZE } from '@/config/learn-search';
import type {
  ArticleSearchDocument,
  LearnSearchResultPage,
} from '@/types/learn-search';

export function paginateArticles(
  documents: readonly ArticleSearchDocument[],
  page = 1,
  pageSize = LEARN_SEARCH_PAGE_SIZE,
): LearnSearchResultPage {
  const safePageSize = Math.max(1, pageSize);
  const total = documents.length;
  const totalPages = Math.max(1, Math.ceil(total / safePageSize) || 1);
  const safePage = Math.min(Math.max(1, page), totalPages);
  const start = (safePage - 1) * safePageSize;
  const items = documents.slice(start, start + safePageSize);

  // Deduplicate by id while preserving order
  const seen = new Set<string>();
  const uniqueItems = items.filter((item) => {
    if (seen.has(item.id)) return false;
    seen.add(item.id);
    return true;
  });

  return {
    items: uniqueItems,
    total,
    page: safePage,
    pageSize: safePageSize,
    totalPages,
    hasNextPage: safePage < totalPages,
    hasPreviousPage: safePage > 1,
  };
}
