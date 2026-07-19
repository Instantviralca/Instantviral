'use client';

import { useEffect, useRef } from 'react';

import { CTAButtonGroup } from '@/components/cta/CTAButtonGroup';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { ctaAnalyticsEvents, trackCtaEvent } from '@/lib/analytics/cta-events';
import { cn } from '@/lib/utils';
import type { PublicCta } from '@/types/cta';

export type CTAHeroProps = {
  primary: PublicCta;
  secondary?: PublicCta;
  title?: string;
  description?: string;
  surface?: string;
  serviceSlug?: string;
  className?: string;
};

/**
 * Hero CTA cluster — copy from registry PublicCta records.
 */
export function CTAHero({
  primary,
  secondary,
  title,
  description,
  surface = 'hero',
  serviceSlug,
  className,
}: CTAHeroProps) {
  const viewed = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackCtaEvent(ctaAnalyticsEvents.cta_view, {
      ctaId: primary.id,
      surface,
      serviceSlug,
      label: primary.buttonLabel,
      href: primary.destination,
      variant: primary.variant,
    });
  }, [primary, surface, serviceSlug]);

  return (
    <div className={cn('space-y-6', className)}>
      <div className="max-w-2xl space-y-3">
        <Heading as="h1" size="h1">
          {title ?? primary.title}
        </Heading>
        {(description ?? primary.description) ? (
          <Lead>{description ?? primary.description}</Lead>
        ) : null}
      </div>
      <CTAButtonGroup
        primary={primary}
        secondary={secondary}
        surface={surface}
        serviceSlug={serviceSlug}
      />
    </div>
  );
}
