import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/** Desktop max 1280px (xl); readable content 720–800px (content). */
const containerVariants = cva('mx-auto w-full px-4 sm:px-6', {
  variants: {
    size: {
      xs: 'max-w-[20rem]',
      sm: 'max-w-[40rem]',
      md: 'max-w-[48rem]',
      content: 'max-w-[50rem]',
      lg: 'max-w-[64rem]',
      xl: 'max-w-[80rem]',
    },
  },
  defaultVariants: {
    size: 'xl',
  },
});

export interface ContainerProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof containerVariants> {}

export function Container({ size, className, ...props }: ContainerProps) {
  return <div className={cn(containerVariants({ size }), className)} {...props} />;
}
