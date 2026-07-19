'use client';

import { useEffect, useRef } from 'react';

import { CTAButtonGroup } from '@/components/cta/CTAButtonGroup';
import { Container } from '@/components/layout/container';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { ctaAnalyticsEvents, trackCtaEvent } from '@/lib/analytics/cta-events';
import { cn } from '@/lib/utils';
import type { PublicCta } from '@/types/cta';

export type CTAFooterProps = {
  primary: PublicCta;
  secondary?: PublicCta;
  additional?: PublicCta[];
  title?: string;
  description?: string;
  surface?: string;
  className?: string;
};

/**
 * Footer CTA strip driven by the shared registry.
 */
export function CTAFooter({
  primary,
  secondary,
  additional,
  title,
  description,
  surface = 'footer',
  className,
}: CTAFooterProps) {
  const viewed = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackCtaEvent(ctaAnalyticsEvents.cta_view, {
      ctaId: primary.id,
      surface,
      label: primary.buttonLabel,
      href: primary.destination,
      variant: primary.variant,
    });
  }, [primary, surface]);

  return (
    <div className={cn('border-t border-border bg-muted/30 py-10', className)}>
      <Container size="xl">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl space-y-2">
            <Heading as="h2" size="h3">
              {title ?? primary.title}
            </Heading>
            {(description ?? primary.description) ? (
              <MutedText>{description ?? primary.description}</MutedText>
            ) : null}
          </div>
          <CTAButtonGroup
            primary={primary}
            secondary={secondary}
            additional={additional}
            surface={surface}
          />
        </div>
      </Container>
    </div>
  );
}
