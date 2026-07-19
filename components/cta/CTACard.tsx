'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/cards/card';
import { Button } from '@/components/ui/button';
import {
  ctaAnalyticsEvents,
  resolveCtaClickEvent,
  trackCtaEvent,
} from '@/lib/analytics/cta-events';
import { cn } from '@/lib/utils';
import type { PublicCta } from '@/types/cta';

export type CTACardProps = {
  cta: PublicCta;
  surface?: string;
  serviceSlug?: string;
  className?: string;
};

/**
 * Card CTA for grids / cross-sell — content from PublicCta only.
 */
export function CTACard({
  cta,
  surface = 'card',
  serviceSlug,
  className,
}: CTACardProps) {
  const viewed = useRef(false);

  useEffect(() => {
    if (viewed.current) return;
    viewed.current = true;
    trackCtaEvent(ctaAnalyticsEvents.cta_view, {
      ctaId: cta.id,
      surface,
      serviceSlug,
      label: cta.buttonLabel,
      href: cta.destination,
      variant: cta.variant,
    });
  }, [cta, surface, serviceSlug]);

  return (
    <Card className={cn('flex h-full flex-col justify-between', className)}>
      <CardHeader className="space-y-2">
        <CardTitle className="text-base">{cta.title}</CardTitle>
        {cta.description ? (
          <CardDescription>{cta.description}</CardDescription>
        ) : null}
      </CardHeader>
      <div className="p-6 pt-0">
        <Button asChild size="lg" className="min-h-11 w-full" variant="outline">
          <Link
            href={cta.destination}
            data-analytics={resolveCtaClickEvent(cta.variant, surface)}
            onClick={() =>
              trackCtaEvent(resolveCtaClickEvent(cta.variant, surface), {
                ctaId: cta.id,
                href: cta.destination,
                label: cta.buttonLabel,
                variant: cta.variant,
                surface,
                serviceSlug,
              })
            }
          >
            {cta.buttonLabel}
          </Link>
        </Button>
      </div>
    </Card>
  );
}
