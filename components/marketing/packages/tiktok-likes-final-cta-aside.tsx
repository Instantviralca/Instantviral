'use client';

import dynamic from 'next/dynamic';

import { cn } from '@/lib/utils';

const TikTokLikesHeroDashboard = dynamic(
  () =>
    import('@/components/illustrations/tiktok-likes-hero-dashboard').then(
      (mod) => mod.TikTokLikesHeroDashboard,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="aspect-[4/5] w-full min-h-[18rem] animate-pulse rounded-2xl bg-transparent sm:min-h-[20rem]"
        aria-hidden
      />
    ),
  },
);

type TikTokLikesFinalCtaAsideProps = {
  className?: string;
};

/**
 * Final CTA visual — larger phone, stronger glow, floating status cards.
 */
export function TikTokLikesFinalCtaAside({ className }: TikTokLikesFinalCtaAsideProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[22rem] items-center justify-center overflow-visible sm:max-w-[24.5rem] lg:max-w-[26rem]',
        'translate-y-4 sm:translate-y-6 lg:translate-y-8 lg:-mb-6',
        className,
      )}
    >
      {/* Stronger ambient glow */}
      <div className="pointer-events-none absolute top-[22%] left-1/2 size-72 -translate-x-1/2 rounded-full bg-[var(--brand-primary)]/45 blur-[70px] motion-safe:animate-iv-glow-pulse sm:size-80" />
      <div className="pointer-events-none absolute bottom-[18%] left-[10%] size-40 rounded-full bg-[#FE2C55]/25 blur-3xl" />
      <div className="pointer-events-none absolute top-[40%] right-[6%] size-32 rounded-full bg-[#25F4EE]/22 blur-3xl" />

      {/* Subtle particle dots */}
      <span className="pointer-events-none absolute top-[12%] left-[18%] size-1.5 rounded-full bg-white/50 motion-safe:animate-[iv-float-card_5s_ease-in-out_infinite]" />
      <span className="pointer-events-none absolute top-[28%] right-[14%] size-1 rounded-full bg-[#25F4EE]/70 motion-safe:animate-[iv-float-card_6.2s_ease-in-out_infinite]" />
      <span className="pointer-events-none absolute bottom-[24%] left-[12%] size-1.5 rounded-full bg-[#FE2C55]/55 motion-safe:animate-[iv-float-card_5.6s_ease-in-out_infinite]" />
      <span className="pointer-events-none absolute top-[48%] left-[8%] size-1 rounded-full bg-[var(--brand-primary)]/60 motion-safe:animate-[iv-float-card_7s_ease-in-out_infinite]" />
      <span className="pointer-events-none absolute right-[10%] bottom-[36%] size-1 rounded-full bg-white/45 motion-safe:animate-[iv-float-card_6.4s_ease-in-out_infinite]" />

      <TikTokLikesHeroDashboard className="relative z-[1] mx-auto w-full max-w-[20.5rem] sm:max-w-[22.5rem] lg:max-w-[24rem]" />

      <div className="pointer-events-none absolute top-1 right-0 z-10 rounded-xl border border-white/95 bg-white px-3.5 py-2.5 shadow-[0_18px_36px_-14px_rgba(28,25,23,0.5)] motion-safe:animate-[iv-float-card_5.6s_ease-in-out_infinite]">
        <p className="text-[10px] font-semibold text-emerald-600 uppercase">Live</p>
        <p className="text-[13px] font-bold text-stone-800">♥ Likes increasing</p>
      </div>
      <div className="pointer-events-none absolute top-[22%] -left-1 z-10 rounded-xl border border-white/95 bg-white px-3.5 py-2.5 shadow-[0_18px_36px_-14px_rgba(28,25,23,0.5)] motion-safe:animate-[iv-float-card_6.8s_ease-in-out_infinite] sm:-left-2">
        <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
          Analytics
        </p>
        <p className="text-[13px] font-bold tabular-nums text-stone-800">+18% engagement</p>
      </div>
      <div className="pointer-events-none absolute right-0 bottom-6 z-10 rounded-full border border-emerald-100 bg-emerald-50 px-3.5 py-1.5 text-[11px] font-bold text-emerald-700 shadow-[0_16px_32px_-12px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_6.6s_ease-in-out_infinite]">
        ♥ Hearts delivering
      </div>
    </div>
  );
}
