'use client';

import { FAQAccordion } from '@/components/faq/FAQAccordion';
import { sanitizeFaqForPublic } from '@/lib/faqs/public';
import type { FaqRecord } from '@/types/faq';

export type FAQPreviewProps = {
  faq: FaqRecord;
};

/**
 * Public preview of an FAQ as it would render when approved.
 */
export function FAQPreview({ faq }: FAQPreviewProps) {
  const publicFaq = sanitizeFaqForPublic({ ...faq, status: 'approved' });

  if (!publicFaq) {
    return (
      <p className="text-sm text-muted-foreground">
        This FAQ cannot be previewed publicly in its current state.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium">Public preview</p>
      <FAQAccordion items={[publicFaq]} />
      {!faq.schemaEligible ? (
        <p className="text-xs text-muted-foreground">
          Schema eligibility is off — this item will not enter FAQPage JSON-LD.
        </p>
      ) : null}
    </div>
  );
}
