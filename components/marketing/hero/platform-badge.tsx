import Link from 'next/link';

import { HoverLift } from '@/components/motion/hover-lift';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { PlatformBadgeProps } from '@/components/marketing/hero/types';

/**
 * Floating platform card / badge linking to a platform entry point.
 */
export function PlatformBadge({ id, label, href, className }: PlatformBadgeProps) {
  return (
    <HoverLift>
      <Link
        href={href}
        className={cn(
          'inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
          className,
        )}
        data-platform={id}
        aria-label={`${label} growth services`}
      >
        <Badge variant="secondary" className="bg-background/90 shadow-sm backdrop-blur-sm">
          {label}
        </Badge>
      </Link>
    </HoverLift>
  );
}
