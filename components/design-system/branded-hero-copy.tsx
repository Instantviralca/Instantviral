import Link from 'next/link';

import { HeroBreadcrumbNav } from '@/components/navigation/hero-breadcrumb-nav';
import { TrustStrip } from '@/components/design-system/trust-strip';
import { Button } from '@/components/ui/button';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { cn } from '@/lib/utils';
import type { CtaProps } from '@/types/components';
import type { HeroTrustLabel } from '@/types/content';
import type { BreadcrumbItem } from '@/types/shared';
export type BrandedHeroCopyProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  breadcrumbs?: BreadcrumbItem[];
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  trustLabels?: HeroTrustLabel[];
  isPremiumDashboardHero: boolean;
};

/**
 * Server-only hero text column (no FadeUp / client motion) — mirrors homepage HeroContent.
 */
export function BrandedHeroCopy({
  eyebrow,
  title,
  description,
  breadcrumbs,
  primaryCta,
  secondaryCta,
  trustLabels,
  isPremiumDashboardHero,
}: BrandedHeroCopyProps) {
  return (
    <div
      className={cn(isPremiumDashboardHero ? 'flex flex-col gap-0' : 'space-y-4')}
    >
      {breadcrumbs && breadcrumbs.length > 0 ? (
        <HeroBreadcrumbNav items={breadcrumbs} />
      ) : null}
      {eyebrow ? (
        <Eyebrow
          className={cn(
            'text-[var(--brand-primary)]',
            isPremiumDashboardHero && 'mt-5 sm:mt-6',
          )}
        >
          {eyebrow}
        </Eyebrow>
      ) : null}
      <Heading
        as="h1"
        size="display"
        className={cn(
          'text-balance tracking-tight',
          isPremiumDashboardHero
            ? 'mt-4 max-w-[22ch] sm:mt-5 lg:text-[clamp(2.85rem,4.4vw,3.65rem)]'
            : 'max-w-[16ch]',
        )}
      >
        {title}
      </Heading>
      {description ? (
        <Lead
          className={cn(
            'text-pretty text-[var(--text-secondary)]',
            isPremiumDashboardHero
              ? 'mt-5 max-w-[40rem] text-lg leading-relaxed sm:mt-6'
              : 'max-w-md',
          )}
        >
          {description}
        </Lead>
      ) : null}
      {(primaryCta || secondaryCta) && (
        <div
          className={cn(
            'flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap',
            isPremiumDashboardHero ? 'mt-6 sm:mt-7' : 'pt-2',
          )}
        >
          {primaryCta ? (
            <Button
              asChild
              size="lg"
              className="min-h-12 w-full rounded-xl bg-[var(--brand-primary)] px-8 text-base font-semibold shadow-[0_14px_32px_-14px_rgba(249,115,22,0.85)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[var(--brand-primary-hover)] hover:shadow-[0_18px_36px_-14px_rgba(249,115,22,0.95)] motion-reduce:hover:translate-y-0 sm:w-auto"
            >
              <Link href={primaryCta.href}>{primaryCta.label}</Link>
            </Button>
          ) : null}
          {secondaryCta ? (
            <Button
              asChild
              size="lg"
              variant="outline"
              className="min-h-12 w-full rounded-xl border-[var(--border-strong)] bg-white/70 px-8 text-base font-semibold backdrop-blur-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white motion-reduce:hover:translate-y-0 sm:w-auto"
            >
              <Link href={secondaryCta.href}>{secondaryCta.label}</Link>
            </Button>
          ) : null}
        </div>
      )}
      {trustLabels && trustLabels.length > 0 ? (
        <TrustStrip
          className={cn(
            '[&_svg]:size-5',
            isPremiumDashboardHero
              ? 'mt-6 gap-x-4 gap-y-2.5 rounded-2xl border border-white/80 bg-white/80 px-4 py-4 shadow-[0_16px_36px_-22px_rgba(28,25,23,0.38)] backdrop-blur-md sm:mt-7 sm:gap-x-5 sm:px-5'
              : 'pt-2',
          )}
          items={trustLabels.map((t) => ({
            id: t.id,
            label: t.label,
            icon:
              t.id.includes('password') || t.id.includes('lock')
                ? 'lock'
                : t.id.includes('checkout') || t.id.includes('secure')
                  ? 'shield'
                  : t.id.includes('track')
                    ? 'track'
                    : t.id.includes('2018') || t.id.includes('trusted')
                      ? 'star'
                      : 'check',
          }))}
        />
      ) : (
        <TrustStrip className="pt-2 [&_svg]:size-5" variant="compact" />
      )}
    </div>
  );
}
