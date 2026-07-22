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

type WhyOrderFromUsProps = {
  id?: string;
  className?: string;
  config?: PackagesPageConfig;
};

export function WhyOrderFromUs({
  id = 'why-order',
  className,
  config = INSTAGRAM_FOLLOWERS_PACKAGES_CONFIG,
}: WhyOrderFromUsProps) {
  const { whyOrder } = config;
  if (!whyOrder.title || whyOrder.features.length === 0) return null;

  return (
    <Section id={id} spacing="lg" className={cn(className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <FadeUp className="mb-8 max-w-2xl space-y-2">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {whyOrder.title}
          </Heading>
          {whyOrder.description ? <MutedText>{whyOrder.description}</MutedText> : null}
        </FadeUp>

        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {whyOrder.features.map((feature, index) => {
            const Icon = resolvePackagesIcon(feature.icon);
            return (
              <li key={feature.id} className="flex h-full min-h-0">
                <FadeUp delay={0.04 * index} className="flex h-full w-full">
                  <HoverLift className="flex h-full w-full">
                    <article className="group flex h-full w-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_12px_28px_-22px_rgba(28,25,23,0.26)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] hover:shadow-[0_24px_52px_-24px_rgba(28,25,23,0.38)] motion-reduce:hover:translate-y-0 sm:p-6">
                      <span className="mb-4 flex size-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--brand-primary)_0%,#ea580c_100%)] text-white shadow-[0_16px_32px_-14px_rgba(249,115,22,0.8)] transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <h3 className="text-base font-semibold text-[var(--text-primary)]">
                        {feature.title}
                      </h3>
                      <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                        {feature.description}
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
