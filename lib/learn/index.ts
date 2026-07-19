/**
 * Learn Center lib barrel — Document 15.01.
 */

export {
  toPublicLearnArticle,
  toPublicLearnCategory,
  listPublicLearnCategories,
  listPublicLearnArticles,
  listFeaturedPublicLearnArticles,
  listPublicLearnArticlesByCategory,
  getPublicLearnArticleBySlug,
  getPublicLearnCategoryBySlug,
  resolveLearnSegment,
  getRelatedPublicArticles,
} from '@/lib/learn/getters';

export { estimateReadingTimeMinutes } from '@/lib/learn/reading-time';

export {
  getLearnIndexMetadata,
  getLearnCategoryMetadata,
  getLearnArticlePageMetadata,
  getLearnHubCanonical,
} from '@/lib/learn/seo';

export {
  getLearnIndexBreadcrumbs,
  getLearnCategoryBreadcrumbs,
  getLearnArticleBreadcrumbs,
  getLearnRelatedServicesForArticle,
  getLearnRelatedArticlesForArticle,
} from '@/lib/learn/linking';

export { learnArticleJsonLd } from '@/lib/learn/schema';

export {
  getCategories,
  getCategoryBySlug,
  getTags,
  getTagBySlug,
  getArticlesByCategory,
  getArticlesByTag,
  validateCategory,
  validateTag,
  detectDuplicateCategories,
  detectDuplicateTags,
  validateLearnTaxonomy,
  getCategoryMetadata,
  getTagMetadata,
  getCategoryPageJsonLd,
  getCategoryRelatedServices,
  getPopularTags,
  getRelatedCategories,
} from '@/lib/learn/taxonomy';

export {
  buildArticleSearchIndex,
  searchArticles,
  filterArticles,
  sortArticles,
  parseLearnSearchParams,
  serializeLearnSearchParams,
  validateLearnFilters,
  getActiveFilterCount,
  clearLearnFilters,
  rankSearchResults,
  paginateArticles,
  sanitizeSearchQuery,
  runLearnSearch,
  getLearnDiscoveryCanonicalPath,
  getLearnDiscoveryRobots,
  buildLearnDiscoveryMetadata,
} from '@/lib/learn/search';

export {
  buildArticleMetadata,
  buildArticleCanonical,
  buildArticleOpenGraph,
  buildArticleTwitter,
  buildArticleSchema,
  buildArticleAuthorSchema,
  buildArticleBreadcrumbSchema,
  buildArticleFaqSchema,
  validateArticleSeo,
  validateArticleSchema,
  validateArticleCanonical,
  getIndexableArticles,
  findDuplicateArticleMetadata,
  findArticleKeywordConflicts,
  findOrphanArticles,
  buildArticleSeoEditorialReport,
  buildArticlePageJsonLd,
} from '@/lib/learn/article-seo';

export {
  isPublicLiveArticle,
  isPublicLiveArticleStatus,
  getEditorialStatus,
  getPublishingChecklist,
  validateArticleForPublishing,
  validatePublishingState,
  publishArticle,
  scheduleArticle,
  activateScheduledArticles,
  updatePublishedArticle,
  archiveArticle,
  stripEditorialFields,
  assertPublicArticleAccess,
  buildPublishingEffects,
  getEditorialRobots,
  canTransitionEditorialStatus,
  getWorkflowTimeline,
} from '@/lib/learn/editorial';

export {
  runArticleQA,
  generateQAReport,
  qaStatusLabel,
  validateContent,
  validateSEO,
  validateAccessibility,
  validateLinks,
  validateImages,
  validateGrammar,
  validateReadability,
  validateMobile,
} from '@/lib/learn/qa';

export {
  getPublishedArticleBySlug,
  getDraftArticleBySlug,
  calculateReadingTime,
  createHeadingId,
  generateTableOfContents,
  validateHeadingHierarchy,
  sanitizeArticleContent,
  withHeadingAnchors,
  getArticleMetadata,
  getDraftArticleMetadata,
  getArticleSchema,
  getArticleRelatedLinks,
  validateArticleLinks,
  validateArticleDates,
  validateArticleImages,
  isArticlePubliclyRenderable,
  canAccessArticlePreview,
  prepareArticleForRender,
} from '@/lib/learn/article';
