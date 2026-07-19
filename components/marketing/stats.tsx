import { StatCard } from '@/components/cards/stat-card';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import type { StatItem } from '@/types/components';

export type StatsProps = {
  title?: string;
  description?: string;
  items: StatItem[];
  className?: string;
};

/** Trust metrics — Document 08.11: desktop 4 · mobile 2×2. */
export function Stats({ title, description, items, className }: StatsProps) {
  return (
    <Section
      spacing="lg"
      className={cn('bg-hero-wash', className)}
      aria-labelledby={title ? 'home-stats-heading' : undefined}
      aria-label={title ? undefined : 'Stats'}
    >
      <Container size="xl">
        {(title || description) && (
          <FadeUp className="mb-10 max-w-2xl space-y-3">
            {title ? (
              <Heading as="h2" size="h2" id="home-stats-heading">
                {title}
              </Heading>
            ) : null}
            {description ? <MutedText>{description}</MutedText> : null}
          </FadeUp>
        )}
        <div className="grid grid-cols-2 items-stretch gap-4 sm:gap-5 lg:grid-cols-4">
          {items.map((item, index) => (
            <FadeUp key={item.id} delay={0.05 * index} className="h-full">
              <StatCard className="h-full" label={item.label} value={item.value} />
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}
