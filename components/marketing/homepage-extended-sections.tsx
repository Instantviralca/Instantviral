import Image from 'next/image';
import Link from 'next/link';
import {
  Building2,
  CheckCircle2,
  Headphones,
  HelpCircle,
  Home,
  MessageCircle,
  Package,
  ShoppingBag,
  Sparkles,
  Store,
  TrendingUp,
  UserRound,
  Users,
  UtensilsCrossed,
  type LucideIcon,
} from 'lucide-react';

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { Button } from '@/components/ui/button';
import { homepageEditorial } from '@/data/content/homepage-editorial';
import {
  homepageExtendedMedia,
  homepageExtendedSections,
} from '@/data/content/homepage-extended';
import { cn } from '@/lib/utils';

function SectionIllustration({
  mediaKey,
  className,
}: {
  mediaKey: keyof typeof homepageExtendedMedia;
  className?: string;
}) {
  const media = homepageExtendedMedia[mediaKey];
  return (
    <figure
      className={cn(
        'overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white shadow-[var(--shadow-sm)]',
        className,
      )}
    >
      <Image
        src={media.src}
        alt={media.alt}
        title={media.title}
        width={media.width}
        height={media.height}
        className="h-auto max-h-[11rem] w-full object-cover sm:max-h-[13rem] lg:max-h-[15rem]"
        sizes="(max-width: 1024px) 100vw, 50vw"
        loading="lazy"
      />
    </figure>
  );
}

const audienceIcons: Record<string, LucideIcon> = {
  'content-creators': Sparkles,
  influencers: Users,
  'small-businesses': Store,
  ecommerce: ShoppingBag,
  restaurants: UtensilsCrossed,
  'real-estate': Home,
  agencies: Building2,
  'personal-brands': UserRound,
};

const supportIcons: Record<string, LucideIcon> = {
  'help-package': Package,
  'help-ordering': HelpCircle,
  'help-tracking': TrendingUp,
  'help-general': Headphones,
};

/** Instagram by the Numbers — compact: heading, 4 cards, short copy, illustration */
export function HomepageByTheNumbersSection() {
  const content = homepageExtendedSections.byTheNumbers;

  return (
    <Section
      id={content.id}
      spacing="compact"
      aria-labelledby={`${content.id}-heading`}
    >
      <Container size="xl" className="space-y-5">
        <FadeUp className="mx-auto max-w-3xl space-y-2 text-center">
          <Heading as="h2" size="h2" id={`${content.id}-heading`}>
            {content.title}
          </Heading>
        </FadeUp>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.stats.map((stat, index) => (
            <FadeUp key={stat.id} delay={0.03 * index} className="h-full">
              <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[var(--shadow-sm)] sm:p-5">
                <p className="text-xs font-semibold tracking-[0.12em] text-[var(--brand-primary)] uppercase">
                  {stat.label}
                </p>
                <p className="mt-2 text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                  {stat.value}
                </p>
                <MutedText className="mt-2 text-sm">{stat.description}</MutedText>
              </article>
            </FadeUp>
          ))}
        </div>

        <div className="grid items-center gap-5 lg:grid-cols-2">
          <FadeUp>
            <Text className="leading-relaxed text-[var(--text-secondary)]">{content.whyBody}</Text>
          </FadeUp>
          <FadeUp delay={0.05}>
            <SectionIllustration mediaKey={content.mediaKey} />
          </FadeUp>
        </div>
      </Container>
    </Section>
  );
}

/** Who We Help — heading, audience cards, compact CTA */
export function HomepageWhoWeHelpSection() {
  const content = homepageExtendedSections.whoWeHelp;

  return (
    <Section
      id={content.id}
      spacing="compact"
      className="surface-muted"
      aria-labelledby={`${content.id}-heading`}
    >
      <Container size="xl" className="space-y-5">
        <FadeUp className="mx-auto max-w-3xl text-center">
          <Heading as="h2" size="h2" id={`${content.id}-heading`}>
            {content.title}
          </Heading>
        </FadeUp>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.audiences.map((audience, index) => {
            const Icon = audienceIcons[audience.id] ?? Users;
            return (
              <FadeUp key={audience.id} delay={0.02 * index} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[var(--shadow-sm)]">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <Heading as="h3" size="h4" className="mt-3">
                    {audience.title}
                  </Heading>
                  <MutedText className="mt-1.5 flex-1 text-sm">{audience.description}</MutedText>
                </article>
              </FadeUp>
            );
          })}
        </div>

        <FadeUp className="flex justify-center">
          <Button asChild variant="outline" className="min-h-11 rounded-xl">
            <Link href={content.cta.href}>
              {content.cta.label}
              <span aria-hidden className="ml-1">
                →
              </span>
            </Link>
          </Button>
        </FadeUp>
      </Container>
    </Section>
  );
}

/**
 * Single educational authority section — Buying Instagram Followers Responsibly.
 * Preserves SEO topics via accordion panels (no duplicated trust messaging).
 */
export function HomepageBuyingResponsiblySection() {
  const { canYouBuy, buyingChecklist, policySummary } = homepageEditorial;

  const panels = [
    {
      id: canYouBuy.id,
      title: canYouBuy.title,
      body: (
        <div className="space-y-3">
          {canYouBuy.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-sm leading-relaxed text-[var(--text-secondary)]"
            >
              {paragraph}
            </p>
          ))}
        </div>
      ),
    },
    {
      id: 'signs-transparent-provider',
      title: buyingChecklist.signsTitle,
      body: (
        <div className="space-y-3">
          {buyingChecklist.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-sm leading-relaxed text-[var(--text-secondary)]"
            >
              {paragraph}
            </p>
          ))}
          <ul className="grid gap-2 sm:grid-cols-2">
            {buyingChecklist.signs.map((sign) => (
              <li
                key={sign}
                className="flex items-start gap-2 text-sm text-[var(--text-secondary)]"
              >
                <CheckCircle2
                  className="mt-0.5 size-4 shrink-0 text-[var(--brand-primary)]"
                  aria-hidden
                />
                {sign}
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
            {buyingChecklist.brandNote}
          </p>
        </div>
      ),
    },
    {
      id: policySummary.id,
      title: 'What to Check Before Ordering',
      body: (
        <div className="space-y-3">
          {policySummary.body.map((paragraph) => (
            <p
              key={paragraph.slice(0, 40)}
              className="text-sm leading-relaxed text-[var(--text-secondary)]"
            >
              {paragraph}
            </p>
          ))}
          <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium">
            {policySummary.links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-[var(--brand-primary)] underline-offset-4 hover:underline"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
  ] as const;

  return (
    <Section
      id="buying-instagram-followers-responsibly"
      spacing="md"
      className="surface-muted"
      aria-labelledby="buying-instagram-followers-responsibly-heading"
    >
      <Container size="xl" className="space-y-6">
        <FadeUp className="mx-auto max-w-3xl space-y-3 text-center">
          <Heading as="h2" size="h2" id="buying-instagram-followers-responsibly-heading">
            Buying Instagram Followers Responsibly
          </Heading>
          <Text className="leading-relaxed text-[var(--text-secondary)]">
            Pre-purchase education only—how audience packages work, red flags to avoid, and what to
            verify before checkout.
          </Text>
        </FadeUp>

        <div className="mx-auto max-w-3xl space-y-3">
          {panels.map((panel, index) => (
            <FadeUp key={panel.id} delay={0.02 * index}>
              <details
                id={panel.id}
                className="group rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[var(--shadow-sm)] open:border-[color-mix(in_srgb,var(--brand-primary)_25%,var(--border-subtle))] sm:p-5"
                open={index === 0}
              >
                <summary className="cursor-pointer list-none text-sm font-semibold text-[var(--text-primary)] marker:content-none [&::-webkit-details-marker]:hidden sm:text-base">
                  <span className="flex items-start justify-between gap-3">
                    <span id={`${panel.id}-heading`}>{panel.title}</span>
                    <span
                      className="mt-0.5 text-[var(--brand-primary)] transition-transform group-open:rotate-45"
                      aria-hidden
                    >
                      +
                    </span>
                  </span>
                </summary>
                <div className="mt-4 border-t border-[var(--border-subtle)] pt-4">{panel.body}</div>
              </details>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}

/** Resource links — no duplicate service mini-cards, no large illustration */
export function HomepageLearnGrowthSection() {
  const content = homepageExtendedSections.learnMore;

  return (
    <Section
      id={content.id}
      spacing="compact"
      aria-labelledby={`${content.id}-heading`}
    >
      <Container size="xl" className="space-y-5">
        <FadeUp className="mx-auto max-w-3xl space-y-2 text-center">
          <Heading as="h2" size="h2" id={`${content.id}-heading`}>
            {content.title}
          </Heading>
          <Text className="leading-relaxed text-[var(--text-secondary)]">{content.intro}</Text>
        </FadeUp>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {content.cards.map((card, index) => (
            <FadeUp key={card.id} delay={0.02 * index} className="h-full">
              <Link
                href={card.href}
                className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[var(--shadow-sm)] transition-[border-color] hover:border-[color-mix(in_srgb,var(--brand-primary)_28%,var(--border-subtle))]"
              >
                <Heading as="h3" size="h4">
                  {card.title}
                </Heading>
                <MutedText className="mt-2 flex-1 text-sm">{card.description}</MutedText>
                <span className="mt-3 text-sm font-semibold text-[var(--brand-primary)]">
                  Read guide →
                </span>
              </Link>
            </FadeUp>
          ))}
        </div>
      </Container>
    </Section>
  );
}

export function HomepageNeedHelpSection() {
  const content = homepageExtendedSections.needHelp;

  return (
    <Section id={content.id} spacing="compact" aria-labelledby={`${content.id}-heading`}>
      <Container size="xl" className="space-y-5">
        <FadeUp className="mx-auto max-w-3xl space-y-3 text-center">
          <Heading as="h2" size="h2" id={`${content.id}-heading`}>
            {content.title}
          </Heading>
          <Text className="leading-relaxed text-[var(--text-secondary)]">{content.intro}</Text>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" className="min-h-11 rounded-xl">
              <Link href={content.primaryCta.href}>{content.primaryCta.label}</Link>
            </Button>
            <Button asChild variant="ghost" className="min-h-11 rounded-xl">
              <Link href={content.secondaryCta.href}>{content.secondaryCta.label}</Link>
            </Button>
          </div>
        </FadeUp>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {content.cards.map((card, index) => {
            const Icon = supportIcons[card.id] ?? MessageCircle;
            return (
              <FadeUp key={card.id} delay={0.02 * index} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[var(--shadow-sm)]">
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <Heading as="h3" size="h4" className="mt-3">
                    {card.title}
                  </Heading>
                  <MutedText className="mt-1.5 text-sm">{card.description}</MutedText>
                </article>
              </FadeUp>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
