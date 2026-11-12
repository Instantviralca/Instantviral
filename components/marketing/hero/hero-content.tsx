import { Stack } from '@/components/layout/stack';
import { DisplayHeading } from '@/components/typography/display';
import { Eyebrow } from '@/components/typography/eyebrow';
import { Lead } from '@/components/typography/lead';
import { cn } from '@/lib/utils';
import type { HeroContentProps } from '@/components/marketing/hero/types';

/**
 * Hero text column: eyebrow → H1 → supporting paragraph.
 * All strings via props from data/content/homepage.ts (no entrance motion — LCP-safe).
 */
export function HeroContent({ eyebrow, title, description, className }: HeroContentProps) {
  return (
    <Stack gap="md" className={cn('min-w-0', className)}>
      {eyebrow ? (
        <Eyebrow className="max-w-full text-[var(--brand-primary)] text-pretty">{eyebrow}</Eyebrow>
      ) : null}
      <DisplayHeading
        as="h1"
        id="homepage-hero-heading"
        className="min-w-0 max-w-none w-full break-words !text-[clamp(1.875rem,1.05rem+3.4vw,3.5rem)] !leading-[1.02] !tracking-[-0.035em]"
      >
        {title}
      </DisplayHeading>
      <Lead className="max-w-2xl text-pretty text-[var(--text-secondary)] leading-snug md:leading-relaxed">
        {description}
      </Lead>
    </Stack>
  );
}
