'use client';

import dynamic from 'next/dynamic';

const FacebookPostLikesRequirementVisual = dynamic(
  () =>
    import('@/components/illustrations/facebook-post-likes-requirement-visual').then(
      (mod) => mod.FacebookPostLikesRequirementVisual,
    ),
  { ssr: false },
);

/** RequirementGuide visual slot for Facebook Post Likes. */
export function FacebookPostLikesRequirementGuideVisual() {
  return <FacebookPostLikesRequirementVisual />;
}
