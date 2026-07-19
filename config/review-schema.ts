/**
 * Review schema engine configuration — Document 14.03.
 * Version 1 does not allow manual override of calculated aggregate values.
 */

export type ReviewSchemaEngineConfig = {
  /** Master switch for Review JSON-LD. */
  reviewSchemaEnabled: boolean;
  /** Master switch for AggregateRating JSON-LD. */
  aggregateSchemaEnabled: boolean;
  /** Default rating scale. */
  bestRating: number;
  worstRating: number;
  /** Aggregate ratingValue decimal places. */
  aggregateDecimalPlaces: number;
  /** Require at least this many eligible reviews for aggregate. */
  minimumAggregateCount: number;
};

export const reviewSchemaEngineConfig: ReviewSchemaEngineConfig = {
  reviewSchemaEnabled: true,
  aggregateSchemaEnabled: true,
  bestRating: 5,
  worstRating: 1,
  aggregateDecimalPlaces: 1,
  minimumAggregateCount: 1,
};
