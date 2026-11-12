import { BrandedHeroCopy } from '@/components/design-system/branded-hero-copy';
import { DeferredHeroVisual } from '@/components/design-system/deferred-hero-visual';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { cn } from '@/lib/utils';
import type { CtaProps } from '@/types/components';
import type { HeroTrustLabel, HeroVisualContent } from '@/types/content';
import type { BreadcrumbItem } from '@/types/shared';
import type {
  FacebookDashboardVariant,
  InstagramDashboardVariant,
  TikTokDashboardVariant,
  YouTubeDashboardVariant,
} from '@/components/illustrations/dashboards';
import type { PlatformId } from '@/types/platform';

export type BrandedHeroProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  trustLabels?: HeroTrustLabel[];
  visual?: HeroVisualContent;
  platform?: PlatformId;
  packagePreview?: { title: string; priceLabel: string } | null;
  instagramVariant?: InstagramDashboardVariant;
  tiktokVariant?: TikTokDashboardVariant;
  youtubeVariant?: YouTubeDashboardVariant;
  facebookVariant?: FacebookDashboardVariant;
  className?: string;
  priorityImage?: boolean;
};

/**
 * Premium branded hero — text column is fully server-rendered; dashboard visual loads after idle.
 */
export function BrandedHero({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  trustLabels,
  visual,
  platform,
  packagePreview,
  instagramVariant,
  tiktokVariant,
  youtubeVariant,
  facebookVariant,
  className,
}: BrandedHeroProps) {
  const isPremiumDashboardHero =
    instagramVariant === 'views' ||
    instagramVariant === 'comments' ||
    youtubeVariant === 'subscribers' ||
    youtubeVariant === 'views' ||
    facebookVariant === 'followers' ||
    facebookVariant === 'page-likes' ||
    facebookVariant === 'post-likes' ||
    tiktokVariant === 'followers' ||
    tiktokVariant === 'likes' ||
    tiktokVariant === 'views';

  return (
    <Section
      spacing="lg"
      className={cn('relative overflow-x-clip bg-hero-wash', className)}
      aria-label="Page hero"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 90% 10%, rgb(240 112 32 / 0.06), transparent)',
        }}
        aria-hidden="true"
      />
      <Container className="relative">
        <div
          className={cn(
            'grid items-center gap-8 lg:gap-10',
            isPremiumDashboardHero
              ? 'lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.95fr)] lg:gap-6'
              : instagramVariant === 'likes'
                ? 'lg:grid-cols-[minmax(0,1.22fr)_minmax(0,1fr)]'
                : 'lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)]',
          )}
        >
          <BrandedHeroCopy
            eyebrow={eyebrow}
            title={title}
            description={description}
            breadcrumbs={breadcrumbs}
            primaryCta={primaryCta}
            secondaryCta={secondaryCta}
            trustLabels={trustLabels}
            isPremiumDashboardHero={isPremiumDashboardHero}
          />
          {visual ? (
            <div
              className={cn(
                'min-w-0 lg:justify-self-end lg:w-full',
                instagramVariant === 'likes' ||
                  instagramVariant === 'views' ||
                  instagramVariant === 'comments' ||
                  instagramVariant === 'followers' ||
                  tiktokVariant === 'followers' ||
                  tiktokVariant === 'likes' ||
                  tiktokVariant === 'views'
                  ? 'mx-auto max-w-[24rem] sm:max-w-[25.5rem] lg:mx-0 lg:max-w-[27rem]'
                  : youtubeVariant === 'subscribers' ||
                      youtubeVariant === 'views' ||
                      facebookVariant === 'followers' ||
                      facebookVariant === 'page-likes' ||
                      facebookVariant === 'post-likes'
                    ? 'mx-auto max-w-[26rem] sm:max-w-[28rem] lg:mx-0 lg:max-w-[32rem]'
                    : 'lg:max-w-none',
                (instagramVariant === 'comments' ||
                  tiktokVariant === 'followers' ||
                  tiktokVariant === 'likes' ||
                  tiktokVariant === 'views' ||
                  youtubeVariant === 'subscribers' ||
                  youtubeVariant === 'views' ||
                  facebookVariant === 'followers' ||
                  facebookVariant === 'page-likes' ||
                  facebookVariant === 'post-likes') &&
                  'overflow-visible px-2 sm:px-3',
              )}
            >
              <DeferredHeroVisual
                alt={visual.alt}
                platform={platform}
                packagePreview={packagePreview}
                instagramVariant={instagramVariant}
                tiktokVariant={tiktokVariant}
                youtubeVariant={youtubeVariant}
                facebookVariant={facebookVariant}
                className={
                  instagramVariant === 'likes' ||
                  instagramVariant === 'views' ||
                  instagramVariant === 'comments' ||
                  instagramVariant === 'followers' ||
                  tiktokVariant === 'followers' ||
                  tiktokVariant === 'likes' ||
                  tiktokVariant === 'views' ||
                  youtubeVariant === 'subscribers' ||
                  youtubeVariant === 'views' ||
                  facebookVariant === 'followers' ||
                  facebookVariant === 'page-likes' ||
                  facebookVariant === 'post-likes'
                    ? 'w-full max-w-full'
                    : 'max-w-none'
                }
              />
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
