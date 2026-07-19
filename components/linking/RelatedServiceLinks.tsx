'use client';

import { InternalLinkAnchor } from '@/components/linking/InternalLink';
import { cn } from '@/lib/utils';
import type { InternalLink } from '@/types/linking';

export type RelatedServiceLinksProps = {
  links: InternalLink[];
  sourceSlug?: string;
  className?: string;
};

/**
 * Related service link list from the Internal Linking Engine.
 */
export function RelatedServiceLinks({
  links,
  sourceSlug,
  className,
}: RelatedServiceLinksProps) {
  if (links.length === 0) return null;

  return (
    <ul className={cn('flex flex-wrap gap-3', className)}>
      {links.map((link) => (
        <li key={link.slug}>
          <InternalLinkAnchor
            link={link}
            sourceSlug={sourceSlug}
            surface="related_service"
            className="rounded-md border border-border bg-card px-3 text-sm"
          />
        </li>
      ))}
    </ul>
  );
}
