'use client';

import { cn } from '@/lib/utils';

/**
 * Compact YouTube views order summary for processing requirements section.
 */
export function YouTubeViewsOrderSummaryDashboard({
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
              style={{ background: `linear-gradient(135deg, ${ytRed}, #b91c1c)` }}
            >
              ▶
            </span>
            <div>
              <p className="text-sm font-bold text-stone-900">Order Summary</p>
              <p className="text-xs text-stone-500">YouTube Views</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
            Confirmed
          </span>
        </div>

        <div
          className="relative flex aspect-video items-center justify-center overflow-hidden rounded-xl"
          style={{
            background: `linear-gradient(145deg, #7f1d1d 0%, ${ytRed} 50%, #fb923c 100%)`,
          }}
        >
          <span className="flex size-10 items-center justify-center rounded-full bg-white/95 text-sm text-stone-900">
            ▶
          </span>
          <span className="absolute right-2 bottom-2 rounded bg-black/70 px-1.5 py-0.5 text-[8px] font-bold text-white">
            09:16
          </span>
        </div>

        <ul className="space-y-2" role="list">
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Public video URL
            </p>
            <p className="mt-0.5 truncate text-sm font-semibold text-stone-800">
              youtube.com/watch?v=demo
            </p>
          </li>
          <li className="rounded-xl border border-stone-100 bg-white/90 px-3.5 py-2.5">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Selected package
            </p>
            <p className="mt-0.5 text-sm font-semibold text-stone-800">5,000 Views</p>
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
                64%
              </span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-stone-200/90">
              <div
                className="h-full rounded-full"
                style={{
                  width: '64%',
                  background: `linear-gradient(90deg, ${ytRed}, ${brand})`,
                }}
              />
            </div>
          </li>
        </ul>

        <div className="flex justify-end">
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
