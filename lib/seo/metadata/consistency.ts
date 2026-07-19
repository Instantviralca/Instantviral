/**
 * Metadata ↔ schema URL consistency — Document 14.07.
 */

import { seoSiteConfig } from '@/config/seo';
import { site } from '@/config/site';
import { getMetadataByRoute } from '@/lib/seo/metadata/getters';
import {
  absoluteUrl,
  buildCanonicalUrl,
  getSiteOrigin,
  normalizeCanonicalPath,
} from '@/lib/seo/metadata/canonical';
import type { MetadataIssue } from '@/types/seo-metadata';

/**
 * Ensure metadata and schema share the same production domain / canonical.
 */
export function validateMetadataSchemaConsistency(
  route: string,
  schemaUrl?: string,
): MetadataIssue[] {
  const issues: MetadataIssue[] = [];
  const entry = getMetadataByRoute(route);

  if (seoSiteConfig.productionDomain.replace(/\/$/, '') !== site.domain.replace(/\/$/, '')) {
    issues.push({
      kind: 'schema_url_mismatch',
      route,
      detail: `seoSiteConfig.productionDomain (${seoSiteConfig.productionDomain}) does not match site.domain (${site.domain})`,
      sourceFile: 'config/seo.ts',
    });
  }

  if (!entry) return issues;

  const canonical = buildCanonicalUrl(entry.canonicalPath);
  if (schemaUrl) {
    const normalizedSchema = schemaUrl.replace(/\/$/, '') || schemaUrl;
    const normalizedCanonical = canonical.replace(/\/$/, '') || canonical;
    if (normalizedSchema !== normalizedCanonical) {
      issues.push({
        kind: 'schema_url_mismatch',
        route: entry.route,
        entryId: entry.id,
        sourceFile: entry.sourceFile,
        detail: `Schema URL ${schemaUrl} does not match canonical ${canonical}`,
      });
    }
  }

  if (!canonical.startsWith(getSiteOrigin())) {
    issues.push({
      kind: 'schema_url_mismatch',
      route: entry.route,
      entryId: entry.id,
      sourceFile: entry.sourceFile,
      detail: `Canonical ${canonical} is outside production origin ${getSiteOrigin()}`,
    });
  }

  if (normalizeCanonicalPath(entry.canonicalPath) !== normalizeCanonicalPath(entry.route)) {
    issues.push({
      kind: 'canonical_mismatch',
      route: entry.route,
      entryId: entry.id,
      sourceFile: entry.sourceFile,
      detail: 'canonicalPath must self-reference the page route',
    });
  }

  // Organization / website absolute URL helper
  void absoluteUrl('/');

  return issues;
}
