import Link from 'next/link';
import {
  FileText,
  Headphones,
  Layers3,
  Link2,
  Lock,
  RefreshCw,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { FeatureCard } from '@/components/cards/feature-card';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { HoverLift } from '@/components/motion/hover-lift';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';
import { homepageAnalyticsEvents } from '@/lib/analytics';
import { cn } from '@/lib/utils';
import type { CtaProps, FeatureItem } from '@/types/components';

export type WhyChooseUsProps = {
  title?: string;
  description?: string;
  items: FeatureItem[];
  cta?: CtaProps;
  className?: string;
};

const WHY_ICONS: Record<string, LucideIcon> = {
  'why-public-info': Link2,
  'why-delivery-options': Truck,
  'why-support': Headphones,
  'why-money-back': ShieldCheck,
  'why-refill': RefreshCw,
  'why-tracking': FileText,
  'why-no-password': Lock,
  'why-gradual-delivery': Truck,
  'why-secure-checkout': ShieldCheck,
  'why-order-tracking': FileText,
  'why-clear-packages': Layers3,
  'why-customer-support': Headphones,
};

export function WhyChooseUs({ title, description, items, cta, className }: WhyChooseUsProps) {
  return (
    <Section
      spacing="lg"
      className={cn(className)}
      aria-labelledby={title ? 'home-why-heading' : undefined}
      aria-label={title ? undefined : 'Why choose us'}
    >
      <Container size="xl">
        {(title || description) && (
          <FadeUp className="mb-10 max-w-2xl space-y-3">
            {title ? (
              <Heading as="h2" size="h2" id="home-why-heading">
                {title}
              </Heading>
            ) : null}
            {description ? <MutedText>{description}</MutedText> : null}
          </FadeUp>
        )}
        <Grid cols={3} className="gap-5">
          {items.map((item, index) => {
            const Icon = WHY_ICONS[item.id] ?? ShieldCheck;
            return (
              <FadeUp key={item.id} delay={0.04 * index} className="h-full">
                <HoverLift className="h-full">
                  <FeatureCard
                    className="h-full border-[var(--border-subtle)] bg-white transition-[border-color,box-shadow] duration-200 hover:border-[color-mix(in_srgb,var(--brand-primary)_28%,var(--border-subtle))] hover:shadow-[0_16px_36px_-28px_rgba(28,25,23,0.3)]"
                    title={item.title}
                    description={item.description}
                    icon={
                      item.icon ?? (
                        <span className="flex size-11 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                          <Icon className="size-5" aria-hidden />
                        </span>
                      )
                    }
                  />
                </HoverLift>
              </FadeUp>
            );
          })}
        </Grid>
        {cta ? (
          <div className="mt-10 flex justify-start">
            <Button asChild size="lg" variant="outline" className="min-h-11 rounded-xl">
              <Link href={cta.href} data-analytics={homepageAnalyticsEvents.home_about_click}>
                {cta.label}
              </Link>
            </Button>
          </div>
        ) : null}
      </Container>
    </Section>
  );
}
