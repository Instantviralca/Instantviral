'use client';

import { FacebookPostLikesFinalCtaDashboard } from '@/components/illustrations/facebook-post-likes-final-cta-dashboard';
import { cn } from '@/lib/utils';

type FacebookPostLikesFinalCtaAsideProps = {
  className?: string;
};

/** Final CTA visual — compact Facebook post engagement dashboard. */
export function FacebookPostLikesFinalCtaAside({
  className,
}: FacebookPostLikesFinalCtaAsideProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[18rem] items-center justify-center overflow-visible sm:max-w-[20rem]',
        'translate-y-5 sm:translate-y-7 lg:translate-y-10 lg:-mb-7',
        className,
      )}
    >
      <FacebookPostLikesFinalCtaDashboard className="mx-auto w-full" />
    </div>
  );
}
