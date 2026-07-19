/**
 * Article SEO & Schema Engine types — Document 15.07.
 */

import type { ArticleImageMeta } from '@/types/learn-article-blocks';
import type { LearnCategoryId } from '@/types/learn';
import type { SeoRobotsPolicy } from '@/types/seo-metadata';

export type ArticleSchemaType =
  | 'Article'
  | 'BlogPosting'
  | 'NewsArticle'
  | 'HowTo';

export type ArticleSeoSeverity =
  | 'blocker'
  | 'error'
  | 'warning'
  | 'recommendation';

/** Full SEO model for a Learn article (registry / editorial). */
export type ArticleSeoRecord = {
  title: string;
  metaTitle: string;
  metaDescription: string;
  canonicalPath: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  robots: SeoRobotsPolicy;
  primaryKeyword?: string;
  secondaryKeywords: readonly string[];
  articleSection?: string;
  publishedAt: string;
  updatedAt: string;
  /** When false, dateModified in schema stays publishedAt. */
  showModifiedDate: boolean;
  featuredImage?: ArticleImageMeta;
  authorId: string;
  schemaType: ArticleSchemaType;
  faqIds: readonly string[];
  active: boolean;
  published: boolean;
  noindex: boolean;
  /** Internal editorial — never expose publicly. */
  seoReviewedAt?: string;
  /** Internal editorial — never expose publicly. */
  seoReviewedBy?: string;
  /** Future publish gate — ISO string; must be <= now to index. */
  scheduledFor?: string;
  slug: string;
  articleId: string;
  categoryId: LearnCategoryId;
  tags: readonly string[];
  excerpt: string;
  href: string;
};

export type ArticleSeoIssue = {
  severity: ArticleSeoSeverity;
  code: string;
  field?: string;
  message: string;
  articleId?: string;
  slug?: string;
};

export type ArticleSeoValidationResult = {
  valid: boolean;
  indexable: boolean;
  issues: ArticleSeoIssue[];
};

export type ArticleSeoEditorialReport = {
  generatedAt: string;
  articleCount: number;
  indexableCount: number;
  duplicateTitles: string[];
  duplicateDescriptions: string[];
  duplicateCanonicals: string[];
  duplicateSlugs: string[];
  keywordConflicts: Array<{
    primaryKeyword: string;
    slugs: string[];
  }>;
  orphanSlugs: string[];
  issues: ArticleSeoIssue[];
};

export type ArticleFaqSchemaItem = {
  id: string;
  question: string;
  answer: string;
  schemaEligible: boolean;
};

export type BuildArticleSchemaOptions = {
  /** FAQs must be visibly rendered and schema-eligible. */
  visibleFaqs?: readonly ArticleFaqSchemaItem[];
  /** Future HowTo — only when genuinely step-by-step. */
  includeHowTo?: boolean;
};
