'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type AddToCartButtonProps = {
  label?: string;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
  className?: string;
};

export function AddToCartButton({
  label = 'Add to Cart',
  disabled,
  loading,
  onClick,
  className,
}: AddToCartButtonProps) {
  return (
    <Button
      type="button"
      size="lg"
      className={cn('min-h-11', className)}
      disabled={disabled || loading}
      loading={loading}
      data-analytics="add-to-cart"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
