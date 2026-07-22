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
  const isCompact = fit.layout === 'compact';

  return (
    <Section id={id} spacing="lg" className={cn(className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <FadeUp className={cn('max-w-2xl space-y-2', isCompact ? 'mb-6' : 'mb-8')}>
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {fit.title}
          </Heading>
          {fit.description ? <MutedText>{fit.description}</MutedText> : null}
        </FadeUp>

        {isCompact ? (
          <FadeUp>
            <div
              className="overflow-hidden rounded-[1.25rem] border border-[var(--border-subtle)] bg-white shadow-[0_18px_40px_-28px_rgba(28,25,23,0.3)]"
              role="region"
              aria-label="Package recommendations"
            >
              <div className="w-full overflow-x-auto overscroll-x-contain [-webkit-overflow-scrolling:touch]">
                <table className="w-full min-w-[22rem] border-collapse text-left lg:min-w-0">
                  <thead>
                    <tr className="border-b border-[var(--border-subtle)] bg-[var(--surface-muted)]">
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-[11px] font-bold tracking-[0.08em] text-[var(--text-muted)] uppercase lg:px-5"
                      >
                        Package
                      </th>
                      <th
                        scope="col"
                        className="px-4 py-3.5 text-[11px] font-bold tracking-[0.08em] text-[var(--text-muted)] uppercase lg:px-5"
                      >
                        Best for
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {fit.cards.map((card, rowIndex) => {
                      const zebra = rowIndex % 2 === 1;
                      return (
                        <tr
                          key={card.id}
                          className={cn(
                            'border-b border-[var(--border-subtle)] last:border-b-0',
                            zebra ? 'bg-stone-50/90' : 'bg-white',
                          )}
                        >
                          <th
                            scope="row"
                            className="px-4 py-3.5 text-sm font-semibold text-[var(--text-primary)] lg:px-5"
                          >
                            {card.quantity}
                          </th>
                          <td className="px-4 py-3.5 text-sm text-[var(--text-secondary)] lg:px-5">
                            {card.bestFor}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </FadeUp>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-5">
            {fit.cards.map((card, index) => {
              const Icon = resolvePackagesIcon(card.icon);
              return (
                <li key={card.id} className="h-full">
                  <FadeUp delay={0.04 * index} className="h-full">
                    <HoverLift className="h-full">
                      <article className="group flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_14px_32px_-22px_rgba(28,25,23,0.28)] transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[color-mix(in_srgb,var(--brand-primary)_36%,var(--border-subtle))] hover:shadow-[0_26px_52px_-24px_rgba(28,25,23,0.4)] motion-reduce:hover:translate-y-0 sm:p-5">
                        <span className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-[var(--brand-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.8),0_10px_22px_-14px_rgba(249,115,22,0.55)] transition-transform duration-300 group-hover:scale-105 motion-reduce:group-hover:scale-100">
                          <Icon className="size-5" aria-hidden />
                        </span>
                        <p className="text-[10px] font-bold tracking-[0.08em] text-[var(--brand-primary)] uppercase">
                          Best for {card.bestFor}
                        </p>
                        <p className="mt-2 text-xl font-bold tracking-tight text-[var(--text-primary)]">
                          {card.quantity}
                        </p>
                        <h3 className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                          {card.title}
                        </h3>
                        <p className="mt-2 flex-1 text-sm leading-snug text-[var(--text-secondary)]">
                          {card.description}
                        </p>
                      </article>
                    </HoverLift>
                  </FadeUp>
                </li>
              );
            })}
          </ul>
        )}
      </Container>
    </Section>
  );
}
