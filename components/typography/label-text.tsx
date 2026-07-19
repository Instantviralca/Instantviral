import * as React from 'react';

import { cn } from '@/lib/utils';

export type LabelTextProps = React.HTMLAttributes<HTMLSpanElement>;

export function LabelText({ className, ...props }: LabelTextProps) {
  return (
    <span
      className={cn('text-sm font-medium leading-none text-foreground', className)}
      {...props}
    />
  );
}
