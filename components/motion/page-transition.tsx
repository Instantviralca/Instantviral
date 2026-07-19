'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

import { theme } from '@/config/theme';
import { cn } from '@/lib/utils';

type PageTransitionProps = HTMLMotionProps<'div'>;

export function PageTransition({ className, ...props }: PageTransitionProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: theme.motion.durationSlow, ease: theme.motion.easeOut }}
      {...props}
    />
  );
}
