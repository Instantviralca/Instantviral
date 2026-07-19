'use client';

import { useEffect, useState } from 'react';
import {
  Check,
  ClipboardList,
  Heart,
  PackageCheck,
  ShoppingBag,
  Truck,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import {
  INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG,
  type PackagesPageConfig,
} from '@/data/content/packages-page-config';
import { cn } from '@/lib/utils';

const STEP_ICONS: Record<string, LucideIcon> = {
  place: ShoppingBag,
  review: ClipboardList,
  delivery: Truck,
  likes: Heart,
  completed: PackageCheck,
};

type DeliveryProcessTimelineProps = {
  id?: string;
  className?: string;
  config?: PackagesPageConfig;
};

export function DeliveryProcessTimeline({
  id = 'delivery-process',
  className,
  config = INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG,
}: DeliveryProcessTimelineProps) {
  const { timeline } = config;
  const steps = timeline.steps;
  const [active, setActive] = useState(0);

  useEffect(() => {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      setActive(steps.length - 1);
      return;
    }

    const timer = window.setInterval(() => {
      setActive((current) => (current + 1) % steps.length);
    }, 2200);
    return () => window.clearInterval(timer);
  }, [steps.length]);

  const progress = (active / (steps.length - 1)) * 100;

  return (
    <Section
      id={id}
      spacing="lg"
      className={cn('surface-muted', className)}
      aria-labelledby={`${id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mb-10 max-w-2xl space-y-3">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {timeline.title}
          </Heading>
          <MutedText>{timeline.description}</MutedText>
        </FadeUp>

        <FadeUp>
          <div className="rounded-[1.5rem] border border-[var(--border-subtle)] bg-white p-7 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.3)] sm:p-10">
            <div className="relative mx-auto max-w-4xl pt-3">
              <div className="absolute top-7 right-8 left-8 hidden h-1.5 rounded-full bg-stone-200/90 sm:block" />
              <div
                className="absolute top-7 left-8 hidden h-1.5 origin-left rounded-full bg-[linear-gradient(90deg,#34d399_0%,var(--brand-primary)_55%,#ea580c_100%)] shadow-[0_0_16px_-2px_rgba(249,115,22,0.55)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:block"
                style={{ width: `calc(${progress}%)`, maxWidth: 'calc(100% - 4rem)' }}
              />

              <ol className="relative grid gap-6 sm:grid-cols-4 sm:gap-6">
                {steps.map((step, index) => {
                  const Icon = STEP_ICONS[step.id] ?? Truck;
                  const isActive = index === active;
                  const isDone = index < active;
                  return (
                    <li
                      key={step.id}
                      className={cn(
                        'group flex flex-col items-center rounded-2xl border border-transparent p-4 text-center transition-[border-color,background-color,box-shadow,transform] duration-300 hover:-translate-y-0.5 hover:border-[var(--border-subtle)] hover:bg-[var(--surface-muted)]/70 hover:shadow-[var(--shadow-sm)] motion-reduce:hover:translate-y-0 sm:pt-0',
                      )}
                    >
                      <span
                        className={cn(
                          'relative z-[1] flex size-14 items-center justify-center rounded-full border-2 transition-all duration-500 ease-out',
                          isDone &&
                            'border-transparent bg-emerald-500 text-white shadow-[0_12px_28px_-14px_rgba(16,185,129,0.85)]',
                          isActive &&
                            'scale-110 border-transparent bg-[var(--brand-primary)] text-white shadow-[0_16px_36px_-12px_rgba(249,115,22,0.95)] ring-4 ring-orange-100 motion-safe:animate-[order-step-pulse_2.4s_ease-in-out_infinite] motion-reduce:scale-100',
                          !isDone &&
                            !isActive &&
                            'border-stone-200 bg-stone-100 text-stone-400',
                        )}
                      >
                        {isDone ? (
                          <Check className="size-6" strokeWidth={2.5} />
                        ) : (
                          <Icon className="size-6" strokeWidth={2} />
                        )}
                      </span>
                      <p
                        className={cn(
                          'mt-4 text-sm font-semibold transition-colors duration-300',
                          isActive && 'text-[var(--text-primary)]',
                          isDone && 'text-emerald-700',
                          !isDone && !isActive && 'text-stone-400',
                        )}
                      >
                        {step.label}
                      </p>
                      {index < steps.length - 1 ? (
                        <span className="mt-3 text-[var(--brand-primary)] sm:hidden" aria-hidden>
                          ↓
                        </span>
                      ) : null}
                    </li>
                  );
                })}
              </ol>
            </div>
          </div>
        </FadeUp>
      </Container>
    </Section>
  );
}
