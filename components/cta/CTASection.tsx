'use client';

import { useEffect, useRef, type ReactNode } from 'react';

import { CTAButtonGroup } from '@/components/cta/CTAButtonGroup';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { ctaAnalyticsEvents, trackCtaEvent } from '@/lib/analytics/cta-events';
import { cn } from '@/lib/utils';
import type { PublicCta } from '@/types/cta';

export type CTASectionProps = {
  primary: PublicCta;
  secondary?: PublicCta;
  additional?: PublicCta[];
  /** Override section title (defaults to primary.title). */
  title?: string;
  description?: string;
  surface?: string;
  serviceSlug?: string;
  id?: string;
  className?: string;
  /** Optional side visual for conversion surfaces. */
  aside?: ReactNode;
};

/**
 * Full-width final / mid-page CTA section from registry data.
 */
export function CTASection({
  primary,
  secondary,
  additional,
  title,
  description,
  surface = 'section',
  serviceSlug,
  id,
  className,
  aside,
}: CTASectionProps) {
  const viewed = useRef(false);
  const headingId = id ? `${id}-heading` : 'cta-section-heading';

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackCtaEvent(ctaAnalyticsEvents.cta_view, {
      ctaId: primary.id,
      href: primary.destination,
      label: primary.buttonLabel,
      variant: primary.variant,
      surface,
      serviceSlug,
    });
  }, [primary, surface, serviceSlug]);

  return (
    <Section
      id={id}
      spacing="lg"
      className={cn('relative overflow-hidden bg-dark-band text-white', className)}
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute -right-16 -bottom-20 size-72 rounded-full bg-[var(--brand-primary)] opacity-25 blur-3xl motion-safe:animate-[cta-glow_8s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 right-1/4 size-64 -translate-y-1/2 rounded-full bg-[var(--brand-primary)]/20 blur-[80px] motion-safe:animate-[cta-glow_10s_ease-in-out_infinite]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -top-20 -left-10 size-56 rounded-full bg-white/10 blur-3xl"
        aria-hidden="true"
      />
      <Container size="xl" className="relative">
        <div
          className={cn(
            aside &&
              'grid items-center gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-14 lg:items-center',
          )}
        >
          <Stack
            gap="lg"
            className={cn(
              'px-1 sm:gap-8',
              aside
                ? 'max-w-xl items-start justify-center self-center text-left'
                : 'mx-auto max-w-2xl items-center text-center',
            )}
          >
            <Heading as="h2" size="h2" id={headingId} className="text-white">
              {title ?? primary.title}
            </Heading>
            {(description ?? primary.description) ? (
              <MutedText
                className={cn('text-base text-white/75', aside ? 'max-w-lg' : 'max-w-xl')}
              >
                {description ?? primary.description}
              </MutedText>
            ) : null}
            <CTAButtonGroup
              primary={primary}
              secondary={secondary}
              additional={additional}
              surface={surface}
              serviceSlug={serviceSlug}
              align={aside ? 'start' : 'center'}
              className="w-full gap-4 pt-2 sm:w-auto"
            />
          </Stack>
          {aside ? (
            <div
              className={cn(
                'mx-auto flex w-full max-w-sm items-center justify-self-center lg:max-w-md lg:justify-self-end',
                'overflow-visible',
              )}
              aria-hidden
            >
              {aside}
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
