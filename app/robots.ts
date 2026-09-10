import type { MetadataRoute } from 'next';

import { getRobotsRules, getSitemapUrl } from '@/seo/robots';

/**
 * Production robots.txt — Document 14.08.
 * Disallows admin/API/preview/draft and tokenized checkout recovery only.
 * Public utility pages (cart, checkout, order-success) use page-level noindex
 * so crawlers can fetch and honor robots meta. Does not block CSS/JS/images.
 */
export default function robots(): MetadataRoute.Robots {
  const [primary] = getRobotsRules();

  return {
    rules: {
      userAgent: primary?.userAgent ?? '*',
      allow: primary?.allow ?? ['/'],
      disallow: primary?.disallow ?? [],
    },
    sitemap: getSitemapUrl(),
    host: 'instantviral.ca',
  };
}
