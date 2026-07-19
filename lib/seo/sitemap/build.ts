/**
 * Build sitemap entries — Document 14.08.
 */

import type { MetadataRoute } from 'next';

import { getIndexableRoutes } from '@/lib/seo/sitemap/routes';
import { validateSitemapUrl } from '@/lib/seo/sitemap/validate-url';

/**
 * Production sitemap entries from the shared indexable route registry.
 * lastModified comes from registry timestamps (not build time).
 */
export function buildSitemapEntries(): MetadataRoute.Sitemap {
  const routes = getIndexableRoutes();
  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    const validation = validateSitemapUrl(route.canonicalUrl);
    if (!validation.valid) {
      // Skip invalid URLs rather than shipping bad hosts
      continue;
    }

    entries.push({
      url: route.canonicalUrl,
      lastModified: route.lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    });
  }

  return entries;
}
