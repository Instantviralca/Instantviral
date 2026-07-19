import { TagBadge } from '@/components/learn/taxonomy/TagBadge';
import { cn } from '@/lib/utils';
import type { PublicLearnTag } from '@/types/learn';

type TagListProps = {
  tags: PublicLearnTag[];
  className?: string;
  label?: string;
  asLinks?: boolean;
};

/**
 * Tag list — Document 15.04.
 */
export function TagList({
  tags,
  className,
  label = 'Tags',
  asLinks = true,
}: TagListProps) {
  if (tags.length === 0) return null;

  return (
    <nav aria-label={label} className={cn(className)}>
      <ul className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <li key={tag.id}>
            <TagBadge tag={tag} asLink={asLinks} />
          </li>
        ))}
      </ul>
    </nav>
  );
}
