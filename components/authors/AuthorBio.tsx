import { cn } from '@/lib/utils';
import type { PublicAuthor } from '@/types/author';

type AuthorBioProps = {
  author: Pick<PublicAuthor, 'bio' | 'name'>;
  className?: string;
  as?: 'p' | 'div';
};

/**
 * Author biography — Document 15.03.
 */
export function AuthorBio({ author, className, as: Tag = 'p' }: AuthorBioProps) {
  if (!author.bio.trim()) {
    return null;
  }

  return (
    <Tag
      className={cn('text-base leading-relaxed text-neutral-700', className)}
      data-author-bio
    >
      {author.bio}
    </Tag>
  );
}
