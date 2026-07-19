'use client';

import dynamic from 'next/dynamic';

const InstagramViewsRequirementVisual = dynamic(
  () =>
    import('@/components/illustrations/instagram-views-requirement-visual').then(
      (mod) => mod.InstagramViewsRequirementVisual,
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

/** Client boundary for lazy Instagram Views requirement illustration. */
export function InstagramViewsRequirementGuideVisual() {
  return <InstagramViewsRequirementVisual />;
}
