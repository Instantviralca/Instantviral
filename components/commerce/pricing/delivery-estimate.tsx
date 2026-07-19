import { cn } from '@/lib/utils';
import type { DeliveryEstimateProps } from '@/components/commerce/pricing/types';

export function DeliveryEstimate({ deliveryTime, className }: DeliveryEstimateProps) {
  if (!deliveryTime) return null;

  return (
    <p className={cn('text-sm text-muted-foreground', className)}>
      <span className="sr-only">Estimated delivery: </span>
      {deliveryTime}
    </p>
  );
}
