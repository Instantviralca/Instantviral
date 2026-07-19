import { TagList } from '@/components/learn/taxonomy/TagList';
import { Heading } from '@/components/typography/heading';
import { cn } from '@/lib/utils';
import type { PublicLearnTag } from '@/types/learn';

type PopularTagsProps = {
  tags: PublicLearnTag[];
  title?: string;
  className?: string;
};

/**
 * Popular tags cluster — Document 15.04.
 */
export function PopularTags({
  tags,
  title = 'Popular tags',
  className,
}: PopularTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className={cn(className)}>
      <Heading as="h2" className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
        {title}
      </Heading>
      <TagList tags={tags} className="mt-3" label={title} />
    </div>
  );
}
