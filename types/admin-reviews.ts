/**
 * Admin review list / editor models — Document 14.02.
 * Architecture only; backend CRUD is not implemented yet.
 */

import type {
  Review,
  ReviewDisplayLocation,
  ReviewSource,
  ReviewStatus,
} from '@/types/reviews';
import type { PlatformId } from '@/types/platform';

export type AdminReviewRow = {
  id: string;
  customerName: string;
  rating: number;
  platform?: PlatformId;
  serviceSlug?: string;
  status: ReviewStatus;
  featured: boolean;
  verifiedPurchase: boolean;
  consentConfirmed: boolean;
  source: ReviewSource;
  reviewDate: string;
  updatedAt: string;
  /** Truncated preview only — full text in editor. */
  reviewPreview: string;
};

export type AdminReviewFilters = {
  query?: string;
  status?: ReviewStatus | 'all';
  platform?: PlatformId | 'all';
  serviceSlug?: string | 'all';
  rating?: number | 'all';
  verifiedPurchase?: boolean | 'all';
  featured?: boolean | 'all';
  consentConfirmed?: boolean | 'all';
  sort?: 'newest' | 'oldest' | 'highest_rating' | 'lowest_rating';
};

export type AdminReviewEditorModel = {
  review: Review;
  /** Internal notes — never serialize to public APIs. */
  moderationNotes: string[];
  displayLocations: ReviewDisplayLocation[];
};
