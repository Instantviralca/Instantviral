/**
 * Review schema engine types — Document 14.03.
 */

import type { PlatformId } from '@/types/platform';
import type { AggregateRatingResult, Review } from '@/types/reviews';
import type { JsonLd } from '@/schemas/organization';

export type ReviewedEntityKind = 'service' | 'platform' | 'organization';

export type ReviewedEntity =
  | {
      kind: 'service';
      serviceSlug: string;
      name: string;
      url?: string;
      /** When set, platform-tagged reviews for this platform may match the service page. */
      platform?: PlatformId;
    }
  | {
      kind: 'platform';
      platform: PlatformId;
      name: string;
      url?: string;
    }
  | {
      kind: 'organization';
      name: string;
      url?: string;
    };

export type SchemaExclusionReason =
  | 'not_approved'
  | 'missing_consent'
  | 'invalid_rating'
  | 'missing_rating'
  | 'entity_mismatch'
  | 'not_visible_on_page'
  | 'placeholder_detected'
  | 'section_hidden'
  | 'schema_disabled'
  | 'empty_review_set'
  | 'private_identity';

export type SchemaEligibleReviewResult = {
  eligible: Review[];
  excluded: Array<{ review: Review; reasons: SchemaExclusionReason[] }>;
};

export type ReviewSchemaEngineOptions = {
  entity: ReviewedEntity;
  /** When provided, only these review IDs may enter schema (visible-content match). */
  visibleReviewIds?: string[];
  /** When false, no review-related schema is emitted. */
  reviewSectionVisible?: boolean;
  reviewSchemaEnabled?: boolean;
  aggregateSchemaEnabled?: boolean;
  /** Minimum eligible reviews required for aggregate (default 1). */
  requireMinimumCount?: number;
};

export type ReviewSchemaBuildResult = {
  reviews: JsonLd[];
  aggregate: JsonLd | null;
  aggregateValues: AggregateRatingResult | null;
  eligibleReviewIds: string[];
  excluded: Array<{ reviewId: string; reasons: SchemaExclusionReason[] }>;
  generated: boolean;
  skippedReasons: SchemaExclusionReason[];
};

export type SchemaEngineLogEvent =
  | 'schema_generated'
  | 'schema_skipped'
  | 'review_excluded'
  | 'missing_consent'
  | 'invalid_rating'
  | 'entity_mismatch'
  | 'placeholder_detected'
  | 'aggregate_recalculated';

export type SchemaEngineLogEntry = {
  id: string;
  event: SchemaEngineLogEvent;
  message: string;
  reviewId?: string;
  entityKind?: ReviewedEntityKind;
  meta?: Record<string, string | number | boolean | null>;
  createdAt: string;
};

export type ReviewSchemaAdminPreview = {
  reviewSchemaEnabled: boolean;
  aggregateSchemaEnabled: boolean;
  eligibleReviews: Array<{
    id: string;
    customerName: string;
    rating: number;
    serviceSlug?: string;
    platform?: PlatformId;
  }>;
  excludedReviews: Array<{
    id: string;
    customerName: string;
    reasons: SchemaExclusionReason[];
  }>;
  aggregate: AggregateRatingResult | null;
  entityValid: boolean;
  canGenerateReviewSchema: boolean;
  canGenerateAggregateRating: boolean;
};
