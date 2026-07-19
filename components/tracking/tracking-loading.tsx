import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

type TrackingLoadingProps = {
  className?: string;
};

export function TrackingLoading({ className }: TrackingLoadingProps) {
  return (
    <div className={cn('space-y-4', className)} aria-busy="true" aria-label="Loading order">
      <Skeleton className="h-28 w-full" />
      <Skeleton className="h-40 w-full" />
      <Skeleton className="h-32 w-full" />
    </div>
  );
}
