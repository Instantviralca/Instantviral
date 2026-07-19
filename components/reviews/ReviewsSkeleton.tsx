import { Grid } from '@/components/layout/grid';
import { cn } from '@/lib/utils';

export type ReviewsSkeletonProps = {
  count?: number;
  className?: string;
};

export function ReviewsSkeleton({ count = 3, className }: ReviewsSkeletonProps) {
  return (
    <Grid cols={3} className={cn('gap-4', className)} aria-hidden>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="animate-pulse rounded-lg border border-border bg-card p-5"
        >
          <div className="flex gap-3">
            <div className="size-10 rounded-full bg-muted" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/2 rounded bg-muted" />
              <div className="h-3 w-1/3 rounded bg-muted" />
            </div>
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-full rounded bg-muted" />
            <div className="h-3 w-5/6 rounded bg-muted" />
            <div className="h-3 w-4/6 rounded bg-muted" />
          </div>
        </div>
      ))}
      <span className="sr-only">Loading reviews</span>
    </Grid>
  );
}
