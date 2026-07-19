import {
  CalendarCheck,
  Headphones,
  Layers3,
  LayoutGrid,
  ListChecks,
  ShieldCheck,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { FadeUp } from '@/components/motion/fade-up';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import type { HeroTrustBarProps } from '@/components/marketing/hero/types';

const TRUST_ICONS: Record<string, LucideIcon> = {
  'trust-secure': ShieldCheck,
  'trust-support': Headphones,
  'trust-platforms': LayoutGrid,
  'trust-process': ListChecks,
  'trust-delivery': ListChecks,
  'trust-since-2018': CalendarCheck,
  'trust-customers': Users,
  'trust-millions': Layers3,
  'trust-no-password': ShieldCheck,
};

/**
 * Non-clickable trust indicators below CTAs (Doc 08.01 / 08.11).
 */
export function HeroTrustBar({ items, className }: HeroTrustBarProps) {
  if (!items.length) return null;

  return (
    <FadeUp immediate delay={0.2} className={cn(className)}>
      <ul
        className="flex flex-wrap items-center gap-x-6 gap-y-3.5"
        aria-label="Trust indicators"
      >
        {items.map((item) => {
          const Icon = TRUST_ICONS[item.id] ?? ShieldCheck;
          return (
            <li key={item.id} className="flex items-center gap-2.5 text-[var(--text-secondary)]">
              <span className="flex size-8 items-center justify-center rounded-full bg-white/80 shadow-[var(--shadow-sm)] ring-1 ring-[var(--border-subtle)]">
                <Icon className="size-4 shrink-0 text-[var(--brand-primary)]" aria-hidden="true" />
              </span>
              <MutedText className="text-sm font-medium text-[var(--text-secondary)]">
                {item.label}
              </MutedText>
            </li>
          );
        })}
      </ul>
    </FadeUp>
  );
}
