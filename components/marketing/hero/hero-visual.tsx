import Image from 'next/image';

import { PlatformBadge } from '@/components/marketing/hero/platform-badge';
import type { HeroVisualProps } from '@/components/marketing/hero/types';
import { cn } from '@/lib/utils';

/**
 * Premium homepage hero visual — transparent growth illustration + platform badges.
 * LCP image stays visible without motion opacity:0 (Core Web Vitals).
 */
export function HeroVisual({ visual, platforms, className }: HeroVisualProps) {
  return (
    <div className={cn('relative w-full', className)}>
      <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-gradient-to-br from-white/90 via-[#fffaf5]/70 to-[#f5ebe0]/80 p-3 shadow-[0_28px_60px_-36px_rgba(28,25,23,0.45)] sm:p-4">
        <div
          className="pointer-events-none absolute -top-10 -right-8 size-40 rounded-full bg-[var(--brand-primary)]/15 blur-3xl"
          aria-hidden
        />
        <Image
          src={visual.src}
          alt={visual.alt}
          width={visual.width}
          height={visual.height}
          priority
          fetchPriority="high"
          sizes="(max-width: 1024px) 100vw, 42vw"
          className="relative h-auto w-full object-contain object-center drop-shadow-[0_18px_40px_rgba(28,25,23,0.12)]"
        />
      </div>

      {platforms.length > 0 ? (
        <ul
          className="mt-5 flex flex-wrap justify-center gap-2.5 lg:justify-start"
          aria-label="Supported platforms"
        >
          {platforms.map((platform) => (
            <li key={platform.id}>
              <PlatformBadge {...platform} />
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
