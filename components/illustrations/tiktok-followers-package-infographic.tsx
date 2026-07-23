'use client';

import { cn } from '@/lib/utils';

const PACKAGES = [
  { qty: '100', use: 'Starter' },
  { qty: '500', use: 'Creator' },
  { qty: '1,000', use: 'Business' },
  { qty: '3,000', use: 'Brand' },
  { qty: '5,000', use: 'Campaign' },
  { qty: '10,000+', use: 'Enterprise' },
] as const;

/**
 * 16:9 package recommendation infographic.
 */
export function TikTokFollowersPackageInfographic({ className }: { className?: string }) {
  const brand = '#F97316';

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[16/9] w-full max-w-[44rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)] sm:p-5',
        className,
      )}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_80%_0%,rgba(249,115,22,0.1),transparent_50%)]" />
      <div className="relative flex h-full flex-col">
        <div className="mb-3 flex items-center justify-between gap-2 sm:mb-4">
          <div>
            <p className="text-[9px] font-semibold tracking-[0.1em] text-stone-400 uppercase">
              Package guide
            </p>
            <p className="text-sm font-bold text-stone-900">Recommended package sizes</p>
          </div>
          <span
            className="rounded-full px-2.5 py-1 text-[9px] font-bold text-white"
            style={{ background: brand }}
          >
            Compare
          </span>
        </div>

        <div className="relative flex min-h-0 flex-1 flex-col justify-center">
          <div className="absolute top-[42%] right-[3%] left-[3%] hidden h-0.5 bg-stone-100 sm:block" />
          <div
            className="absolute top-[42%] left-[3%] hidden h-0.5 sm:block"
            style={{
              width: '94%',
              background: `linear-gradient(90deg, #fed7aa, ${brand})`,
              opacity: 0.55,
            }}
          />
          <ul className="relative grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6 lg:gap-2.5">
            {PACKAGES.map((pkg, index) => (
              <li
                key={pkg.qty}
                className="flex flex-col items-center rounded-xl border border-stone-100 bg-white p-2.5 text-center shadow-[0_10px_22px_-18px_rgba(28,25,23,0.4)] sm:p-3"
              >
                <span
                  className="mb-2 flex size-7 items-center justify-center rounded-full text-[10px] font-bold text-white"
                  style={{
                    background:
                      index >= 4
                        ? `linear-gradient(145deg, ${brand}, #ea580c)`
                        : 'linear-gradient(145deg, #fdba74, #F97316)',
                  }}
                >
                  {index + 1}
                </span>
                <p className="text-sm font-bold tabular-nums text-stone-900 sm:text-base">
                  {pkg.qty}
                </p>
                <p className="mt-0.5 text-[9px] font-semibold tracking-wide text-[var(--brand-primary)] uppercase">
                  {pkg.use}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
