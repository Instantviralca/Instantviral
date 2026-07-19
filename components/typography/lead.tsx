import * as React from 'react';

import { cn } from '@/lib/utils';

export type LeadProps = React.HTMLAttributes<HTMLParagraphElement>;

export function Lead({ className, ...props }: LeadProps) {
  return <p className={cn('text-xl text-muted-foreground', className)} {...props} />;
}
