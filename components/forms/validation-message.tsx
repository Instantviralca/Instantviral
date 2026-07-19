import * as React from 'react';

import { cn } from '@/lib/utils';

export type ValidationMessageProps = React.HTMLAttributes<HTMLParagraphElement>;

export function ValidationMessage({ className, ...props }: ValidationMessageProps) {
  return (
    <p
      role="alert"
      className={cn('text-xs font-medium text-destructive', className)}
      {...props}
    />
  );
}
