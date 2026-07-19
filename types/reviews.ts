/**
 * Global Testimonials & Reviews data model — Document 14.02.
 * Authentic reviews only. No fabricated customers, ratings, or order references.
 */

import type { PlatformId } from '@/types/platform';

export type ReviewStatus =
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'rejected'
  | 'hidden';

export type ReviewSource =
  | 'direct_submission'
  | 'support_follow_up'
  | 'verified_order_feedback'
  | 'third_party_platform'
  | 'imported_historical';

export type ReviewDisplayLocation =
  | 'homepage'
  | 'service_page'
  | 'platform_group'
  | 'about'
  | 'admin_preview';

/** Public rating scale: 1–5. */
export type ReviewRating = 1 | 2 | 3 | 4 | 5;

/**
 * Full review record (admin + internal).
 * `orderIdReference` and moderation notes must never appear publicly.
 */
export type Review = {
  id: string;
  customerName: string;
  customerInitials: string;
  customerAvatar?: string;
  platform?: PlatformId;
  serviceSlug?: string;
  /** Internal only — never expose on the public website. */
  orderIdReference?: string;
  rating: ReviewRating;
  title?: string;
  reviewText: string;
  reviewDate: string;
  /**
   * True only when matched to a genuine completed order.
   * Do not infer from review text or customer claims.
   */
  verifiedPurchase: boolean;
  source: ReviewSource;
  status: ReviewStatus;
  featured: boolean;
  /** Stable public sort order (lower first). */
  displayOrder?: number;
  displayLocations: ReviewDisplayLocation[];
  /** Required before any public publication. */
  consentConfirmed: boolean;
  createdAt: string;
  updatedAt: string;
  /** Internal only — never public. */
  moderationNotes?: string[];
};

/**
 * Safe public projection — excludes order references and moderation notes.
 */
export type PublicReview = {
  id: string;
  customerName: string;
  customerInitials: string;
  customerAvatar?: string;
  platform?: PlatformId;
  serviceSlug?: string;
  rating: ReviewRating;
  title?: string;
  reviewText: string;
  reviewDate: string;
  verifiedPurchase: boolean;
  source: ReviewSource;
  featured: boolean;
  displayOrder?: number;
  displayLocations: ReviewDisplayLocation[];
};

export type AggregateRatingResult = {
  ratingValue: number;
  reviewCount: number;
  bestRating: number;
  worstRating: number;
};

export type ReviewModerationActionId =
  | 'approve'
  | 'reject'
  | 'hide'
  | 'feature'
  | 'unfeature'
  | 'assign_platform'
  | 'assign_service'
  | 'confirm_verified_purchase'
  | 'confirm_consent'
  | 'add_moderation_note';

export type ReviewModerationAction = {
  id: ReviewModerationActionId;
  label: string;
  /** Requires admin boundary — never expose to public clients. */
  adminOnly: true;
};

export type ReviewAuditEvent = {
  id: string;
  reviewId: string;
  action: ReviewModerationActionId;
  actorId: string;
  previousStatus?: ReviewStatus;
  nextStatus?: ReviewStatus;
  note?: string;
  createdAt: string;
};
