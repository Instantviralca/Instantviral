import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { CookiePolicyPageView } from '@/components/sections/CookiePolicyPageView';
import { routes } from '@/config/routes';
import {
  getCookiePolicyContent,
  getCookiePolicyDates,
} from '@/data/content/legal/cookies';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { webPageSchema } from '@/schemas/website';
import { legalMetadata } from '@/seo/metadata';

export function generateMetadata(): Metadata {
  return legalMetadata('cookiePolicy');
}

/** Cookie Policy page — Document 13.07 (legal template requiring professional review). */
export default function CookiePolicyPage() {
  const content = getCookiePolicyContent();
  const dates = getCookiePolicyDates();

  const graph = asJsonLdGraph([
    webPageSchema({
      title: content.seo.title,
      description: content.seo.description,
      path: routes.cookiePolicy,
    }),
    breadcrumbSchema([
      { label: 'Home', href: routes.home },
      { label: content.breadcrumbLabel, href: routes.cookiePolicy },
    ]),
  ]);

  return (
    <>
      <JsonLdScript id="cookie-policy-jsonld" data={graph} />
      <CookiePolicyPageView
        content={content}
        effectiveDateLabel={dates.effectiveDateLabel}
        lastUpdatedLabel={dates.lastUpdatedLabel}
      />
    </>
  );
}
