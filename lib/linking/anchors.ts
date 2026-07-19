/**
 * Descriptive anchor recommendations — Document 14.05.
 * Avoids generic anchors (Click here, Read more, Learn more without context).
 */

import { POLICY_ANCHOR_LABELS } from '@/data/linking/policies';
import { getLinkPageBySlug, linkPageHref } from '@/data/linking/registry';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import { getRelatedPolicies } from '@/lib/linking/related-policies';
import { getRelatedServices } from '@/lib/linking/related-services';
import type {
  PolicyLinkContext,
  RecommendedAnchor,
} from '@/types/linking';

export const GENERIC_ANCHORS = [
  'click here',
  'read more',
  'learn more',
  'here',
  'this page',
  'link',
] as const;

export function isGenericAnchor(label: string): boolean {
  const normalized = label.trim().toLowerCase();
  if (!normalized) return true;
  return (GENERIC_ANCHORS as readonly string[]).includes(normalized);
}

/**
 * Recommended descriptive anchors for a page context.
 */
export function getRecommendedAnchors(
  sourceSlug: string,
  options?: {
    policyContext?: PolicyLinkContext;
    includeServices?: boolean;
    includeArticles?: boolean;
    includePolicies?: boolean;
  },
): RecommendedAnchor[] {
  const anchors: RecommendedAnchor[] = [];
  const page = getLinkPageBySlug(sourceSlug);

  if (options?.includeServices !== false) {
    for (const link of getRelatedServices(sourceSlug, {
      surface: page?.category === 'homepage' ? 'homepage' : 'service',
    })) {
      anchors.push({
        ...link,
        context: 'related_service',
      });
    }
  }

  if (options?.includeArticles) {
    for (const link of getRelatedArticles(sourceSlug)) {
      anchors.push({
        ...link,
        context: 'related_article',
      });
    }
  }

  if (options?.includePolicies !== false) {
    const context = options?.policyContext ?? 'support';
    for (const link of getRelatedPolicies(context)) {
      anchors.push({
        ...link,
        context: `policy:${context}`,
      });
    }
  }

  // Always suggest Track Your Order with descriptive copy when relevant
  const track = getLinkPageBySlug('track-order');
  if (track?.active) {
    anchors.push({
      slug: track.slug,
      href: linkPageHref(track.slug),
      label: 'Track Your Order',
      context: 'support',
    });
  }

  return anchors.filter((anchor) => !isGenericAnchor(anchor.label));
}

export function policyAnchorLabel(
  id: keyof typeof POLICY_ANCHOR_LABELS,
): string {
  return POLICY_ANCHOR_LABELS[id];
}
