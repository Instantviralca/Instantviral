'use client';

import { cn } from '@/lib/utils';

/**
 * YouTube Creator Studio analytics for “Does Buying YouTube Subscribers Help?”.
 * Entities: Subscribers, Returning Viewers, Audience Retention, Channel Analytics, Growth Graph.
 */
export function YouTubeSubscribersAnalyticsDashboard({
  className,
}: {
  className?: string;
}) {
  const ytRed = '#FF0000';
  const brand = '#F97316';
  const growth = [32, 38, 44, 48, 55, 62, 71, 84];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[17.5rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.34)] motion-safe:animate-iv-float-card sm:max-w-[18.5rem]',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(circle at 88% 0%, rgba(255,0,0,0.1), transparent 50%), linear-gradient(180deg, #fff8f5 0%, #ffffff 55%)',
        }}
      />
      <div className="relative space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-lg text-[10px] font-black text-white"
              style={{ background: ytRed }}
            >
              ▶
            </span>
            <div>
              <p className="text-[10px] font-bold text-stone-900">Creator Studio</p>
              <p className="text-[8px] text-stone-500">Channel Analytics</p>
            </div>
          </div>
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-[8px] font-bold text-red-600">
            Live
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-lg border border-stone-100 bg-[var(--surface-muted)]/80 px-2 py-2">
            <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
              Subscribers
            </p>
            <p className="text-[13px] font-black tabular-nums text-stone-900">12.4K</p>
          </div>
          <div className="rounded-lg border border-stone-100 bg-[var(--surface-muted)]/80 px-2 py-2">
            <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
              Returning Viewers
            </p>
            <p className="text-[13px] font-black tabular-nums text-stone-900">38%</p>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/70 p-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Growth Graph
            </p>
            <span className="text-[8px] font-bold" style={{ color: brand }}>
              +9.2%
            </span>
          </div>
          <div className="flex h-9 items-end gap-1">
            {growth.map((h, i) => (
              <span
                key={`g-${i}`}
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

        <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Audience Retention
            </p>
            <span className="text-[9px] font-bold text-stone-800">62%</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
            <div
              className="h-full rounded-full"
              style={{
                width: '62%',
                background: `linear-gradient(90deg, ${ytRed}, ${brand})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
