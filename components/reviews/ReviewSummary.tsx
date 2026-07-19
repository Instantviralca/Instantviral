import { RatingDisplay } from '@/components/reviews/RatingDisplay';
import { Text } from '@/components/typography/text';
import { cn } from '@/lib/utils';
import type { AggregateRatingResult } from '@/types/reviews';

export type ReviewSummaryProps = {
  aggregate: AggregateRatingResult;
  className?: string;
};

/**
 * Visible aggregate summary calculated from eligible approved reviews only.
 */
export function ReviewSummary({ aggregate, className }: ReviewSummaryProps) {
  return (
    <div className={cn('flex flex-wrap items-center gap-3', className)}>
      <RatingDisplay rating={aggregate.ratingValue} />
      <Text className="text-sm text-muted-foreground">
        {aggregate.ratingValue.toFixed(1)} out of {aggregate.bestRating} based on{' '}
        {aggregate.reviewCount} customer{' '}
        {aggregate.reviewCount === 1 ? 'review' : 'reviews'}
      </Text>
    </div>
  );
}
