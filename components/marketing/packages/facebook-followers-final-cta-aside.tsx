'use client';

import { FacebookFollowersFinalCtaDashboard } from '@/components/illustrations/facebook-followers-final-cta-dashboard';
import { cn } from '@/lib/utils';

type FacebookFollowersFinalCtaAsideProps = {
  className?: string;
};

/** Final CTA visual — compact Facebook Business Suite dashboard bleed. */
export function FacebookFollowersFinalCtaAside({
  className,
}: FacebookFollowersFinalCtaAsideProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[20rem] items-center justify-center overflow-visible sm:max-w-[23rem] lg:max-w-[24rem]',
        'translate-y-5 sm:translate-y-7 lg:translate-y-10 lg:-mb-7',
        className,
      )}
    >
      <FacebookFollowersFinalCtaDashboard className="mx-auto w-full" />
    </div>
  );
}
