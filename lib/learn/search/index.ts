/**
 * Learn Search & Filters public API — Document 15.05.
 */

export { buildArticleSearchIndex, toArticleSearchDocument } from '@/lib/learn/search/index-build';
export { searchArticles, rankSearchResults } from '@/lib/learn/search/rank';
export { filterArticles, sortArticles } from '@/lib/learn/search/filter-sort';
export {
  parseLearnSearchParams,
  serializeLearnSearchParams,
  validateLearnFilters,
  getActiveFilterCount,
  clearLearnFilters,
  buildActiveFilterChips,
  removeFilterFromState,
  filtersFromState,
} from '@/lib/learn/search/params';
export { paginateArticles } from '@/lib/learn/search/paginate';
export { sanitizeSearchQuery, normalizeSearchToken, tokenizeQuery } from '@/lib/learn/search/sanitize';
export { runLearnSearch } from '@/lib/learn/search/run';
export {
  isLearnSearchFiltered,
  getLearnDiscoveryCanonicalPath,
  getLearnDiscoveryRobots,
  buildLearnDiscoveryMetadata,
} from '@/lib/learn/search/seo';
