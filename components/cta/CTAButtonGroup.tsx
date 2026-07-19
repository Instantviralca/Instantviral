'use client';

import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  ctaAnalyticsEvents,
  resolveCtaClickEvent,
  trackCtaEvent,
} from '@/lib/analytics/cta-events';
import { cn } from '@/lib/utils';
import type { PublicCta } from '@/types/cta';

export type CTAButtonGroupProps = {
  primary?: PublicCta;
  secondary?: PublicCta;
  /** Extra CTAs rendered as outline buttons after secondary. */
  additional?: PublicCta[];
  surface?: string;
  serviceSlug?: string;
  className?: string;
  align?: 'start' | 'center';
};

/**
 * Accessible CTA button group — labels/destinations from PublicCta only.
 */
export function CTAButtonGroup({
  primary,
  secondary,
  additional = [],
  surface = 'section',
  serviceSlug,
  className,
  align = 'start',
}: CTAButtonGroupProps) {
  const buttons = [primary, secondary, ...additional].filter(
    (cta): cta is PublicCta => Boolean(cta),
  );

  if (buttons.length === 0) return null;

  return (
    <div
      className={cn(
        'flex w-full flex-col gap-3 sm:flex-row sm:flex-wrap',
        align === 'center' && 'sm:justify-center',
        className,
      )}
      role="group"
      aria-label="Calls to action"
    >
      {buttons.map((cta, index) => {
        const isPrimary = index === 0 && cta.variant === 'primary';
        const usePrimary = isPrimary || cta.variant === 'primary';
        return (
          <Button
            key={cta.id}
            asChild
            size="lg"
            variant={usePrimary ? 'default' : 'outline'}
            className={cn(
              'min-h-12 w-full rounded-xl transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100 sm:min-w-[11rem] sm:w-auto',
              usePrimary &&
                'bg-[linear-gradient(145deg,var(--brand-primary)_0%,#ea580c_100%)] px-7 font-semibold shadow-[0_14px_32px_-14px_rgba(249,115,22,0.9)] hover:shadow-[0_18px_36px_-14px_rgba(249,115,22,1)]',
              // Dark CTA bands set text-white on the section; keep outline labels readable.
              !usePrimary &&
                'bg-white px-6 font-medium text-[var(--text-primary)] shadow-[0_10px_24px_-18px_rgba(0,0,0,0.35)] hover:bg-white/95 hover:text-[var(--text-primary)]',
            )}
          >
            <Link
              href={cta.destination}
              className="relative overflow-hidden"
              data-analytics={resolveCtaClickEvent(cta.variant, surface)}
              onClick={() => {
                trackCtaEvent(resolveCtaClickEvent(cta.variant, surface), {
                  ctaId: cta.id,
                  href: cta.destination,
                  label: cta.buttonLabel,
                  variant: cta.variant,
                  surface,
                  serviceSlug,
                });
                if (cta.variant === 'primary') {
                  trackCtaEvent(ctaAnalyticsEvents.cta_click, {
                    ctaId: cta.id,
                    href: cta.destination,
                    label: cta.buttonLabel,
                    variant: cta.variant,
                    surface,
                    serviceSlug,
                  });
                }
              }}
            >
              {cta.buttonLabel}
            </Link>
          </Button>
        );
      })}
    </div>
  );
}
