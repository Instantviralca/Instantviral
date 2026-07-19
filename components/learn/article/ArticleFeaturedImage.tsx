import Image from 'next/image';

import type { LearnFeaturedImage } from '@/types/learn';

type ArticleFeaturedImageProps = {
  image: LearnFeaturedImage;
  /** Priority only when this is the LCP image. */
  priority?: boolean;
};

/**
 * Featured article image — Document 15.02.
 * Prefers 1600×900 local assets via next/image. No external hotlinking.
 */
export function ArticleFeaturedImage({
  image,
  priority = true,
}: ArticleFeaturedImageProps) {
  const alt = image.decorative ? '' : image.alt;

  return (
    <figure className="overflow-hidden">
      <Image
        src={image.src}
        alt={alt}
        width={image.width}
        height={image.height}
        priority={priority}
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 780px"
      />
      {image.caption || image.credit ? (
        <figcaption className="mt-2 text-sm text-neutral-500">
          {image.caption}
          {image.credit ? (
            <span className="block text-xs">Credit: {image.credit}</span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
