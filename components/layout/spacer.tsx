import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/** Phase 18 VDS spacing scale: 8 · 16 · 24 · 32 · 48 · 64 · 96 · 120 */
const spacerVariants = cva('w-full shrink-0', {
  variants: {
    size: {
      xs: 'h-2', // 8
      sm: 'h-4', // 16
      md: 'h-6', // 24
      lg: 'h-8', // 32
      xl: 'h-12', // 48
      '2xl': 'h-16', // 64
      '3xl': 'h-24', // 96
      '4xl': 'h-[7.5rem]', // 120
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface SpacerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof spacerVariants> {}

export function Spacer({ size, className, ...props }: SpacerProps) {
  return <div aria-hidden="true" className={cn(spacerVariants({ size }), className)} {...props} />;
}
