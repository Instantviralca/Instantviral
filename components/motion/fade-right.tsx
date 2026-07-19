'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

import { theme } from '@/config/theme';
import { cn } from '@/lib/utils';

type FadeRightProps = HTMLMotionProps<'div'> & {
  delay?: number;
};

export function FadeRight({ className, delay = 0, ...props }: FadeRightProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: theme.motion.durationBase, delay, ease: theme.motion.easeOut }}
      {...props}
    />
  );
}
