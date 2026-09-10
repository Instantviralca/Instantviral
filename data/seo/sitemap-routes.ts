/**
 * Production sitemap allowlist — Document 14.08.
 * Single shared list; do not duplicate elsewhere.
 */

import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { routes } from '@/config/routes';
import { getServiceBySlug } from '@/data/services';

/**
 * Service slugs that remain in the catalog but no longer have a dedicated
 * indexable marketing route (consolidated onto another public URL).
 */
export const SITEMAP_CONSOLIDATED_SERVICE_SLUGS = [
  'buy-instagram-followers',
] as const;

const sitemapServiceRoutes = APPROVED_SERVICE_SLUGS.filter((slug) => {
  if ((SITEMAP_CONSOLIDATED_SERVICE_SLUGS as readonly string[]).includes(slug)) {
    return false;
  }
  const service = getServiceBySlug(slug);
  return Boolean(service && service.url !== '/' && service.url !== routes.home);
}).map((slug) => `/${slug}`);

/** Exact routes allowed in the Version 1 production sitemap. */
export const SITEMAP_PRODUCTION_ROUTES: readonly string[] = [
  routes.home,
  ...sitemapServiceRoutes,
  routes.about,
  routes.contact,
  routes.faq,
  routes.reviews,
  routes.trackOrder,
  routes.learn,
  routes.privacyPolicy,
  routes.termsAndConditions,
  routes.refundPolicy,
  routes.cookiePolicy,
  routes.disclaimer,
] as const;

export const SITEMAP_PRODUCTION_ROUTE_SET = new Set(SITEMAP_PRODUCTION_ROUTES);

/** Routes / prefixes that must never appear in the sitemap. */
export const SITEMAP_EXCLUSION_PREFIXES = [
  '/cart',
  '/checkout',
  '/order-success',
  '/admin',
  '/api',
  '/search',
  '/preview',
  '/draft',
  '/404',
  '/track-order/result',
  '/services',
] as const;

/**
 * Future Learn readiness — published Learn routes only.
 * Version 1 returns empty until genuine published content is approved.
 */
export const LEARN_SITEMAP_ENABLED = true;

export const SKIPPED_SERVICE_ROUTE_EXAMPLES = [
  '/buy-tiktok-comments',
  '/buy-tiktok-shares',
] as const;
