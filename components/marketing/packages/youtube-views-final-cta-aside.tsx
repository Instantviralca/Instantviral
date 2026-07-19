'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';

const YouTubeViewsFinalCtaDashboard = dynamic(
  () =>
    import('@/components/illustrations/youtube-views-final-cta-dashboard').then(
      (mod) => mod.YouTubeViewsFinalCtaDashboard,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="aspect-[4/5] w-full min-h-[14rem] animate-pulse rounded-2xl bg-transparent sm:min-h-[16rem]"
        aria-hidden
      />
    ),
  },
);

type YouTubeViewsFinalCtaAsideProps = {
  className?: string;
};

/** Final CTA visual — compact YouTube video analytics dashboard bleed. */
export function YouTubeViewsFinalCtaAside({ className }: YouTubeViewsFinalCtaAsideProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[18rem] items-center justify-center overflow-visible sm:max-w-[20rem]',
        'translate-y-5 sm:translate-y-7 lg:translate-y-10 lg:-mb-7',
        className,
      )}
    >
      <YouTubeViewsFinalCtaDashboard className="mx-auto w-full" />
    </div>
  );
}
