/**
 * Grammar, readability, and mobile QA — Document 15.09.
 */

import { findGrammarHeuristics } from '@/lib/learn/qa/claims';
import { collectArticlePlainText, type QAArticleSource } from '@/lib/learn/qa/text';
import type { QAIssue } from '@/types/learn-qa';

export function validateGrammar(article: QAArticleSource): QAIssue[] {
  const issues: QAIssue[] = [];
  const text = collectArticlePlainText(article);

  for (const hit of findGrammarHeuristics(text)) {
    issues.push({
      severity: 'warning',
      area: 'grammar',
      code: 'grammar_heuristic',
      field: 'content',
      message: `Grammar/spelling heuristic: ${hit}. Review manually — do not auto-rewrite.`,
    });
  }

  if (!article.contentReviewed) {
    issues.push({
      severity: 'blocker',
      area: 'grammar',
      code: 'content_not_reviewed',
      field: 'contentReviewed',
      message:
        'Grammar, facts, and unsupported-claim review must be attested (contentReviewed).',
    });
  }

  return issues;
}

export function validateReadability(article: QAArticleSource): QAIssue[] {
  const issues: QAIssue[] = [];
  const text = collectArticlePlainText(article);
  const words = text.trim().split(/\s+/).filter(Boolean);
  const sentences = text.split(/[.!?]+/).filter((s) => s.trim().length > 0);

  if (words.length < 80) {
    issues.push({
      severity: 'warning',
      area: 'readability',
      code: 'low_word_count',
      field: 'content',
      message: 'Body appears very short for a Learn article (< 80 words scanned).',
    });
  }

  if (sentences.length > 0) {
    const avg = words.length / sentences.length;
    if (avg > 35) {
      issues.push({
        severity: 'recommendation',
        area: 'readability',
        code: 'long_sentences',
        field: 'content',
        message: `Average sentence length is high (~${Math.round(avg)} words). Consider shorter sentences.`,
      });
    }
  }

  if (article.readingTime > 20) {
    issues.push({
      severity: 'recommendation',
      area: 'readability',
      code: 'long_read',
      field: 'readingTime',
      message: 'Reading time exceeds 20 minutes — consider splitting into a series.',
    });
  }

  return issues;
}

export function validateMobile(article: QAArticleSource): QAIssue[] {
  const issues: QAIssue[] = [];

  const hasWideTable = article.blocks.some(
    (block) =>
      (block.type === 'comparison_table' || block.type === 'data_table') &&
      block.headers.length > 4,
  );

  if (hasWideTable) {
    issues.push({
      severity: 'warning',
      area: 'mobile',
      code: 'wide_table',
      field: 'blocks',
      message:
        'Wide tables may overflow on mobile — verify responsive layout before publish.',
    });
  }

  for (const block of article.blocks) {
    if (
      (block.type === 'image' || block.type === 'figure') &&
      (!block.image.width || !block.image.height)
    ) {
      issues.push({
        severity: 'error',
        area: 'mobile',
        code: 'missing_image_dimensions',
        field: block.id,
        message: 'Images need width/height to avoid layout shift on mobile.',
      });
    }
  }

  if (!article.contentReviewed) {
    issues.push({
      severity: 'recommendation',
      area: 'mobile',
      code: 'responsive_unverified',
      field: 'contentReviewed',
      message:
        'Responsive layout should be verified on mobile viewports before publish.',
    });
  }

  return issues;
}
