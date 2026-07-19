'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const LIKE_KEYS = [2180, 2260, 2380, 2510, 2640] as const;
const LOOP_MS = 7800;

const HEART_TOASTS = [
  { id: 'a', label: 'New like', detail: '+12 this minute' },
  { id: 'b', label: 'Engagement up', detail: '+8% vs last hour' },
  { id: 'c', label: 'Gradual delivery', detail: 'Batch 2 of 4 live' },
] as const;

function formatLikes(n: number) {
  return new Intl.NumberFormat('en-US').format(Math.round(n));
}

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

type TikTokLikesHeroDashboardProps = {
  className?: string;
  packagePreview?: { title: string; priceLabel: string } | null;
};

/**
 * TikTok Likes hero — vertical video phone UI with rising likes, hearts, analytics.
 * Distinct from TikTok Followers (profile) and Instagram Likes artwork.
 */
export function TikTokLikesHeroDashboard({
  className,
  packagePreview,
}: TikTokLikesHeroDashboardProps) {
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';
  const [likes, setLikes] = useState<number>(LIKE_KEYS[0]);
  const [toastIndex, setToastIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [progress, setProgress] = useState(0.36);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setLikes(LIKE_KEYS[LIKE_KEYS.length - 1]);
      setProgress(0.84);
      return;
    }
    let frame = 0;
    const tick = (now: number) => {
      const elapsed = now % LOOP_MS;
      const t = elapsed / LOOP_MS;
      const segments = LIKE_KEYS.length - 1;
      const raw = t * segments;
      const i = Math.min(Math.floor(raw), segments - 1);
      const local = easeInOut(raw - i);
      const from = LIKE_KEYS[i];
      const to = LIKE_KEYS[i + 1];
      setLikes(from + (to - from) * local);
      setProgress(0.32 + easeInOut(raw / segments) * 0.52);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setToastIndex((i) => (i + 1) % HEART_TOASTS.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const toast = HEART_TOASTS[toastIndex];
  const bars = [28, 40, 36, 52, 64, 58, 78] as const;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[21.5rem] overflow-visible sm:max-w-[23rem] lg:max-w-[24.5rem]',
        className,
      )}
      aria-hidden="true"
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[12%] right-[8%] size-48 rounded-full bg-[var(--brand-primary)]/26 blur-3xl sm:size-56',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
      />
      <div className="pointer-events-none absolute bottom-[16%] left-[2%] size-28 rounded-full bg-[#FE2C55]/16 blur-3xl" />
      <div className="pointer-events-none absolute top-[48%] -right-1 size-20 rounded-full bg-[#25F4EE]/14 blur-2xl" />

      {/* Engagement toast */}
      <div className="pointer-events-none absolute top-[4%] -left-4 z-[5] max-w-[10.75rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_18px_36px_-16px_rgba(28,25,23,0.5)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.4s_ease-in-out_infinite] sm:-left-5">
        <div className="flex items-center gap-2">
          <span
            className="flex size-6 items-center justify-center rounded-full text-[10px] font-bold text-white"
            style={{ background: tiktokRed }}
          >
            ♥
          </span>
          <div className="min-w-0">
            <p className="text-[8px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
              {toast.label}
            </p>
            <p className="truncate text-[11px] font-bold text-stone-800">{toast.detail}</p>
          </div>
        </div>
      </div>

      {/* Secondary engagement notification — hidden on very small screens */}
      <div className="pointer-events-none absolute top-[18%] -left-3 z-[5] hidden max-w-[9.5rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.42)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.8s_ease-in-out_infinite] sm:block sm:-left-4">
        <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
          Hearts live
        </p>
        <p className="text-[11px] font-bold text-stone-800">+{formatLikes(likes)} likes</p>
      </div>

      {/* Trending badge */}
      <div className="pointer-events-none absolute top-[8%] -right-3 z-[6] flex items-center gap-1 rounded-full border border-white/95 bg-white/95 px-2.5 py-1 shadow-[0_14px_28px_-14px_rgba(28,25,23,0.45)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.1s_ease-in-out_infinite] sm:-right-4">
        <span
          className="flex size-4 items-center justify-center rounded-full text-[8px] font-black text-white"
          style={{ background: `linear-gradient(135deg, ${tiktokCyan}, ${tiktokRed})` }}
        >
          ↑
        </span>
        <span className="text-[9px] font-bold tracking-wide text-stone-800 uppercase">
          Trending
        </span>
      </div>

      {/* Analytics widget */}
      <div className="pointer-events-none absolute top-[28%] -right-4 z-[5] w-[8.25rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.48)] backdrop-blur-md motion-safe:animate-[iv-float-card_6.4s_ease-in-out_infinite] sm:-right-5">
        <div className="flex items-center justify-between gap-1">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Analytics
          </p>
          <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[7px] font-bold text-emerald-700">
            Live
          </span>
        </div>
        <p className="mt-0.5 text-[13px] font-black tabular-nums text-stone-900">
          {formatLikes(likes)}
        </p>
        <p className="text-[9px] font-semibold text-stone-500">Like pace</p>
        <div className="mt-1.5 flex h-8 items-end gap-0.5">
          {bars.map((h, i) => (
            <span
              key={i}
              className="w-full max-w-[8px] rounded-sm"
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

      {/* Gradual growth indicator */}
      <div className="pointer-events-none absolute bottom-[9%] -left-3 z-[5] w-[9.75rem] rounded-xl border border-white/95 bg-white/95 px-2.5 py-2 shadow-[0_16px_32px_-16px_rgba(28,25,23,0.45)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.8s_ease-in-out_infinite] sm:-left-4">
        <div className="flex items-center justify-between gap-2">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Gradual delivery
          </p>
          <span className="rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-bold text-emerald-700">
            Active
          </span>
        </div>
        <div className="mt-1.5 h-1.5 overflow-hidden rounded-full bg-stone-100">
          <div
            className="h-full rounded-full transition-[width] duration-300 ease-out"
            style={{
              width: `${Math.round(progress * 100)}%`,
              background: `linear-gradient(90deg, ${tiktokCyan}, ${brand})`,
            }}
          />
        </div>
        <p className="mt-1 text-[10px] font-semibold text-stone-600">
          {Math.round(progress * 100)}% paced growth
        </p>
      </div>

      {/* Floating TikTok hearts */}
      <>
        <span
          className={cn(
            'pointer-events-none absolute top-[36%] left-[6%] z-[4] text-lg text-[#FE2C55]/85',
            !reduceMotion && 'motion-safe:animate-[iv-float-card_4.2s_ease-in-out_infinite]',
          )}
        >
          ♥
        </span>
        <span
          className={cn(
            'pointer-events-none absolute top-[48%] right-[8%] z-[4] text-base text-[#FE2C55]/65',
            !reduceMotion && 'motion-safe:animate-[iv-float-card_5.6s_ease-in-out_infinite]',
          )}
        >
          ♥
        </span>
        <span
          className={cn(
            'pointer-events-none absolute top-[58%] left-[12%] z-[4] hidden text-sm text-[#F97316]/75 sm:inline',
            !reduceMotion && 'motion-safe:animate-[iv-float-card_4.8s_ease-in-out_infinite]',
          )}
        >
          ♥
        </span>
        <span
          className={cn(
            'pointer-events-none absolute bottom-[32%] right-[14%] z-[4] text-xs text-[#FE2C55]/50',
            !reduceMotion && 'motion-safe:animate-[iv-float-card_6.2s_ease-in-out_infinite]',
          )}
        >
          ♥
        </span>
        <span
          className={cn(
            'pointer-events-none absolute bottom-[22%] left-[22%] z-[4] hidden text-[10px] text-[#25F4EE]/70 sm:inline',
            !reduceMotion && 'motion-safe:animate-[iv-float-card_5.3s_ease-in-out_infinite]',
          )}
        >
          ♥
        </span>
      </>

      {/* Phone frame — TikTok video UI */}
      <div className="relative mx-auto w-[62%] max-w-[12.75rem] motion-safe:animate-iv-float-card sm:max-w-[13.5rem]">
        <div className="relative z-[2] rounded-[2rem] border border-stone-900 bg-stone-950 p-1.5 shadow-[0_28px_56px_-28px_rgba(28,25,23,0.72)]">
          <div className="relative aspect-[9/16] overflow-hidden rounded-[1.55rem] bg-stone-900">
            {/* Video backdrop */}
            <div
              className="absolute inset-0"
              style={{
                background:
                  'linear-gradient(165deg, #1c1917 0%, #292524 28%, #431407 62%, #7c2d12 100%)',
              }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_30%,rgba(249,115,22,0.35),transparent_55%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(254,44,85,0.28),transparent_50%)]" />

            {/* Status bar */}
            <div className="relative z-[1] flex items-center justify-between px-3 pt-2.5">
              <span className="text-[9px] font-semibold text-white/90">9:41</span>
              <div className="mx-auto h-1 w-14 rounded-full bg-white/25" />
              <div className="flex gap-0.5">
                <span className="size-1 rounded-full bg-white/70" />
                <span className="size-1 rounded-full bg-white/70" />
                <span className="size-1 rounded-full bg-white/70" />
              </div>
            </div>

            {/* Fake video subject */}
            <div className="absolute top-[22%] left-1/2 z-[1] w-[58%] -translate-x-1/2">
              <div
                className="aspect-square rounded-2xl border border-white/20 shadow-lg"
                style={{
                  background: `linear-gradient(145deg, ${tiktokCyan}55, ${tiktokRed}66, ${brand}88)`,
                }}
              />
              <div className="absolute -bottom-2 -left-2 rounded-lg bg-white/95 px-2 py-1 shadow-md">
                <p className="text-[8px] font-bold text-stone-800">For You</p>
              </div>
            </div>

            {/* Right-side TikTok actions */}
            <div className="absolute top-[42%] right-2 z-[2] flex flex-col items-center gap-3">
              <div className="flex flex-col items-center gap-0.5">
                <span
                  className="flex size-8 items-center justify-center rounded-full bg-white/15 text-sm text-white backdrop-blur-sm"
                  style={{ boxShadow: `0 0 0 2px ${tiktokRed}55` }}
                >
                  ♥
                </span>
                <span className="text-[9px] font-bold text-white">{formatLikes(likes)}</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="flex size-7 items-center justify-center rounded-full bg-white/15 text-[11px] text-white backdrop-blur-sm">
                  💬
                </span>
                <span className="text-[8px] font-semibold text-white/80">184</span>
              </div>
              <div className="flex flex-col items-center gap-0.5">
                <span className="flex size-7 items-center justify-center rounded-full bg-white/15 text-[11px] text-white backdrop-blur-sm">
                  ↗
                </span>
                <span className="text-[8px] font-semibold text-white/80">96</span>
              </div>
            </div>

            {/* Caption + music */}
            <div className="absolute inset-x-0 bottom-0 z-[2] bg-gradient-to-t from-black/80 via-black/35 to-transparent px-3 pt-10 pb-3">
              <div className="flex items-center gap-2">
                <span
                  className="flex size-7 items-center justify-center rounded-full text-[9px] font-black text-white"
                  style={{
                    background: `linear-gradient(135deg, ${tiktokCyan}, ${tiktokRed})`,
                  }}
                >
                  IV
                </span>
                <p className="truncate text-[11px] font-bold text-white">@creator.ca</p>
                <span
                  className="rounded-full px-1.5 py-0.5 text-[8px] font-bold text-white"
                  style={{ background: brand }}
                >
                  Follow
                </span>
              </div>
              <p className="mt-1.5 line-clamp-2 text-[9px] leading-snug text-white/90">
                New drop for Canadian creators · like growth live
              </p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className="h-0.5 flex-1 overflow-hidden rounded-full bg-white/25">
                  <span
                    className="block h-full rounded-full bg-white/80"
                    style={{ width: `${Math.round(progress * 100)}%` }}
                  />
                </span>
                <span className="text-[8px] font-semibold text-white/70">♪ Original</span>
              </div>
              {packagePreview ? (
                <div className="mt-2 rounded-lg border border-white/20 bg-white/10 px-2 py-1.5 backdrop-blur-sm">
                  <p className="text-[8px] font-semibold tracking-wide text-white/70 uppercase">
                    Package
                  </p>
                  <p className="truncate text-[10px] font-bold text-white">
                    {packagePreview.title} · {packagePreview.priceLabel}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
