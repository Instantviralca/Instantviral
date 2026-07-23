import Image from 'next/image';
import Link from 'next/link';
import { Check } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { resolvePackagesIcon } from '@/components/marketing/packages/packages-icons';
import {
  TT_DASHBOARD_3D,
  TT_FOLLOWERS_SECTION_SPACING,
  TT_FOLLOWERS_SURFACES,
  TT_PREMIUM_SHADOW,
  TT_PREMIUM_SHADOW_HOVER,
} from '@/components/marketing/tiktok-followers/page-rhythm';
import { TikTokFollowersAnalyticsDashboard } from '@/components/illustrations/tiktok-followers-analytics-dashboard';
import { TikTokFollowersCreatorDashboard } from '@/components/illustrations/tiktok-followers-creator-dashboard';
import { TikTokFollowersProcessTimeline } from '@/components/illustrations/tiktok-followers-process-timeline';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import {
  TIKTOK_FOLLOWERS_PAGE_CONFIG,
  type TikTokFollowersPageConfig,
} from '@/data/content/tiktok-followers-page-config';
import { cn } from '@/lib/utils';
import type { BenefitItem, ProcessStep, CtaProps } from '@/types/components';
import type { InternalLink } from '@/types/linking';

type SectionProps = {
  config?: TikTokFollowersPageConfig;
  className?: string;
};

/** Section 1 — Text left / Image right */
export function TikTokFollowersWhyBuy({
  id,
  title,
  description,
  items,
  className,
}: {
  id?: string;
  title?: string;
  description?: string;
  items: BenefitItem[];
  className?: string;
}) {
  return (
    <Section
      id={id}
      spacing="none"
      className={cn(TT_FOLLOWERS_SECTION_SPACING, TT_FOLLOWERS_SURFACES.warm, className)}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <Container size="xl">
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14">
          <FadeUp className="space-y-5">
            {title ? (
              <Heading as="h2" size="h2" id={id ? `${id}-heading` : undefined} className="tracking-tight">
                {title}
              </Heading>
            ) : null}
            {description ? (
              <MutedText className="max-w-xl text-base leading-relaxed sm:text-[1.05rem]">
                {description}
              </MutedText>
            ) : null}
            {items.length > 0 ? (
              <ul className="space-y-3 pt-1">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="border-l-2 border-[var(--brand-primary)] pl-3"
                  >
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      {item.title}
                    </p>
                    <p className="mt-0.5 text-sm leading-snug text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}
          </FadeUp>
          <FadeUp delay={0.06} className="mx-auto w-full max-w-[26rem] lg:max-w-none">
            <div className={cn(TT_DASHBOARD_3D, 'rounded-2xl')}>
              <TikTokFollowersCreatorDashboard className="max-w-none aspect-[16/10] shadow-none" />
            </div>
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

/** Section 2 — Full width process */
export function TikTokFollowersHowToBuy({
  id,
  title,
  description,
  steps,
  cta,
  className,
}: {
  id?: string;
  title?: string;
  description?: string;
  steps: ProcessStep[];
  cta?: CtaProps;
  className?: string;
}) {
  return (
    <Section
      id={id}
      spacing="none"
      className={cn(TT_FOLLOWERS_SECTION_SPACING, TT_FOLLOWERS_SURFACES.white, className)}
      aria-labelledby={id ? `${id}-heading` : undefined}
    >
      <Container size="xl">
        <FadeUp className="mx-auto mb-8 max-w-3xl space-y-3 text-center">
          {title ? (
            <Heading as="h2" size="h2" id={id ? `${id}-heading` : undefined} className="tracking-tight">
              {title}
            </Heading>
          ) : null}
          {description ? (
            <MutedText className="mx-auto max-w-2xl text-base leading-relaxed sm:text-[1.05rem]">
              {description}
            </MutedText>
          ) : null}
        </FadeUp>
        <FadeUp delay={0.05}>
          <div className={cn(TT_DASHBOARD_3D, 'rounded-2xl')}>
            <TikTokFollowersProcessTimeline className="mb-0 aspect-auto min-h-[11rem] shadow-none sm:min-h-[13rem]" />
          </div>
        </FadeUp>
        {steps.length > 0 ? (
          <ol className="mx-auto mt-7 grid max-w-5xl grid-cols-2 gap-x-5 gap-y-3 sm:grid-cols-3 lg:grid-cols-5">
            {steps.map((step, index) => (
              <li
                key={step.id}
                className="rounded-xl border border-[var(--border-subtle)] bg-white px-3 py-3 text-center shadow-[0_8px_18px_-14px_rgba(28,25,23,0.28)] sm:text-left"
              >
                <p className="text-[11px] font-bold tracking-wide text-[var(--brand-primary)] uppercase">
                  Step {index + 1}
                </p>
                <p className="mt-1 text-sm font-semibold text-[var(--text-primary)]">
                  {step.title}
                </p>
                <p className="mt-0.5 text-xs leading-snug text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        ) : null}
        {cta?.href && cta.label ? (
          <div className="mt-8 text-center">
            <a
              href={cta.href}
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--brand-primary)] px-6 text-sm font-semibold text-white shadow-[0_14px_28px_-14px_rgba(249,115,22,0.7)] transition hover:brightness-105"
            >
              {cta.label}
            </a>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

/** Section 4 — Split: help points + dashboard, limitation note below */
export function TikTokFollowersDoesBuyingWork({
  config = TIKTOK_FOLLOWERS_PAGE_CONFIG,
  className,
}: SectionProps) {
  const { doesBuyingWork } = config;
  const sentences = doesBuyingWork.description
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
  const helpSentence = sentences[0] ?? doesBuyingWork.description;
  const limitationNote = sentences.slice(1).join(' ') || null;

  return (
    <Section
      id={doesBuyingWork.id}
      spacing="none"
      className={cn(
        TT_FOLLOWERS_SECTION_SPACING,
        TT_FOLLOWERS_SURFACES.white,
        className,
      )}
      aria-labelledby={`${doesBuyingWork.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mb-8 max-w-3xl space-y-3">
          <Heading
            as="h2"
            size="h2"
            id={`${doesBuyingWork.id}-heading`}
            className="tracking-tight"
          >
            {doesBuyingWork.title}
          </Heading>
        </FadeUp>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.15fr)] lg:gap-12">
          <FadeUp className="space-y-5">
            <p className="text-[11px] font-bold tracking-[0.12em] text-[var(--brand-primary)] uppercase">
              What it can help with
            </p>
            <ul className="space-y-3.5">
              {helpSentence
                .replace(/\.$/, '')
                .split(/,\s+which\s+|,\s+and\s+|\s+and\s+/)
                .map((fragment, index) => {
                  const text = fragment.trim();
                  if (!text) return null;
                  return (
                    <li
                      key={`help-${index}`}
                      className="flex gap-3 rounded-xl border border-white/90 bg-white/90 px-4 py-3.5 shadow-[0_12px_28px_-20px_rgba(28,25,23,0.32)]"
                    >
                      <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                        <Check className="size-3.5" strokeWidth={2.75} aria-hidden />
                      </span>
                      <p className="text-sm leading-relaxed text-[var(--text-secondary)] sm:text-[0.975rem]">
                        {text.charAt(0).toUpperCase() + text.slice(1)}
                        {text.endsWith('.') ? '' : '.'}
                      </p>
                    </li>
                  );
                })}
            </ul>
          </FadeUp>
          <FadeUp delay={0.06}>
            <div className={cn(TT_DASHBOARD_3D, 'rounded-2xl')}>
              <TikTokFollowersAnalyticsDashboard className="max-w-none shadow-none" />
            </div>
          </FadeUp>
        </div>
        {limitationNote ? (
          <FadeUp delay={0.1} className="mx-auto mt-8 max-w-3xl">
            <p className="rounded-xl border border-[var(--border-subtle)] bg-white/80 px-4 py-3.5 text-sm leading-relaxed text-[var(--text-secondary)] shadow-[0_10px_24px_-20px_rgba(28,25,23,0.28)]">
              {limitationNote}
            </p>
          </FadeUp>
        ) : null}
      </Container>
    </Section>
  );
}

/** Section 5 — Cards only */
export function TikTokFollowersBestPractices({
  config = TIKTOK_FOLLOWERS_PAGE_CONFIG,
}: {
  config?: TikTokFollowersPageConfig;
}) {
  const { bestPractices } = config;
  return (
    <Section
      id={bestPractices.id}
      spacing="none"
      className={cn(TT_FOLLOWERS_SECTION_SPACING, TT_FOLLOWERS_SURFACES.lightNeutral)}
      aria-labelledby={`${bestPractices.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mx-auto mb-9 max-w-2xl space-y-3 text-center">
          <Heading as="h2" size="h2" id={`${bestPractices.id}-heading`} className="tracking-tight">
            {bestPractices.title}
          </Heading>
          <MutedText className="leading-relaxed">{bestPractices.description}</MutedText>
        </FadeUp>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {bestPractices.items.map((item, index) => {
            const Icon = resolvePackagesIcon(item.icon);
            return (
              <li key={item.id}>
                <FadeUp delay={0.03 * index}>
                  <article
                    className={cn(
                      'group flex h-full flex-col gap-3.5 rounded-2xl border border-[var(--border-subtle)] bg-white p-5 transition-[transform,box-shadow,border-color] duration-300',
                      TT_PREMIUM_SHADOW,
                      TT_PREMIUM_SHADOW_HOVER,
                      'hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_35%,var(--border-subtle))] motion-reduce:hover:translate-y-0 sm:p-6',
                    )}
                  >
                    <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-[var(--brand-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100">
                      <Icon className="size-6" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {item.title}
                      </h3>
                      <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

export type RelatedArticleWithThumb = InternalLink & {
  image?: { src: string; alt: string; width: number; height: number };
};

/** Section 7 — Articles with thumbnails */
export function TikTokFollowersRelatedArticles({
  articles,
  title = 'Related Articles',
  description = 'Guides that help you grow on TikTok alongside follower packages.',
}: {
  articles: RelatedArticleWithThumb[];
  title?: string;
  description?: string;
}) {
  if (articles.length === 0) return null;

  return (
    <Section
      id="related-articles"
      spacing="none"
      className={cn(TT_FOLLOWERS_SECTION_SPACING, TT_FOLLOWERS_SURFACES.softGradient)}
      aria-labelledby="related-articles-heading"
    >
      <Container size="xl">
        <FadeUp className="mx-auto max-w-2xl space-y-2 text-center">
          <Heading as="h2" size="h2" id="related-articles-heading">
            {title}
          </Heading>
          {description ? <MutedText>{description}</MutedText> : null}
        </FadeUp>
        <ul className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {articles.map((article, index) => (
            <li key={article.slug}>
              <FadeUp delay={0.04 * index} className="h-full">
                <Link
                  href={article.href}
                  className={cn(
                    'group flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white outline-none transition-[transform,box-shadow,border-color] duration-300',
                    TT_PREMIUM_SHADOW,
                    TT_PREMIUM_SHADOW_HOVER,
                    'hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] focus-visible:ring-2 focus-visible:ring-[var(--brand-primary)] focus-visible:ring-offset-2 motion-reduce:hover:translate-y-0',
                  )}
                >
                  <div className="relative aspect-[16/9] min-h-[9.5rem] overflow-hidden bg-[var(--surface-muted)] sm:min-h-[10.5rem]">
                    {article.image ? (
                      <Image
                        src={article.image.src}
                        alt={article.image.alt || article.label}
                        width={article.image.width}
                        height={article.image.height}
                        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06] motion-reduce:group-hover:scale-100"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                    ) : (
                      <div
                        className="flex h-full w-full items-end bg-[linear-gradient(145deg,#fff7ed,#25F4EE22,#FE2C5522)] p-3"
                        aria-hidden
                      >
                        <span className="rounded-md bg-white/90 px-2 py-1 text-[10px] font-bold text-[var(--brand-primary)]">
                          Learn
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col p-4 sm:p-5">
                    <p className="text-base font-semibold leading-snug tracking-tight text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--brand-primary)] sm:text-[1.05rem]">
                      {article.label}
                    </p>
                  </div>
                </Link>
              </FadeUp>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
