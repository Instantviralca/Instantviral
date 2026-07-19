/**
 * Valid editorial state transitions — Document 15.08.
 */

import type { EditorialArticleStatus, EditorialIssue } from '@/types/learn-editorial';

/**
 * Allowed transitions. Invalid transitions are rejected.
 *
 * Draft → In Review → Approved → Scheduled (optional) → Published
 * Published → Updated (repeatable) → Archived
 */
export const EDITORIAL_TRANSITIONS: Record<
  EditorialArticleStatus,
  readonly EditorialArticleStatus[]
> = {
  draft: ['in_review'],
  in_review: ['draft', 'approved'],
  approved: ['draft', 'scheduled', 'published'],
  scheduled: ['approved', 'published', 'draft'],
  published: ['updated', 'archived'],
  updated: ['updated', 'archived', 'published'],
  archived: ['draft'],
};

export function canTransitionEditorialStatus(
  from: EditorialArticleStatus,
  to: EditorialArticleStatus,
): boolean {
  if (from === to && from === 'updated') return true;
  return EDITORIAL_TRANSITIONS[from].includes(to);
}

export function validatePublishingState(
  from: EditorialArticleStatus,
  to: EditorialArticleStatus,
): EditorialIssue[] {
  if (canTransitionEditorialStatus(from, to)) return [];
  return [
    {
      severity: 'blocker',
      code: 'invalid_status_transition',
      field: 'status',
      message: `Invalid transition from "${from}" to "${to}".`,
    },
  ];
}

export function getWorkflowTimeline(
  current: EditorialArticleStatus,
): Array<{ status: EditorialArticleStatus; label: string; reached: boolean }> {
  const order: EditorialArticleStatus[] = [
    'draft',
    'in_review',
    'approved',
    'scheduled',
    'published',
    'updated',
    'archived',
  ];
  const labels: Record<EditorialArticleStatus, string> = {
    draft: 'Draft',
    in_review: 'In Review',
    approved: 'Approved',
    scheduled: 'Scheduled',
    published: 'Published',
    updated: 'Updated',
    archived: 'Archived',
  };

  const currentIndex = order.indexOf(current);
  return order.map((status, index) => {
    let reached = index <= currentIndex;
    // Scheduled is optional — if we skipped it, mark reached when past approved onto published+
    if (
      status === 'scheduled' &&
      (current === 'published' || current === 'updated' || current === 'archived')
    ) {
      reached = true;
    }
    if (status === 'updated' && current === 'published') {
      reached = false;
    }
    if (status === 'archived' && current !== 'archived') {
      reached = false;
    }
    return { status, label: labels[status], reached };
  });
}
