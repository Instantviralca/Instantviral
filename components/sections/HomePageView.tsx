import {
  FeaturedServicesSection,
  HeroSection,
  HowItWorks,
  MarketingFaq,
  PlatformSelectorSection,
  Stats,
  WhyChooseUs,
} from '@/components/marketing';
import { ComparisonSection } from '@/components/marketing/comparison-section';
import { CustomerReviewsSection } from '@/components/marketing/customer-reviews-section';
import { FinalCTA } from '@/components/marketing/final-cta';
import { HomepageLearnSections } from '@/components/marketing/homepage-learn-sections';
import { ImageTextSplit } from '@/components/design-system/image-text-split';
import { TrustPanel } from '@/components/design-system/trust-panel';
import { OrderTrackingDashboard } from '@/components/illustrations';
import { getHomepageContent } from '@/data/content/homepage';
import { getPublishedLearnArticleRecords } from '@/data/learn/articles';
import { mapHomepageContent } from '@/lib/content/mappers';
import {
  getHomepageReviews,
  getSafePublicReviews,
  summarizePublicReviews,
} from '@/lib/reviews';
import type { HomepageContent } from '@/types/content';

type HomePageViewProps = {
  content?: HomepageContent;
};

/**
 * Production homepage composition (Document 08.11) — visual redesign pass.
 * Extension sections append without changing approved commerce behaviour.
 */
export function HomePageView({ content = getHomepageContent() }: HomePageViewProps) {
  const vm = mapHomepageContent(content);
  const hasPublishedGuides = getPublishedLearnArticleRecords().length > 0;
  const featuredReviews = getHomepageReviews(6);
  const aggregate = summarizePublicReviews(getSafePublicReviews());

  return (
    <>
      <HeroSection />
      <PlatformSelectorSection />
      <FeaturedServicesSection />
      {featuredReviews.length > 0 && aggregate ? (
        <CustomerReviewsSection reviews={featuredReviews} aggregate={aggregate} />
      ) : null}
      <WhyChooseUs {...vm.whyChooseUs} />
      <HowItWorks {...vm.howItWorks} />
      <ImageTextSplit
        title="Track Every Step of Your Order"
        description="Receive an order confirmation after checkout and use the public tracking page to monitor available status updates from processing through delivery."
        visual={<OrderTrackingDashboard />}
        reverse
        className="bg-hero-wash bg-mesh-soft"
      />
      <Stats {...vm.stats} />
      <TrustPanel
        title="Order With Clarity"
        description="Place an order using the public username or content URL required for the selected service. Review the details, complete checkout and track available updates from purchase to delivery."
        items={[
          { id: 'public', label: 'Public information only', icon: 'check' },
          { id: 'track', label: 'Order tracking', icon: 'track' },
          { id: 'support', label: 'Customer support', icon: 'support' },
        ]}
      />
      <ComparisonSection />
      {hasPublishedGuides ? <HomepageLearnSections /> : null}
      {vm.faq.items.length > 0 ? <MarketingFaq {...vm.faq} /> : null}
      <FinalCTA
        id={content.finalCta.id}
        title={vm.finalCta.title}
        description={vm.finalCta.description}
        primaryCta={vm.finalCta.primaryCta}
        secondaryCta={vm.finalCta.secondaryCta}
        surface="homepage"
      />
    </>
  );
}
