import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { Badge, badgeVariants } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const statusBadgeVariants = cva('', {
  variants: {
    status: {
      default: '',
      success: 'border-transparent bg-success text-success-foreground',
      warning: 'border-transparent bg-warning text-warning-foreground',
      error: 'border-transparent bg-destructive text-white',
      muted: 'border-transparent bg-muted text-muted-foreground',
    },
  },
  defaultVariants: {
    status: 'default',
  },
});

export interface StatusBadgeProps
  extends React.ComponentProps<typeof Badge>,
    VariantProps<typeof statusBadgeVariants> {}

export function StatusBadge({ status, className, ...props }: StatusBadgeProps) {
  return <Badge className={cn(statusBadgeVariants({ status }), className)} {...props} />;
}

export { Badge, badgeVariants };
