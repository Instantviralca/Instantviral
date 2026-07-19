'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';

const TikTokFollowersHeroDashboard = dynamic(
  () =>
    import('@/components/illustrations/tiktok-followers-hero-dashboard').then(
      (mod) => mod.TikTokFollowersHeroDashboard,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="aspect-[4/5] w-full min-h-[16rem] animate-pulse rounded-2xl bg-transparent sm:min-h-[18rem]"
        aria-hidden
      />
    ),
  },
);

type TikTokFollowersFinalCtaAsideProps = {
  className?: string;
};

/** Final CTA visual — compact TikTok dashboard, no card background. */
export function TikTokFollowersFinalCtaAside({
  className,
}: TikTokFollowersFinalCtaAsideProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[18rem] items-center justify-center overflow-visible sm:max-w-[20rem]',
        className,
      )}
    >
      <TikTokFollowersHeroDashboard className="mx-auto w-full max-w-[17rem] sm:max-w-[18.5rem]" />

      <div className="pointer-events-none absolute top-2 right-0 z-10 rounded-xl border border-white/90 bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_5.6s_ease-in-out_infinite]">
        <p className="text-[9px] font-semibold text-emerald-600 uppercase">Live</p>
        <p className="text-[11px] font-bold text-stone-800">♪ Followers increasing</p>
      </div>
      <div className="pointer-events-none absolute top-16 -left-1 z-10 rounded-xl border border-white/90 bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_6.8s_ease-in-out_infinite]">
        <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
          Analytics
        </p>
        <p className="text-[11px] font-bold tabular-nums text-stone-800">+1,240 this week</p>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-8 z-10 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700 shadow-[0_14px_28px_-14px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_6.6s_ease-in-out_infinite]">
        ✓ Order confirmed
      </div>
    </div>
  );
}
