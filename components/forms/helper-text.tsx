import * as React from 'react';

import { cn } from '@/lib/utils';

export type HelperTextProps = React.HTMLAttributes<HTMLParagraphElement>;

export function HelperText({ className, ...props }: HelperTextProps) {
  return <p className={cn('text-xs text-muted-foreground', className)} {...props} />;
}
