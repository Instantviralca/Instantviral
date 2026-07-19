import type { Review, ReviewStatus } from '@/types/reviews';

export const PUBLIC_REVIEW_STATUS: ReviewStatus = 'approved';

/** Only Approved reviews may appear on the public website. */
export function isPubliclyApproved(review: Review): boolean {
  return review.status === PUBLIC_REVIEW_STATUS;
}

/** Consent is required before any public publication. */
export function hasPublicationConsent(review: Review): boolean {
  return review.consentConfirmed === true;
}

/**
 * Verified purchase may be true only when matched to a genuine completed order.
 * Callers must set this from order verification — never from review text.
 */
export function isVerifiedPurchase(review: Review): boolean {
  return review.verifiedPurchase === true;
}

/**
 * A review is eligible for public display when approved and consented.
 * Avatar/name/rating/text must not publish without consent.
 */
export function isPubliclyEligible(review: Review): boolean {
  return isPubliclyApproved(review) && hasPublicationConsent(review);
}
