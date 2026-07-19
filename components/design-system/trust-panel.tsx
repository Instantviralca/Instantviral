'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { Check } from 'lucide-react';

import { TrustDashboard } from '@/components/illustrations';
import { type TrustItem } from '@/components/design-system/trust-strip';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';

const ORDER_CLARITY_ITEMS: TrustItem[] = [
  { id: 'public', label: 'Public information only', icon: 'check' },
  { id: 'track', label: 'Order tracking', icon: 'track' },
  { id: 'support', label: 'Customer support', icon: 'support' },
];

type TrustPanelProps = {
  title?: string;
  description?: string;
  items?: TrustItem[];
  className?: string;
  showIllustration?: boolean;
  /** Optional custom right-panel illustration (overrides TrustDashboard). */
  illustration?: ReactNode;
};

/**
 * Order clarity panel — operational claims only.
 */
export function TrustPanel({
  title = 'Order With Clarity',
  description =
    'Place an order using the public username or content URL required for the selected service. Review the details, complete checkout and track available updates from purchase to delivery.',
  items = ORDER_CLARITY_ITEMS,
  className,
  showIllustration = true,
  illustration,
}: TrustPanelProps) {
  const [visibleCount, setVisibleCount] = useState(0);
  const checklist = items;

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setVisibleCount(checklist.length);
      return;
    }
    let i = 0;
    const timer = window.setInterval(() => {
      i += 1;
      setVisibleCount(i);
      if (i >= checklist.length) window.clearInterval(timer);
    }, 180);
    return () => window.clearInterval(timer);
  }, [checklist.length]);

  return (
    <Section
      spacing="md"
      className={cn('surface-muted bg-mesh-soft', className)}
      aria-label="Order with clarity"
    >
      <Container size="xl">
        <div className="grid items-stretch gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="flex h-full flex-col justify-center space-y-6 rounded-2xl border border-[var(--border-subtle)] bg-white/70 p-6 shadow-[0_14px_32px_-24px_rgba(28,25,23,0.28)] sm:p-8">
            <Heading as="h2" size="h2" className="tracking-tight">
              {title}
            </Heading>
            <MutedText className="max-w-xl text-base leading-relaxed text-[var(--text-secondary)]">
              {description}
            </MutedText>
            <ul className="mt-auto space-y-3 pt-2" role="list">
              {checklist.map((item, index) => {
                const shown = index < visibleCount;
                return (
                  <li key={item.id}>
                    <FadeUp delay={0.04 * index}>
                      <div
                        className={cn(
                          'flex min-h-[3.25rem] items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-white px-4 py-3.5 shadow-[0_10px_24px_-20px_rgba(28,25,23,0.28)] transition-[opacity,transform] duration-300',
                          shown ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0',
                        )}
                      >
                        <span
                          className={cn(
                            'flex size-8 shrink-0 items-center justify-center rounded-full bg-[var(--brand-accent-soft)] text-[var(--brand-primary)] transition-transform duration-300',
                            shown && 'motion-safe:animate-[order-step-pulse_1.8s_ease-out_1]',
                          )}
                        >
                          <Check className="size-3.5" strokeWidth={2.75} aria-hidden />
                        </span>
                        <p className="text-[0.9375rem] font-semibold tracking-tight text-[var(--text-primary)]">
                          {item.label}
                        </p>
                      </div>
                    </FadeUp>
                  </li>
                );
              })}
            </ul>
          </div>
          {showIllustration ? (
            <div className="flex h-full min-h-[18rem] items-center justify-center rounded-2xl border border-[var(--border-subtle)] bg-white/70 p-6 shadow-[0_14px_32px_-24px_rgba(28,25,23,0.28)] sm:p-8">
              <div className="mx-auto w-full max-w-md">
                {illustration ?? <TrustDashboard className="w-full" />}
              </div>
            </div>
          ) : null}
        </div>
      </Container>
    </Section>
  );
}
