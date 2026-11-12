/**
 * Merge required service → Learn links with existing related-article lists.
 */

import { SERVICE_GUIDE_LINKS } from '@/data/linking/service-guide-links';
import { getPublishedLearnArticleBySlug } from '@/data/learn/articles';
import type { InternalLink } from '@/types/linking';

function toLearnHref(slug: string): string {
  return `/learn/${slug}`;
}

function slugFromLink(link: InternalLink): string {
  return link.slug.replace(/^learn\//, '');
}

function isPublishedArticleSlug(slug: string): boolean {
  return Boolean(getPublishedLearnArticleBySlug(slug));
}

/**
 * Ensures owner-required guide links appear first with exact labels.
 * Keeps additional published article links from the existing list.
 */
export function mergeMoneyPageGuideLinks(
  serviceSlug: string,
  existing: readonly InternalLink[] = [],
): InternalLink[] {
  const required = SERVICE_GUIDE_LINKS[serviceSlug] ?? [];
  const labelBySlug = new Map(
    required.map((item) => [item.slug, item.label] as const),
  );

  const merged: InternalLink[] = [];
  const seen = new Set<string>();

  for (const item of required) {
    if (!isPublishedArticleSlug(item.slug)) continue;
    const href = toLearnHref(item.slug);
    if (seen.has(href)) continue;
    merged.push({
      slug: `learn/${item.slug}`,
      href,
      label: item.label,
    });
    seen.add(href);
  }

  for (const link of existing) {
    const slug = slugFromLink(link);
    if (!isPublishedArticleSlug(slug)) continue;
    const href = link.href.startsWith('/learn/') ? link.href : toLearnHref(slug);
    if (seen.has(href)) {
      const index = merged.findIndex((item) => item.href === href);
      if (index >= 0 && labelBySlug.has(slug)) {
        merged[index] = { ...merged[index]!, label: labelBySlug.get(slug)! };
      }
      continue;
    }
    merged.push({
      slug: link.slug.startsWith('learn/') ? link.slug : `learn/${slug}`,
      href,
      label: labelBySlug.get(slug) ?? link.label,
    });
    seen.add(href);
  }

  return merged;
}
