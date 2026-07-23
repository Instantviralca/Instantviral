'use client';

import { Check, Clapperboard, MessageCircle, UserRound, Video } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

const CHECKS: Array<{ title: string; icon: LucideIcon }> = [
  { title: 'Complete Profile', icon: UserRound },
  { title: 'Post Consistently', icon: Clapperboard },
  { title: 'Create Quality Videos', icon: Video },
  { title: 'Engage With Your Audience', icon: MessageCircle },
];

/**
 * 16:9 checklist illustration — Best Practices.
 */
export function TikTokFollowersBestPracticesVisual({ className }: { className?: string }) {
  const brand = '#F97316';

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[16/9] w-full max-w-[40rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)] sm:p-5',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_10%_0%,rgba(249,115,22,0.12),transparent_50%)]" />
      <div className="relative flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.1em] text-stone-400 uppercase">
              Profile optimization
            </p>
            <p className="text-sm font-bold text-stone-900">Best practices checklist</p>
          </div>
          <span className="flex size-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <Check className="size-4" strokeWidth={2.5} />
          </span>
        </div>
        <ul className="grid min-h-0 flex-1 grid-cols-2 gap-2.5 sm:gap-3">
          {CHECKS.map((item) => {
            const Icon = item.icon;
            return (
              <li
                key={item.title}
                className="flex items-start gap-2.5 rounded-xl border border-stone-100 bg-white p-3 shadow-[0_10px_22px_-18px_rgba(28,25,23,0.35)]"
              >
                <span
                  className="flex size-9 shrink-0 items-center justify-center rounded-xl text-white"
                  style={{ background: `linear-gradient(145deg, #fdba74, ${brand})` }}
                >
                  <Icon className="size-4" strokeWidth={2.25} />
                </span>
                <div className="min-w-0 pt-0.5">
                  <p className="text-[11px] font-bold leading-snug text-stone-800 sm:text-xs">
                    {item.title}
                  </p>
                  <span className="mt-1 inline-flex items-center gap-1 text-[9px] font-semibold text-emerald-600">
                    <Check className="size-3" strokeWidth={2.5} />
                    Recommended
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
