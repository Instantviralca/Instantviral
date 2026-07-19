import Image, { type ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

export type ContentImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
};

export function ContentImage({ className, alt, ...props }: ContentImageProps) {
  return (
    <Image
      alt={alt}
      className={cn('h-auto w-full rounded-lg object-cover', className)}
      sizes="(max-width: 768px) 100vw, 50vw"
      {...props}
    />
  );
}
