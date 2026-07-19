/**
 * Missing metadata reporting — Document 14.07.
 */

import { getMetadataRegistry } from '@/data/seo/metadata-registry';
import type { MetadataEntry, MetadataIssue } from '@/types/seo-metadata';

export function findMissingMetadata(
  source: MetadataEntry[] = getMetadataRegistry(),
): MetadataIssue[] {
  const issues: MetadataIssue[] = [];

  for (const entry of source) {
    if (!entry.active) continue;

    if (!entry.title.trim()) {
      issues.push({
        kind: 'missing_title',
        route: entry.route,
        entryId: entry.id,
        sourceFile: entry.sourceFile,
        detail: `Missing title for route ${entry.route}`,
      });
    }

    if (!entry.description.trim()) {
      issues.push({
        kind: 'missing_description',
        route: entry.route,
        entryId: entry.id,
        sourceFile: entry.sourceFile,
        detail: `Missing description for route ${entry.route}`,
      });
    }

    if (!entry.canonicalPath.trim()) {
      issues.push({
        kind: 'missing_canonical',
        route: entry.route,
        entryId: entry.id,
        sourceFile: entry.sourceFile,
        detail: `Missing canonicalPath for route ${entry.route}`,
      });
    }

    if (entry.indexable && !entry.openGraphImage.trim()) {
      issues.push({
        kind: 'missing_og_image',
        route: entry.route,
        entryId: entry.id,
        sourceFile: entry.sourceFile,
        detail: `Missing Open Graph image for indexable route ${entry.route}`,
      });
    }

    // Service pages must not reuse generic homepage metadata
    if (
      entry.pageType === 'service' &&
      entry.indexable &&
      (entry.title.includes('Social Media Growth Services') ||
        entry.description.includes('helps creators and brands grow on Instagram, TikTok, YouTube, and Facebook with reliable, transparent'))
    ) {
      issues.push({
        kind: 'missing_description',
        route: entry.route,
        entryId: entry.id,
        sourceFile: entry.sourceFile,
        detail: `Service page ${entry.route} appears to use generic homepage metadata`,
      });
    }
  }

  return issues;
}
