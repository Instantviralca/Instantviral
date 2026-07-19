/**
 * QA checklist builder — Document 15.09.
 */

import type { QAChecklistItem, QAIssue } from '@/types/learn-qa';

function passed(issues: QAIssue[], codes: string[]): boolean {
  return !issues.some(
    (issue) =>
      codes.includes(issue.code) &&
      (issue.severity === 'blocker' || issue.severity === 'error'),
  );
}

function areaClean(
  issues: QAIssue[],
  area: QAIssue['area'],
  severities: Array<QAIssue['severity']> = ['blocker', 'error'],
): boolean {
  return !issues.some(
    (issue) => issue.area === area && severities.includes(issue.severity),
  );
}

export function buildQAChecklist(issues: QAIssue[]): QAChecklistItem[] {
  return [
    {
      id: 'one_h1',
      label: 'One H1',
      area: 'content',
      required: true,
      passed: passed(issues, ['missing_h1']),
    },
    {
      id: 'logical_headings',
      label: 'Logical headings',
      area: 'content',
      required: true,
      passed: !issues.some(
        (i) =>
          (i.code === 'heading_hierarchy' || i.code === 'empty_heading') &&
          (i.severity === 'blocker' || i.severity === 'error'),
      ),
    },
    {
      id: 'unique_title',
      label: 'Unique title',
      area: 'content',
      required: true,
      passed: passed(issues, ['duplicate_title', 'duplicate_meta_title']),
    },
    {
      id: 'meta_description',
      label: 'Meta description',
      area: 'seo',
      required: true,
      passed: passed(issues, ['missing_meta_description']),
    },
    {
      id: 'canonical',
      label: 'Canonical URL',
      area: 'seo',
      required: true,
      passed: areaClean(
        issues.filter((i) => i.field === 'canonical' || i.code.includes('canonical')),
        'seo',
      ) && !issues.some((i) => i.code.includes('canonical') && i.severity === 'blocker'),
    },
    {
      id: 'valid_schema',
      label: 'Valid schema',
      area: 'schema',
      required: true,
      passed: areaClean(issues, 'schema'),
    },
    {
      id: 'author',
      label: 'Author assigned',
      area: 'content',
      required: true,
      passed: passed(issues, ['missing_author']),
    },
    {
      id: 'featured_image',
      label: 'Featured image',
      area: 'images',
      required: true,
      passed: passed(issues, ['missing_featured_image']),
    },
    {
      id: 'alt_text',
      label: 'Alt text',
      area: 'accessibility',
      required: true,
      passed: !issues.some(
        (i) =>
          (i.code === 'missing_featured_alt' ||
            i.message.toLowerCase().includes('alt')) &&
          (i.severity === 'blocker' || i.severity === 'error'),
      ),
    },
    {
      id: 'category',
      label: 'Category',
      area: 'content',
      required: true,
      passed: passed(issues, ['invalid_category']),
    },
    {
      id: 'tags',
      label: 'Tags',
      area: 'content',
      required: true,
      passed: passed(issues, ['missing_tags', 'invalid_tag']),
    },
    {
      id: 'related_articles',
      label: 'Related articles',
      area: 'content',
      required: true,
      passed: passed(issues, ['missing_related_articles', 'self_related_article']),
    },
    {
      id: 'reading_time',
      label: 'Reading time',
      area: 'content',
      required: true,
      passed: passed(issues, ['missing_reading_time']),
    },
    {
      id: 'no_broken_links',
      label: 'No broken links',
      area: 'links',
      required: true,
      passed: !issues.some(
        (i) =>
          i.area === 'links' &&
          (i.severity === 'blocker' || i.severity === 'error') &&
          (i.code === 'invalid_link' ||
            i.code === 'invalid_service' ||
            i.code === 'empty_href' ||
            i.code === 'insecure_external_link' ||
            i.code === 'insecure_image_source'),
      ),
    },
    {
      id: 'accessibility',
      label: 'Accessibility compliance',
      area: 'accessibility',
      required: true,
      passed: areaClean(issues, 'accessibility'),
    },
    {
      id: 'responsive',
      label: 'Responsive layout',
      area: 'mobile',
      required: false,
      passed: !issues.some(
        (i) =>
          i.area === 'mobile' &&
          (i.severity === 'blocker' || i.severity === 'error'),
      ),
    },
    {
      id: 'grammar',
      label: 'Grammar and spelling',
      area: 'grammar',
      required: true,
      passed: passed(issues, ['content_not_reviewed']),
    },
    {
      id: 'unsupported_claims',
      label: 'No unsupported claims',
      area: 'content',
      required: true,
      passed: !issues.some(
        (i) =>
          i.code === 'unsupported_claim' &&
          (i.severity === 'blocker' || i.severity === 'error'),
      ),
    },
    {
      id: 'fake_statistics',
      label: 'No fake statistics',
      area: 'content',
      required: true,
      passed: !issues.some(
        (i) =>
          i.code === 'fake_statistics_signal' &&
          (i.severity === 'blocker' || i.severity === 'error'),
      ),
    },
    {
      id: 'duplicate_content',
      label: 'No duplicate content',
      area: 'content',
      required: true,
      passed: passed(issues, ['duplicate_title', 'duplicate_meta_title']),
    },
  ];
}
