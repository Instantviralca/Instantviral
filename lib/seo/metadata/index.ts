/**
 * SEO Metadata & Canonical Engine — Document 14.07.
 */

export {
  buildPageMetadata,
  buildMetadataFromEntry,
  buildPageMetadataForRoute,
  privateTrackOrderResultMetadata,
} from '@/lib/seo/metadata/build';

export {
  getMetadataByRoute,
  getActiveMetadataEntries,
  getIndexableMetadataEntries,
  isSkippedServiceRoute,
} from '@/lib/seo/metadata/getters';

export {
  buildCanonicalUrl,
  absoluteUrl,
  canonicalUrl,
  getSiteOrigin,
  normalizeCanonicalPath,
} from '@/lib/seo/metadata/canonical';

export {
  buildOpenGraphMetadata,
  buildOpenGraphFromEntry,
} from '@/lib/seo/metadata/open-graph';

export {
  buildTwitterMetadata,
  buildTwitterFromEntry,
} from '@/lib/seo/metadata/twitter';

export {
  buildRobotsMetadata,
  robotsPolicyForRoute,
} from '@/lib/seo/metadata/robots';

export {
  validateMetadataEntry,
  validateMetadataRoutes,
  validateMetadataRegistry,
} from '@/lib/seo/metadata/validate';

export {
  findDuplicateTitles,
  findDuplicateDescriptions,
  findDuplicateCanonicals,
  findDuplicateRoutes,
} from '@/lib/seo/metadata/duplicates';

export { findMissingMetadata } from '@/lib/seo/metadata/missing';
export { validateSocialImages, validateSocialImage } from '@/lib/seo/metadata/images';
export { validateMetadataSchemaConsistency } from '@/lib/seo/metadata/consistency';
export {
  buildMetadataPreview,
  buildMetadataPreviewFromEntry,
} from '@/lib/seo/metadata/preview';
export {
  findUnsupportedMetadataClaims,
  youtubeMetadataIsSafe,
} from '@/lib/seo/metadata/claims';
export { sanitizeMetadataText } from '@/lib/seo/metadata/sanitize';

export { getMetadataRegistry, metadataRegistry } from '@/data/seo';
export { seoSiteConfig, SEO_PRODUCTION_DOMAIN } from '@/config/seo';
