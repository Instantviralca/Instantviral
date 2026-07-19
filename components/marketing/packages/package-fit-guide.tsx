import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { HoverLift } from '@/components/motion/hover-lift';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { resolvePackagesIcon } from '@/components/marketing/packages/packages-icons';
import {
  INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG,
  type PackagesPageConfig,
} from '@/data/content/packages-page-config';
import { cn } from '@/lib/utils';

type PackageFitGuideProps = {
  id?: string;
  className?: string;
  config?: PackagesPageConfig;
};

export function PackageFitGuide({
  id = 'package-fit',
  className,
  config = INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG,
}: PackageFitGuideProps) {
  const { fit } = config;

  return (
    <Section id={id} spacing="lg" className={cn(className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <FadeUp className="mb-10 max-w-2xl space-y-3">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {fit.title}
          </Heading>
          <MutedText>{fit.description}</MutedText>
        </FadeUp>

        <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
          {fit.cards.map((card, index) => {
            const Icon = resolvePackagesIcon(card.icon);
            return (
              <li key={card.id} className="h-full">
                <FadeUp delay={0.04 * index} className="h-full">
                  <HoverLift className="h-full">
                    <article className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_36%,var(--border-subtle))] hover:shadow-[0_26px_52px_-24px_rgba(28,25,23,0.4)] motion-reduce:hover:translate-y-0 sm:p-6">
                      <span className="mb-5 flex size-[3.5rem] items-center justify-center rounded-2xl bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-[var(--brand-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_22px_-14px_rgba(249,115,22,0.55)] transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100">
                        <Icon className="size-6" aria-hidden />
                      </span>
                      <p className="text-[10px] font-bold tracking-[0.08em] text-[var(--brand-primary)] uppercase">
                        Best for {card.bestFor}
                      </p>
                      <p className="mt-3 text-[1.65rem] font-bold tracking-tight text-[var(--text-primary)]">
                        {card.quantity}
                      </p>
                      <h3 className="mt-2.5 text-sm font-semibold text-[var(--text-primary)]">
                        {card.title}
                      </h3>
                      <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {card.description}
                      </p>
                    </article>
                  </HoverLift>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
