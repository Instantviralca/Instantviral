import { cn } from '@/lib/utils';
import type { ReviewSource } from '@/types/reviews';

const SOURCE_LABELS: Record<ReviewSource, string> = {
  direct_submission: 'Customer submission',
  support_follow_up: 'Support follow-up',
  verified_order_feedback: 'Order feedback',
  third_party_platform: 'Third-party review',
  imported_historical: 'Historical review',
};

export type ReviewSourceLabelProps = {
  source: ReviewSource;
  className?: string;
};

export function ReviewSourceLabel({ source, className }: ReviewSourceLabelProps) {
  return (
    <span className={cn('text-xs text-muted-foreground', className)}>
      Source: {SOURCE_LABELS[source]}
    </span>
  );
}
