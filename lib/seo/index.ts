export { absoluteUrl, canonicalUrl, getSiteOrigin } from '@/seo/canonical';
export {
  buildPageMetadata,
  homeMetadata,
  serviceMetadata,
  learnIndexMetadata,
  learnArticleMetadata,
  companyMetadata,
  legalMetadata,
  noIndexMetadata,
} from '@/seo/metadata';
export { getRobotsRules, getSitemapUrl } from '@/seo/robots';
export { buildSitemapEntries } from '@/seo/sitemap';
export {
  buildImageAlt,
  seoImageFilename,
  defaultOgImagePath,
  serviceOgFilename,
} from '@/seo/images';
export { serializeJsonLd, asJsonLdGraph } from '@/lib/seo/schema';
