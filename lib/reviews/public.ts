/**
 * Public review projection — Document 14.02.
 * Strips internal order references and moderation notes.
 */

import { sanitizeCustomerDisplayName, sanitizeReviewText } from '@/lib/reviews/sanitize';
import { isPubliclyEligible } from '@/lib/reviews/status';
import type { PublicReview, Review } from '@/types/reviews';

export function toPublicReview(review: Review): PublicReview | null {
  if (!isPubliclyEligible(review)) return null;

  return {
    id: review.id,
    customerName: sanitizeCustomerDisplayName(review.customerName),
    customerInitials: sanitizeReviewText(review.customerInitials).slice(0, 4),
    customerAvatar: review.customerAvatar,
    platform: review.platform,
    serviceSlug: review.serviceSlug,
    rating: review.rating,
    title: review.title ? sanitizeReviewText(review.title) : undefined,
    reviewText: sanitizeReviewText(review.reviewText),
    reviewDate: review.reviewDate,
    verifiedPurchase: review.verifiedPurchase === true,
    source: review.source,
    featured: review.featured,
    displayOrder: review.displayOrder,
    displayLocations: [...review.displayLocations],
  };
}

export function toPublicReviews(reviews: Review[]): PublicReview[] {
  return reviews
    .map(toPublicReview)
    .filter((review): review is PublicReview => review !== null);
}
