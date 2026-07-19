import Link from 'next/link';
import { Headset, Lock, ShieldCheck, UserRound, Waypoints } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { securitySection } from '@/data/content/homepage-extensions';
import { cn } from '@/lib/utils';

const ICONS = {
  ssl: ShieldCheck,
  username: UserRound,
  checkout: Lock,
  tracking: Waypoints,
  support: Headset,
} as const;

export function SecuritySection({ className }: { className?: string }) {
  const { id, title, description, cards } = securitySection;

  return (
    <Section id={id} spacing="lg" className={cn('bg-background', className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <FadeUp className="mb-8 max-w-2xl space-y-2">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {title}
          </Heading>
          <MutedText>{description}</MutedText>
        </FadeUp>

        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {cards.map((card, index) => {
            const Icon = ICONS[card.id as keyof typeof ICONS] ?? ShieldCheck;
            const body = (
              <>
                <span className="mb-3 flex size-11 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="text-sm font-bold text-[var(--text-primary)]">{card.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{card.description}</p>
              </>
            );

            return (
              <li key={card.id} className="h-full">
                <FadeUp delay={0.04 * index} className="h-full">
                  {'href' in card && card.href ? (
                    <Link
                      href={card.href}
                      className="flex h-full flex-col rounded-[20px] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      {body}
                    </Link>
                  ) : (
                    <div className="flex h-full flex-col rounded-[20px] border border-[var(--border-subtle)] bg-white p-5 shadow-[var(--shadow-sm)]">
                      {body}
                    </div>
                  )}
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
