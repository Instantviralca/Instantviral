/**
 * Related Learn article links — Document 14.05.
 */

import { getLinkPageBySlug, getLinkRegistry, linkPageHref } from '@/data/linking/registry';
import type { InternalLink, LinkPage } from '@/types/linking';
import type { PlatformId } from '@/types/platform';

function isLearnPage(page: LinkPage): boolean {
  return page.category === 'learn' && page.slug.startsWith('learn/');
}

/**
 * Related articles for a page slug (service, learn article, or hub).
 */
export function getRelatedArticles(
  sourceSlug: string,
  options?: {
    platform?: PlatformId;
    limit?: number;
    preferredSlugs?: string[];
  },
): InternalLink[] {
  const limit = options?.limit ?? 6;
  const source = getLinkPageBySlug(sourceSlug);
  const preferred = options?.preferredSlugs ?? source?.relatedArticles ?? [];
  const platform = options?.platform ?? source?.platform;

  const normalize = (slug: string) =>
    slug.startsWith('learn/') ? slug : `learn/${slug}`;

  const preferredNormalized = preferred.map(normalize);

  const allLearn = getLinkRegistry().filter(
    (page) => page.active && isLearnPage(page) && page.slug !== normalize(sourceSlug),
  );

  const samePlatform = allLearn.filter(
    (page) => !platform || page.platform === platform,
  );
  // Prefer same-platform, then any remaining Learn pages (guides / marketing)
  const fillPools = [samePlatform, allLearn];

  const ordered: LinkPage[] = [];
  const seen = new Set<string>();

  for (const slug of preferredNormalized) {
    const page = allLearn.find((item) => item.slug === slug);
    if (!page || seen.has(page.slug)) continue;
    ordered.push(page);
    seen.add(page.slug);
    if (ordered.length >= limit) break;
  }

  for (const pool of fillPools) {
    for (const page of pool) {
      if (seen.has(page.slug)) continue;
      ordered.push(page);
      seen.add(page.slug);
      if (ordered.length >= limit) break;
    }
    if (ordered.length >= limit) break;
  }

  return ordered.slice(0, limit).map((page) => ({
    slug: page.slug,
    href: linkPageHref(page.slug),
    label: page.title,
  }));
}
