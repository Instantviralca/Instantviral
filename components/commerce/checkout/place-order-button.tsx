'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type PlaceOrderButtonProps = {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void | Promise<void>;
  className?: string;
};

export function PlaceOrderButton({
  label = 'Place Order',
  disabled,
  loading,
  onClick,
  className,
}: PlaceOrderButtonProps) {
  return (
    <Button
      type="button"
      size="lg"
      className={cn('w-full min-h-11', className)}
      disabled={disabled || loading}
      loading={loading}
      data-analytics="place-order"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
