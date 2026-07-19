'use client';

import { cn } from '@/lib/utils';

/**
 * Compact YouTube order summary for “What We Need to Process Your Order”.
 */
export function YouTubeSubscribersOrderSummaryDashboard({
  className,
}: {
  className?: string;
}) {
  const ytRed = '#FF0000';
  const brand = '#F97316';

  return (
    <div
      className={cn(
        'relative mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_22px_48px_-28px_rgba(28,25,23,0.34)] motion-safe:animate-iv-float-card sm:p-6',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 12% 0%, rgba(255,0,0,0.1), transparent 55%), radial-gradient(ellipse 50% 40% at 90% 10%, rgba(249,115,22,0.1), transparent 50%), linear-gradient(180deg, #fffdfb 0%, #ffffff 50%, #faf6f1 100%)',
        }}
      />
      <div className="relative space-y-4">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex size-11 items-center justify-center rounded-xl text-[11px] font-black text-white shadow-sm"
              style={{
                background: `linear-gradient(135deg, ${ytRed}, #b91c1c)`,
              }}
            >
              YT
            </span>
            <div>
              <p className="text-sm font-bold text-stone-900">Order Summary</p>
              <p className="text-xs text-stone-500">YouTube Subscribers</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            Confirmed
          </span>
        </div>

        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 px-3.5 py-3">
          <div className="flex items-center gap-3">
            <span
              className="flex size-10 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
              style={{ background: ytRed }}
            >
              ▶
            </span>
            <div className="min-w-0">
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Channel thumbnail
              </p>
              <p className="truncate text-sm font-bold text-stone-800">@channel.ca</p>
            </div>
          </div>
        </div>

        <ul className="space-y-2" role="list">
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Public channel URL
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-stone-800">
              youtube.com/@channel.ca
            </p>
          </li>
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Package quantity
            </p>
            <p className="mt-0.5 text-sm font-semibold text-stone-800">500 Subscribers</p>
          </li>
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Confirmation email
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-stone-800">
              you@email.com
            </p>
          </li>
          <li className="rounded-xl border border-[color-mix(in_srgb,#FF0000_22%,#e7e5e4)] bg-red-50/50 px-3.5 py-2.5">
            <div className="flex items-center justify-between gap-2">
              <div>
                <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
                  Delivery status
                </p>
                <p className="mt-0.5 text-sm font-semibold text-stone-800">In progress</p>
              </div>
              <span className="text-xs font-bold" style={{ color: ytRed }}>
                58%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200/90">
              <div
                className="h-full rounded-full"
                style={{
                  width: '58%',
                  background: `linear-gradient(90deg, ${ytRed}, ${brand})`,
                }}
              />
            </div>
          </li>
        </ul>

        <div className="flex items-center justify-between gap-3">
          <span className="rounded-lg border border-emerald-100 bg-emerald-50 px-2.5 py-1.5 text-[10px] font-bold text-emerald-700">
            No Password Required
          </span>
          <span
            className="rounded-xl px-3.5 py-2 text-xs font-bold text-white shadow-sm"
            style={{ background: brand }}
          >
            Track Order
          </span>
        </div>
      </div>
    </div>
  );
}
