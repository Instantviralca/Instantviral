import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const sectionVariants = cva('w-full', {
  variants: {
    spacing: {
      sm: 'py-8 md:py-10',
      /** Tighter launch rhythm — premium density without feeling cramped */
      md: 'py-10 md:py-14 lg:py-16',
      lg: 'py-12 md:py-16 lg:py-20',
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
