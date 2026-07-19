import * as React from 'react';

import { cn } from '@/lib/utils';

export type ContentWidthProps = React.HTMLAttributes<HTMLDivElement>;

export function ContentWidth({ className, ...props }: ContentWidthProps) {
  return <div className={cn('mx-auto w-full max-w-[40rem]', className)} {...props} />;
}
