/**
 * Metadata registry getters — Document 14.07.
 */

import { getMetadataRegistry } from '@/data/seo/metadata-registry';
import { normalizeCanonicalPath } from '@/lib/seo/metadata/canonical';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import type { MetadataEntry } from '@/types/seo-metadata';

export function getMetadataByRoute(route: string): MetadataEntry | undefined {
  const normalized = normalizeCanonicalPath(route);
  return getMetadataRegistry().find(
    (entry) =>
      normalizeCanonicalPath(entry.route) === normalized ||
      normalizeCanonicalPath(entry.canonicalPath) === normalized,
  );
}

export function getActiveMetadataEntries(
  source = getMetadataRegistry(),
): MetadataEntry[] {
  return source.filter((entry) => entry.active);
}

export function getIndexableMetadataEntries(
  source = getMetadataRegistry(),
): MetadataEntry[] {
  return source.filter((entry) => entry.active && entry.indexable);
}

export function isSkippedServiceRoute(route: string): boolean {
  const normalized = normalizeCanonicalPath(route);
  if (!normalized.startsWith('/buy-')) return false;
  const slug = normalized.slice(1);
  return !isApprovedServiceSlug(slug);
}
