import Link from 'next/link';

import { AuthorAvatar } from '@/components/authors/AuthorAvatar';
import { AuthorBio } from '@/components/authors/AuthorBio';
import { AuthorSocialLinks } from '@/components/authors/AuthorSocialLinks';
import { cn } from '@/lib/utils';
import type { PublicAuthor } from '@/types/author';

type AuthorCardProps = {
  author: PublicAuthor;
  className?: string;
  showBio?: boolean;
  showSocial?: boolean;
};

/**
 * Compact author card — Document 15.03.
 * Links to the author profile via registry path (never hardcoded).
 */
export function AuthorCard({
  author,
  className,
  showBio = true,
  showSocial = false,
}: AuthorCardProps) {
  return (
    <article
      className={cn(
        'flex gap-4 border border-neutral-200 bg-white p-4',
        className,
      )}
      data-author-id={author.id}
    >
      <AuthorAvatar author={author} size="md" />
      <div className="min-w-0 flex-1">
        <h3 className="text-lg font-semibold text-neutral-900">
          <Link
            href={author.profilePath}
            className="rounded-sm outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            {author.name}
          </Link>
        </h3>
        <p className="text-sm text-neutral-600">{author.role}</p>
        {showBio ? <AuthorBio author={author} className="mt-2 text-sm" /> : null}
        {showSocial ? (
          <AuthorSocialLinks
            links={author.socialLinks}
            website={author.website}
            className="mt-3"
          />
        ) : null}
        {author.articleCount > 0 ? (
          <p className="mt-2 text-xs text-neutral-500">
            {author.articleCount} published{' '}
            {author.articleCount === 1 ? 'article' : 'articles'}
          </p>
        ) : null}
      </div>
    </article>
  );
}
