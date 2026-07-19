import type { DashboardViewModel } from '@/types/admin-dashboard';

type WelcomeBannerProps = {
  greeting: string;
  dateLabel: string;
  pendingReviewCount: number;
};

export function WelcomeBanner({
  greeting,
  dateLabel,
  pendingReviewCount,
}: WelcomeBannerProps) {
  return (
    <section className="rounded-lg border bg-background p-5 md:p-6" aria-label="Welcome">
      <p className="text-sm text-muted-foreground">{dateLabel}</p>
      <h2 className="mt-1 text-xl font-semibold">{greeting}</h2>
      <p className="mt-2 text-sm text-muted-foreground">
        You have {pendingReviewCount} order{pendingReviewCount === 1 ? '' : 's'} waiting for
        review.
      </p>
    </section>
  );
}

export type { DashboardViewModel };
