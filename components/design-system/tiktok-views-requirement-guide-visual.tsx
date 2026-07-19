'use client';

import dynamic from 'next/dynamic';

const TikTokViewsRequirementVisual = dynamic(
  () =>
    import('@/components/illustrations/tiktok-views-requirement-visual').then(
      (mod) => mod.TikTokViewsRequirementVisual,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto aspect-[4/5] w-full max-w-[18.5rem] animate-pulse rounded-2xl bg-stone-100 sm:max-w-[19.5rem]"
        aria-hidden
      />
    ),
  },
);

/** Client boundary for lazy TikTok Views section illustration. */
export function TikTokViewsRequirementGuideVisual() {
  return <TikTokViewsRequirementVisual />;
}
