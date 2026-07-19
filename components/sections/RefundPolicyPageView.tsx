import { LegalPolicyPageView } from '@/components/sections/legal/LegalPolicyPageView';
import type { RefundPolicyContent } from '@/types/legal';

type RefundPolicyPageViewProps = {
  content: RefundPolicyContent;
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
};

/**
 * Refund Policy production composition — Document 13.06.
 * Internal draft/readiness checklist is never rendered here.
 */
export function RefundPolicyPageView({
  content,
  effectiveDateLabel,
  lastUpdatedLabel,
}: RefundPolicyPageViewProps) {
  return (
    <LegalPolicyPageView
      content={content}
      effectiveDateLabel={effectiveDateLabel}
      lastUpdatedLabel={lastUpdatedLabel}
      contentAriaLabel="Refund Policy"
    />
  );
}
