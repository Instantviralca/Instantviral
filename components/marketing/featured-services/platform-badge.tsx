import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { ServicePlatformBadgeProps } from '@/components/marketing/featured-services/types';

const BADGE_CLASS: Record<string, string> = {
  instagram: 'border-platform-instagram/30 text-platform-instagram',
  tiktok: 'border-platform-tiktok/30 text-platform-tiktok',
  youtube: 'border-platform-youtube/30 text-platform-youtube',
  facebook: 'border-platform-facebook/30 text-platform-facebook',
};

/**
 * Platform badge with text label (not color-only).
 * Optional link to platform hub.
 */
export function PlatformBadge({
  platformId,
  label,
  href,
  className,
}: ServicePlatformBadgeProps) {
  const badge = (
    <Badge
      variant="outline"
      className={cn('font-medium', BADGE_CLASS[platformId], className)}
    >
      {label}
    </Badge>
  );

  if (!href) return badge;

  return (
    <Link
      href={href}
      className="inline-flex rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      aria-label={`${label} platform`}
    >
      {badge}
    </Link>
  );
}
