import { LegalPolicyPageView } from '@/components/sections/legal/LegalPolicyPageView';
import type { PrivacyPolicyContent } from '@/types/legal';

type PrivacyPolicyPageViewProps = {
  content: PrivacyPolicyContent;
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
};

/**
 * Privacy Policy production composition — Document 13.04.
 * Internal draft/readiness checklist is never rendered here.
 */
export function PrivacyPolicyPageView({
  content,
  effectiveDateLabel,
  lastUpdatedLabel,
}: PrivacyPolicyPageViewProps) {
  return (
    <LegalPolicyPageView
      content={content}
      effectiveDateLabel={effectiveDateLabel}
      lastUpdatedLabel={lastUpdatedLabel}
      contentAriaLabel="Privacy Policy"
    />
  );
}
