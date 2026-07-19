import Image from 'next/image';
import type { ReactNode } from 'react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { cn } from '@/lib/utils';

type ImageTextSplitProps = {
  id?: string;
  title: string;
  description?: string;
  imageSrc?: string;
  imageAlt?: string;
  imageWidth?: number;
  imageHeight?: number;
  /** Optional React visual (e.g. illustration component) — replaces image when provided. */
  visual?: ReactNode;
  reverse?: boolean;
  className?: string;
  children?: React.ReactNode;
  unoptimized?: boolean;
};

/**
 * Layout variant: image left/copy right (or reversed).
 */
export function ImageTextSplit({
  id,
  title,
  description,
  imageSrc,
  imageAlt = '',
  imageWidth = 640,
  imageHeight = 480,
  visual,
  reverse = false,
  className,
  children,
  unoptimized,
}: ImageTextSplitProps) {
  return (
    <Section id={id} spacing="lg" className={cn(className)} aria-label={title}>
      <Container size="xl">
        <div
          className={cn(
            'grid items-center gap-12 lg:grid-cols-2 lg:gap-16',
            reverse && '[&>*:first-child]:lg:order-2',
          )}
        >
          <div
            className={cn(
              'relative',
              !visual &&
                'overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-md)]',
            )}
          >
            {visual ? (
              visual
            ) : imageSrc ? (
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={imageWidth}
                height={imageHeight}
                className="h-auto w-full"
                loading="lazy"
                unoptimized={unoptimized}
                sizes="(max-width: 1023px) 100vw, 45vw"
              />
            ) : null}
          </div>
          <div className="space-y-5">
            <Heading as="h2" size="h2">
              {title}
            </Heading>
            {description ? <MutedText className="max-w-xl text-base">{description}</MutedText> : null}
            {children}
          </div>
        </div>
      </Container>
    </Section>
  );
}
