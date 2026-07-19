import * as React from 'react';

import { cn } from '@/lib/utils';

export interface PageWrapperProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'main' | 'div';
}

export function PageWrapper({ as = 'main', className, ...props }: PageWrapperProps) {
  const Comp = as;
  return <Comp className={cn('min-h-[50vh] w-full flex-1', className)} {...props} />;
}
