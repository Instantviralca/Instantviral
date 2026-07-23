'use client';

import { cn } from '@/lib/utils';

/**
 * TikTok creator dashboard — growth graph, analytics, engagement, calendar.
 */
export function TikTokFollowersCreatorDashboard({ className }: { className?: string }) {
  const brand = '#F97316';
  const tiktokCyan = '#25F4EE';
  const tiktokRed = '#FE2C55';
  const bars = [28, 42, 36, 58, 48, 72, 68, 84];

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[16/10] w-full max-w-[28rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)]',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute -top-6 -right-4 size-28 rounded-full bg-[var(--brand-primary)]/15 blur-2xl" />
      <div className="pointer-events-none absolute -bottom-8 -left-4 size-24 rounded-full bg-[#25F4EE]/12 blur-2xl" />
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
              ♪
            </span>
            <div>
              <p className="text-[9px] font-semibold tracking-wide text-stone-400 uppercase">
                Creator dashboard
              </p>
              <p className="text-sm font-bold text-stone-900">Followers growth</p>
            </div>
          </div>
          <span className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700">
            +1.2k
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {[
            { label: 'Followers', value: '24.5k' },
            { label: 'Engagement', value: '4.8%' },
            { label: 'Views', value: '182k' },
          ].map((card) => (
            <div
              key={card.label}
              className="rounded-lg border border-stone-100 bg-[var(--surface-muted)]/80 px-2 py-1.5"
            >
              <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
                {card.label}
              </p>
              <p className="text-xs font-bold tabular-nums text-stone-900">{card.value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-1 flex-col rounded-xl border border-stone-100 bg-[linear-gradient(180deg,#fffdfb,#faf6f1)] p-2.5">
          <p className="mb-1.5 text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Followers growth graph
          </p>
          <div className="flex flex-1 items-end gap-1">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-sm"
                style={{
                  height: `${h}%`,
                  background:
                    i === bars.length - 1
                      ? `linear-gradient(180deg, ${tiktokCyan}, ${brand})`
                      : `linear-gradient(180deg, #fdba74, ${brand})`,
                }}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          <div className="rounded-lg border border-stone-100 bg-white px-2 py-1.5 shadow-sm">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Engagement overview
            </p>
            <p className="text-[11px] font-bold text-stone-800">Likes · Comments · Shares</p>
          </div>
          <div className="rounded-lg border border-stone-100 bg-white px-2 py-1.5 shadow-sm">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Content calendar
            </p>
            <div className="mt-1 flex gap-0.5">
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <span
                  key={d}
                  className={cn(
                    'flex size-3.5 items-center justify-center rounded-[3px] text-[6px] font-bold',
                    d === 3 || d === 5
                      ? 'bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]'
                      : 'bg-stone-100 text-stone-400',
                  )}
                >
                  {d}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
