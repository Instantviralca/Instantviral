/**
 * Learn Search & Filters types — Document 15.05.
 */

import type { LearnCategoryId } from '@/types/learn';
import type { PlatformId } from '@/types/platform';

export type LearnSearchPlatform = PlatformId | 'general';

export type LearnReadingTimeFilter =
  | 'under-5'
  | '5-10'
  | '10-15'
  | 'over-15';

export type LearnSortOption =
  | 'relevance'
  | 'newest'
  | 'oldest'
  | 'updated'
  | 'shortest'
  | 'longest';

/**
 * Safe searchable document — no article body, drafts, or private fields.
 */
export type ArticleSearchDocument = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  categoryId: LearnCategoryId;
  categorySlug: string;
  categoryName: string;
  tags: readonly string[];
  platform: LearnSearchPlatform;
  authorName: string;
  keywords: readonly string[];
  /** Optional short summary (never private notes). */
  summary?: string;
  readingTime: number;
  publishedAt: string;
  updatedAt: string;
  featured: boolean;
  href: string;
};

export type LearnSearchFilters = {
  category?: string;
  tag?: string;
  platform?: LearnSearchPlatform;
  readingTime?: LearnReadingTimeFilter;
  featured?: boolean;
};

export type LearnSearchState = LearnSearchFilters & {
  q: string;
  sort: LearnSortOption;
  page: number;
};

export type RankedSearchHit = {
  document: ArticleSearchDocument;
  score: number;
  reasons: readonly string[];
};

export type LearnSearchResultPage = {
  items: ArticleSearchDocument[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};

export type LearnFilterValidationIssue = {
  field: keyof LearnSearchState | 'unknown';
  value: string;
  message: string;
};

export type LearnFilterValidationResult = {
  valid: boolean;
  state: LearnSearchState;
  ignored: LearnFilterValidationIssue[];
};

export type ActiveFilterChip = {
  id: string;
  field: keyof LearnSearchFilters | 'q';
  label: string;
  value: string;
  removeLabel: string;
};

/** Future provider abstraction — Version 1 is local index only. */
export type LearnSearchProviderId = 'local' | 'server' | 'meilisearch' | 'algolia' | 'typesense';
