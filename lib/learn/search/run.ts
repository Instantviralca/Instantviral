/**
 * Compose Learn search pipeline — Document 15.05.
 */

import { filterArticles, sortArticles } from '@/lib/learn/search/filter-sort';
import { paginateArticles } from '@/lib/learn/search/paginate';
import { filtersFromState } from '@/lib/learn/search/params';
import { searchArticles } from '@/lib/learn/search/rank';
import { sanitizeSearchQuery } from '@/lib/learn/search/sanitize';
import type {
  ArticleSearchDocument,
  LearnSearchResultPage,
  LearnSearchState,
} from '@/types/learn-search';

export function runLearnSearch(
  documents: readonly ArticleSearchDocument[],
  state: LearnSearchState,
  pageSize?: number,
): LearnSearchResultPage {
  const query = sanitizeSearchQuery(state.q);
  const searched = searchArticles(documents, query);
  const filtered = filterArticles(searched, filtersFromState(state));
  const sorted = sortArticles(filtered, state.sort, {
    hasQuery: Boolean(query),
  });
  return paginateArticles(sorted, state.page, pageSize);
}
