import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';

type PagePlaceholderProps = {
  title: string;
  intro?: string;
  children?: React.ReactNode;
};

export function PagePlaceholder({
  title,
  intro = 'Placeholder page',
  children,
}: PagePlaceholderProps) {
  return (
    <Section spacing="md">
      <Container>
        <Stack gap="sm">
          <Heading as="h1" size="h1">
            {title}
          </Heading>
          <MutedText>{intro}</MutedText>
        </Stack>
        <div className="mt-8 space-y-4">{children}</div>
      </Container>
    </Section>
  );
}
