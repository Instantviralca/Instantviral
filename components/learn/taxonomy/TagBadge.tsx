import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { PublicLearnTag } from '@/types/learn';

type TagBadgeProps = {
  tag: Pick<PublicLearnTag, 'name' | 'href'>;
  className?: string;
  asLink?: boolean;
};

/**
 * Accessible tag badge — Document 15.04.
 */
export function TagBadge({ tag, className, asLink = true }: TagBadgeProps) {
  const classes = cn(
    'inline-flex items-center border border-neutral-200 bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 outline-none transition-colors hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
    className,
  );

  if (!asLink) {
    return (
      <span className={classes} data-tag-badge>
        {tag.name}
      </span>
    );
  }

  return (
    <Link href={tag.href} className={classes} data-tag-badge>
      {tag.name}
    </Link>
  );
}
