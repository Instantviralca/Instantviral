/**
 * Duplicate metadata detection — Document 14.07.
 */

import { getMetadataRegistry } from '@/data/seo/metadata-registry';
import { normalizeCanonicalPath } from '@/lib/seo/metadata/canonical';
import type { MetadataEntry, MetadataIssue } from '@/types/seo-metadata';

function groupBy(
  entries: MetadataEntry[],
  keyFn: (entry: MetadataEntry) => string,
): Map<string, MetadataEntry[]> {
  const map = new Map<string, MetadataEntry[]>();
  for (const entry of entries) {
    const key = keyFn(entry);
    const list = map.get(key) ?? [];
    list.push(entry);
    map.set(key, list);
  }
  return map;
}

function duplicatesFromGroups(
  groups: Map<string, MetadataEntry[]>,
  kind: MetadataIssue['kind'],
  label: string,
): MetadataIssue[] {
  const issues: MetadataIssue[] = [];
  for (const [value, list] of groups) {
    if (!value || list.length < 2) continue;
    // Only flag among active indexable for titles/descriptions; always for canonical/route
    const relevant =
      kind === 'duplicate_canonical' || kind === 'duplicate_route'
        ? list.filter((entry) => entry.active)
        : list.filter((entry) => entry.active && entry.indexable);
    if (relevant.length < 2) continue;
    issues.push({
      kind,
      route: relevant[0]!.route,
      entryId: relevant[0]!.id,
      sourceFile: relevant[0]!.sourceFile,
      relatedRoutes: relevant.map((entry) => entry.route),
      detail: `Duplicate ${label} "${value}" across ${relevant.map((e) => e.route).join(', ')}`,
    });
  }
  return issues;
}

export function findDuplicateTitles(
  source: MetadataEntry[] = getMetadataRegistry(),
): MetadataIssue[] {
  return duplicatesFromGroups(
    groupBy(source, (entry) => entry.title.trim().toLowerCase()),
    'duplicate_title',
    'title',
  );
}

export function findDuplicateDescriptions(
  source: MetadataEntry[] = getMetadataRegistry(),
): MetadataIssue[] {
  return duplicatesFromGroups(
    groupBy(source, (entry) => entry.description.trim().toLowerCase()),
    'duplicate_description',
    'description',
  );
}

export function findDuplicateCanonicals(
  source: MetadataEntry[] = getMetadataRegistry(),
): MetadataIssue[] {
  return duplicatesFromGroups(
    groupBy(source, (entry) => normalizeCanonicalPath(entry.canonicalPath)),
    'duplicate_canonical',
    'canonical',
  );
}

export function findDuplicateRoutes(
  source: MetadataEntry[] = getMetadataRegistry(),
): MetadataIssue[] {
  return duplicatesFromGroups(
    groupBy(source, (entry) => normalizeCanonicalPath(entry.route)),
    'duplicate_route',
    'route',
  );
}
