/**
 * Learn discovery SEO helpers — Documents 15.05 + 14.07.
 * Filtered/search query states keep the clean base canonical.
 */

import type { Metadata } from 'next';

import { LEARN_DEDICATED_SEARCH_PATH } from '@/config/learn-search';
import { buildPageMetadata } from '@/lib/seo/metadata/build';
import type { LearnSearchState } from '@/types/learn-search';

export function isLearnSearchFiltered(state: LearnSearchState): boolean {
  return Boolean(
    state.q ||
      state.tag ||
      state.platform ||
      state.readingTime ||
      state.featured ||
      (state.sort && state.sort !== 'relevance') ||
      state.page > 1,
  );
}

/**
 * Canonical for Learn discovery surfaces — always the clean base path.
 * Query combinations must not create indexable duplicates.
 */
export function getLearnDiscoveryCanonicalPath(basePath: string): string {
  return basePath.split('?')[0] || basePath;
}

/**
 * Dedicated /learn/search (future) should be noindex.
 * On /learn and /learn/[category], keep indexable with clean canonical.
 */
export function getLearnDiscoveryRobots(options: {
  pathname: string;
  isFiltered?: boolean;
}): { index: boolean; follow: boolean } {
  if (options.pathname.startsWith(LEARN_DEDICATED_SEARCH_PATH)) {
    return { index: false, follow: false };
  }
  return { index: true, follow: true };
}

export function buildLearnDiscoveryMetadata(options: {
  title: string;
  description: string;
  basePath: string;
  pathname?: string;
}): Metadata {
  const canonical = getLearnDiscoveryCanonicalPath(options.basePath);
  const robots = getLearnDiscoveryRobots({
    pathname: options.pathname ?? options.basePath,
  });

  return buildPageMetadata({
    title: options.title,
    description: options.description,
    path: canonical,
    type: 'website',
    robots,
  });
}
