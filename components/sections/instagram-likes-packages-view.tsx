import { FinalCTA } from '@/components/marketing/final-cta';
import {
  RelatedServices,
  ServiceRelatedArticles,
  ServiceFaq,
  ServiceHero,
  ServiceReviews,
} from '@/components/sections/service';
import { ServiceEducationalGuide } from '@/components/sections/service/educational-guide';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { DeliveryProcessTimeline } from '@/components/marketing/packages/delivery-process-timeline';
import { PackageComparisonTable } from '@/components/marketing/packages/package-comparison-table';
import { PackageFitGuide } from '@/components/marketing/packages/package-fit-guide';
import { PackagesFinalCtaAside } from '@/components/marketing/packages/packages-final-cta-aside';
import { PackagesLearnMoreLink } from '@/components/marketing/packages/packages-learn-more-link';
import { WhyOrderFromUs } from '@/components/marketing/packages/why-order-from-us';
import { getEducationalGuideBySlug } from '@/data/content/instagram-educational-guides';
import { INSTAGRAM_LIKES_PACKAGES_CONFIG } from '@/data/content/packages-page-config';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import { getRelatedArticles } from '@/lib/linking/related-articles';
import type { Service } from '@/types/service';

type InstagramLikesPackagesViewProps = {
  service: Service;
};

/**
 * Conversion-focused Instagram Likes Packages page.
 * Reuses the Followers packages layout with likes-specific content and illustrations.
 */
export function InstagramLikesPackagesView({ service }: InstagramLikesPackagesViewProps) {
  const content = getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content);
  const config = INSTAGRAM_LIKES_PACKAGES_CONFIG;
  const related = resolveRelatedServices(service, content.relatedServices.serviceSlugs, 3);
  const relatedArticles = getRelatedArticles(service.slug, {
    platform: service.platform,
    limit: 6,
  });
  const relatedArticleHrefs = new Set(relatedArticles.map((item) => item.href));
  const peopleAlsoRead = [
    ...getRelatedArticles(service.slug, {
      platform: service.platform,
      limit: 12,
    }).filter((item) => !relatedArticleHrefs.has(item.href)),
  ];
  if (peopleAlsoRead.length < 4) {
    const extras = getRelatedArticles(service.slug, { limit: 16 }).filter(
      (item) =>
        !relatedArticleHrefs.has(item.href) &&
        !peopleAlsoRead.some((existing) => existing.href === item.href),
    );
    for (const item of extras) {
      peopleAlsoRead.push(item);
      if (peopleAlsoRead.length >= 4) break;
    }
  }
  const peopleAlsoReadFinal = peopleAlsoRead.slice(0, 4);
  const breadcrumbs = buildBreadcrumb(service.slug);
  const previewPackageId =
    vm.pricing.packages.find((p) => p.package.badge)?.package.id ??
    vm.pricing.packages[0]?.package.id;
  const educationalGuide = getEducationalGuideBySlug(service.slug);

  return (
    <div className="pb-24 lg:pb-0">
      <ServiceHero
        {...vm.hero}
        breadcrumbs={breadcrumbs}
        platform={service.platform}
        previewPackageId={previewPackageId}
        instagramVariant="likes"
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

      <PackageComparisonTable config={config} />

      {educationalGuide ? <ServiceEducationalGuide guide={educationalGuide} /> : null}

      <ServiceFaq
        id={vm.faq.id}
        title={vm.faq.title}
        description={vm.faq.description}
        items={vm.faq.items}
        analyticsServiceSlug={service.slug}
      />

      <PackagesLearnMoreLink config={config} />

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

      <ServiceRelatedArticles articles={relatedArticles} />
      <ServiceRelatedArticles
        id="people-also-read"
        title="People Also Read"
        description="More Learn Center guides readers explore alongside this service."
        articles={peopleAlsoReadFinal}
      />

      <FinalCTA
        id={content.finalCta.id}
        title={vm.finalCta.title}
        description={vm.finalCta.description}
        primaryCta={vm.finalCta.primaryCta}
        secondaryCta={vm.finalCta.secondaryCta}
        surface="service_page"
        analyticsServiceSlug={service.slug}
        aside={<PackagesFinalCtaAside instagramVariant="likes" />}
      />
    </div>
  );
}
