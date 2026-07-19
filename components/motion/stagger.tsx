'use client';

import { motion, useReducedMotion, type HTMLMotionProps } from 'framer-motion';

import { theme } from '@/config/theme';
import { cn } from '@/lib/utils';

type StaggerChildrenProps = HTMLMotionProps<'div'> & {
  stagger?: number;
};

export function StaggerChildren({
  className,
  stagger = 0.08,
  children,
  ...props
}: StaggerChildrenProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      initial={reduceMotion ? false : 'hidden'}
      whileInView={reduceMotion ? undefined : 'show'}
      viewport={{ once: true, margin: '-40px' }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: reduceMotion ? 0 : stagger,
          },
        },
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = HTMLMotionProps<'div'>;

export function StaggerItem({ className, ...props }: StaggerItemProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={cn(className)}
      variants={{
        hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 },
        show: {
          opacity: 1,
          y: 0,
          transition: {
            duration: reduceMotion ? 0 : theme.motion.durationBase,
            ease: theme.motion.easeOut,
          },
        },
      }}
      {...props}
    />
  );
}
