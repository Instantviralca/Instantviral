/**
 * Learn Categories & Tags types — Document 15.04.
 */

import type { LearnCategoryId, LearnSeoFields } from '@/types/learn';
import type { PlatformId } from '@/types/platform';

/** Registry category record (single source of truth). */
export type CategoryRecord = {
  id: LearnCategoryId;
  slug: string;
  name: string;
  description: string;
  seo: LearnSeoFields;
  featuredImage?: string;
  icon?: string;
  featured: boolean;
  /** Public visibility. Inactive/future categories never render publicly. */
  active: boolean;
  createdAt: string;
  updatedAt: string;
  /** Optional platform affinity for related services. */
  platformId?: PlatformId;
  /** Display order among categories. */
  order: number;
};

/** Safe public category projection. */
export type PublicCategory = {
  id: LearnCategoryId;
  slug: string;
  name: string;
  description: string;
  seo: LearnSeoFields;
  featuredImage?: string;
  icon?: string;
  featured: boolean;
  active: true;
  createdAt: string;
  updatedAt: string;
  platformId?: PlatformId;
  order: number;
  articleCount: number;
  href: string;
};

/** Registry tag record. */
export type TagRecord = {
  id: string;
  slug: string;
  name: string;
  description: string;
  active: boolean;
};

/** Safe public tag projection. */
export type PublicTag = {
  id: string;
  slug: string;
  name: string;
  description: string;
  active: true;
  articleCount: number;
  href: string;
};

export type TaxonomyValidationLevel = 'error' | 'warning';

export type TaxonomyValidationIssue = {
  level: TaxonomyValidationLevel;
  code:
    | 'duplicate_category_slug'
    | 'duplicate_category_id'
    | 'duplicate_tag_slug'
    | 'duplicate_tag_id'
    | 'missing_description'
    | 'empty_category'
    | 'inactive_category_assignment'
    | 'inactive_tag_assignment'
    | 'unknown_tag'
    | 'unknown_category'
    | 'invalid_slug'
    | 'invalid_seo'
    | 'invalid_relationship';
  entity: 'category' | 'tag' | 'article' | 'registry';
  id?: string;
  field?: string;
  message: string;
};

export type TaxonomyValidationReport = {
  valid: boolean;
  generatedAt: string;
  categoryCount: number;
  tagCount: number;
  activeCategoryCount: number;
  activeTagCount: number;
  issues: TaxonomyValidationIssue[];
  duplicateCategorySlugs: string[];
  duplicateTagSlugs: string[];
};

export type CategoryValidationIssue = {
  level: TaxonomyValidationLevel;
  field: string;
  message: string;
};

export type CategoryValidationResult = {
  valid: boolean;
  issues: CategoryValidationIssue[];
};

export type TagValidationIssue = {
  level: TaxonomyValidationLevel;
  field: string;
  message: string;
};

export type TagValidationResult = {
  valid: boolean;
  issues: TagValidationIssue[];
};

/** Pagination readiness for category/tag listing UIs. */
export type TaxonomyPagination = {
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
};
