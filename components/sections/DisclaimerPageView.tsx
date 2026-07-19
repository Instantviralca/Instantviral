import { LegalPolicyPageView } from '@/components/sections/legal/LegalPolicyPageView';
import type { DisclaimerContent } from '@/types/legal';

type DisclaimerPageViewProps = {
  content: DisclaimerContent;
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
};

/**
 * Disclaimer production composition — Document 13.08.
 * Internal draft/readiness checklist is never rendered here.
 * No Review or AggregateRating schema is attached to this page.
 */
export function DisclaimerPageView({
  content,
  effectiveDateLabel,
  lastUpdatedLabel,
}: DisclaimerPageViewProps) {
  return (
    <LegalPolicyPageView
      content={content}
      effectiveDateLabel={effectiveDateLabel}
      lastUpdatedLabel={lastUpdatedLabel}
      contentAriaLabel="Disclaimer"
    />
  );
}
