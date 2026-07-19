import * as React from 'react';

import { cn } from '@/lib/utils';

export type GlassCardProps = React.HTMLAttributes<HTMLDivElement>;

export function GlassCard({ className, ...props }: GlassCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-border/60 bg-background/70 shadow-sm backdrop-blur-sm',
        className,
      )}
      {...props}
    />
  );
}
