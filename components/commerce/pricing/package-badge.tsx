import { Badge } from '@/components/ui/badge';
import { getBadgeLabel } from '@/data/pricing/badges';
import { cn } from '@/lib/utils';
import type { PackageBadgeProps } from '@/components/commerce/pricing/types';

export function PackageBadge({ badge, className }: PackageBadgeProps) {
  const label = getBadgeLabel(badge);
  return (
    <Badge
      variant="secondary"
      className={cn(
        'rounded-full border-0 bg-[var(--brand-accent-soft)] px-3 py-1 text-[10px] font-bold tracking-wide text-[var(--brand-primary)] uppercase',
        className,
      )}
      aria-label={`Package badge: ${label}`}
    >
      {label}
    </Badge>
  );
}
