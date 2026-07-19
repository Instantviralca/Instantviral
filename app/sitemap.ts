import type { MetadataRoute } from 'next';

import { buildSitemapEntries } from '@/seo/sitemap';

/**
 * Production XML sitemap — Document 14.08.
 * Generated from the shared indexable route registry only.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return buildSitemapEntries();
}
