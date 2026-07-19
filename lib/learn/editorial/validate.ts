/**
 * Publishing checklist & validation — Document 15.08.
 * Integrates Editorial QA (15.09) so blockers prevent publishing.
 */

import { getAuthorById } from '@/lib/authors';
import { getLearnCategoryById } from '@/data/learn/categories';
import { getLearnTagBySlug } from '@/data/learn/tags';
import {
  validateArticleImages,
  validateArticleLinks,
  validateHeadingHierarchy,
} from '@/lib/learn/article/template';
import {
  validateArticleCanonical,
  validateArticleSchema,
  validateArticleSeo,
} from '@/lib/learn/article-seo';
import { toArticleSeoRecord } from '@/lib/learn/article-seo/record';
import { runArticleQA } from '@/lib/learn/qa';
import type { LearnArticleRecord } from '@/types/learn';
import type {
  EditorialIssue,
  LearnArticleRecordMutable,
  PublishingChecklistItem,
} from '@/types/learn-editorial';

type PublishableArticle = LearnArticleRecord | LearnArticleRecordMutable;

function hasH1Title(article: PublishableArticle): boolean {
  return Boolean(article.title?.trim());
}

function hasInternalLinks(article: PublishableArticle): boolean {
  const fromBlocks = article.blocks.some(
    (block) =>
      block.type === 'internal_cta' ||
      block.type === 'related_service_card' ||
      (block.type === 'paragraph' && /\]\(\//.test(block.text)),
  );
  return (
    fromBlocks ||
    article.relatedServices.length > 0 ||
    Boolean(article.serviceCta)
  );
}

function hasBrokenLinks(article: PublishableArticle): boolean {
  return validateArticleLinks(article).some(
    (issue) =>
      issue.code === 'invalid_link' ||
      issue.code === 'invalid_service',
  );
}

function accessibilityPassed(article: PublishableArticle): boolean {
  const imageIssues = validateArticleImages(article);
  const headingIssues = validateHeadingHierarchy(article.blocks);
  const missingAlt = imageIssues.some((i) =>
    i.detail?.toLowerCase().includes('alt'),
  );
  return imageIssues.length === 0 && headingIssues.length === 0 && !missingAlt;
}

function schemaValid(article: PublishableArticle): boolean {
  const seo = toArticleSeoRecord(article as LearnArticleRecord);
  return validateArticleSchema(seo).length === 0;
}

function tagsValid(article: PublishableArticle): boolean {
  if (article.tags.length === 0) return false;
  return article.tags.every((slug) => {
    const tag = getLearnTagBySlug(slug);
    return Boolean(tag?.active);
  });
}

function relatedArticlesValid(article: PublishableArticle): boolean {
  if (article.relatedArticles.length === 0) return false;
  return !article.relatedArticles.includes(article.slug);
}

/**
 * Editorial checklist used by UI and gatekeeping.
 * Required items must pass before publish/schedule activation.
 */
export function getPublishingChecklist(
  article: PublishableArticle,
): PublishingChecklistItem[] {
  const category = getLearnCategoryById(article.category);
  const author = getAuthorById(article.authorId);
  const seo = toArticleSeoRecord(article as LearnArticleRecord);
  const canonicalIssues = validateArticleCanonical(
    article.slug,
    article.seo.canonicalPath ?? `/learn/${article.slug}`,
  );
  const imageOk =
    Boolean(article.featuredImage) &&
    validateArticleImages(article).length === 0;
  const seoResult = validateArticleSeo(seo);
  const qa = runArticleQA(article);

  return [
    {
      id: 'h1',
      label: 'H1 exists',
      group: 'content',
      required: true,
      passed: hasH1Title(article),
      detail: hasH1Title(article) ? undefined : 'Article title (H1) is required.',
    },
    {
      id: 'meta_title',
      label: 'Meta title',
      group: 'seo',
      required: true,
      passed: Boolean(article.seo.title?.trim()),
    },
    {
      id: 'meta_description',
      label: 'Meta description',
      group: 'seo',
      required: true,
      passed:
        Boolean(article.seo.description?.trim()) &&
        article.seo.description.trim().length >= 40,
    },
    {
      id: 'canonical',
      label: 'Canonical',
      group: 'seo',
      required: true,
      passed: canonicalIssues.length === 0,
      detail: canonicalIssues[0]?.message,
    },
    {
      id: 'author',
      label: 'Author assigned',
      group: 'editorial',
      required: true,
      passed: Boolean(article.authorId && author),
      detail: author ? undefined : 'Author must exist in the Author System.',
    },
    {
      id: 'featured_image',
      label: 'Featured image',
      group: 'content',
      required: true,
      passed: imageOk,
    },
    {
      id: 'category',
      label: 'Category assigned',
      group: 'editorial',
      required: true,
      passed: Boolean(category?.active),
    },
    {
      id: 'tags',
      label: 'Valid tags',
      group: 'editorial',
      required: true,
      passed: tagsValid(article),
    },
    {
      id: 'reading_time',
      label: 'Reading time',
      group: 'content',
      required: true,
      passed: Number.isFinite(article.readingTime) && article.readingTime > 0,
    },
    {
      id: 'related_articles',
      label: 'Related articles',
      group: 'links',
      required: true,
      passed: relatedArticlesValid(article),
      detail: relatedArticlesValid(article)
        ? undefined
        : 'At least one related article slug is required (not self).',
    },
    {
      id: 'internal_links',
      label: 'Internal links',
      group: 'links',
      required: true,
      passed: hasInternalLinks(article),
    },
    {
      id: 'schema',
      label: 'Schema validation',
      group: 'schema',
      required: true,
      passed: schemaValid(article) && seoResult.valid,
    },
    {
      id: 'accessibility',
      label: 'Accessibility validation',
      group: 'accessibility',
      required: true,
      passed: accessibilityPassed(article),
    },
    {
      id: 'broken_links',
      label: 'No broken links',
      group: 'links',
      required: true,
      passed: !hasBrokenLinks(article),
    },
    {
      id: 'seo_reviewed',
      label: 'SEO complete',
      group: 'editorial',
      required: true,
      passed: Boolean(article.seoReviewed),
    },
    {
      id: 'content_reviewed',
      label: 'Grammar & facts reviewed',
      group: 'editorial',
      required: true,
      passed: Boolean(article.contentReviewed),
      detail: 'contentReviewed covers grammar, facts, and unsupported claims.',
    },
    {
      id: 'editorial_qa',
      label: 'Editorial QA passed',
      group: 'editorial',
      required: true,
      passed: qa.canPublish,
      detail: qa.canPublish
        ? undefined
        : `${qa.counts.blocker} QA blocker(s) must be resolved before publishing.`,
    },
    {
      id: 'images_optimized',
      label: 'Images optimized',
      group: 'content',
      required: false,
      passed: imageOk,
    },
    {
      id: 'responsive_verified',
      label: 'Responsive layout verified',
      group: 'editorial',
      required: false,
      passed: Boolean(article.contentReviewed),
    },
  ];
}

export function validateArticleForPublishing(
  article: PublishableArticle,
): { ok: boolean; issues: EditorialIssue[]; checklist: PublishingChecklistItem[] } {
  const checklist = getPublishingChecklist(article);
  const issues: EditorialIssue[] = [];

  for (const item of checklist) {
    if (item.required && !item.passed) {
      issues.push({
        severity: 'blocker',
        code: `checklist_${item.id}`,
        field: item.id,
        message: item.detail ?? `${item.label} failed publishing validation.`,
      });
    }
  }

  const seo = toArticleSeoRecord(article as LearnArticleRecord);
  const seoResult = validateArticleSeo(seo);
  for (const issue of seoResult.issues) {
    if (issue.severity === 'blocker' || issue.severity === 'error') {
      if (!issues.some((i) => i.code === issue.code)) {
        issues.push({
          severity: issue.severity === 'blocker' ? 'blocker' : 'error',
          code: issue.code,
          field: issue.field,
          message: issue.message,
        });
      }
    }
  }

  const qa = runArticleQA(article);
  for (const issue of qa.issues) {
    if (issue.severity === 'blocker' || issue.severity === 'error') {
      if (!issues.some((i) => i.code === issue.code && i.field === issue.field)) {
        issues.push({
          severity: issue.severity,
          code: `qa_${issue.code}`,
          field: issue.field,
          message: `[QA/${issue.area}] ${issue.message}`,
        });
      }
    }
  }

  const ok = !issues.some(
    (i) => i.severity === 'blocker' || i.severity === 'error',
  );

  return { ok, issues, checklist };
}
