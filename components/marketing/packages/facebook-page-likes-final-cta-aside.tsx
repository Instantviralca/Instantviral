'use client';

import { FacebookPageLikesOrderStatusDashboard } from '@/components/illustrations/facebook-page-likes-order-status-dashboard';
import { cn } from '@/lib/utils';

type FacebookPageLikesFinalCtaAsideProps = {
  className?: string;
};

/** Final CTA visual — Facebook Page Likes order status dashboard bleed. */
export function FacebookPageLikesFinalCtaAside({
  className,
}: FacebookPageLikesFinalCtaAsideProps) {
  return (
    <div
      className={cn(
        'relative mx-auto flex w-full max-w-[20rem] items-center justify-center overflow-visible sm:max-w-[23rem] lg:max-w-[24rem]',
        'translate-y-5 sm:translate-y-7 lg:translate-y-10 lg:-mb-7',
        className,
      )}
    >
      <FacebookPageLikesOrderStatusDashboard className="mx-auto w-full" />
    </div>
  );
}
