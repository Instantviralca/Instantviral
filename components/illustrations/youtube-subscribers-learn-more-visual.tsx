'use client';

import { cn } from '@/lib/utils';

/**
 * Compact YouTube help interface for Learn More before ordering.
 */
export function YouTubeSubscribersLearnMoreVisual({ className }: { className?: string }) {
  const ytRed = '#FF0000';
  const brand = '#F97316';

  return (
    <div
      className={cn(
        'relative h-[6.5rem] w-[6.5rem] shrink-0 overflow-hidden rounded-2xl border border-red-100 bg-white shadow-[0_16px_32px_-18px_rgba(255,0,0,0.28)] sm:h-[7.25rem] sm:w-[7.25rem]',
        className,
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,0,0,0.12),transparent_60%)]" />
      <div className="relative flex h-full flex-col gap-1 p-2">
        <div className="rounded-md border border-stone-100 bg-stone-50 px-1.5 py-1">
          <p className="text-[6px] font-semibold text-stone-400 uppercase">Channel URL</p>
          <p className="truncate text-[8px] font-bold text-stone-700">youtube.com/@channel</p>
        </div>
        <div className="rounded-md border border-stone-100 bg-white px-1.5 py-1">
          <p className="text-[6px] font-semibold text-stone-400 uppercase">Package</p>
          <p className="text-[8px] font-bold text-stone-800">500 Subscribers</p>
        </div>
        <div className="mt-auto flex items-center justify-between gap-1">
          <span className="rounded bg-emerald-50 px-1 py-0.5 text-[6px] font-bold text-emerald-700">
            Confirmed
          </span>
          <span
            className="rounded px-1.5 py-0.5 text-[6px] font-bold text-white"
            style={{ background: brand }}
          >
            Track
          </span>
        </div>
        <span
          className="absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full text-[7px] text-white"
          style={{ background: ytRed }}
        >
          ?
        </span>
      </div>
    </div>
  );
}
