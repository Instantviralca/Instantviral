import { Alert, AlertDescription } from '@/components/ui/alert';
import type { TrackOrderLookupError } from '@/types/tracking';
import { cn } from '@/lib/utils';

type TrackingErrorProps = {
  error: TrackOrderLookupError;
  className?: string;
};

export function TrackingError({ error, className }: TrackingErrorProps) {
  return (
    <Alert variant="destructive" className={cn(className)} role="alert">
      <AlertDescription>{error.message}</AlertDescription>
    </Alert>
  );
}
