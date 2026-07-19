import { TestimonialsSection } from '@/components/reviews/TestimonialsSection';
import { getServicePageReviews } from '@/lib/reviews';
import type { PlatformId } from '@/types/platform';

export type ServiceReviewsProps = {
  title?: string;
  description?: string;
  serviceSlug: string;
  platform?: PlatformId;
  limit?: number;
  className?: string;
};

/**
 * Service reviews — authentic approved reviews only (Document 14.02).
 * Instagram pages prioritize Instagram-tagged reviews, then general.
 * Other platforms show general reviews only (unless platform-tagged).
 */
export function ServiceReviews({
  title = 'Customer Reviews',
  description,
  serviceSlug,
  platform,
  limit = 6,
  className,
}: ServiceReviewsProps) {
  const reviews = getServicePageReviews({ serviceSlug, platform, limit });
  if (reviews.length === 0) return null;

  return (
    <TestimonialsSection
      id={`${serviceSlug}-reviews`}
      title={title}
      description={description}
      reviews={reviews}
      showSummary
      surface={`service:${serviceSlug}`}
      className={className}
    />
  );
}
