import Image from 'next/image';

import { cn } from '@/lib/utils';

type ExtensionImageProps = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
};

/** Lazy-loaded extension illustration with consistent frame styling. */
export function ExtensionImage({
  src,
  alt,
  width,
  height,
  className,
  sizes = '(max-width: 1024px) 100vw, 520px',
  priority = false,
}: ExtensionImageProps) {
  return (
    <div
      className={cn(
        'overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-sm)]',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        sizes={sizes}
        loading={priority ? undefined : 'lazy'}
        priority={priority}
        className="h-auto w-full object-cover object-center"
      />
    </div>
  );
}
