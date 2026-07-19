import { TableOfContents } from '@/components/learn/TableOfContents';
import type { LearnTocItem } from '@/types/learn';
import type { ReactNode } from 'react';

type ArticleSidebarProps = {
  tocItems?: LearnTocItem[];
  children?: ReactNode;
};

/**
 * Sticky Learn article sidebar — Document 15.01.
 */
export function ArticleSidebar({ tocItems = [], children }: ArticleSidebarProps) {
  return (
    <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
      <TableOfContents items={tocItems} />
      {children}
    </aside>
  );
}
