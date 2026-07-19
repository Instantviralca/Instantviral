import { LegalPolicyPageView } from '@/components/sections/legal/LegalPolicyPageView';
import type { TermsAndConditionsContent } from '@/types/legal';

type TermsAndConditionsPageViewProps = {
  content: TermsAndConditionsContent;
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
};

/**
 * Terms & Conditions production composition — Document 13.05.
 * Internal draft/readiness checklist is never rendered here.
 */
export function TermsAndConditionsPageView({
  content,
  effectiveDateLabel,
  lastUpdatedLabel,
}: TermsAndConditionsPageViewProps) {
  return (
    <LegalPolicyPageView
      content={content}
      effectiveDateLabel={effectiveDateLabel}
      lastUpdatedLabel={lastUpdatedLabel}
      contentAriaLabel="Terms & Conditions"
    />
  );
}
