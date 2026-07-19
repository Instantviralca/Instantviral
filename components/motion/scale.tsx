'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

import { theme } from '@/config/theme';
import { cn } from '@/lib/utils';

type ScaleProps = HTMLMotionProps<'div'> & {
  delay?: number;
};

export function Scale({ className, delay = 0, ...props }: ScaleProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      whileInView={reduceMotion ? undefined : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: theme.motion.durationBase, delay, ease: theme.motion.easeOut }}
      {...props}
    />
  );
}
