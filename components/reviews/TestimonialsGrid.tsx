import { Grid } from '@/components/layout/grid';
import { TestimonialCard } from '@/components/reviews/TestimonialCard';
import { cn } from '@/lib/utils';
import type { PublicReview } from '@/types/reviews';

export type TestimonialsGridProps = {
  reviews: PublicReview[];
  className?: string;
  showSource?: boolean;
  surface?: string;
  serviceHrefFor?: (review: PublicReview) => string | undefined;
};

/**
 * Responsive testimonials grid — 3 / 2 / 1 columns.
 * No carousel; no horizontal swipe required.
 */
export function TestimonialsGrid({
  reviews,
  className,
  showSource,
  surface,
  serviceHrefFor,
}: TestimonialsGridProps) {
  if (reviews.length === 0) return null;

  return (
    <Grid cols={3} className={cn('gap-4', className)}>
      {reviews.map((review) => (
        <TestimonialCard
          key={review.id}
          review={review}
          showSource={showSource}
          surface={surface}
          serviceHref={serviceHrefFor?.(review)}
        />
      ))}
    </Grid>
  );
}
