'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

import { theme } from '@/config/theme';
import { cn } from '@/lib/utils';

type HoverLiftProps = HTMLMotionProps<'div'>;

export function HoverLift({ className, ...props }: HoverLiftProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      whileHover={reduceMotion ? undefined : { y: -4 }}
      transition={{ duration: theme.motion.durationFast, ease: theme.motion.easeOut }}
      {...props}
    />
  );
}
