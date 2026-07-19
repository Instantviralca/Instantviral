import { ArticleContentBlockView } from '@/components/learn/article/ArticleContentBlock';
import type { ArticleContentBlock } from '@/types/learn-article-blocks';

type ArticleContentProps = {
  blocks: ArticleContentBlock[];
};

/**
 * Main article body renderer — Document 15.02.
 * Server-rendered from typed blocks only.
 */
export function ArticleContent({ blocks }: ArticleContentProps) {
  if (blocks.length === 0) return null;

  return (
    <div className="space-y-6">
      {blocks.map((block) => (
        <ArticleContentBlockView key={block.id} block={block} />
      ))}
    </div>
  );
}
