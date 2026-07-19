import { Heading } from '@/components/typography/heading';
import { cn } from '@/lib/utils';
import type { TocItem } from '@/types/components';

export type TableOfContentsProps = {
  title?: string;
  items: TocItem[];
  className?: string;
};

export function TableOfContents({
  title = 'On this page',
  items,
  className,
}: TableOfContentsProps) {
  return (
    <nav aria-label="Table of contents" className={cn('rounded-lg border border-border p-4', className)}>
      <Heading as="h2" size="h4" className="mb-3">
        {title}
      </Heading>
      <ol className="space-y-2">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={item.href}
              className="text-sm text-muted-foreground hover:text-foreground focus-visible:outline-none"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
