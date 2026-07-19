/**
 * Accessibility QA — Document 15.09.
 */

import {
  validateArticleImages,
  validateHeadingHierarchy,
} from '@/lib/learn/article/template';
import type { QAIssue } from '@/types/learn-qa';
import type { QAArticleSource } from '@/lib/learn/qa/text';

export function validateAccessibility(article: QAArticleSource): QAIssue[] {
  const issues: QAIssue[] = [];

  for (const issue of validateHeadingHierarchy(article.blocks)) {
    issues.push({
      severity: 'error',
      area: 'accessibility',
      code: issue.code,
      field: issue.field,
      message: issue.detail ?? 'Heading accessibility issue.',
    });
  }

  for (const issue of validateArticleImages(article)) {
    const isAlt = issue.detail?.toLowerCase().includes('alt');
    issues.push({
      severity: isAlt ? 'blocker' : 'error',
      area: 'accessibility',
      code: issue.code,
      field: issue.field,
      message: issue.detail ?? 'Image accessibility issue.',
    });
  }

  if (article.featuredImage && !article.featuredImage.decorative) {
    if (!article.featuredImage.alt?.trim()) {
      issues.push({
        severity: 'blocker',
        area: 'accessibility',
        code: 'missing_featured_alt',
        field: 'featuredImage.alt',
        message: 'Featured image requires descriptive alt text.',
      });
    }
  }

  for (const block of article.blocks) {
    if (block.type === 'internal_cta' && !block.label.trim()) {
      issues.push({
        severity: 'error',
        area: 'accessibility',
        code: 'empty_cta_label',
        field: block.id,
        message: 'Internal CTA must have an accessible label.',
      });
    }
  }

  return issues;
}
