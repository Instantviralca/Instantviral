'use client';

import { InternalLinkAnchor } from '@/components/linking/InternalLink';
import { cn } from '@/lib/utils';
import type { InternalLink } from '@/types/linking';

export type PolicyLinksProps = {
  links: InternalLink[];
  sourceSlug?: string;
  className?: string;
};

/**
 * Contextual policy / support links from the registry.
 */
export function PolicyLinks({ links, sourceSlug, className }: PolicyLinksProps) {
  if (links.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap gap-3', className)}>
      {links.map((link) => (
        <li key={link.slug}>
          <InternalLinkAnchor
            link={link}
            sourceSlug={sourceSlug}
            surface="policy"
            className="text-sm"
          />
        </li>
      ))}
    </ul>
  );
}
