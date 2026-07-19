'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const VIEW_KEYS = [12480, 14120, 16340, 18880] as const;

/**
 * YouTube Analytics illustration for educational discovery section.
 */
export function YouTubeViewsAnalyticsDashboard({ className }: { className?: string }) {
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
  const traffic = [
    { label: 'Browse', pct: 44 },
    { label: 'Suggested', pct: 29 },
    { label: 'Search', pct: 17 },
    { label: 'External', pct: 10 },
  ];

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[25rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)] motion-safe:animate-iv-float-card sm:max-w-[26rem]',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 10% 0%, rgba(255,0,0,0.1), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 8%, rgba(249,115,22,0.1), transparent 50%)',
        }}
      />
      <div className="relative flex flex-col gap-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span
              className="flex size-8 items-center justify-center rounded-xl text-[11px] font-black text-white"
              style={{ background: ytRed }}
            >
              ▶
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Creator Studio
              </p>
              <p className="text-sm font-bold text-stone-900">Video analytics</p>
            </div>
          </div>
          <span className="rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold text-red-600">
            Realtime
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Views
            </p>
            <p className="mt-0.5 text-lg font-black tabular-nums text-stone-900">
              {(views / 1000).toFixed(1)}K
            </p>
            <p className="text-[10px] font-semibold text-emerald-600">+16% this week</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Watch time
            </p>
            <p className="mt-0.5 text-lg font-black tabular-nums text-stone-900">4.2h</p>
            <p className="text-[10px] font-semibold" style={{ color: brand }}>
              Avg. session
            </p>
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white p-2.5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Audience graph
            </p>
            <p className="text-[9px] font-bold text-stone-600">7-day</p>
          </div>
          <div className="mt-2 flex h-12 items-end gap-1">
            {audienceBars.map((h, i) => (
              <span
                key={i}
                className="w-full rounded-sm"
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

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white p-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Engagement
            </p>
            <p className="mt-1 text-sm font-black text-stone-900">5.1%</p>
            <p className="text-[9px] font-semibold text-emerald-600">Summary</p>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white p-2.5">
            <p className="mb-1.5 text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Traffic sources
            </p>
            <div className="space-y-1">
              {traffic.slice(0, 3).map((row) => (
                <div key={row.label} className="flex items-center gap-1.5">
                  <span className="w-10 text-[8px] font-semibold text-stone-500">{row.label}</span>
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-stone-100">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${row.pct}%`,
                        background: `linear-gradient(90deg, ${ytRed}, ${brand})`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
