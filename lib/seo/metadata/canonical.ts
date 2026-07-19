/**
 * Canonical URL helpers — Document 14.07.
 */

import { seoSiteConfig } from '@/config/seo';

/** Absolute site origin without trailing slash. */
export function getSiteOrigin(): string {
  return seoSiteConfig.productionDomain.replace(/\/$/, '');
}

/**
 * Normalize a path: strip query/fragment, ensure leading slash,
 * remove trailing slash except for homepage.
 */
export function normalizeCanonicalPath(path: string): string {
  const trimmed = path.trim();
  const withoutQuery = trimmed.split(/[?#]/)[0] ?? trimmed;
  let normalized = withoutQuery.startsWith('/') ? withoutQuery : `/${withoutQuery}`;
  if (normalized.length > 1 && normalized.endsWith('/')) {
    normalized = normalized.slice(0, -1);
  }
  return normalized === '' ? '/' : normalized;
}

/** Build absolute URL from a path. */
export function absoluteUrl(path = '/'): string {
  const normalized = normalizeCanonicalPath(path);
  if (normalized === '/') return getSiteOrigin();
  return `${getSiteOrigin()}${normalized}`;
}

/**
 * Self-referencing canonical URL for an approved clean route.
 * Never includes query parameters or fragments.
 */
export function buildCanonicalUrl(path: string): string {
  return absoluteUrl(normalizeCanonicalPath(path));
}

/** @deprecated Prefer buildCanonicalUrl — kept for existing imports. */
export function canonicalUrl(path: string): string {
  return buildCanonicalUrl(path);
}
