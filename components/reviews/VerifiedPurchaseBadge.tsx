import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export type VerifiedPurchaseBadgeProps = {
  verified: boolean;
  className?: string;
};

/**
 * Verified Purchase badge — only render when verifiedPurchase is truly true.
 * Does not rely on colour alone (includes text label).
 */
export function VerifiedPurchaseBadge({ verified, className }: VerifiedPurchaseBadgeProps) {
  if (!verified) return null;

  return (
    <Badge
      variant="secondary"
      className={cn('min-h-8 gap-1 px-2 py-1 text-xs font-medium', className)}
    >
      <span aria-hidden>✓</span>
      <span>Verified Purchase</span>
    </Badge>
  );
}
