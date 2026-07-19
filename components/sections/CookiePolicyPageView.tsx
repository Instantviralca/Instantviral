import { LegalPolicyPageView } from '@/components/sections/legal/LegalPolicyPageView';
import type { CookiePolicyContent } from '@/types/legal';

type CookiePolicyPageViewProps = {
  content: CookiePolicyContent;
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
};

/**
 * Cookie Policy production composition — Document 13.07.
 * Internal draft/readiness checklist is never rendered here.
 */
export function CookiePolicyPageView({
  content,
  effectiveDateLabel,
  lastUpdatedLabel,
}: CookiePolicyPageViewProps) {
  return (
    <LegalPolicyPageView
      content={content}
      effectiveDateLabel={effectiveDateLabel}
      lastUpdatedLabel={lastUpdatedLabel}
      contentAriaLabel="Cookie Policy"
    />
  );
}
