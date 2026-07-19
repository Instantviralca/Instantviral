import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export type LearnSearchSkeletonProps = {
  count?: number;
  className?: string;
};

/**
 * Loading skeleton for future server filtering — Document 15.05.
 */
export function LearnSearchSkeleton({
  count = 6,
  className,
}: LearnSearchSkeletonProps) {
  return (
    <div
      className={cn('grid gap-4 sm:grid-cols-2 lg:grid-cols-3', className)}
      aria-busy="true"
      aria-label="Loading articles"
    >
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="space-y-3 border border-neutral-200 p-5"
        >
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-6 w-4/5" />
          <Skeleton className="h-16 w-full" />
          <Skeleton className="h-3 w-24" />
        </div>
      ))}
    </div>
  );
}
