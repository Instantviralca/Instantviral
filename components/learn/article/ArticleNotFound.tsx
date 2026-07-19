import Link from 'next/link';

import { routes } from '@/config/routes';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';

type ArticleNotFoundProps = {
  reason?: 'missing' | 'draft' | 'unpublished';
};

/**
 * Public article not-found / draft-protected state — Document 15.02.
 */
export function ArticleNotFound({ reason = 'missing' }: ArticleNotFoundProps) {
  const message =
    reason === 'draft' || reason === 'unpublished'
      ? 'This article is not available for public viewing.'
      : 'We could not find that Learn article.';

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 text-center">
      <Heading as="h1">Article not found</Heading>
      <MutedText className="mt-3">{message}</MutedText>
      <div className="mt-6 flex justify-center gap-3">
        <Button asChild>
          <Link href={routes.learn}>Back to Learn</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href={routes.home}>Home</Link>
        </Button>
      </div>
    </div>
  );
}
