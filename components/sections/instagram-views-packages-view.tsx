import { FinalCTA } from '@/components/marketing/final-cta';
import {
  RelatedServices,
  ServiceRelatedArticles,
  ServiceFaq,
  ServiceHero,
  ServiceReviews,
} from '@/components/sections/service';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { DeliveryProcessTimeline } from '@/components/marketing/packages/delivery-process-timeline';
import { PackageFitGuide } from '@/components/marketing/packages/package-fit-guide';
import { PackagesTips } from '@/components/marketing/packages/packages-tips';
import { WhyOrderFromUs } from '@/components/marketing/packages/why-order-from-us';
import { INSTAGRAM_VIEWS_PACKAGES_CONFIG } from '@/data/content/packages-page-config';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import type { Service } from '@/types/service';

type InstagramViewsPackagesViewProps = {
  service: Service;
};

/**
 * Short ecommerce landing for Instagram Views packages.
 * Commercial intent stays in hero, pricing, package card, FAQ and metadata.
 */
export function InstagramViewsPackagesView({ service }: InstagramViewsPackagesViewProps) {
  const content = getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content);
  const config = INSTAGRAM_VIEWS_PACKAGES_CONFIG;
  const related = resolveRelatedServices(service, content.relatedServices.serviceSlugs, 3);
  const relatedArticles = getRelatedArticles(service.slug, {
    platform: service.platform,
    limit: 4,
  });
  const breadcrumbs = buildBreadcrumb(service.slug);
  const previewPackageId =
    vm.pricing.packages.find((p) => p.package.badge)?.package.id ??
    vm.pricing.packages[0]?.package.id;

  return (
    <div className="pb-24 lg:pb-0">
      <ServiceHero
        {...vm.hero}
        breadcrumbs={breadcrumbs}
        platform={service.platform}
        previewPackageId={previewPackageId}
        instagramVariant="views"
      />

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        summaryBenefits={config.summaryBenefits}
        infoPills={config.infoPills}
      />

      <ServiceReviews
        title={vm.reviews.title}
        description={vm.reviews.description}
        serviceSlug={service.slug}
        platform={service.platform}
      />

      <PackageFitGuide config={config} />

      <DeliveryProcessTimeline config={config} />

      <WhyOrderFromUs config={config} />

      {config.tips ? (
        <PackagesTips
          title={config.tips.title}
          description={config.tips.description}
          items={config.tips.items}
        />
      ) : null}

      <ServiceFaq
        id={vm.faq.id}
        title={vm.faq.title}
        description={vm.faq.description}
        items={vm.faq.items}
        analyticsServiceSlug={service.slug}
      />

      {related.length > 0 ? (
        <RelatedServices
          id={vm.relatedServices.id ?? content.relatedServices.id}
          title={vm.relatedServices.title}
          description={vm.relatedServices.description}
          services={related}
          cta={vm.relatedServices.cta}
          analyticsServiceSlug={service.slug}
        />
      ) : null}

      <ServiceRelatedArticles
        articles={relatedArticles}
        title="Helpful Resources"
        description="Guides that help you prepare before checkout."
      />

      <FinalCTA
        id={content.finalCta.id}
        title={vm.finalCta.title}
        description={vm.finalCta.description}
        primaryCta={vm.finalCta.primaryCta}
        secondaryCta={vm.finalCta.secondaryCta}
        surface="service_page"
        analyticsServiceSlug={service.slug}
      />
    </div>
  );
}
