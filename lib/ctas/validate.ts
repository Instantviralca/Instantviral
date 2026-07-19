/**
 * CTA registry validation — Document 14.06.
 */

import { getCtaRegistry } from '@/data/ctas/registry';
import { validateCtaDestination } from '@/data/ctas/destinations';
import { isGenericAnchor } from '@/lib/linking/anchors';
import type { CtaRecord, CtaValidationIssue, CtaValidationReport } from '@/types/cta';

export function validateCtaRegistry(
  source: CtaRecord[] = getCtaRegistry(),
): CtaValidationReport {
  const issues: CtaValidationIssue[] = [];
  const seenIds = new Set<string>();

  for (const cta of source) {
    if (seenIds.has(cta.id)) {
      issues.push({
        kind: 'duplicate_id',
        ctaId: cta.id,
        detail: `Duplicate CTA id "${cta.id}".`,
      });
    }
    seenIds.add(cta.id);

    if (!cta.buttonLabel.trim()) {
      issues.push({
        kind: 'empty_label',
        ctaId: cta.id,
        detail: `CTA "${cta.id}" has an empty button label.`,
      });
    } else if (isGenericAnchor(cta.buttonLabel) && cta.buttonLabel.toLowerCase() !== 'learn more') {
      // "Learn More" is an approved brand secondary label (Document 07).
      issues.push({
        kind: 'generic_label',
        ctaId: cta.id,
        detail: `CTA "${cta.id}" uses a generic button label "${cta.buttonLabel}".`,
      });
    }

    const destination = validateCtaDestination(cta.destination);
    if (!destination.valid) {
      issues.push({
        kind: destination.reason?.includes('External')
          ? 'external_destination'
          : 'invalid_destination',
        ctaId: cta.id,
        detail: destination.reason ?? 'Invalid destination',
      });
    }

    if (!cta.active) {
      issues.push({
        kind: 'inactive',
        ctaId: cta.id,
        detail: `CTA "${cta.id}" is inactive (hidden from public render).`,
      });
    }
  }

  return {
    issues,
    invalidDestinationCount: issues.filter(
      (issue) =>
        issue.kind === 'invalid_destination' || issue.kind === 'external_destination',
    ).length,
    duplicateIdCount: issues.filter((issue) => issue.kind === 'duplicate_id').length,
    emptyLabelCount: issues.filter((issue) => issue.kind === 'empty_label').length,
  };
}

/** Issues that block public rendering (excludes intentional inactive flags). */
export function getBlockingCtaIssues(
  report?: CtaValidationReport,
): CtaValidationIssue[] {
  const issues = report?.issues ?? validateCtaRegistry().issues;
  return issues.filter((issue) => issue.kind !== 'inactive');
}
