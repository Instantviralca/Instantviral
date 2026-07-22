import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      sm: 'py-6 md:py-8',
      /** Tighter homepage / dense marketing rhythm (~25% less than prior) */
      md: 'py-8 md:py-11 lg:py-12',
      lg: 'py-9 md:py-12 lg:py-14',
      /** Alias used by homepage supporting blocks */
      compact: 'py-7 md:py-9 lg:py-11',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

export interface SectionProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof sectionVariants> {
  as?: 'section' | 'div' | 'aside';
}

export function Section({ as = 'section', spacing, className, ...props }: SectionProps) {
  const Comp = as;
  return <Comp className={cn(sectionVariants({ spacing }), className)} {...props} />;
}
