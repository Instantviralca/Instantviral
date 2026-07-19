'use client';

import type { ReactNode } from 'react';

import { CTASection } from '@/components/cta/CTASection';
import { isValidCtaDestination } from '@/data/ctas/destinations';
import {
  getServicePageAnalytics,
  homepageAnalyticsEvents,
  trackHomepageEvent,
} from '@/lib/analytics';
import { ctaAnalyticsEvents, trackCtaEvent } from '@/lib/analytics/cta-events';
import { cn } from '@/lib/utils';
import type { CtaProps } from '@/types/components';
import type { PublicCta } from '@/types/cta';

export type FinalCTAProps = {
  title?: string;
  description?: string;
  /** Preferred: registry PublicCta */
  primary?: PublicCta;
  secondary?: PublicCta;
  /** Legacy label/href pair — validated before render. */
  primaryCta?: CtaProps;
  secondaryCta?: CtaProps;
  analyticsServiceSlug?: string;
  surface?: string;
  id?: string;
  className?: string;
  aside?: ReactNode;
};

function toPublicCta(
  id: string,
  title: string,
  description: string | undefined,
  cta: CtaProps,
  variant: PublicCta['variant'],
): PublicCta | null {
  if (!isValidCtaDestination(cta.href)) return null;
  if (!cta.label.trim()) return null;
  return {
    id,
    title,
    description,
    buttonLabel: cta.label.trim(),
    destination: cta.href.trim(),
    variant,
    pageLocations: [],
    order: 0,
  };
}

/**
 * Final CTA — Document 14.06.
 * Prefers shared registry PublicCta records; legacy CtaProps are validated.
 */
export function FinalCTA({
  title,
  description,
  primary,
  secondary,
  primaryCta,
  secondaryCta,
  analyticsServiceSlug,
  surface = 'final_cta',
  id,
  className,
  aside,
}: FinalCTAProps) {
  const resolvedPrimary =
    primary ??
    (primaryCta
      ? toPublicCta(
          'legacy-final-primary',
          title ?? 'Get started',
          description,
          primaryCta,
          'primary',
        )
      : null);

  if (!resolvedPrimary) return null;

  const resolvedSecondary =
    secondary ??
    (secondaryCta
      ? toPublicCta(
          'legacy-final-secondary',
          title ?? 'Secondary',
          undefined,
          secondaryCta,
          'secondary',
        )
      : undefined);

  const analytics = analyticsServiceSlug
    ? getServicePageAnalytics(analyticsServiceSlug)
    : null;

  return (
    <div
      className={cn('relative', className)}
      onClickCapture={(event) => {
        const target = event.target as HTMLElement | null;
        const anchor = target?.closest('a');
        if (!anchor) return;
        const href = anchor.getAttribute('href') ?? undefined;
        if (analytics) {
          const isPrimary = href === resolvedPrimary.destination;
          if (isPrimary) {
            analytics.viewPackages({
              href,
              serviceSlug: analyticsServiceSlug,
              cta: 'primary',
            });
          } else {
            analytics.trackOrderClick({
              href,
              serviceSlug: analyticsServiceSlug,
              cta: 'secondary',
            });
          }
          return;
        }
        trackHomepageEvent(homepageAnalyticsEvents.home_final_cta_click, {
          href,
          cta: href === resolvedPrimary.destination ? 'primary' : 'secondary',
        });
        trackCtaEvent(ctaAnalyticsEvents.cta_click, {
          href,
          surface,
          serviceSlug: analyticsServiceSlug,
        });
      }}
    >
      <CTASection
        id={id}
        primary={resolvedPrimary}
        secondary={resolvedSecondary ?? undefined}
        title={title}
        description={description}
        surface={surface}
        serviceSlug={analyticsServiceSlug}
        aside={aside}
      />
    </div>
  );
}
