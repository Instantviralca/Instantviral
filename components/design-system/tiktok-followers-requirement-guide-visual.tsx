'use client';

import dynamic from 'next/dynamic';

const TikTokFollowersRequirementVisual = dynamic(
  () =>
    import('@/components/illustrations/tiktok-followers-requirement-visual').then(
      (mod) => mod.TikTokFollowersRequirementVisual,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto aspect-[16/9] w-full max-w-[36rem] animate-pulse rounded-2xl bg-stone-100"
        aria-hidden
      />
    ),
  },
);

/** Client boundary for lazy TikTok Followers section illustration. */
export function TikTokFollowersRequirementGuideVisual() {
  return (
    <div className="relative [transform:perspective(1200px)_rotateX(2deg)_rotateY(3deg)] motion-reduce:[transform:none]">
      <TikTokFollowersRequirementVisual />
    </div>
  );
}
