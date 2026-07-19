import { AuthorAvatar } from '@/components/authors/AuthorAvatar';
import { AuthorBio } from '@/components/authors/AuthorBio';
import { AuthorSocialLinks } from '@/components/authors/AuthorSocialLinks';
import { Container } from '@/components/layout/container';
import { cn } from '@/lib/utils';
import type { PublicAuthor } from '@/types/author';

type AuthorHeroProps = {
  author: PublicAuthor;
  className?: string;
};

/**
 * Author page hero — Document 15.03.
 * Brand-forward profile header with optional cover (no invented credentials).
 */
export function AuthorHero({ author, className }: AuthorHeroProps) {
  return (
    <header
      className={cn('border-b border-neutral-200 bg-neutral-50', className)}
      data-author-hero
    >
      {author.coverImage ? (
        <div
          className="h-32 w-full bg-cover bg-center sm:h-40"
          style={{ backgroundImage: `url(${author.coverImage})` }}
          role="img"
          aria-label={`Cover image for ${author.name}`}
        />
      ) : (
        <div
          className="h-24 w-full bg-gradient-to-r from-neutral-100 via-neutral-50 to-neutral-200 sm:h-32"
          aria-hidden="true"
        />
      )}
      <Container className="relative -mt-10 pb-10 sm:-mt-12">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:gap-6">
          <AuthorAvatar
            author={author}
            size="lg"
            className="border-4 border-white shadow-sm"
          />
          <div className="min-w-0 flex-1 pb-1">
            <h1 className="text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
              {author.name}
            </h1>
            <p className="mt-1 text-base text-neutral-600">{author.role}</p>
          </div>
        </div>
        <AuthorBio author={author} className="mt-6 max-w-3xl" />
        {author.expertise.length > 0 ? (
          <ul className="mt-4 flex flex-wrap gap-2" aria-label="Areas of expertise">
            {author.expertise.map((item) => (
              <li
                key={item}
                className="border border-neutral-200 bg-white px-2.5 py-1 text-xs text-neutral-700"
              >
                {item}
              </li>
            ))}
          </ul>
        ) : null}
        <AuthorSocialLinks
          links={author.socialLinks}
          website={author.website}
          className="mt-5"
        />
      </Container>
    </header>
  );
}
