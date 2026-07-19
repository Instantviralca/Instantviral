import * as React from 'react';

import { cn } from '@/lib/utils';

export type CaptionProps = React.HTMLAttributes<HTMLParagraphElement>;

export function Caption({ className, ...props }: CaptionProps) {
  return (
    <p className={cn('type-caption text-muted-foreground', className)} {...props} />
  );
}
