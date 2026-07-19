/**
 * SEO & metadata QA — Document 15.09.
 */

import {
  validateArticleCanonical,
  validateArticleSchema,
  validateArticleSeo,
} from '@/lib/learn/article-seo';
import { toArticleSeoRecord } from '@/lib/learn/article-seo/record';
import type { LearnArticleRecord } from '@/types/learn';
import type { QAIssue } from '@/types/learn-qa';
import type { RunArticleQAOptions } from '@/types/learn-qa';
import type { QAArticleSource } from '@/lib/learn/qa/text';

export function validateSEO(
  article: QAArticleSource,
  options: RunArticleQAOptions = {},
): QAIssue[] {
  const issues: QAIssue[] = [];
  const seo = toArticleSeoRecord(article as LearnArticleRecord);

  if (!article.seo.title?.trim()) {
    issues.push({
      severity: 'blocker',
      area: 'seo',
      code: 'missing_meta_title',
      field: 'seo.title',
      message: 'Meta title is required.',
    });
  }

  if (
    !article.seo.description?.trim() ||
    article.seo.description.trim().length < 40
  ) {
    issues.push({
      severity: 'blocker',
      area: 'seo',
      code: 'missing_meta_description',
      field: 'seo.description',
      message: 'Meta description must be present and at least 40 characters.',
    });
  }

  const canonicalIssues = validateArticleCanonical(
    article.slug,
    article.seo.canonicalPath ?? `/learn/${article.slug}`,
  );
  for (const issue of canonicalIssues) {
    issues.push({
      severity: issue.severity === 'blocker' ? 'blocker' : 'error',
      area: 'seo',
      code: issue.code,
      field: issue.field ?? 'canonical',
      message: issue.message,
    });
  }

  const seoResult = validateArticleSeo(seo);
  for (const issue of seoResult.issues) {
    if (
      issue.code === 'missing_title' ||
      issue.code === 'missing_description' ||
      issue.code === 'draft_indexable'
    ) {
      continue;
    }
    issues.push({
      severity:
        issue.severity === 'blocker'
          ? 'blocker'
          : issue.severity === 'error'
            ? 'error'
            : issue.severity === 'warning'
              ? 'warning'
              : 'recommendation',
      area: issue.code.includes('schema') ? 'schema' : 'seo',
      code: issue.code,
      field: issue.field,
      message: issue.message,
    });
  }

  for (const issue of validateArticleSchema(seo)) {
    if (!issues.some((i) => i.code === issue.code)) {
      issues.push({
        severity: issue.severity === 'blocker' ? 'blocker' : 'error',
        area: 'schema',
        code: issue.code,
        field: issue.field,
        message: issue.message,
      });
    }
  }

  const peers = options.peers ?? [];
  const metaTitleKey = article.seo.title.trim().toLowerCase();
  if (metaTitleKey) {
    const dup = peers.find(
      (peer) =>
        peer.slug !== article.slug &&
        peer.seo.title.trim().toLowerCase() === metaTitleKey,
    );
    if (dup) {
      issues.push({
        severity: 'blocker',
        area: 'metadata',
        code: 'duplicate_meta_title',
        field: 'seo.title',
        message: `Meta title duplicates "${dup.slug}".`,
      });
    }
  }

  if (!article.seoReviewed) {
    issues.push({
      severity: 'blocker',
      area: 'seo',
      code: 'seo_not_reviewed',
      field: 'seoReviewed',
      message: 'SEO review flag must be set before publishing.',
    });
  }

  return issues;
}
