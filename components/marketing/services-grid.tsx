import { ServiceCard } from '@/components/cards/service-card';
import { Container } from '@/components/layout/container';
import { Grid } from '@/components/layout/grid';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';
import type { Service } from '@/types/service';

export type ServicesGridProps = {
  title?: string;
  description?: string;
  services: Service[];
  className?: string;
};

/** Services grid — consumes Service Registry objects. */
export function ServicesGrid({ title, description, services, className }: ServicesGridProps) {
  return (
    <Section className={cn(className)} aria-label="Services">
      <Container>
        {(title || description) && (
          <div className="mb-8 max-w-2xl space-y-2">
            {title ? (
              <Heading as="h2" size="h2">
                {title}
              </Heading>
            ) : null}
            {description ? <MutedText>{description}</MutedText> : null}
          </div>
        )}
        <Grid cols={3} className="gap-4">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              title={service.navigationLabel}
              description={service.description}
              href={service.url}
              accentColor="border-l-primary"
            />
          ))}
        </Grid>
      </Container>
    </Section>
  );
}
