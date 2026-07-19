'use client';

import { cn } from '@/lib/utils';

/**
 * YouTube channel planning dashboard for educational checklist section.
 */
export function YouTubeChannelPlanningDashboard({ className }: { className?: string }) {
  const ytRed = '#FF0000';

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/3] w-full max-w-[22rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-3.5 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)] motion-safe:animate-iv-float-card sm:p-4',
        className,
      )}
      aria-hidden
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 45% at 10% 0%, rgba(255,0,0,0.08), transparent 55%), linear-gradient(180deg, #fffdfb 0%, #ffffff 50%, #faf6f1 100%)',
        }}
      />
      <div className="relative grid h-full grid-cols-2 gap-2.5">
        <div className="rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 p-2.5">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Upload calendar
          </p>
          <div className="mt-2 grid grid-cols-4 gap-1">
            {Array.from({ length: 8 }).map((_, i) => (
              <span
                key={i}
                className={cn(
                  'aspect-square rounded-md border text-[7px] font-bold',
                  i === 2 || i === 5
                    ? 'border-red-200 bg-red-50 text-red-600'
                    : 'border-stone-100 bg-white text-stone-400',
                )}
              >
                {i + 10}
              </span>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white p-2.5 shadow-sm">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Thumbnail preview
          </p>
          <div
            className="mt-2 flex aspect-video items-center justify-center rounded-lg text-[10px] font-black text-white"
            style={{ background: `linear-gradient(135deg, ${ytRed}, #7f1d1d)` }}
          >
            ▶
          </div>
        </div>

        <div className="rounded-xl border border-stone-100 bg-white p-2.5">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Playlist organisation
          </p>
          <div className="mt-2 space-y-1.5">
            {['Tutorials', 'Reviews', 'Q&A'].map((label) => (
              <div
                key={label}
                className="flex items-center gap-2 rounded-md border border-stone-100 bg-stone-50 px-2 py-1"
              >
                <span className="size-1.5 rounded-full" style={{ background: ytRed }} />
                <span className="text-[10px] font-semibold text-stone-700">{label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2">
          <div className="rounded-xl border border-stone-100 bg-white p-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
              Audience retention
            </p>
            <p className="mt-1 text-sm font-black tabular-nums text-stone-900">68%</p>
            <div className="mt-1.5 flex h-8 items-end gap-0.5">
              {[40, 55, 70, 62, 78, 84].map((h, i) => (
                <span
                  key={i}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${h}%`,
                    background: i > 3 ? ytRed : '#fed7aa',
                  }}
                />
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-red-100 bg-red-50/60 p-2.5">
            <p className="text-[8px] font-semibold tracking-wide text-red-500 uppercase">
              Returning viewers
            </p>
            <p className="mt-0.5 text-sm font-bold text-stone-900">+12.4%</p>
          </div>
        </div>

        <div className="col-span-2 rounded-xl border border-stone-100 bg-[var(--surface-muted)]/80 px-3 py-2">
          <p className="text-[8px] font-semibold tracking-wide text-stone-400 uppercase">
            Channel checklist
          </p>
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {['Positioning', 'Titles', 'Thumbnails', 'Schedule'].map((item) => (
              <span
                key={item}
                className="rounded-full border border-emerald-100 bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700"
              >
                ✓ {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
