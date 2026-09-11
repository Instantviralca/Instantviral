import { HeroSection } from '@/components/marketing';
import {
  HomepageCommercialSection,
  HomepageDirectAnswerSection,
  HomepageFaqSection,
  HomepageFinalCtaSection,
  HomepageHowToBuySection,
  HomepageInstagramHubSection,
  HomepageTrustedReviewsSection,
  HomepageWhyInstantViralSection,
} from '@/components/marketing/homepage-editorial-sections';
import {
  HomepageBuyingResponsiblySection,
  HomepageWhoWeHelpSection,
} from '@/components/marketing/homepage-extended-sections';
import { HomepageLearnSections } from '@/components/marketing/homepage-learn-sections';
import { HomepageStickyCta } from '@/components/marketing/homepage-sticky-cta';
import { DeliveryProcessTimeline } from '@/components/marketing/packages/delivery-process-timeline';
import { PackageFitGuide } from '@/components/marketing/packages/package-fit-guide';
import { ServiceCommerceBlocks } from '@/components/sections/service/service-commerce-blocks';
import { INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG } from '@/data/content/packages-page-config';
import { getHomepageContent } from '@/data/content/homepage';
import { getServiceContentBySlug } from '@/data/content/services';
import { getPublishedLearnArticleRecords } from '@/data/learn/articles';
import { getServiceBySlug } from '@/data/services';
import { mapServiceContent } from '@/lib/content/mappers';
import { getHomepageReviews } from '@/lib/reviews';
import type { HomepageContent } from '@/types/content';

type HomePageViewProps = {
  content?: HomepageContent;
};

const IG_FOLLOWERS_SLUG = 'buy-instagram-followers';

/** Owner-approved pricing heading/description (homepage mount only). */
const HOMEPAGE_FOLLOWERS_PRICING_TITLE = 'Instagram Followers Packages & Pricing';
const HOMEPAGE_FOLLOWERS_PRICING_DESCRIPTION =
  'Compare Instagram follower packages by size and price, then choose the option that fits your account. Your selected package, delivery details and order requirements are shown clearly before checkout. You only need your public Instagram username. No password is required.';

/**
 * Homepage composition — Buy Instagram Followers Canada commercial authority.
 * Order: Hero → Direct Answer → Pricing → Fit → Commercial → Trust → How To Buy →
 * Delivery → Hub → Who We Help → Reviews → Articles → Educational → FAQ → Final CTA.
 * Footer is global (SiteLayout).
 */
export function HomePageView({ content = getHomepageContent() }: HomePageViewProps) {
  void content;
  const hasPublishedGuides = getPublishedLearnArticleRecords().length > 0;
  const featuredReviews = getHomepageReviews(7);

  const followersService = getServiceBySlug(IG_FOLLOWERS_SLUG);
  const followersContent = getServiceContentBySlug(IG_FOLLOWERS_SLUG);
  const followersVm = followersContent ? mapServiceContent(followersContent) : null;
  const packagesConfig = INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG;
  const primaryCtaLabel =
    followersVm?.pricing.packages[0]?.primaryCta.label ??
    followersContent?.pricing.primaryCtaLabel ??
    'Continue with This Package';

  return (
    <div className="pb-[4.75rem] lg:pb-0">
      <HeroSection />
      <HomepageDirectAnswerSection />

      {followersService && followersVm ? (
        <ServiceCommerceBlocks
          service={followersService}
          pricing={{
            ...followersVm.pricing,
            id: followersVm.pricing.id ?? 'pricing-packages',
            title: HOMEPAGE_FOLLOWERS_PRICING_TITLE,
            description: HOMEPAGE_FOLLOWERS_PRICING_DESCRIPTION,
          }}
          summaryBenefits={packagesConfig.summaryBenefits}
          infoPills={packagesConfig.infoPills}
          stickyCtaLabel={primaryCtaLabel}
          showStickyOrderBar={false}
        />
      ) : null}

      <PackageFitGuide config={packagesConfig} />

      <HomepageCommercialSection />
      <HomepageWhyInstantViralSection />
      <HomepageHowToBuySection />

      <DeliveryProcessTimeline config={packagesConfig} />

      <HomepageInstagramHubSection />
      <HomepageWhoWeHelpSection />
      <HomepageTrustedReviewsSection reviews={featuredReviews} />
      {hasPublishedGuides ? <HomepageLearnSections /> : null}
      <HomepageBuyingResponsiblySection />
      <HomepageFaqSection />
      <HomepageFinalCtaSection />
      <HomepageStickyCta href="#pricing-packages" label="Compare Packages" />
    </div>
  );
}
