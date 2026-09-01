import Image from 'next/image';

import { cn } from '@/lib/utils';
import type { LearnFeaturedImage } from '@/types/learn';

type ArticleCardMediaProps = {
  image?: LearnFeaturedImage;
  title: string;
  className?: string;
};

/**
 * Card thumbnail for Learn article grids — Document 15.01.
 */
export function ArticleCardMedia({ image, title, className }: ArticleCardMediaProps) {
  if (!image?.src) return null;

  const alt = image.decorative ? '' : image.alt || title;

  return (
    <div
      className={cn(
        'relative aspect-[16/10] w-full overflow-hidden bg-neutral-100',
        className,
      )}
    >
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
        loading="lazy"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      />
    </div>
  );
}
