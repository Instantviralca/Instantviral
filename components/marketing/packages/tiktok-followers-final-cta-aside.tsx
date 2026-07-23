'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';

const TikTokFollowersFinalCtaVisual = dynamic(
  () =>
    import('@/components/illustrations/tiktok-followers-final-cta-visual').then(
      (mod) => mod.TikTokFollowersFinalCtaVisual,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto aspect-[9/16] w-full max-w-[18.5rem] rounded-[2rem] bg-transparent sm:max-w-[21rem] lg:max-w-[24rem]"
        aria-hidden
      />
    ),
  },
);

type TikTokFollowersFinalCtaAsideProps = {
  className?: string;
};

/** Final CTA aside — large phone mockup (~35–40% of CTA width). */
export function TikTokFollowersFinalCtaAside({
  className,
}: TikTokFollowersFinalCtaAsideProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[22rem] items-center justify-center overflow-visible py-6 sm:max-w-[24rem] sm:py-4 lg:max-w-[26rem] lg:py-2',
        className,
      )}
    >
      <TikTokFollowersFinalCtaVisual className="w-full" />
    </div>
  );
}
