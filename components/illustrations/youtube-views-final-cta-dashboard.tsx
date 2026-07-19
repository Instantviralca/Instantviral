'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const VIEW_KEYS = [18400, 20120, 22380, 24860] as const;

/**
 * Compact final CTA YouTube video analytics dashboard.
 */
export function YouTubeViewsFinalCtaDashboard({ className }: { className?: string }) {
  const ytRed = '#FF0000';
  const brand = '#F97316';
  const [views, setViews] = useState<number>(VIEW_KEYS[0]);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) {
      setViews(VIEW_KEYS[VIEW_KEYS.length - 1]);
      return;
    }
    let i = 0;
    const timer = window.setInterval(() => {
      i = (i + 1) % VIEW_KEYS.length;
      setViews(VIEW_KEYS[i]);
    }, 1600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const audienceBars = [28, 36, 44, 52, 61, 70, 78, 88];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[17rem] overflow-visible sm:max-w-[18.5rem]',
        className,
      )}
      aria-hidden
    >
      <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white p-3.5 shadow-[0_22px_48px_-24px_rgba(28,25,23,0.55)]">
        <div className="mb-3 flex items-center gap-2.5">
          <span
            className="flex size-9 items-center justify-center rounded-xl text-[10px] font-black text-white"
            style={{ background: ytRed }}
          >
            ▶
          </span>
          <div>
            <p className="text-sm font-bold text-stone-900">Creator Studio</p>
            <p className="text-[10px] text-stone-500">Video analytics</p>
          </div>
        </div>

        <div
          className="relative mb-2.5 flex aspect-video items-center justify-center overflow-hidden rounded-xl"
          style={{
            background: `linear-gradient(145deg, #7f1d1d 0%, ${ytRed} 50%, #fb923c 100%)`,
          }}
        >
          <span className="flex size-8 items-center justify-center rounded-full bg-white/95 text-xs text-stone-900">
            ▶
          </span>
          <span className="absolute right-1.5 bottom-1.5 rounded bg-black/70 px-1 py-0.5 text-[7px] font-bold text-white">
            08:42
          </span>
        </div>

        <div className="mb-2.5 rounded-xl border border-stone-100 bg-stone-50 px-3 py-2">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            View count
          </p>
          <p className="text-xl font-black tabular-nums text-stone-900">
            {(views / 1000).toFixed(1)}K
          </p>
        </div>

        <div className="mb-2.5 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Watch time</p>
            <p className="text-[11px] font-bold text-stone-800">4.2h</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
            <p className="mb-1 text-[8px] font-semibold text-stone-400 uppercase">Audience</p>
            <div className="flex h-4 items-end gap-0.5">
              {audienceBars.map((h, i) => (
                <span
                  key={i}
                  className="w-1 flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background:
                      i === audienceBars.length - 1
                        ? `linear-gradient(180deg, ${ytRed}, ${brand})`
                        : 'linear-gradient(180deg, #fecaca, #f87171)',
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white px-2.5 py-2">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Delivery progress</p>
            <p className="text-[10px] font-bold" style={{ color: ytRed }}>
              68%
            </p>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-stone-200">
            <div
              className="h-full rounded-full"
              style={{
                width: '68%',
                background: `linear-gradient(90deg, ${ytRed}, ${brand})`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -top-1 -right-1 z-10 max-w-[9.5rem] rounded-xl border border-white bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.5)] motion-safe:animate-[iv-float-card_5.6s_ease-in-out_infinite]">
        <p className="text-[8px] font-semibold text-red-600 uppercase">Views up</p>
        <p className="text-[11px] font-bold text-stone-800">+1.2K today</p>
      </div>

      <div className="pointer-events-none absolute -bottom-1 -left-2 z-10 rounded-xl border border-white bg-white px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.5)] motion-safe:animate-[iv-float-card_6.2s_ease-in-out_infinite]">
        <p className="text-[8px] font-semibold text-emerald-600 uppercase">Retention</p>
        <p className="text-[11px] font-bold text-stone-800">62% avg</p>
      </div>
    </div>
  );
}
