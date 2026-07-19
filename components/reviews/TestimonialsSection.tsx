'use client';

import { useEffect } from 'react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { MutedText } from '@/components/typography/muted-text';
import { Heading } from '@/components/typography/heading';
import { ReviewSummary } from '@/components/reviews/ReviewSummary';
import { ReviewsEmptyState } from '@/components/reviews/ReviewsEmptyState';
import { TestimonialsGrid } from '@/components/reviews/TestimonialsGrid';
import {
  trackReviewEvent,
  reviewAnalyticsEvents,
} from '@/lib/analytics/review-events';
import { hasPublicReviews, summarizePublicReviews } from '@/lib/reviews';
import { cn } from '@/lib/utils';
import type { PublicReview } from '@/types/reviews';

export type TestimonialsSectionProps = {
  title?: string;
  description?: string;
  reviews: PublicReview[];
  /** When true, render empty state instead of hiding (admin/preview only). */
  showEmptyState?: boolean;
  showSummary?: boolean;
  showSource?: boolean;
  surface?: string;
  className?: string;
  id?: string;
  serviceHrefFor?: (review: PublicReview) => string | undefined;
};

/**
 * Public testimonials section — Document 14.02.
 * Hides entirely when no approved relevant reviews exist (default).
 */
export function TestimonialsSection({
  title = 'Customer Reviews',
  description,
  reviews,
  showEmptyState = false,
  showSummary = false,
  showSource = false,
  surface,
  className,
  id = 'testimonials',
  serviceHrefFor,
}: TestimonialsSectionProps) {
  useEffect(() => {
    if (reviews.length === 0) return;
    trackReviewEvent(reviewAnalyticsEvents.testimonial_section_view, { surface });
  }, [reviews.length, surface]);

  if (!hasPublicReviews(reviews)) {
    if (!showEmptyState) return null;
    return (
      <Section spacing="lg" className={cn(className)} aria-label="Customer reviews">
        <Container size="xl">
          <ReviewsEmptyState />
        </Container>
      </Section>
    );
  }

  const summary = showSummary ? summarizePublicReviews(reviews) : null;

  return (
    <Section
      id={id}
      spacing="lg"
      className={cn('bg-muted/20', className)}
      aria-labelledby={`${id}-heading`}
    >
      <Container size="xl">
        <div className="mb-8 max-w-2xl space-y-2">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {title}
          </Heading>
          {description ? <MutedText>{description}</MutedText> : null}
          {summary ? <ReviewSummary aggregate={summary} className="pt-2" /> : null}
        </div>
        <TestimonialsGrid
          reviews={reviews}
          showSource={showSource}
          surface={surface}
          serviceHrefFor={serviceHrefFor}
        />
      </Container>
    </Section>
  );
}
