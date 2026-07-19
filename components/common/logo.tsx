import Image from 'next/image';
import Link from 'next/link';

import { site } from '@/config/site';
import { cn } from '@/lib/utils';

/** Primary brand mark used in the site header. */
export const SITE_LOGO_SRC = '/assets/logos/logo.png' as const;

export interface LogoProps {
  src?: string;
  href?: string;
  className?: string;
  alt?: string;
}

export function Logo({
  src = SITE_LOGO_SRC,
  href = '/',
  className,
  alt = site.name,
}: LogoProps) {
  return (
    <Link
      href={href}
      className={cn('inline-flex shrink-0 items-center', className)}
      aria-label={site.name}
    >
      <Image
        src={src}
        alt={alt}
        width={162}
        height={40}
        className="h-8 w-auto sm:h-9"
      />
    </Link>
  );
}
