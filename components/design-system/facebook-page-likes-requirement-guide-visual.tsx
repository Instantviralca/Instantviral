'use client';

import dynamic from 'next/dynamic';

const FacebookPageLikesRequirementVisual = dynamic(
  () =>
    import('@/components/illustrations/facebook-page-likes-requirement-visual').then(
      (mod) => mod.FacebookPageLikesRequirementVisual,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        className="mx-auto aspect-[4/5] w-full max-w-[18.5rem] animate-pulse rounded-2xl bg-[var(--surface-muted)] sm:max-w-[19.5rem]"
        aria-hidden
      />
    ),
  },
);

export function FacebookPageLikesRequirementGuideVisual() {
  return <FacebookPageLikesRequirementVisual />;
}
