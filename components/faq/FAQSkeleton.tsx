import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export type FAQSkeletonProps = {
  rows?: number;
  className?: string;
};

/**
 * Loading placeholder for FAQ accordion content.
 */
export function FAQSkeleton({ rows = 5, className }: FAQSkeletonProps) {
  return (
    <div
      className={cn('rounded-lg border border-border bg-card p-4', className)}
      aria-hidden
    >
      <div className="space-y-4">
        {Array.from({ length: rows }).map((_, index) => (
          <div key={index} className="space-y-2 border-b border-border pb-4 last:border-b-0">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
