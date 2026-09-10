import type { Metadata } from 'next';

import { JsonLdScript } from '@/components/common/json-ld';
import { HomePageView } from '@/components/sections/HomePageView';
import { routes } from '@/config/routes';
import { getHomepageContent } from '@/data/content/homepage';
import { getServiceBySlug } from '@/data/services';
import { mapHomepageContent } from '@/lib/content/mappers';
import { ensureCatalogHydrated } from '@/lib/catalog/package-overrides-store';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { faqPageSchema } from '@/schemas/faq';
import { productSchema, serviceSchema } from '@/schemas/service';
import { webPageSchema } from '@/schemas/website';
import { descriptions } from '@/seo/descriptions';
import { homeMetadata } from '@/seo/metadata';
import { titles } from '@/seo/titles';

export function generateMetadata(): Metadata {
  return homeMetadata();
}

/** Production homepage — Buy Instagram Followers Canada + packages commerce. */
export default async function HomePage() {
  await ensureCatalogHydrated();
  const content = getHomepageContent();
  const vm = mapHomepageContent(content);
  const followersService = getServiceBySlug('buy-instagram-followers');

  const graph = asJsonLdGraph([
    webPageSchema({
      title: titles.home(),
      description: descriptions.home(),
      path: routes.home,
    }),
    ...(followersService
      ? [serviceSchema(followersService), productSchema(followersService)]
      : []),
    faqPageSchema(vm.faq.items),
  ]);

  return (
    <>
      <JsonLdScript id="homepage-jsonld" data={graph} />
      <HomePageView content={content} />
    </>
  );
}
