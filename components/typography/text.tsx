import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/** Phase 18 VDS body scale — Body Large / Body / Small */
const textVariants = cva('text-foreground', {
  variants: {
    size: {
      large: 'type-body-lg',
      default: 'type-body',
      small: 'type-small',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div';
}

export function Text({ as = 'p', size, className, ...props }: TextProps) {
  const Comp = as;
  return <Comp className={cn(textVariants({ size }), className)} {...props} />;
}
