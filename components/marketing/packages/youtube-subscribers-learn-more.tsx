'use client';

import Link from 'next/link';
import dynamic from 'next/dynamic';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

const YouTubeSubscribersLearnMoreVisual = dynamic(
  () =>
    import('@/components/illustrations/youtube-subscribers-learn-more-visual').then(
      (mod) => mod.YouTubeSubscribersLearnMoreVisual,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="h-[6.5rem] w-[6.5rem] animate-pulse rounded-2xl bg-[var(--surface-muted)] sm:h-[7.25rem] sm:w-[7.25rem]"
        aria-hidden
      />
    ),
  },
);

type YouTubeSubscribersLearnMoreProps = {
  id?: string;
  className?: string;
};

/**
 * Learn-more band for YouTube Subscribers — process + support links.
 */
export function YouTubeSubscribersLearnMore({
  id = 'learn-more-before-ordering',
  className,
}: YouTubeSubscribersLearnMoreProps) {
  return (
    <Section id={id} spacing="md" className={cn(className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <FadeUp className="overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-[linear-gradient(135deg,#fffdfb_0%,#fff7f0_55%,#ffffff_100%)] shadow-[0_18px_40px_-28px_rgba(28,25,23,0.3)]">
          <div className="flex flex-col gap-6 px-6 py-8 sm:flex-row sm:items-center sm:gap-8 sm:px-9 sm:py-10">
            <YouTubeSubscribersLearnMoreVisual />
            <div className="min-w-0 flex-1">
              <Heading as="h2" size="h3" id={`${id}-heading`}>
                Want to Learn More Before Choosing a Package?
              </Heading>
              <MutedText className="mt-2 max-w-3xl text-base">
                Review how public channel information, package selection, delivery updates and
                order tracking work before placing your subscriber order.
              </MutedText>
            </div>
            <div className="flex w-full shrink-0 flex-col gap-3 sm:w-auto">
              <Button asChild size="lg" className="min-h-12 rounded-xl px-6">
                <Link href="#how-it-works">Learn How Ordering Works</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="min-h-12 rounded-xl px-6">
                <Link href={routes.contact}>Contact Support</Link>
              </Button>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
