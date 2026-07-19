import Link from 'next/link';

import { FadeUp } from '@/components/motion/fade-up';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { homepageAnalyticsEvents } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import type { HeroActionsProps } from '@/components/marketing/hero/types';

/**
 * Primary (filled) + secondary (outline) CTAs + optional microcopy.
 * Labels/hrefs/microcopy come from content props — never hardcoded here.
 */
export function HeroActions({
  primaryCta,
  secondaryCta,
  microcopy,
  className,
}: HeroActionsProps) {
  if (!primaryCta && !secondaryCta && !microcopy) return null;

  return (
    <FadeUp immediate delay={0.15} className={cn(className)}>
      <div className="flex flex-col gap-3">
        {(primaryCta || secondaryCta) && (
          <div className="flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            {primaryCta ? (
              <Button
                asChild
                size="lg"
                className="min-h-12 w-full rounded-xl px-7 text-base font-semibold shadow-[0_12px_28px_-14px_rgba(249,115,22,0.85)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-14px_rgba(249,115,22,0.95)] sm:w-auto"
              >
                <Link
                  href={primaryCta.href}
                  data-analytics={homepageAnalyticsEvents.home_hero_get_started_click}
                >
                  {primaryCta.label}
                </Link>
              </Button>
            ) : null}
            {secondaryCta ? (
              <Button
                asChild
                size="lg"
                variant="outline"
                className="min-h-12 w-full rounded-xl border-[var(--border-subtle)] bg-white/80 px-6 text-base font-medium backdrop-blur-sm transition-[transform,background-color] duration-200 hover:-translate-y-0.5 hover:bg-white sm:w-auto"
              >
                <Link
                  href={secondaryCta.href}
                  data-analytics={homepageAnalyticsEvents.home_explore_services_click}
                >
                  {secondaryCta.label}
                </Link>
              </Button>
            ) : null}
          </div>
        )}
        {microcopy ? <MutedText className="text-sm">{microcopy}</MutedText> : null}
      </div>
    </FadeUp>
  );
}
