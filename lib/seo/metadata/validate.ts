/**
 * Metadata entry / route validation — Document 14.07.
 */

import { getLinkPageBySlug } from '@/data/linking/registry';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getMetadataRegistry } from '@/data/seo/metadata-registry';
import { findUnsupportedMetadataClaims } from '@/lib/seo/metadata/claims';
import {
  buildCanonicalUrl,
  normalizeCanonicalPath,
} from '@/lib/seo/metadata/canonical';
import { containsPrivateMetadataData } from '@/lib/seo/metadata/sanitize';
import type {
  MetadataEntry,
  MetadataIssue,
  MetadataValidationReport,
} from '@/types/seo-metadata';
import { findDuplicateCanonicals, findDuplicateDescriptions, findDuplicateRoutes, findDuplicateTitles } from '@/lib/seo/metadata/duplicates';
import { findMissingMetadata } from '@/lib/seo/metadata/missing';
import { validateSocialImages } from '@/lib/seo/metadata/images';

export function validateMetadataEntry(entry: MetadataEntry): MetadataIssue[] {
  const issues: MetadataIssue[] = [];
  const route = normalizeCanonicalPath(entry.route);
  const canonical = normalizeCanonicalPath(entry.canonicalPath);

  if (route !== canonical && entry.indexable) {
    issues.push({
      kind: 'canonical_mismatch',
      route: entry.route,
      entryId: entry.id,
      sourceFile: entry.sourceFile,
      detail: `Route ${route} does not match canonicalPath ${canonical}`,
    });
  }

  if (entry.canonicalPath.includes('?') || entry.canonicalPath.includes('#')) {
    issues.push({
      kind: 'invalid_route',
      route: entry.route,
      entryId: entry.id,
      sourceFile: entry.sourceFile,
      detail: 'Canonical path must not include query parameters or fragments',
    });
  }

  if (route.startsWith('/buy-')) {
    const slug = route.slice(1);
    if (!isApprovedServiceSlug(slug)) {
      issues.push({
        kind: 'skipped_service',
        route: entry.route,
        entryId: entry.id,
        sourceFile: entry.sourceFile,
        detail: `Metadata entry for skipped service route ${route}`,
      });
    }
  }

  if (entry.indexable && !entry.robots.index) {
    issues.push({
      kind: 'indexable_mismatch',
      route: entry.route,
      entryId: entry.id,
      sourceFile: entry.sourceFile,
      detail: `Entry marked indexable but robots.index is false for ${entry.route}`,
    });
  }

  if (!entry.indexable && entry.robots.index) {
    issues.push({
      kind: 'indexable_mismatch',
      route: entry.route,
      entryId: entry.id,
      sourceFile: entry.sourceFile,
      detail: `Entry marked non-indexable but robots.index is true for ${entry.route}`,
    });
  }

  for (const text of [entry.title, entry.description]) {
    const claims = findUnsupportedMetadataClaims(text);
    for (const claim of claims) {
      issues.push({
        kind: 'unsupported_claim',
        route: entry.route,
        entryId: entry.id,
        sourceFile: entry.sourceFile,
        detail: `Unsupported claim (${claim}) in metadata for ${entry.route}`,
      });
    }
    if (containsPrivateMetadataData(text)) {
      issues.push({
        kind: 'private_data',
        route: entry.route,
        entryId: entry.id,
        sourceFile: entry.sourceFile,
        detail: `Possible private data in metadata for ${entry.route}`,
      });
    }
  }

  // Indexable pages should exist in the link registry when applicable
  if (entry.indexable && entry.pageType !== 'error') {
    const slug = route === '/' ? 'home' : route.replace(/^\//, '');
    const linkPage = getLinkPageBySlug(slug);
    if (linkPage && !linkPage.active && entry.pageType === 'service') {
      issues.push({
        kind: 'inactive_route',
        route: entry.route,
        entryId: entry.id,
        sourceFile: entry.sourceFile,
        detail: `Indexable metadata points at inactive link-registry page ${slug}`,
      });
    }
  }

  void buildCanonicalUrl(entry.canonicalPath);

  return issues;
}

export function validateMetadataRoutes(
  source: MetadataEntry[] = getMetadataRegistry(),
): MetadataIssue[] {
  return source.flatMap((entry) => validateMetadataEntry(entry));
}

export function validateMetadataRegistry(
  source: MetadataEntry[] = getMetadataRegistry(),
): MetadataValidationReport {
  const issues = [
    ...findDuplicateTitles(source),
    ...findDuplicateDescriptions(source),
    ...findDuplicateCanonicals(source),
    ...findDuplicateRoutes(source),
    ...findMissingMetadata(source),
    ...validateMetadataRoutes(source),
    ...validateSocialImages(source),
  ];

  return {
    issues,
    duplicateTitleCount: issues.filter((i) => i.kind === 'duplicate_title').length,
    duplicateDescriptionCount: issues.filter((i) => i.kind === 'duplicate_description')
      .length,
    duplicateCanonicalCount: issues.filter((i) => i.kind === 'duplicate_canonical')
      .length,
    missingCount: issues.filter((i) =>
      (
        [
          'missing_title',
          'missing_description',
          'missing_canonical',
          'missing_og_image',
          'missing_social_image_file',
        ] as const
      ).includes(i.kind as 'missing_title'),
    ).length,
    invalidRouteCount: issues.filter((i) =>
      (
        ['invalid_route', 'skipped_service', 'inactive_route'] as const
      ).includes(i.kind as 'invalid_route'),
    ).length,
  };
}
