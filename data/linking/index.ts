export {
  APPROVED_SERVICE_SLUGS,
  isApprovedServiceSlug,
  RELATED_SERVICE_LIMITS,
  SERVICE_INTENT_BY_CATEGORY,
  SERVICE_JOURNEY_ORDER,
  type ApprovedServiceSlug,
} from '@/data/linking/approved-services';
export { POLICY_ANCHOR_LABELS, POLICY_LINK_SETS } from '@/data/linking/policies';
export {
  getActiveLinkPages,
  getLinkPageBySlug,
  getLinkRegistry,
  getServiceLinkPage,
  linkPageHref,
  linkRegistry,
} from '@/data/linking/registry';
