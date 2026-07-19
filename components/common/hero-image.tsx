import Image, { type ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

export type HeroImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
};

export function HeroImage({ className, alt, ...props }: HeroImageProps) {
  return (
    <Image
      alt={alt}
      className={cn('h-auto w-full object-cover', className)}
      sizes="100vw"
      priority
      {...props}
    />
  );
}
