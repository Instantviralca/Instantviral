import { TableOfContents } from '@/components/learn/article/TableOfContents';
import type { LearnTocItem } from '@/types/learn';
import type { ReactNode } from 'react';

type ArticleSidebarProps = {
  tocItems?: LearnTocItem[];
  children?: ReactNode;
};

/**
 * Sticky desktop sidebar for TOC — Document 15.02.
 */
export function ArticleSidebar({ tocItems = [], children }: ArticleSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <TableOfContents items={tocItems} />
      {children}
    </aside>
  );
}
