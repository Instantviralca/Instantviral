'use client';

import { cn } from '@/lib/utils';

/**
 * TikTok views analytics — plays, reach, watch time, trending (educational guide).
 */
export function TikTokViewsAnalyticsDashboard({ className }: { className?: string }) {
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';
  const reachBars = [28, 36, 42, 48, 58, 66, 74, 86];

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/3] w-full max-w-[25rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)] motion-safe:animate-iv-float-card sm:max-w-[26rem]',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(37,244,238,0.12),transparent_50%),radial-gradient(circle_at_88%_12%,rgba(249,115,22,0.14),transparent_45%)]" />
      <div className="relative flex h-full flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-xl text-[11px] font-black text-white"
              style={{
                background: `linear-gradient(135deg, ${tiktokCyan}, ${tiktokRed})`,
              }}
            >
              ▶
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Video analytics
              </p>
              <p className="text-sm font-bold text-stone-900">Reach overview</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            Trending
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Video plays
            </p>
            <p className="mt-0.5 text-lg font-black tabular-nums text-stone-900">14,820</p>
            <p className="text-[10px] font-semibold text-emerald-600">+22% this week</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Watch time
            </p>
            <p className="mt-0.5 text-lg font-black tabular-nums text-stone-900">68%</p>
            <p className="text-[10px] font-semibold" style={{ color: brand }}>
              Avg. completion
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Audience reach
            </p>
            <p className="text-[9px] font-bold text-stone-600">7-day trend</p>
          </div>
          <div className="mt-2 flex h-12 items-end gap-1">
            {reachBars.map((h, i) => (
              <span
                key={i}
                className="w-full rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === reachBars.length - 1
                      ? `linear-gradient(180deg, ${tiktokCyan}, ${brand})`
                      : 'linear-gradient(180deg, #a5f3fc, #67e8f9)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between rounded-xl border border-stone-100 bg-[linear-gradient(145deg,#fffdfb,#fff7ed)] px-3 py-2">
          <div>
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Visibility signal
            </p>
            <p className="text-[12px] font-bold text-stone-800">Views climbing</p>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${tiktokCyan}, ${tiktokRed})` }}
          >
            Live
          </span>
        </div>
      </div>
    </div>
  );
}
