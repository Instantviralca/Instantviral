import { Lock, ShieldCheck } from 'lucide-react';

import { ExtensionImage } from '@/components/marketing/extension-image';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { extensionIllustrations, paymentsSection } from '@/data/content/homepage-extensions';
import { cn } from '@/lib/utils';

export function PaymentsSection({ className }: { className?: string }) {
  const { id, title, description, badges } = paymentsSection;
  const art = extensionIllustrations.payments;

  return (
    <Section id={id} spacing="lg" className={cn('bg-background', className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-12">
          <FadeUp className="space-y-4">
            <div className="space-y-2">
              <Heading as="h2" size="h2" id={`${id}-heading`}>
                {title}
              </Heading>
              <MutedText className="max-w-xl">{description}</MutedText>
            </div>
            <ul className="flex flex-wrap gap-3" aria-label="Accepted payment and security badges">
              {badges.map((badge) => (
                <li key={badge.id}>
                  <span className="inline-flex min-h-11 items-center gap-2 rounded-[14px] border border-[var(--border-subtle)] bg-white px-4 py-2 text-sm font-semibold text-[var(--text-primary)] shadow-[var(--shadow-sm)]">
                    {badge.id === 'ssl' ? (
                      <ShieldCheck className="size-4 text-[var(--brand-primary)]" aria-hidden />
                    ) : (
                      <Lock className="size-4 text-[var(--brand-primary)]" aria-hidden />
                    )}
                    {badge.label}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-xs text-[var(--text-muted)]">
              Payment options shown at checkout may vary by region and configuration.
            </p>
          </FadeUp>

          <FadeUp delay={0.08}>
            <ExtensionImage
              {...art}
              className="shadow-[var(--shadow-md)]"
              sizes="(max-width: 1024px) 100vw, 560px"
            />
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}
