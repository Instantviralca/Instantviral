import { FinalCTA } from '@/components/marketing/final-cta';
import {
  RelatedServices,
  ServiceFaq,
  ServiceHero,
} from '@/components/sections/service';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { DeliveryProcessTimeline } from '@/components/marketing/packages/delivery-process-timeline';
import { PackageFitGuide } from '@/components/marketing/packages/package-fit-guide';
import { PackagesFinalCtaAside } from '@/components/marketing/packages/packages-final-cta-aside';
import { PackagesTrustStrip } from '@/components/marketing/packages/packages-trust-strip';
import { INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG } from '@/data/content/packages-page-config';
import { getServiceContentBySlug } from '@/data/content/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { resolveRelatedServices } from '@/lib/content/linking';
import { buildBreadcrumb } from '@/lib/linking';
import type { Service } from '@/types/service';

type InstagramFollowersPackagesViewProps = {
  service: Service;
};

/**
 * Compact package-selection page for Instagram Followers.
 * Homepage remains the primary commercial keyword surface.
 */
export function InstagramFollowersPackagesView({ service }: InstagramFollowersPackagesViewProps) {
  const content = getServiceContentBySlug(service.slug);
  if (!content) return null;

  const vm = mapServiceContent(content);
  const config = INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG;
  const related = resolveRelatedServices(service, content.relatedServices.serviceSlugs, 3);
  const breadcrumbs = buildBreadcrumb(service.slug).map((item, index, items) =>
    index === items.length - 1 ? { ...item, label: 'Followers Packages' } : item,
  );
  const previewPackageId =
    vm.pricing.packages.find((p) => p.package.badge)?.package.id ??
    vm.pricing.packages[0]?.package.id;
  const primaryCtaLabel =
    vm.pricing.packages[0]?.primaryCta.label ?? content.pricing.primaryCtaLabel;

  return (
    <div className="pb-24 lg:pb-0">
      <ServiceHero
        {...vm.hero}
        breadcrumbs={breadcrumbs}
        platform={service.platform}
        previewPackageId={previewPackageId}
        instagramVariant="followers"
      />

      <ServiceCommerceBlocks
        service={service}
        pricing={vm.pricing}
        summaryBenefits={config.summaryBenefits}
        infoPills={config.infoPills}
        stickyCtaLabel={primaryCtaLabel}
      />

      <PackageFitGuide config={config} />

      <DeliveryProcessTimeline config={config} />

      <PackagesTrustStrip items={config.trustStrip ?? []} />

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

      <FinalCTA
        id={content.finalCta.id}
        title={vm.finalCta.title}
        description={vm.finalCta.description}
        primaryCta={vm.finalCta.primaryCta}
        secondaryCta={vm.finalCta.secondaryCta}
        surface="service_page"
        analyticsServiceSlug={service.slug}
        aside={<PackagesFinalCtaAside instagramVariant="followers" />}
      />
    </div>
  );
}
