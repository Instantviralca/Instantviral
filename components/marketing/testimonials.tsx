import { TestimonialCard } from '@/components/cards/testimonial-card';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import type { TestimonialItem } from '@/types/components';

export type TestimonialsProps = {
  title?: string;
  description?: string;
  items: TestimonialItem[];
  className?: string;
};

export function Testimonials({ title, description, items, className }: TestimonialsProps) {
  if (!items.length) return null;

  return (
    <Section
      spacing="lg"
      className={cn('bg-muted/20', className)}
      aria-labelledby={title ? 'home-testimonials-heading' : undefined}
      aria-label={title ? undefined : 'Testimonials'}
    >
      <Container size="xl">
        {(title || description) && (
          <FadeUp className="mb-8 max-w-2xl space-y-2">
            {title ? (
              <Heading as="h2" size="h2" id="home-testimonials-heading">
                {title}
              </Heading>
            ) : null}
            {description ? <MutedText>{description}</MutedText> : null}
          </FadeUp>
        )}
        <Grid cols={3} className="gap-4">
          {items.map((item) => (
            <TestimonialCard
              key={item.id}
              quote={item.quote}
              author={item.author}
              role={item.role}
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
