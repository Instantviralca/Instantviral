import * as React from 'react';
import { Loader2 } from 'lucide-react';

import { cn } from '@/lib/utils';

export interface LoadingSpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'default' | 'lg';
  label?: string;
}

const sizeMap = {
  sm: 'h-4 w-4',
  default: 'h-5 w-5',
  lg: 'h-8 w-8',
} as const;

export function LoadingSpinner({
  size = 'default',
  label = 'Loading',
  className,
  ...props
}: LoadingSpinnerProps) {
  return (
    <div
      role="status"
      className={cn('inline-flex items-center justify-center text-muted-foreground', className)}
      {...props}
    >
      <Loader2 className={cn('animate-spin', sizeMap[size])} aria-hidden="true" />
      <span className="sr-only">{label}</span>
    </div>
  );
}
