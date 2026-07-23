'use client';

import { cn } from '@/lib/utils';

/**
 * Traffic Sources focused Creator Studio dashboard for “Does Buying YouTube Views Help?”.
 */
export function YouTubeViewsTrafficSourcesDashboard({
  className,
}: {
  className?: string;
}) {
  const ytRed = '#FF0000';
  const brand = '#F97316';
  const sources = [
    { label: 'Browse features', pct: 42, color: ytRed },
    { label: 'Suggested videos', pct: 28, color: `${ytRed}AA` },
    { label: 'YouTube search', pct: 18, color: brand },
    { label: 'External', pct: 12, color: '#FB923C' },
  ];

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
              <p className="text-[8px] text-stone-500">Traffic Sources</p>
            </div>
          </div>
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-[8px] font-bold text-red-600">
            Reach
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-lg border border-stone-100 bg-[var(--surface-muted)]/80 px-2 py-2">
            <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
              Views
            </p>
            <p className="text-[13px] font-black tabular-nums text-stone-900">49.8K</p>
          </div>
          <div className="rounded-lg border border-stone-100 bg-[var(--surface-muted)]/80 px-2 py-2">
            <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
              Audience Reach
            </p>
            <p className="text-[13px] font-black tabular-nums text-stone-900">62.1K</p>
          </div>
        </div>

        <div className="space-y-2 rounded-xl border border-stone-100 bg-[var(--surface-muted)]/70 p-2.5">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Where views come from
          </p>
          {sources.map((source) => (
            <div key={source.label}>
              <div className="mb-0.5 flex items-center justify-between gap-2">
                <span className="text-[9px] font-semibold text-stone-700">{source.label}</span>
                <span className="text-[9px] font-bold tabular-nums text-stone-800">
                  {source.pct}%
                </span>
              </div>
              <div className="h-1.5 overflow-hidden rounded-full bg-stone-100">
                <div
                  className="h-full rounded-full"
                  style={{ width: `${source.pct}%`, background: source.color }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
