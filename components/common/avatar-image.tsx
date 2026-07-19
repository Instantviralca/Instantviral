import Image, { type ImageProps } from 'next/image';

import { cn } from '@/lib/utils';

export type AvatarImageProps = Omit<ImageProps, 'alt'> & {
  alt: string;
  size?: number;
};

export function AvatarImage({ className, alt, size = 40, ...props }: AvatarImageProps) {
  return (
    <Image
      alt={alt}
      width={size}
      height={size}
      className={cn('rounded-full object-cover', className)}
      {...props}
    />
  );
}
