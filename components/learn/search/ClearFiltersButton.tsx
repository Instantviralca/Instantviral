'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ClearFiltersButtonProps = {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
  label?: string;
};

export function ClearFiltersButton({
  onClick,
  disabled,
  className,
  label = 'Clear All Filters',
}: ClearFiltersButtonProps) {
  return (
    <Button
      type="button"
      variant="outline"
      className={cn('min-h-11', className)}
      disabled={disabled}
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
