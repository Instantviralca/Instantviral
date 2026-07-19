/**
 * Internal Linking Engine — Document 14.05.
 */

export {
  getRelatedServices,
  getRelatedServiceEntities,
  getHomepageRelatedServices,
  filterApprovedServiceSlugs,
  getAllApprovedServiceLinks,
} from '@/lib/linking/related-services';

export { getRelatedPolicies } from '@/lib/linking/related-policies';
export { getRelatedArticles } from '@/lib/linking/related-articles';
export { buildBreadcrumb } from '@/lib/linking/breadcrumbs';
export {
  getRecommendedAnchors,
  isGenericAnchor,
  GENERIC_ANCHORS,
  policyAnchorLabel,
} from '@/lib/linking/anchors';
export { validateInternalLinks } from '@/lib/linking/validate';
export { findBrokenLinks, findUnknownRoutes } from '@/lib/linking/broken';
export { findOrphanPages } from '@/lib/linking/orphans';

export {
  getLinkRegistry,
  getLinkPageBySlug,
  getActiveLinkPages,
  linkPageHref,
  APPROVED_SERVICE_SLUGS,
  isApprovedServiceSlug,
  RELATED_SERVICE_LIMITS,
  POLICY_LINK_SETS,
  POLICY_ANCHOR_LABELS,
} from '@/data/linking';
