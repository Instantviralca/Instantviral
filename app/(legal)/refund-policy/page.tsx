import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { RefundPolicyPageView } from '@/components/sections/RefundPolicyPageView';
import { routes } from '@/config/routes';
import {
  getRefundPolicyContent,
  getRefundPolicyDates,
} from '@/data/content/legal/refund';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';
import { legalMetadata } from '@/seo/metadata';

export function generateMetadata(): Metadata {
  return legalMetadata('refundPolicy');
}

/** Refund Policy page — Document 13.06 (legal template requiring professional review). */
export default function RefundPolicyPage() {
  const content = getRefundPolicyContent();
  const dates = getRefundPolicyDates();

  const graph = asJsonLdGraph([
    webPageSchema({
      title: content.seo.title,
      description: content.seo.description,
      path: routes.refundPolicy,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: content.breadcrumbLabel, href: routes.refundPolicy },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="refund-policy-jsonld" data={graph} />
      <RefundPolicyPageView
        content={content}
        effectiveDateLabel={dates.effectiveDateLabel}
        lastUpdatedLabel={dates.lastUpdatedLabel}
      />
    </>
  );
}
