/**
 * runArticleQA + generateQAReport — Document 15.09.
 */

import { LEARN_ARTICLES } from '@/data/learn/articles';
import { validateAccessibility } from '@/lib/learn/qa/accessibility';
import { buildQAChecklist } from '@/lib/learn/qa/checklist';
import { validateContent } from '@/lib/learn/qa/content';
import {
  validateGrammar,
  validateMobile,
  validateReadability,
} from '@/lib/learn/qa/grammar-readability-mobile';
import { validateImages } from '@/lib/learn/qa/images';
import { validateLinks } from '@/lib/learn/qa/links';
import { validateSEO } from '@/lib/learn/qa/seo';
import type { QAArticleSource } from '@/lib/learn/qa/text';
import type {
  QAArea,
  QAAreaSummary,
  QAIssue,
  QAReport,
  QAStatus,
  RunArticleQAOptions,
} from '@/types/learn-qa';

const AREA_LABELS: Record<QAArea, string> = {
  content: 'Content quality',
  seo: 'SEO',
  accessibility: 'Accessibility',
  grammar: 'Grammar',
  links: 'Links',
  images: 'Images',
  metadata: 'Metadata',
  schema: 'Structured data',
  readability: 'Readability',
  mobile: 'Mobile responsiveness',
};

function countBySeverity(issues: QAIssue[]) {
  const counts = {
    blocker: 0,
    error: 0,
    warning: 0,
    recommendation: 0,
    total: issues.length,
  };
  for (const issue of issues) {
    counts[issue.severity] += 1;
  }
  return counts;
}

function summarizeAreas(issues: QAIssue[]): QAAreaSummary[] {
  return (Object.keys(AREA_LABELS) as QAArea[]).map((area) => {
    const areaIssues = issues.filter((i) => i.area === area);
    const blockerCount = areaIssues.filter((i) => i.severity === 'blocker').length;
    const errorCount = areaIssues.filter((i) => i.severity === 'error').length;
    return {
      area,
      label: AREA_LABELS[area],
      passed: blockerCount === 0 && errorCount === 0,
      issueCount: areaIssues.length,
      blockerCount,
      errorCount,
    };
  });
}

function resolveStatus(
  issues: QAIssue[],
  counts: ReturnType<typeof countBySeverity>,
): QAStatus {
  if (counts.total === 0) return 'passed';
  if (counts.blocker > 0) return 'failed';
  if (counts.error > 0) return 'failed';
  if (counts.warning > 0) return 'requires_review';
  if (issues.length === 0) return 'passed';
  return 'passed';
}

function defaultPeers(article: QAArticleSource, options: RunArticleQAOptions) {
  if (options.peers) return options.peers;
  return LEARN_ARTICLES.filter(
    (peer) => peer.id !== article.id && peer.slug !== article.slug,
  ).map((peer) => ({
    id: peer.id,
    slug: peer.slug,
    title: peer.title,
    seo: { title: peer.seo.title, description: peer.seo.description },
  }));
}

/**
 * Run the full Editorial QA suite for an article.
 * Detection only — never fabricates fixes or missing content.
 */
export function runArticleQA(
  article: QAArticleSource,
  options: RunArticleQAOptions = {},
): QAReport {
  const peers = defaultPeers(article, options);
  const opts = { ...options, peers };

  const issues: QAIssue[] = [
    ...validateContent(article, opts),
    ...validateSEO(article, opts),
    ...validateAccessibility(article),
    ...validateLinks(article),
    ...validateImages(article),
    ...validateGrammar(article),
    ...validateReadability(article),
    ...validateMobile(article),
  ];

  // Dedupe by code+field+message
  const seen = new Set<string>();
  const deduped = issues.filter((issue) => {
    const key = `${issue.code}|${issue.field ?? ''}|${issue.message}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  return generateQAReport(article, deduped, options.generatedAt);
}

export function generateQAReport(
  article: Pick<QAArticleSource, 'id' | 'slug'>,
  issues: QAIssue[],
  generatedAt = new Date().toISOString(),
): QAReport {
  const counts = countBySeverity(issues);
  const status = resolveStatus(issues, counts);
  const checklist = buildQAChecklist(issues);

  return {
    articleId: article.id,
    slug: article.slug,
    status,
    generatedAt,
    passed: counts.blocker === 0 && counts.error === 0,
    canPublish: counts.blocker === 0,
    issues,
    checklist,
    areas: summarizeAreas(issues),
    counts,
  };
}

export function qaStatusLabel(status: QAStatus): string {
  const labels: Record<QAStatus, string> = {
    not_started: 'Not Started',
    in_progress: 'In Progress',
    passed: 'Passed',
    failed: 'Failed',
    requires_review: 'Requires Review',
  };
  return labels[status];
}
