/**
 * Public projection safety — Document 15.08.
 * Strip internal editorial fields; never leak drafts/scheduled content.
 */

import type { LearnArticleRecord, PublicLearnArticle } from '@/types/learn';
import type { LearnArticleRecordMutable } from '@/types/learn-editorial';
import { isPublicLiveArticle } from '@/lib/learn/editorial/status';

const PRIVATE_EDITORIAL_KEYS = [
  'approvedBy',
  'reviewedBy',
  'reviewNotes',
  'scheduledAt',
  'seoReviewed',
  'contentReviewed',
  'lastEditorialUpdate',
] as const;

export type StrippedEditorialArticle = Omit<
  LearnArticleRecord,
  (typeof PRIVATE_EDITORIAL_KEYS)[number]
>;

/** Remove internal editorial metadata from any public-facing payload. */
export function stripEditorialFields<T extends Record<string, unknown>>(
  article: T,
): Omit<T, (typeof PRIVATE_EDITORIAL_KEYS)[number]> {
  const clone = { ...article };
  for (const key of PRIVATE_EDITORIAL_KEYS) {
    delete clone[key];
  }
  return clone;
}

/**
 * Guard: only live published/updated articles may become public projections.
 * Returns undefined for draft, review, approved, scheduled, archived.
 */
export function assertPublicArticleAccess(
  article: LearnArticleRecord | LearnArticleRecordMutable | undefined,
): article is LearnArticleRecord {
  return Boolean(article && isPublicLiveArticle(article));
}

/** Keys that must never appear on PublicLearnArticle. */
export function publicArticleHasPrivateFields(
  article: PublicLearnArticle | Record<string, unknown>,
): boolean {
  return PRIVATE_EDITORIAL_KEYS.some((key) => key in article);
}
