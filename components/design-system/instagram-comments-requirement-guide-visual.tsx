'use client';

import dynamic from 'next/dynamic';

const InstagramCommentsRequirementVisual = dynamic(
  () =>
    import('@/components/illustrations/instagram-comments-requirement-visual').then(
      (mod) => mod.InstagramCommentsRequirementVisual,
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

/** Client boundary for lazy Instagram Comments requirement illustration. */
export function InstagramCommentsRequirementGuideVisual() {
  return <InstagramCommentsRequirementVisual />;
}
