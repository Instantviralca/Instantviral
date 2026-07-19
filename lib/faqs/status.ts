/**
 * FAQ publication status helpers — Document 14.04.
 */

import type { FaqRecord, FaqStatus } from '@/types/faq';

export const FAQ_STATUS_LABELS: Record<FaqStatus, string> = {
  draft: 'Draft',
  pending_review: 'Pending Review',
  approved: 'Approved',
  hidden: 'Hidden',
  archived: 'Archived',
};

export function isApprovedFaq(faq: FaqRecord): boolean {
  return faq.status === 'approved';
}

export function isPubliclyRenderableFaq(faq: FaqRecord): boolean {
  return isApprovedFaq(faq);
}
