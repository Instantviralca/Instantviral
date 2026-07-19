import { Heading } from '@/components/typography/heading';
import { Text } from '@/components/typography/text';
import { cn } from '@/lib/utils';
import type { ContentBlock } from '@/types/components';

export type ContentBlocksProps = {
  blocks: ContentBlock[];
  className?: string;
};

/** Renders structured content blocks — no hardcoded article copy. */
export function ContentBlocks({ blocks, className }: ContentBlocksProps) {
  return (
    <div className={cn('space-y-6', className)}>
      {blocks.map((block) => {
        if (block.type === 'heading') {
          const level = block.level ?? 2;
          return (
            <Heading key={block.id} as={level === 3 ? 'h3' : 'h2'} size={level === 3 ? 'h3' : 'h2'}>
              {block.text}
            </Heading>
          );
        }

        if (block.type === 'list') {
          return (
            <ul key={block.id} className="list-disc space-y-2 pl-5 text-sm text-foreground">
              {block.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <Text key={block.id} className="text-muted-foreground">
            {block.text}
          </Text>
        );
      })}
    </div>
  );
}
