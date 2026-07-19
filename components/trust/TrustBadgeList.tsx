import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { TrustBadgeContent } from '@/types/trust';

export type TrustBadgeListProps = {
  badges: TrustBadgeContent[];
  className?: string;
};

/**
 * Configurable trust badge row — Document 14.01.
 * Renders only enabled badges; notes stay visible for conditional claims.
 */
export function TrustBadgeList({ badges, className }: TrustBadgeListProps) {
  if (badges.length === 0) return null;

  return (
    <ul
      className={cn(
        'flex flex-wrap gap-2',
        className,
      )}
      aria-label="Trust badges"
    >
      {badges.map((badge) => (
        <li key={badge.id} className="max-w-full">
          <Badge
            variant="outline"
            className="min-h-11 max-w-full whitespace-normal px-3 py-2 text-left text-sm font-medium"
            title={badge.note}
          >
            <span>{badge.label}</span>
            {badge.note ? (
              <span className="sr-only">. {badge.note}</span>
            ) : null}
          </Badge>
        </li>
      ))}
    </ul>
  );
}
