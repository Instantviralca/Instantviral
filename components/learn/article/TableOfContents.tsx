'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import type { LearnTocItem } from '@/types/learn';

type TableOfContentsProps = {
  title?: string;
  items: LearnTocItem[];
  /** Sticky-header offset in px for scroll-margin / active tracking. */
  headerOffset?: number;
};

/**
 * Article TOC — Document 15.02.
 * Server-generated items; client only for active state + mobile collapse.
 */
export function TableOfContents({
  title = 'On this page',
  items,
  headerOffset = 96,
}: TableOfContentsProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(items[0]?.id ?? null);

  useEffect(() => {
    if (items.length === 0) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const first = visible[0]?.target;
        if (first?.id) setActiveId(first.id);
      },
      {
        rootMargin: `-${headerOffset}px 0px -55% 0px`,
        threshold: [0, 1],
      },
    );

    headings.forEach((heading) => observer.observe(heading));
    return () => observer.disconnect();
  }, [headerOffset, items]);

  if (items.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="border border-neutral-200 bg-white"
    >
      <button
        type="button"
        className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2 lg:hidden"
        aria-expanded={open}
        onClick={() => setOpen((value) => !value)}
      >
        {title}
        <span aria-hidden="true">{open ? '−' : '+'}</span>
      </button>

      <div className={cn('px-4 pb-4 lg:block lg:pt-4', open ? 'block' : 'hidden')}>
        <p className="mb-3 hidden text-sm font-semibold text-neutral-900 lg:block">
          {title}
        </p>
        <ol className="space-y-2">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className={item.level === 3 ? 'pl-3' : undefined}>
                <a
                  href={item.href}
                  className={cn(
                    'block text-sm underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2',
                    isActive ? 'font-medium text-neutral-900' : 'text-neutral-600',
                  )}
                  aria-current={isActive ? 'location' : undefined}
                  style={{ scrollMarginTop: headerOffset }}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ol>
      </div>
    </nav>
  );
}
