/**
 * Broken-link detection — Document 14.05.
 */

import { validateInternalLinks } from '@/lib/linking/validate';
import type { LinkValidationIssue, LinkValidationReport } from '@/types/linking';

const BROKEN_KINDS = new Set([
  'broken_route',
  'inactive_destination',
  'skipped_service',
  'empty_anchor',
]);

/**
 * Broken / inactive / skipped outbound links from the registry.
 */
export function findBrokenLinks(
  report?: LinkValidationReport,
): LinkValidationIssue[] {
  const issues = report?.issues ?? validateInternalLinks().issues;
  return issues.filter((issue) => BROKEN_KINDS.has(issue.kind));
}

/** Narrow filter for truly unknown routes only. */
export function findUnknownRoutes(
  report?: LinkValidationReport,
): LinkValidationIssue[] {
  const issues = report?.issues ?? validateInternalLinks().issues;
  return issues.filter((issue) => issue.kind === 'broken_route');
}
