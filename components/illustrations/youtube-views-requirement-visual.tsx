'use client';

import { cn } from '@/lib/utils';

/**
 * YouTube views requirement visual — video order dashboard.
 */
export function YouTubeViewsRequirementVisual({ className }: { className?: string }) {
  const ytRed = '#FF0000';
  const brand = '#F97316';

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/5] w-full max-w-[18.5rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_22px_48px_-28px_rgba(28,25,23,0.34)] motion-safe:animate-iv-float-card sm:max-w-[19.5rem]',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_88%_0%,rgba(255,0,0,0.1),transparent_50%),radial-gradient(circle_at_12%_0%,rgba(249,115,22,0.12),transparent_55%)]" />
      <div className="relative flex h-full flex-col gap-2.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-xl text-[10px] font-black text-white"
              style={{ background: ytRed }}
            >
              ▶
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Video order
              </p>
              <p className="text-[11px] font-bold text-stone-800">Views package</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            Confirmed
          </span>
        </div>

        <div
          className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl"
          style={{
            background: `linear-gradient(145deg, #7f1d1d 0%, ${ytRed} 50%, #fb923c 100%)`,
          }}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-white/95 text-sm text-stone-900">
            ▶
          </span>
          <span className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-bold text-white">
            08:24
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 px-2.5 py-2">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              View count
            </p>
            <p className="mt-0.5 text-sm font-black tabular-nums text-stone-900">12.4K</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Package selected
            </p>
            <p className="mt-0.5 text-sm font-bold text-stone-900">5,000 Views</p>
          </div>
        </div>

        <div className="rounded-xl border border-red-100 bg-red-50/50 px-2.5 py-2">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Delivery progress
            </p>
            <p className="text-[10px] font-bold" style={{ color: ytRed }}>
              64%
            </p>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-stone-200/90">
            <div
              className="h-full rounded-full"
              style={{
                width: '64%',
                background: `linear-gradient(90deg, ${ytRed}, ${brand})`,
              }}
            />
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-2">
          <span className="rounded-lg border border-emerald-100 bg-emerald-50 px-2 py-1 text-[9px] font-bold text-emerald-700">
            Order confirmed
          </span>
          <span
            className="rounded-xl px-3 py-1.5 text-[10px] font-bold text-white shadow-sm"
            style={{ background: brand }}
          >
            Track Order
          </span>
        </div>
      </div>
    </div>
  );
}
