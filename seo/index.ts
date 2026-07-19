export { absoluteUrl, canonicalUrl, getSiteOrigin } from '@/seo/canonical';
export { titles } from '@/seo/titles';
export { descriptions } from '@/seo/descriptions';
export { buildOpenGraph } from '@/seo/openGraph';
export { buildTwitter } from '@/seo/twitter';
export {
  buildPageMetadata,
  homeMetadata,
  serviceMetadata,
  learnIndexMetadata,
  learnArticleMetadata,
  companyMetadata,
  legalMetadata,
  noIndexMetadata,
  trackOrderMetadata,
  cartMetadata,
  checkoutMetadata,
  adminMetadata,
  privateTrackOrderResultMetadata,
} from '@/seo/metadata';
export { getRobotsRules, getSitemapUrl } from '@/seo/robots';
export { buildSitemapEntries } from '@/seo/sitemap';
export {
  buildImageAlt,
  seoImageFilename,
  defaultOgImagePath,
  serviceOgFilename,
} from '@/seo/images';
