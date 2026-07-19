'use client';

import dynamic from 'next/dynamic';

import type { InstagramDashboardVariant } from '@/components/illustrations/dashboards';
import { cn } from '@/lib/utils';

const PlatformDashboard = dynamic(
  () =>
    import('@/components/illustrations/dashboards').then((mod) => mod.PlatformDashboard),
  {
    ssr: false,
    loading: () => (
      <div
        className="aspect-[4/5] w-full min-h-[18rem] animate-pulse rounded-2xl bg-stone-100 sm:min-h-[22rem]"
        aria-hidden
      />
    ),
  },
);

type PackagesFinalCtaAsideProps = {
  className?: string;
  instagramVariant?: InstagramDashboardVariant;
};

/** Lazy-loaded final CTA visual — reserved height avoids layout shift. */
export function PackagesFinalCtaAside({
  className,
  instagramVariant = 'followers',
}: PackagesFinalCtaAsideProps) {
  const isLikes = instagramVariant === 'likes';
  const isViews = instagramVariant === 'views';
  const isComments = instagramVariant === 'comments';
  const usesCompactVisual = isLikes || isViews || isComments;

  return (
    <div
      className={cn(
        'relative flex min-h-[20rem] items-center overflow-hidden rounded-2xl border border-white/15 bg-white/95 p-3 shadow-[0_28px_56px_-28px_rgba(0,0,0,0.6)] sm:min-h-[24rem]',
        (isViews || isComments) && 'min-h-[19.5rem] w-full max-w-none sm:min-h-[23rem]',
        isComments && 'items-end pb-4 pt-6 sm:pb-5 sm:pt-8',
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -top-8 -right-6 size-40 rounded-full bg-[var(--brand-primary)]/25 blur-3xl motion-safe:animate-iv-glow-pulse"
        aria-hidden
      />
      {isViews || isComments ? (
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(249,115,22,0.22),transparent_55%)]"
          aria-hidden
        />
      ) : null}
      {usesCompactVisual ? (
        <div
          className="pointer-events-none absolute bottom-6 left-4 size-28 rounded-full bg-[#E1306C]/20 blur-3xl"
          aria-hidden
        />
      ) : null}
      <PlatformDashboard
        platform="instagram"
        instagramVariant={instagramVariant}
        className={cn(
          'max-w-none scale-[1.2] sm:scale-[1.28]',
          isViews && 'scale-[1.17] sm:scale-[1.24]',
          isComments && 'mb-1 scale-[1.14] sm:mb-2 sm:scale-[1.2]',
        )}
      />
      <div className="pointer-events-none absolute top-4 right-3 z-10 rounded-xl border border-white/90 bg-white px-3 py-2 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_5.6s_ease-in-out_infinite]">
        <p className="text-[9px] font-semibold text-emerald-600 uppercase">Live</p>
        <p className="text-xs font-bold text-stone-800">
          {isLikes
            ? '❤️ Likes delivering'
            : isViews
              ? '▶ Views delivering'
              : isComments
                ? '💬 Comments delivering'
                : 'Order tracking ready'}
        </p>
      </div>
      {isViews ? (
        <div className="pointer-events-none absolute top-16 left-3 z-10 rounded-xl border border-white/90 bg-white px-3 py-2 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_6.8s_ease-in-out_infinite]">
          <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">Views</p>
          <p className="text-xs font-bold tabular-nums text-stone-800">+1,240 today</p>
        </div>
      ) : null}
      {isComments ? (
        <>
          <div className="pointer-events-none absolute top-12 left-1 z-10 max-w-[9.5rem] rounded-xl border border-white/90 bg-white px-2.5 py-1.5 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.48)] motion-safe:animate-[iv-float-card_7s_ease-in-out_infinite] sm:left-2">
            <p className="text-[11px] font-bold text-stone-800">💬 New Comment</p>
          </div>
          <div className="pointer-events-none absolute top-[38%] right-1 z-10 rounded-full border border-white/90 bg-white px-2.5 py-1 text-[11px] font-bold text-stone-800 shadow-[0_14px_28px_-14px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_6.2s_ease-in-out_infinite] sm:right-2">
            ❤️ Great post!
          </div>
          <div className="pointer-events-none absolute bottom-20 left-2 z-10 hidden rounded-full border border-white/90 bg-white px-2.5 py-1 text-[11px] font-bold text-stone-800 shadow-[0_14px_28px_-14px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_7.4s_ease-in-out_infinite] sm:block">
            🔥 Amazing!
          </div>
          <div className="pointer-events-none absolute right-2 bottom-8 z-10 rounded-full border border-white/90 bg-white px-2.5 py-1 text-[11px] font-bold text-stone-800 shadow-[0_14px_28px_-14px_rgba(28,25,23,0.45)] motion-safe:animate-[iv-float-card_6.6s_ease-in-out_infinite]">
            👏 Nice content!
          </div>
        </>
      ) : null}
      {usesCompactVisual && !isComments ? (
        <div className="pointer-events-none absolute bottom-5 left-4 z-10 hidden rounded-xl border border-white/90 bg-white/95 px-3 py-2 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.45)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.4s_ease-in-out_infinite] sm:block">
          <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
            {isViews ? 'Analytics' : 'Engagement'}
          </p>
          <p className="text-xs font-bold text-stone-800">
            {isViews ? '+14.8% this week' : '+18.2% this week'}
          </p>
        </div>
      ) : null}
    </div>
  );
}
