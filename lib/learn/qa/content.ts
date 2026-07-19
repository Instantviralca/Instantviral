/**
 * Content quality QA — Document 15.09.
 */

import { getAuthorById } from '@/lib/authors';
import { getLearnCategoryById } from '@/data/learn/categories';
import { getLearnTagBySlug } from '@/data/learn/tags';
import { validateHeadingHierarchy } from '@/lib/learn/article/template';
import {
  findFakeStatisticSignals,
  findUnsupportedArticleClaims,
} from '@/lib/learn/qa/claims';
import { collectArticlePlainText, type QAArticleSource } from '@/lib/learn/qa/text';
import type { QAIssue } from '@/types/learn-qa';
import type { RunArticleQAOptions } from '@/types/learn-qa';

export function validateContent(
  article: QAArticleSource,
  options: RunArticleQAOptions = {},
): QAIssue[] {
  const issues: QAIssue[] = [];
  const text = collectArticlePlainText(article);

  if (!article.title?.trim()) {
    issues.push({
      severity: 'blocker',
      area: 'content',
      code: 'missing_h1',
      field: 'title',
      message: 'Article must have one H1 (title).',
    });
  }

  // Template headings are H2/H3 only — flag empty heading text.
  for (const block of article.blocks) {
    if (block.type === 'heading' && !block.text.trim()) {
      issues.push({
        severity: 'error',
        area: 'content',
        code: 'empty_heading',
        field: block.id,
        message: 'Heading blocks must not be empty.',
      });
    }
  }

  for (const issue of validateHeadingHierarchy(article.blocks)) {
    issues.push({
      severity: 'error',
      area: 'content',
      code: issue.code,
      field: issue.field,
      message: issue.detail ?? 'Heading hierarchy issue.',
    });
  }

  if (!article.excerpt?.trim() || article.excerpt.trim().length < 20) {
    issues.push({
      severity: 'error',
      area: 'content',
      code: 'weak_excerpt',
      field: 'excerpt',
      message: 'Excerpt must be present and substantive (20+ characters).',
    });
  }

  if (!Number.isFinite(article.readingTime) || article.readingTime <= 0) {
    issues.push({
      severity: 'blocker',
      area: 'content',
      code: 'missing_reading_time',
      field: 'readingTime',
      message: 'Reading time must be a positive number.',
    });
  }

  const category = getLearnCategoryById(article.category);
  if (!category?.active) {
    issues.push({
      severity: 'blocker',
      area: 'content',
      code: 'invalid_category',
      field: 'category',
      message: 'An active category must be assigned.',
    });
  }

  if (article.tags.length === 0) {
    issues.push({
      severity: 'blocker',
      area: 'content',
      code: 'missing_tags',
      field: 'tags',
      message: 'At least one active tag is required.',
    });
  } else {
    for (const tag of article.tags) {
      if (!getLearnTagBySlug(tag)?.active) {
        issues.push({
          severity: 'error',
          area: 'content',
          code: 'invalid_tag',
          field: 'tags',
          message: `Tag "${tag}" is missing or inactive — do not invent tags.`,
        });
      }
    }
  }

  if (!article.authorId || !getAuthorById(article.authorId)) {
    issues.push({
      severity: 'blocker',
      area: 'content',
      code: 'missing_author',
      field: 'authorId',
      message: 'Author must be assigned and exist in the Author System.',
    });
  }

  if (article.relatedArticles.length === 0) {
    issues.push({
      severity: 'blocker',
      area: 'content',
      code: 'missing_related_articles',
      field: 'relatedArticles',
      message: 'At least one related article reference is required.',
    });
  } else if (article.relatedArticles.includes(article.slug)) {
    issues.push({
      severity: 'error',
      area: 'content',
      code: 'self_related_article',
      field: 'relatedArticles',
      message: 'Related articles must not include the current article.',
    });
  }

  for (const claim of findUnsupportedArticleClaims(text)) {
    issues.push({
      severity: claim.severity,
      area: 'content',
      code: 'unsupported_claim',
      field: 'content',
      message: `Unsupported marketing claim detected: ${claim.label}. Do not fabricate a replacement — revise editorially.`,
    });
  }

  for (const signal of findFakeStatisticSignals(text)) {
    issues.push({
      severity: 'error',
      area: 'content',
      code: 'fake_statistics_signal',
      field: 'content',
      message: `Possible unsourced or fabricated statistic: ${signal}.`,
    });
  }

  const peers = options.peers ?? [];
  const titleKey = article.title.trim().toLowerCase();
  const duplicateTitle = peers.find(
    (peer) =>
      peer.id !== article.id &&
      peer.slug !== article.slug &&
      peer.title.trim().toLowerCase() === titleKey,
  );
  if (duplicateTitle) {
    issues.push({
      severity: 'blocker',
      area: 'content',
      code: 'duplicate_title',
      field: 'title',
      message: `Duplicate article title with "${duplicateTitle.slug}". Titles must be unique.`,
    });
  }

  const excerptKey = article.excerpt.trim().toLowerCase();
  if (excerptKey.length >= 40) {
    const duplicateExcerpt = peers.find(
      (peer) =>
        peer.id !== article.id &&
        peer.slug !== article.slug &&
        peer.seo.description.trim().toLowerCase() === excerptKey,
    );
    if (duplicateExcerpt) {
      issues.push({
        severity: 'warning',
        area: 'content',
        code: 'duplicate_content_signal',
        field: 'excerpt',
        message: `Excerpt matches another article's meta description ("${duplicateExcerpt.slug}").`,
      });
    }
  }

  if (article.blocks.length < 2) {
    issues.push({
      severity: 'warning',
      area: 'content',
      code: 'thin_content',
      field: 'blocks',
      message: 'Article body looks thin — expand with substantive sections before publish.',
    });
  }

  return issues;
}
