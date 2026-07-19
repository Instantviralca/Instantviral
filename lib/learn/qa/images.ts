/**
 * Image QA — Document 15.09.
 */

import { validateArticleImages } from '@/lib/learn/article/template';
import type { QAIssue } from '@/types/learn-qa';
import type { QAArticleSource } from '@/lib/learn/qa/text';

export function validateImages(article: QAArticleSource): QAIssue[] {
  const issues: QAIssue[] = [];

  if (!article.featuredImage) {
    issues.push({
      severity: 'blocker',
      area: 'images',
      code: 'missing_featured_image',
      field: 'featuredImage',
      message: 'Featured image is required before publishing.',
    });
  }

  for (const issue of validateArticleImages(article)) {
    issues.push({
      severity: 'error',
      area: 'images',
      code: issue.code,
      field: issue.field,
      message: issue.detail ?? 'Image validation failed.',
    });
  }

  if (article.featuredImage) {
    const img = article.featuredImage;
    if (img.width < 600 || img.height < 315) {
      issues.push({
        severity: 'warning',
        area: 'images',
        code: 'small_featured_image',
        field: 'featuredImage',
        message:
          'Featured image is below recommended social share dimensions (600×315).',
      });
    }
  }

  return issues;
}
