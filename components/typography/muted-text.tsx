import * as React from 'react';

import { cn } from '@/lib/utils';

export interface MutedTextProps extends React.HTMLAttributes<HTMLParagraphElement> {
  as?: 'p' | 'span' | 'div';
}

export function MutedText({ as = 'p', className, ...props }: MutedTextProps) {
  const Comp = as;
  return <Comp className={cn('text-sm text-muted-foreground', className)} {...props} />;
}
