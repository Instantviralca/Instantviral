import type { LearnTocItem } from '@/types/learn';

type TableOfContentsProps = {
  title?: string;
  items: LearnTocItem[];
};

/**
 * Accessible Learn table of contents — Document 15.01.
 */
export function TableOfContents({
  title = 'On this page',
  items,
}: TableOfContentsProps) {
  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents" className="border border-neutral-200 p-4">
      <h2 className="text-sm font-semibold text-neutral-900">{title}</h2>
      <ol className="mt-3 space-y-2">
        {items.map((item) => (
          <li key={item.id} className={item.level === 3 ? 'pl-3' : undefined}>
            <a
              href={item.href}
              className="text-sm text-neutral-600 underline-offset-2 outline-none hover:text-neutral-900 hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
