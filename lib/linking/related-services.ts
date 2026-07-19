/**
 * Related service selection — Document 14.05.
 *
 * Priority: same platform → same customer intent → purchase journey.
 * Never recommends the current page or skipped/inactive services.
 */

import {
  RELATED_SERVICE_LIMITS,
  SERVICE_JOURNEY_ORDER,
  isApprovedServiceSlug,
} from '@/data/linking/approved-services';
import {
  getLinkPageBySlug,
  getLinkRegistry,
  linkPageHref,
} from '@/data/linking/registry';
import { getAllServices, getServiceBySlug } from '@/data/services';
import type { InternalLink, LinkPage } from '@/types/linking';
import type { Service } from '@/types/service';

function journeyRank(slug: string): number {
  const service = getServiceBySlug(slug);
  if (!service) return 99;
  return SERVICE_JOURNEY_ORDER[service.category] ?? 50;
}

function scoreCandidate(source: LinkPage, candidate: LinkPage): number {
  let score = 0;

  if (source.relatedServices.includes(candidate.slug)) score += 200;
  if (source.platform && candidate.platform === source.platform) score += 100;
  if (
    source.serviceIntent &&
    candidate.serviceIntent &&
    source.serviceIntent === candidate.serviceIntent
  ) {
    score += 50;
  }

  const sourceRank = journeyRank(source.slug);
  const candidateRank = journeyRank(candidate.slug);
  const distance = Math.abs(sourceRank - candidateRank);
  score += Math.max(0, 25 - distance * 5);

  return score;
}

function activeServicePages(registry = getLinkRegistry()): LinkPage[] {
  return registry.filter(
    (page) =>
      page.active &&
      page.category === 'service' &&
      isApprovedServiceSlug(page.slug),
  );
}

/**
 * Related services for a service page (max 3) or homepage section (max 4).
 */
export function getRelatedServices(
  sourceSlug: string,
  options?: {
    limit?: number;
    surface?: 'service' | 'homepage';
    /** Optional explicit preferences (still filtered to active approved). */
    preferredSlugs?: string[];
  },
): InternalLink[] {
  const surface = options?.surface ?? 'service';
  const limit =
    options?.limit ??
    (surface === 'homepage'
      ? RELATED_SERVICE_LIMITS.homepage
      : RELATED_SERVICE_LIMITS.servicePage);

  const source =
    getLinkPageBySlug(sourceSlug) ??
    ({
      slug: sourceSlug,
      title: sourceSlug,
      category: 'homepage',
      keywords: [],
      relatedServices: options?.preferredSlugs ?? [],
      relatedArticles: [],
      relatedPolicies: [],
      active: true,
    } satisfies LinkPage);

  const preferred = (options?.preferredSlugs ?? []).filter(
    (slug) => slug !== sourceSlug && isApprovedServiceSlug(slug),
  );

  const candidates = activeServicePages().filter(
    (page) => page.slug !== sourceSlug,
  );

  const ranked = [...candidates].sort((a, b) => {
    const preferredBonus = (slug: string) =>
      preferred.includes(slug) ? 1000 : 0;
    const scoreA = scoreCandidate(source, a) + preferredBonus(a.slug);
    const scoreB = scoreCandidate(source, b) + preferredBonus(b.slug);
    if (scoreB !== scoreA) return scoreB - scoreA;
    return a.title.localeCompare(b.title);
  });

  // Prefer preferred order first when provided
  const ordered: LinkPage[] = [];
  const seen = new Set<string>();

  for (const slug of preferred) {
    const page = ranked.find((item) => item.slug === slug);
    if (!page || seen.has(page.slug)) continue;
    ordered.push(page);
    seen.add(page.slug);
    if (ordered.length >= limit) break;
  }

  for (const page of ranked) {
    if (seen.has(page.slug)) continue;
    ordered.push(page);
    seen.add(page.slug);
    if (ordered.length >= limit) break;
  }

  return ordered.slice(0, limit).map((page) => ({
    slug: page.slug,
    href: linkPageHref(page.slug),
    label: page.title,
  }));
}

/** Resolve related Service registry entities (for existing UI components). */
export function getRelatedServiceEntities(
  sourceSlug: string,
  options?: Parameters<typeof getRelatedServices>[1],
): Service[] {
  return getRelatedServices(sourceSlug, options)
    .map((link) => getServiceBySlug(link.slug))
    .filter((service): service is Service => Boolean(service));
}

/** Homepage featured / related services (max 4). */
export function getHomepageRelatedServices(limit = RELATED_SERVICE_LIMITS.homepage): InternalLink[] {
  return getRelatedServices('home', { surface: 'homepage', limit });
}

export function filterApprovedServiceSlugs(slugs: string[]): string[] {
  return slugs.filter(isApprovedServiceSlug);
}

export function getAllApprovedServiceLinks(): InternalLink[] {
  return activeServicePages().map((page) => ({
    slug: page.slug,
    href: linkPageHref(page.slug),
    label: page.title,
  }));
}

/** @internal test helper */
export function __scoreRelatedForTests(source: LinkPage, candidate: LinkPage): number {
  return scoreCandidate(source, candidate);
}

export { getAllServices };
