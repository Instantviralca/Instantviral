'use client';

import dynamic from 'next/dynamic';

const FacebookFollowersRequirementVisual = dynamic(
  () =>
    import('@/components/illustrations/facebook-followers-requirement-visual').then(
      (mod) => mod.FacebookFollowersRequirementVisual,
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

export function FacebookFollowersRequirementGuideVisual() {
  return <FacebookFollowersRequirementVisual />;
}
