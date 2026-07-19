/**
 * Contextual policy / support links — Document 14.05.
 */

import { POLICY_ANCHOR_LABELS, POLICY_LINK_SETS } from '@/data/linking/policies';
import { getLinkPageBySlug, linkPageHref } from '@/data/linking/registry';
import type {
  InternalLink,
  PolicyLinkContext,
  PolicyLinkId,
} from '@/types/linking';

/**
 * Return contextual policy/support links. Never dumps every legal page.
 */
export function getRelatedPolicies(
  context: PolicyLinkContext,
  options?: {
    /** Extra or page-specific policy ids (still must be active). */
    include?: PolicyLinkId[];
    exclude?: PolicyLinkId[];
  },
): InternalLink[] {
  const ids = [
    ...POLICY_LINK_SETS[context],
    ...(options?.include ?? []),
  ].filter((id, index, list) => list.indexOf(id) === index);

  const exclude = new Set(options?.exclude ?? []);

  return ids
    .filter((id) => !exclude.has(id))
    .map((id) => {
      const page = getLinkPageBySlug(id);
      if (!page || !page.active) return null;
      return {
        slug: page.slug,
        href: linkPageHref(page.slug),
        label: POLICY_ANCHOR_LABELS[id] ?? page.title,
      } satisfies InternalLink;
    })
    .filter((link): link is InternalLink => link !== null);
}
