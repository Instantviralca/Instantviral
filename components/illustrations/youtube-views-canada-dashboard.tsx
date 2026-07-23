'use client';

import { cn } from '@/lib/utils';

/**
 * Canada-themed Creator Studio dashboard for Buying YouTube Views in Canada.
 */
export function YouTubeViewsCanadaDashboard({ className }: { className?: string }) {
  const ytRed = '#FF0000';
  const brand = '#F97316';
  const growth = [30, 36, 42, 50, 58, 66, 76, 88];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[22rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.34)] motion-safe:animate-iv-float-card sm:max-w-[24rem]',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 10% 0%, rgba(255,0,0,0.1), transparent 55%), radial-gradient(ellipse 50% 40% at 92% 8%, rgba(249,115,22,0.1), transparent 50%)',
        }}
      />
      <div className="relative space-y-3">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="flex size-9 items-center justify-center rounded-xl text-[11px] font-black text-white"
              style={{ background: ytRed }}
            >
              ▶
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Creator Studio
              </p>
              <p className="text-sm font-bold text-stone-900">Canada Videos</p>
            </div>
          </div>
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-[9px] font-bold text-red-600">
            CA
          </span>
        </div>

        <div className="grid grid-cols-[0.85fr_1.15fr] gap-2">
          <div className="flex flex-col items-center justify-center rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
            <svg viewBox="0 0 64 64" className="h-14 w-14 text-red-600" fill="currentColor">
              <path d="M32 6c-1.2 3.8-4.4 7.4-8.2 9.2 2.6 1.4 4.6 3.6 5.6 6.2-3.8-.6-7.4.4-10.2 2.8 2.2 2.2 5.2 3.4 8.4 3.2-2.8 2.4-4.4 5.8-4.2 9.4 3.2-1.2 6.6-1 9.4.6-.2 3.8 1.4 7.4 4.2 9.8.6-3.4 2.4-6.4 5.2-8.4 2.8 2 4.6 5 5.2 8.4 2.8-2.4 4.4-6 4.2-9.8 2.8-1.6 6.2-1.8 9.4-.6.2-3.6-1.4-7-4.2-9.4 3.2.2 6.2-1 8.4-3.2-2.8-2.4-6.4-3.4-10.2-2.8 1-2.6 3-4.8 5.6-6.2C40.4 13.4 37.2 9.8 36 6c-1.2 2.2-2.6 2.2-4 0z" />
            </svg>
            <p className="mt-1 text-[8px] font-bold tracking-wide text-stone-500 uppercase">
              Canada
            </p>
          </div>
          <div className="space-y-2">
            <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 px-2.5 py-2">
              <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                Views Increasing
              </p>
              <p className="text-lg font-black tabular-nums text-stone-900">+49.8K</p>
              <p className="text-[10px] font-semibold text-emerald-600">This campaign</p>
            </div>
            <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
              <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
                Audience Reach
              </p>
              <p className="text-sm font-bold text-stone-800">62.4K</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/70 p-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Traffic Sources
            </p>
            <span className="text-[8px] font-bold" style={{ color: brand }}>
              Video Analytics
            </span>
          </div>
          <div className="flex h-10 items-end gap-1">
            {growth.map((h, i) => (
              <span
                key={`yt-v-ca-g-${i}`}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === growth.length - 1
                      ? `linear-gradient(180deg, ${brand}, ${ytRed})`
                      : `${ytRed}88`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
