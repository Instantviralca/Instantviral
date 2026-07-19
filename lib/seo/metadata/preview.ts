/**
 * Admin SEO metadata preview model — Document 14.07.
 * Architecture only; no backend CRUD.
 */

import { buildCanonicalUrl } from '@/lib/seo/metadata/canonical';
import { findDuplicateDescriptions, findDuplicateTitles } from '@/lib/seo/metadata/duplicates';
import { findMissingMetadata } from '@/lib/seo/metadata/missing';
import { getMetadataByRoute } from '@/lib/seo/metadata/getters';
import { validateMetadataEntry } from '@/lib/seo/metadata/validate';
import type { MetadataEntry, MetadataPreviewModel } from '@/types/seo-metadata';

export function buildMetadataPreview(route: string): MetadataPreviewModel | null {
  const entry = getMetadataByRoute(route);
  if (!entry) return null;
  return buildMetadataPreviewFromEntry(entry);
}

export function buildMetadataPreviewFromEntry(
  entry: MetadataEntry,
): MetadataPreviewModel {
  const relatedIssues = [
    ...validateMetadataEntry(entry),
    ...findMissingMetadata([entry]),
    ...findDuplicateTitles().filter((issue) =>
      issue.relatedRoutes?.includes(entry.route),
    ),
    ...findDuplicateDescriptions().filter((issue) =>
      issue.relatedRoutes?.includes(entry.route),
    ),
  ];

  return {
    entry,
    canonicalUrl: buildCanonicalUrl(entry.canonicalPath),
    titleLength: entry.title.length,
    descriptionLength: entry.description.length,
    robotsLabel: entry.robots.index
      ? entry.robots.follow
        ? 'index, follow'
        : 'index, nofollow'
      : entry.robots.follow
        ? 'noindex, follow'
        : 'noindex, nofollow',
    duplicateWarnings: relatedIssues.filter((issue) =>
      issue.kind.startsWith('duplicate_'),
    ),
    missingWarnings: relatedIssues.filter((issue) =>
      issue.kind.startsWith('missing_'),
    ),
    characterGuidance:
      'Title and description lengths are editorial guidance only and do not guarantee how Google displays snippets.',
  };
}
