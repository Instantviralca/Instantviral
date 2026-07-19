'use client';

import { cn } from '@/lib/utils';

const STATUS_ROWS = [
  { id: 'channel', label: 'Channel URL Received', done: true },
  { id: 'package', label: 'Package Confirmed', done: true },
  { id: 'payment', label: 'Payment Approved', done: true },
  { id: 'delivery', label: 'Delivery Started', done: true, active: true },
  { id: 'tracking', label: 'Tracking Available', done: false },
  { id: 'completed', label: 'Order Completed', done: false },
] as const;

/**
 * YouTube Subscriber Order Status dashboard for Order With Clarity.
 */
export function YouTubeSubscribersOrderStatusDashboard({
  className,
}: {
  className?: string;
}) {
  const ytRed = '#FF0000';
  const brand = '#F97316';

  return (
    <div
      className={cn(
        'relative w-full overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_22px_48px_-30px_rgba(28,25,23,0.4)] motion-safe:animate-iv-float-card sm:p-6',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 8% 0%, rgba(255,0,0,0.1), transparent 55%), radial-gradient(ellipse 50% 40% at 92% 8%, rgba(249,115,22,0.1), transparent 50%), linear-gradient(180deg, #fffdfb 0%, #ffffff 45%, #faf6f1 100%)',
        }}
      />
      <div className="relative">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span
              className="flex size-11 items-center justify-center rounded-xl text-sm font-black text-white shadow-sm"
              style={{ background: ytRed }}
              aria-hidden
            >
              ▶
            </span>
            <div>
              <p className="text-sm font-bold text-[var(--text-primary)]">
                Subscriber Order Status
              </p>
              <p className="text-xs text-[var(--text-muted)]">Creator Studio</p>
            </div>
          </div>
          <span className="rounded-full bg-red-50 px-2.5 py-1 text-[10px] font-bold text-red-600">
            Live
          </span>
        </div>

        <div className="mb-4 flex items-center gap-3 rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 px-3 py-2.5">
          <span
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-[10px] font-black text-white"
            style={{ background: `linear-gradient(135deg, ${ytRed}, #b91c1c)` }}
            aria-hidden
          >
            YT
          </span>
          <div className="min-w-0">
            <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
              Selected package
            </p>
            <p className="truncate text-sm font-bold text-stone-800">500 Subscribers</p>
          </div>
          <span className="ml-auto rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            Confirmed
          </span>
        </div>

        <ul className="space-y-2" role="list">
          {STATUS_ROWS.map((row) => (
            <li
              key={row.id}
              className={cn(
                'flex items-center gap-3 rounded-xl border px-3.5 py-2.5',
                'active' in row && row.active
                  ? 'border-[color-mix(in_srgb,#FF0000_28%,#e7e5e4)] bg-red-50/60 shadow-sm'
                  : row.done
                    ? 'border-stone-100 bg-white/90'
                    : 'border-dashed border-stone-200 bg-white/50',
              )}
            >
              <span
                className={cn(
                  'flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-bold',
                  row.done
                    ? 'bg-emerald-500 text-white'
                    : 'border border-stone-200 bg-stone-50 text-stone-400',
                )}
                style={
                  'active' in row && row.active
                    ? { background: brand, color: '#fff' }
                    : undefined
                }
              >
                {row.done || ('active' in row && row.active) ? '✓' : ''}
              </span>
              <p
                className={cn(
                  'text-sm font-semibold',
                  row.done || ('active' in row && row.active)
                    ? 'text-stone-800'
                    : 'text-stone-400',
                )}
              >
                {row.label}
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-4 rounded-xl border border-stone-100 bg-white/90 p-3">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
              Delivery progress
            </p>
            <p className="text-xs font-bold" style={{ color: ytRed }}>
              58%
            </p>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-stone-200/90">
            <div
              className="h-full rounded-full motion-safe:animate-pulse"
              style={{
                width: '58%',
                background: `linear-gradient(90deg, ${ytRed}, ${brand})`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
