'use client';

import { cn } from '@/lib/utils';

/**
 * TikTok likes analytics dashboard — likes, engagement score, video performance, activity.
 */
export function TikTokLikesAnalyticsDashboard({ className }: { className?: string }) {
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';
  const bars = [32, 44, 38, 56, 62, 70, 78, 88];

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/3] w-full max-w-[25rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)] motion-safe:animate-iv-float-card sm:max-w-[26rem]',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_22%_0%,rgba(249,115,22,0.14),transparent_55%)]" />
      <div className="relative flex h-full flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-xl text-[11px] font-black text-white"
              style={{
                background: `linear-gradient(135deg, ${tiktokCyan}, ${tiktokRed})`,
              }}
            >
              ♥
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Video analytics
              </p>
              <p className="text-sm font-bold text-stone-900">Engagement overview</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            Live
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Increasing likes
            </p>
            <p className="mt-0.5 text-lg font-black tabular-nums text-stone-900">2,640</p>
            <p className="text-[10px] font-semibold text-emerald-600">+18% this week</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Engagement score
            </p>
            <p className="mt-0.5 text-lg font-black tabular-nums text-stone-900">8.4</p>
            <p className="text-[10px] font-semibold" style={{ color: brand }}>
              Strong signal
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Video performance
            </p>
            <p className="text-[9px] font-bold text-stone-600">7-day trend</p>
          </div>
          <div className="mt-2 flex h-12 items-end gap-1">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-full rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === bars.length - 1
                      ? `linear-gradient(180deg, ${brand}, ${tiktokRed})`
                      : 'linear-gradient(180deg, #fed7aa, #fdba74)',
                }}
              />
            ))}
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between rounded-xl border border-stone-100 bg-[linear-gradient(145deg,#fffdfb,#fff7ed)] px-3 py-2">
          <div>
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Audience activity
            </p>
            <p className="text-[12px] font-bold text-stone-800">Peak hours active</p>
          </div>
          <span
            className="rounded-full px-2 py-0.5 text-[9px] font-bold text-white"
            style={{ background: brand }}
          >
            + Likes
          </span>
        </div>
      </div>
    </div>
  );
}
