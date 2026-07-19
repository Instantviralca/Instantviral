import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import {
  INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG,
  type PackagesPageConfig,
} from '@/data/content/packages-page-config';
import { cn } from '@/lib/utils';

type PackagesLearnMoreLinkProps = {
  id?: string;
  className?: string;
  config?: PackagesPageConfig;
};

function LearnMoreIllustration({ metric }: { metric: PackagesPageConfig['metric'] }) {
  const isLikes = metric === 'likes';

  return (
    <div
      className="relative h-[5.5rem] w-[5.5rem] shrink-0 overflow-hidden rounded-2xl border border-orange-100 bg-white shadow-[0_16px_32px_-18px_rgba(249,115,22,0.55)] sm:h-[6.25rem] sm:w-[6.25rem]"
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.18),transparent_60%)]" />
      <div className="absolute inset-x-2 top-2 rounded-lg bg-stone-900/90 p-1.5 shadow-sm">
        <div className="overflow-hidden rounded-md bg-white">
          <div
            className="aspect-[5/4] w-full"
            style={{
              background: isLikes
                ? 'linear-gradient(160deg,#fff7ed,#fecaca 70%,#fda4af)'
                : 'linear-gradient(160deg,#fff7ed,#ffedd5 55%,#fdba74)',
            }}
          />
          <div className="flex items-center gap-1 px-1.5 py-1">
            <span className="text-[8px]">{isLikes ? '❤️' : '↑'}</span>
            <span className="h-1 flex-1 overflow-hidden rounded-full bg-stone-100">
              <span className="block h-full w-3/4 rounded-full bg-[var(--brand-primary)]" />
            </span>
          </div>
        </div>
      </div>
      <div className="absolute right-1.5 bottom-1.5 rounded-md border border-white/90 bg-white/95 px-1.5 py-1 shadow-sm backdrop-blur-sm">
        <p className="text-[7px] font-bold tracking-wide text-emerald-600 uppercase">+18%</p>
        <div className="mt-0.5 flex items-end gap-0.5">
          <span className="h-1.5 w-1 rounded-sm bg-orange-200" />
          <span className="h-2.5 w-1 rounded-sm bg-orange-300" />
          <span className="h-3.5 w-1 rounded-sm bg-[var(--brand-primary)]" />
        </div>
      </div>
    </div>
  );
}

export function PackagesLearnMoreLink({
  id = 'learn-more-home',
  className,
  config = INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG,
}: PackagesLearnMoreLinkProps) {
  const { learnMore } = config;

  return (
    <Section id={id} spacing="md" className={cn(className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <FadeUp className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[linear-gradient(135deg,#fffdfb_0%,#fff7f0_55%,#ffffff_100%)] shadow-[0_18px_40px_-28px_rgba(28,25,23,0.3)]">
          <div className="flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:gap-8 sm:px-9 sm:py-10">
            <LearnMoreIllustration metric={config.metric} />
            <div className="min-w-0 flex-1">
              <Heading as="h2" size="h3" id={`${id}-heading`}>
                {learnMore.title}
              </Heading>
              <MutedText className="mt-2 max-w-3xl text-base">{learnMore.description}</MutedText>
            </div>
            <Link
              href="/"
              className="group relative inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 overflow-hidden rounded-xl bg-[linear-gradient(145deg,var(--brand-primary)_0%,#ea580c_100%)] px-7 text-sm font-semibold text-white shadow-[0_14px_30px_-14px_rgba(249,115,22,0.8)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_18px_36px_-14px_rgba(249,115,22,0.95)] active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 sm:w-auto"
            >
              <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(120deg,transparent_30%,rgba(255,255,255,0.22)_50%,transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              {learnMore.ctaLabel}
              <ArrowRight
                className="relative size-4 transition-transform duration-200 group-hover:translate-x-0.5"
                aria-hidden
              />
            </Link>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
