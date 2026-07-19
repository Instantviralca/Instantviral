/**
 * Placeholder / sample-data detection — Document 14.03.
 * Status, consent, source, and entity validation remain primary protection.
 */

import type { Review } from '@/types/reviews';

const PLACEHOLDER_PATTERNS: RegExp[] = [
  /\btest\s*user\b/i,
  /\bjohn\s*doe\b/i,
  /\bjane\s*doe\b/i,
  /\bsample\s*review\b/i,
  /\blorem\s+ipsum\b/i,
  /\bplaceholder\s+testimonial\b/i,
  /\bdevelopment\s+placeholder\b/i,
  /\bdemo\s*rating\b/i,
  /\bnot a real customer review\b/i,
  /\[development placeholder\]/i,
];

export function looksLikePlaceholderText(value: string): boolean {
  const normalized = value.trim();
  if (!normalized) return true;
  return PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(normalized));
}

/**
 * Detect known development / sample review data.
 * Does not replace status/consent/entity checks.
 */
export function isPlaceholderReview(review: Review): boolean {
  const haystack = [
    review.customerName,
    review.customerInitials,
    review.title ?? '',
    review.reviewText,
  ].join(' ');

  return looksLikePlaceholderText(haystack);
}
