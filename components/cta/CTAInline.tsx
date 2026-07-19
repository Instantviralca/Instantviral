'use client';

import { CTAButtonGroup } from '@/components/cta/CTAButtonGroup';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { cn } from '@/lib/utils';
import type { PublicCta } from '@/types/cta';

export type CTAInlineProps = {
  primary: PublicCta;
  secondary?: PublicCta;
  showDescription?: boolean;
  surface?: string;
  serviceSlug?: string;
  className?: string;
};

/**
 * Compact inline CTA for mid-content placements.
 */
export function CTAInline({
  primary,
  secondary,
  showDescription = true,
  surface = 'inline',
  serviceSlug,
  className,
}: CTAInlineProps) {
  return (
    <div
      className={cn(
        'flex flex-col gap-4 rounded-lg border border-border bg-muted/20 p-4 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <div className="min-w-0 space-y-1">
        <Text className="font-medium text-foreground">{primary.title}</Text>
        {showDescription && primary.description ? (
          <MutedText className="text-sm">{primary.description}</MutedText>
        ) : null}
      </div>
      <CTAButtonGroup
        primary={primary}
        secondary={secondary}
        surface={surface}
        serviceSlug={serviceSlug}
        className="sm:w-auto"
      />
    </div>
  );
}
