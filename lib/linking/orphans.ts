/**
 * Orphan-page detection — Document 14.05.
 * An orphan is an active page with no inbound links from other active pages
 * (homepage is exempt as the root).
 */

import { getActiveLinkPages, getLinkRegistry } from '@/data/linking/registry';
import type { OrphanPageReport } from '@/types/linking';

function collectInbound(registry = getLinkRegistry()): Map<string, Set<string>> {
  const inbound = new Map<string, Set<string>>();

  const add = (from: string, to: string) => {
    if (from === to) return;
    const set = inbound.get(to) ?? new Set<string>();
    set.add(from);
    inbound.set(to, set);
  };

  for (const page of registry) {
    if (!page.active) continue;
    for (const slug of page.relatedServices) add(page.slug, slug);
    for (const slug of page.relatedArticles) add(page.slug, slug);
    for (const slug of page.relatedPolicies) add(page.slug, slug);
    if (page.breadcrumbParent) add(page.slug, page.breadcrumbParent);
  }

  // Homepage implicitly points at featured / related services already in relatedServices.
  // Also treat home as linking to all top-level company/support/legal for orphan purposes.
  const home = registry.find((page) => page.slug === 'home');
  if (home) {
    for (const page of registry) {
      if (!page.active) continue;
      if (page.breadcrumbParent === 'home') add('home', page.slug);
    }
  }

  return inbound;
}

/**
 * Find active pages that nothing else links to.
 * Homepage is never reported as an orphan.
 */
export function findOrphanPages(): OrphanPageReport[] {
  const inbound = collectInbound();
  const orphans: OrphanPageReport[] = [];

  for (const page of getActiveLinkPages()) {
    if (page.slug === 'home') continue;

    const sources = inbound.get(page.slug);
    if (sources && sources.size > 0) continue;

    orphans.push({
      slug: page.slug,
      title: page.title,
      category: page.category,
      detail: `Active page "${page.slug}" has no inbound links from other active pages.`,
    });
  }

  return orphans;
}
