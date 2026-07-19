import * as React from 'react';

import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';

export type DividerProps = React.ComponentProps<typeof Separator>;

export function Divider({ className, ...props }: DividerProps) {
  return <Separator className={cn(className)} {...props} />;
}
