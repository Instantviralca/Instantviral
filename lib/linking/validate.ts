/**
 * Internal link validation — Document 14.05.
 * Reports issues; does not silently ignore them.
 */

import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import {
  getLinkPageBySlug,
  getLinkRegistry,
  linkPageHref,
} from '@/data/linking/registry';
import { isGenericAnchor } from '@/lib/linking/anchors';
import type {
  LinkPage,
  LinkValidationIssue,
  LinkValidationReport,
} from '@/types/linking';

function pushIssue(
  issues: LinkValidationIssue[],
  issue: LinkValidationIssue,
): void {
  issues.push(issue);
}

function validateOutboundRefs(
  source: LinkPage,
  targets: string[],
  field: string,
  issues: LinkValidationIssue[],
): void {
  const seen = new Set<string>();

  for (const targetSlug of targets) {
    if (seen.has(targetSlug)) {
      pushIssue(issues, {
        kind: 'duplicate_link',
        sourceSlug: source.slug,
        targetSlug,
        detail: `Duplicate ${field} entry "${targetSlug}" on "${source.slug}".`,
      });
      continue;
    }
    seen.add(targetSlug);

    const target = getLinkPageBySlug(targetSlug);
    if (!target) {
      pushIssue(issues, {
        kind: 'broken_route',
        sourceSlug: source.slug,
        targetSlug,
        href: linkPageHref(targetSlug),
        detail: `${field} points to unknown route "${targetSlug}".`,
      });
      continue;
    }

    if (!target.active) {
      const kind =
        target.category === 'service' && !isApprovedServiceSlug(target.slug)
          ? 'skipped_service'
          : 'inactive_destination';
      pushIssue(issues, {
        kind,
        sourceSlug: source.slug,
        targetSlug,
        href: linkPageHref(targetSlug),
        detail: `${field} points to inactive destination "${targetSlug}".`,
      });
    }
  }
}

function detectCircularBreadcrumbs(
  source: LinkPage,
  issues: LinkValidationIssue[],
): void {
  const visited = new Set<string>();
  let current: string | undefined = source.slug;
  let depth = 0;

  while (current && depth < 20) {
    if (visited.has(current)) {
      pushIssue(issues, {
        kind: 'circular_reference',
        sourceSlug: source.slug,
        targetSlug: current,
        detail: `Circular breadcrumbParent chain involving "${current}".`,
      });
      return;
    }
    visited.add(current);
    const node = getLinkPageBySlug(current);
    current = node?.breadcrumbParent;
    depth += 1;
  }
}

/**
 * Validate the shared link registry outbound relationships.
 */
export function validateInternalLinks(
  registry = getLinkRegistry(),
): LinkValidationReport {
  const issues: LinkValidationIssue[] = [];

  for (const page of registry) {
    validateOutboundRefs(page, page.relatedServices, 'relatedServices', issues);
    validateOutboundRefs(page, page.relatedArticles, 'relatedArticles', issues);
    validateOutboundRefs(
      page,
      page.relatedPolicies,
      'relatedPolicies',
      issues,
    );
    detectCircularBreadcrumbs(page, issues);

    if (!page.title.trim()) {
      pushIssue(issues, {
        kind: 'empty_anchor',
        sourceSlug: page.slug,
        detail: `Page "${page.slug}" has an empty title/anchor.`,
      });
    } else if (isGenericAnchor(page.title) && page.category === 'service') {
      pushIssue(issues, {
        kind: 'generic_anchor',
        sourceSlug: page.slug,
        detail: `Service title looks generic: "${page.title}".`,
      });
    }
  }

  // Active pages must resolve to a href
  for (const page of registry.filter((item) => item.active)) {
    const href = linkPageHref(page.slug);
    if (!href || href.trim() === '') {
      pushIssue(issues, {
        kind: 'broken_route',
        sourceSlug: page.slug,
        detail: `Active page "${page.slug}" has an empty href.`,
      });
    }
  }

  return {
    issues,
    brokenCount: issues.filter((issue) => issue.kind === 'broken_route').length,
    inactiveCount: issues.filter((issue) => issue.kind === 'inactive_destination')
      .length,
    duplicateCount: issues.filter((issue) => issue.kind === 'duplicate_link').length,
    circularCount: issues.filter((issue) => issue.kind === 'circular_reference')
      .length,
    skippedServiceCount: issues.filter((issue) => issue.kind === 'skipped_service')
      .length,
  };
}
