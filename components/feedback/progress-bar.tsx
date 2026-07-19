'use client';

import * as React from 'react';

import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export interface ProgressBarProps extends React.ComponentProps<typeof Progress> {
  label?: string;
}

export function ProgressBar({ className, label, value, ...props }: ProgressBarProps) {
  return (
    <div className="space-y-2">
      {label ? (
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="tabular-nums text-foreground">{value ?? 0}%</span>
        </div>
      ) : null}
      <Progress value={value} className={cn(className)} {...props} />
    </div>
  );
}
