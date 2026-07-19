export {
  validateRatingValue,
  validateReviewedEntity,
  matchesReviewedEntity,
  getPublicReviewAuthor,
  sanitizeReviewForSchema,
  getSchemaEligibleReviews,
  calculateAggregateRating,
  canGenerateReviewSchema,
  canGenerateAggregateRating,
  buildReviewSchema,
  buildAggregateRatingSchema,
  buildReviewSchemaBundle,
  buildReviewSchemaAdminPreview,
} from '@/lib/reviews/schema-engine/engine';

export {
  isPlaceholderReview,
  looksLikePlaceholderText,
} from '@/lib/reviews/schema-engine/placeholders';

export {
  logSchemaEngineEvent,
  getSchemaEngineLogs,
  clearSchemaEngineLogs,
} from '@/lib/reviews/schema-engine/logging';
