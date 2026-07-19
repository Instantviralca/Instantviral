import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';

type EmptySectionProps = {
  title: string;
  className?: string;
};

export function EmptySection({ title, className }: EmptySectionProps) {
  return (
    <section
      className={cn(
        'rounded-lg border border-dashed border-border bg-muted/40 px-4 py-8',
        className,
      )}
    >
      <Heading as="h2" size="h4">
        {title}
      </Heading>
      <MutedText className="mt-1">Empty section</MutedText>
    </section>
  );
}
