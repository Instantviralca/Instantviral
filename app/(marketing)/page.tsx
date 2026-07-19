import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { HomePageView } from '@/components/sections/HomePageView';
import { routes } from '@/config/routes';
import { getHomepageContent } from '@/data/content/homepage';
import { mapHomepageContent } from '@/lib/content/mappers';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { faqPageSchema } from '@/schemas/faq';
import { webPageSchema } from '@/schemas/website';
import { descriptions } from '@/seo/descriptions';
import { homeMetadata } from '@/seo/metadata';
import { titles } from '@/seo/titles';

export function generateMetadata(): Metadata {
  return homeMetadata();
}

/** Production homepage — Document 08.11. */
export default function HomePage() {
  const content = getHomepageContent();
  const vm = mapHomepageContent(content);

  const graph = asJsonLdGraph([
    webPageSchema({
      title: titles.home(),
      description: descriptions.home(),
      path: routes.home,
    }),
    faqPageSchema(vm.faq.items),
  ]);

  return (
    <>
      <JsonLdScript id="homepage-jsonld" data={graph} />
      <HomePageView content={content} />
    </>
  );
}
