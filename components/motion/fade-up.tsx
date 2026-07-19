'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

import { theme } from '@/config/theme';
import { cn } from '@/lib/utils';

type FadeUpProps = HTMLMotionProps<'div'> & {
  delay?: number;
  /** Animate on mount (for above-the-fold content). Default: in-view. */
  immediate?: boolean;
};

/**
 * Lightweight fade-up. Never leaves above-the-fold content stuck at opacity 0.
 */
export function FadeUp({
  className,
  delay = 0,
  immediate = false,
  ...props
}: FadeUpProps) {
  const reduceMotion = useReducedMotion();
  const transition = {
    duration: theme.motion.durationBase,
    delay,
    ease: theme.motion.easeOut,
  };

  if (reduceMotion) {
    return <div className={cn(className)} {...(props as React.HTMLAttributes<HTMLDivElement>)} />;
  }

  if (immediate) {
    return (
      <motion.div
        className={cn(className)}
        initial={{ opacity: 1, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={transition}
        {...props}
      />
    );
  }

  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.35, margin: '0px 0px -10% 0px' }}
      transition={transition}
      {...props}
    />
  );
}
