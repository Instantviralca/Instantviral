'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';

const TICKETS = [
  { id: 't1', subject: 'Package question', status: 'Replied', color: '#10B981' },
  { id: 't2', subject: 'Order IV-2847', status: 'In progress', color: '#F97316' },
  { id: 't3', subject: 'Delivery update', status: 'Resolved', color: '#10B981' },
] as const;

const CHAT_LINES = ['Hi! How can we help?', 'Track my order', 'Thanks — on it!'] as const;

/**
 * Contact hero — customer support SaaS dashboard (decorative).
 */
export function ContactHeroIllustration({ className }: { className?: string }) {
  const brand = '#F97316';
  const [chatIndex, setChatIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReduceMotion(mq.matches);
    sync();
    mq.addEventListener('change', sync);
    return () => mq.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    if (reduceMotion) return;
    const timer = window.setInterval(() => {
      setChatIndex((i) => (i + 1) % CHAT_LINES.length);
    }, 2600);
    return () => window.clearInterval(timer);
  }, [reduceMotion]);

  const bars = [28, 40, 34, 48, 44, 56, 50, 64] as const;

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-[22rem] overflow-visible sm:max-w-[24rem] lg:max-w-[26rem]',
        className,
      )}
      aria-hidden
    >
      <div
        className={cn(
          'pointer-events-none absolute top-[8%] right-[6%] size-40 rounded-full blur-3xl sm:size-48',
          !reduceMotion && 'animate-iv-glow-pulse',
        )}
        style={{ background: `${brand}30` }}
      />

      {/* Email notification */}
      <div className="pointer-events-none absolute -top-1 right-0 z-[8] max-w-[11rem] rounded-xl border border-white/90 bg-white/95 px-2.5 py-2 shadow-[0_16px_32px_-14px_rgba(249,115,22,0.35)] backdrop-blur-md motion-safe:animate-[iv-float-card_5.2s_ease-in-out_infinite] sm:-right-2">
        <p className="text-[8px] font-semibold tracking-wide text-orange-600 uppercase">Email</p>
        <p className="text-[11px] font-bold text-stone-800">Reply sent — 2 min ago</p>
      </div>

      <div className="relative overflow-hidden rounded-2xl border border-white/60 bg-white/90 p-3 shadow-[0_24px_48px_-28px_rgba(28,25,23,0.45)] backdrop-blur-sm sm:p-3.5">
        <div className="mb-2.5 flex items-center justify-between gap-2">
          <div>
            <p className="text-[10px] font-bold tracking-wide text-stone-400 uppercase">
              Support hub
            </p>
            <p className="text-sm font-bold text-stone-900">Customer dashboard</p>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-semibold text-emerald-700">
            Online
          </span>
        </div>

        {/* Live chat widget */}
        <div className="mb-2.5 rounded-xl border border-orange-100/80 bg-orange-50/50 px-2.5 py-2 backdrop-blur-sm">
          <div className="mb-1 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-orange-600 uppercase">Live chat</p>
            <span className="size-1.5 rounded-full bg-emerald-500" />
          </div>
          <p className="text-[11px] font-medium text-stone-700">{CHAT_LINES[chatIndex]}</p>
        </div>

        {/* Support tickets */}
        <div className="mb-2.5 space-y-1.5 rounded-xl border border-stone-100 bg-stone-50/80 px-2.5 py-2 backdrop-blur-sm">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Support tickets
          </p>
          {TICKETS.map((t) => (
            <div key={t.id} className="flex items-center justify-between gap-2">
              <p className="truncate text-[10px] font-medium text-stone-700">{t.subject}</p>
              <span
                className="shrink-0 rounded-full px-1.5 py-0.5 text-[8px] font-semibold text-white"
                style={{ background: t.color }}
              >
                {t.status}
              </span>
            </div>
          ))}
        </div>

        {/* Order tracking + analytics row */}
        <div className="mb-2.5 grid grid-cols-2 gap-2">
          <div className="rounded-xl border border-stone-100 bg-white/90 px-2 py-2 backdrop-blur-sm">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Order tracking</p>
            <p className="text-[11px] font-bold text-stone-800">IV-2847</p>
            <div className="mt-1 h-1 overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full"
                style={{ width: '68%', background: `linear-gradient(90deg, ${brand}, #FB923C)` }}
              />
            </div>
          </div>
          <div className="rounded-xl border border-stone-100 bg-white/90 px-2 py-2 backdrop-blur-sm">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Response</p>
            <p className="text-[11px] font-bold text-emerald-600">&lt; 2 hrs</p>
            <p className="text-[9px] text-stone-500">Avg. reply time</p>
          </div>
        </div>

        {/* Customer analytics */}
        <div className="rounded-xl border border-stone-100 bg-white/80 px-2.5 py-2 backdrop-blur-sm">
          <div className="mb-1.5 flex items-center justify-between">
            <p className="text-[8px] font-semibold text-stone-400 uppercase">Analytics</p>
            <p className="text-[10px] font-bold text-emerald-600">98% satisfied</p>
          </div>
          <div className="flex h-8 items-end justify-between gap-0.5">
            {bars.map((h, i) => (
              <span
                key={i}
                className="w-full rounded-sm"
                style={{
                  height: `${h}%`,
                  background: `linear-gradient(180deg, ${brand}, ${brand}88)`,
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute -bottom-2 -left-1 z-[7] max-w-[10rem] rounded-xl border border-white bg-white/95 px-2.5 py-1.5 shadow-[0_14px_28px_-16px_rgba(28,25,23,0.4)] backdrop-blur-md motion-safe:animate-[iv-float-card_6s_ease-in-out_infinite_0.8s]">
        <p className="text-[8px] font-semibold text-stone-400 uppercase">Ticket</p>
        <p className="text-[11px] font-bold text-stone-800">#SUP-1042 opened</p>
      </div>
    </div>
  );
}
