'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const FLOW = [
  'Choose Package',
  'Paste Public Video URL',
  'Review Order',
  'Secure Checkout',
  'Track Delivery',
] as const;

/**
 * YouTube Views horizontal progress flow for How To Buy.
 */
export function YouTubeViewsProcessTimeline({ className }: { className?: string }) {
  const ytRed = '#FF0000';
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setActive(FLOW.length - 1);
      return;
    }
    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % FLOW.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, []);

  const progress = (active / (FLOW.length - 1)) * 100;

  return (
    <div
      className={cn(
        'mb-8 overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white/90 p-4 shadow-[0_14px_32px_-24px_rgba(28,25,23,0.28)] sm:mb-10 sm:p-5',
        className,
      )}
      aria-hidden
    >
      <div className="relative">
        <div className="absolute top-3 right-[6%] left-[6%] hidden h-1 rounded-full bg-stone-200 sm:block" />
        <div
          className="absolute top-3 left-[6%] hidden h-1 origin-left rounded-full transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:block"
          style={{
            width: `calc(${progress}% * 0.88)`,
            maxWidth: '88%',
            background: `linear-gradient(90deg, ${ytRed}, #F97316)`,
          }}
        />
        <ol className="relative grid grid-cols-2 gap-3 sm:grid-cols-5 sm:gap-2">
          {FLOW.map((label, index) => {
            const isActive = index === active;
            const isDone = index < active;
            return (
              <li key={label} className="flex flex-col items-center text-center">
                <span
                  className={cn(
                    'mb-2 flex size-6 items-center justify-center rounded-full text-[10px] font-bold transition-colors duration-300 sm:size-7',
                    isDone && 'bg-emerald-500 text-white',
                    isActive && 'text-white shadow-[0_10px_20px_-10px_rgba(255,0,0,0.7)]',
                    !isDone && !isActive && 'border border-stone-200 bg-stone-50 text-stone-400',
                  )}
                  style={isActive ? { background: ytRed } : undefined}
                >
                  {isDone || isActive ? '✓' : index + 1}
                </span>
                <p
                  className={cn(
                    'text-[10px] font-semibold leading-snug sm:text-[11px]',
                    isActive || isDone ? 'text-stone-800' : 'text-stone-400',
                  )}
                >
                  {label}
                </p>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}
