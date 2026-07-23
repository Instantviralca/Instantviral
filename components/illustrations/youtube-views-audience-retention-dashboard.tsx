'use client';

import { cn } from '@/lib/utils';

/**
 * Audience Retention focused Creator Studio dashboard for Best Practices.
 */
export function YouTubeViewsAudienceRetentionDashboard({
  className,
}: {
  className?: string;
}) {
  const ytRed = '#FF0000';
  const brand = '#F97316';
  const retention = [92, 78, 64, 58, 52, 48, 44, 41];

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
            'radial-gradient(circle at 12% 0%, rgba(249,115,22,0.12), transparent 50%), linear-gradient(180deg, #fffaf5 0%, #ffffff 55%)',
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
              <p className="text-[8px] text-stone-500">Audience Retention</p>
            </div>
          </div>
          <span className="rounded-full bg-orange-50 px-2 py-0.5 text-[8px] font-bold text-orange-700">
            CTR 6.4%
          </span>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-lg border border-stone-100 bg-[var(--surface-muted)]/80 px-2 py-2">
            <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
              Average view %
            </p>
            <p className="text-[13px] font-black tabular-nums text-stone-900">58%</p>
          </div>
          <div className="rounded-lg border border-stone-100 bg-[var(--surface-muted)]/80 px-2 py-2">
            <p className="text-[7px] font-semibold tracking-wide text-stone-400 uppercase">
              Watch Time
            </p>
            <p className="text-[13px] font-black tabular-nums text-stone-900">4.2h</p>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/70 p-2.5">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Retention curve
            </p>
            <span className="text-[8px] font-bold" style={{ color: brand }}>
              Still watching
            </span>
          </div>
          <div className="flex h-12 items-end gap-1">
            {retention.map((h, i) => (
              <span
                key={`ret-${i}`}
                className="flex-1 rounded-t-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === retention.length - 1
                      ? `linear-gradient(180deg, ${brand}, ${ytRed})`
                      : `${ytRed}77`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Key improvement tip
          </p>
          <p className="mt-0.5 text-[10px] font-semibold leading-snug text-stone-700">
            Stronger thumbnails and titles support longer watch sessions.
          </p>
        </div>
      </div>
    </div>
  );
}
