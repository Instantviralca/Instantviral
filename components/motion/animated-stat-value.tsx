'use client';

import { useEffect, useRef, useState } from 'react';

import { cn } from '@/lib/utils';

type AnimatedStatValueProps = {
  value: string;
  className?: string;
};

/**
 * Lightweight in-view counter for numeric stat prefixes.
 * Respects prefers-reduced-motion; non-numeric values render as-is.
 */
export function AnimatedStatValue({ value, className }: AnimatedStatValueProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (reduceMotion) {
      setDisplay(value);
      return;
    }

    const match = value.match(/^(\d[\d,]*)(.*)$/);
    if (!match) {
      setDisplay(value);
      return;
    }

    const target = Number(match[1].replace(/,/g, ''));
    if (!Number.isFinite(target) || target <= 0) {
      setDisplay(value);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [value]);

  useEffect(() => {
    if (!started) return;

    const match = value.match(/^(\d[\d,]*)(.*)$/);
    if (!match) return;

    const target = Number(match[1].replace(/,/g, ''));
    const suffix = match[2] ?? '';
    const duration = 1100;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(target * eased);
      setDisplay(`${current.toLocaleString('en-US')}${suffix}`);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [started, value]);

  return (
    <span ref={ref} className={cn(className)}>
      {display}
    </span>
  );
}
