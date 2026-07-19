import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { JsonLdScript } from '@/components/common/json-ld';
import { ServicePageView } from '@/components/sections/ServicePageView';
import { getServiceContentBySlug } from '@/data/content/services';
import { APPROVED_SERVICE_SLUGS } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { getApprovedReviews, getServicePageReviews } from '@/lib/reviews';
import { buildReviewSchemaBundle } from '@/lib/reviews/schema-engine';
import { asJsonLdGraph } from '@/lib/seo/schema';
import { buildCanonicalUrl } from '@/lib/seo/metadata';
import { buildBreadcrumb } from '@/lib/linking';
import { faqPageSchema } from '@/schemas/faq';
import { breadcrumbSchema } from '@/schemas/breadcrumb';
import { productSchema, serviceSchema } from '@/schemas/service';
import { webPageSchema } from '@/schemas/website';
import { descriptions } from '@/seo/descriptions';
import { serviceMetadata } from '@/seo/metadata';
import { titles } from '@/seo/titles';

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

/** Only approved production services — Document 14.07. */
export const dynamic = 'force-static';
export const dynamicParams = false;

export function generateStaticParams() {
  return APPROVED_SERVICE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  return serviceMetadata(slug);
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (
    !service ||
    !APPROVED_SERVICE_SLUGS.includes(slug as (typeof APPROVED_SERVICE_SLUGS)[number])
  ) {
    notFound();
  }

  const content = getServiceContentBySlug(service.slug);
  const vm = content ? mapServiceContent(content) : null;
  const title = content?.seo?.title ?? titles.service(service);
  const description = content?.seo?.description ?? descriptions.service(service);
  const canonical = buildCanonicalUrl(service.url);

  const visibleReviews = getServicePageReviews({
    serviceSlug: service.slug,
    platform: service.platform,
    limit: 6,
  });
  const reviewBundle = buildReviewSchemaBundle(getApprovedReviews(), {
    entity: {
      kind: 'service',
      serviceSlug: service.slug,
      name: service.name,
      url: canonical,
      platform: service.platform,
    },
    visibleReviewIds: visibleReviews.map((review) => review.id),
    reviewSectionVisible: visibleReviews.length > 0,
  });

  const serviceNode = serviceSchema(service);
  if (reviewBundle.aggregate) {
    serviceNode.aggregateRating = reviewBundle.aggregate;
  }

  const graph = asJsonLdGraph([
    webPageSchema({
      title,
      description,
      path: service.url,
      url: canonical,
    }),
    serviceNode,
    productSchema(service),
    breadcrumbSchema(buildBreadcrumb(service.slug)),
    ...(vm && vm.faq.items.length > 0 ? [faqPageSchema(vm.faq.items)] : []),
    ...reviewBundle.reviews,
  ]);

  return (
    <>
      <JsonLdScript id={`service-jsonld-${service.id}`} data={graph} />
      <ServicePageView service={service} />
    </>
  );
}
