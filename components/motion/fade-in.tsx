'use client';

import { motion, type HTMLMotionProps } from 'framer-motion';

import { theme } from '@/config/theme';
import { cn } from '@/lib/utils';

type FadeInProps = HTMLMotionProps<'div'> & {
  delay?: number;
};

export function FadeIn({ className, delay = 0, ...props }: FadeInProps) {
  return (
    <motion.div
      className={cn(className)}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: theme.motion.durationBase, delay, ease: theme.motion.easeOut }}
      {...props}
    />
  );
}
