import Image from 'next/image';

import { cn } from '@/lib/utils';

export interface PlaceholderImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export function PlaceholderImage({
  src,
  alt = 'Placeholder',
  width = 800,
  height = 450,
  className,
}: PlaceholderImageProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn('h-auto w-full rounded-lg object-cover', className)}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn('aspect-video w-full rounded-lg bg-muted', className)}
    />
  );
}
