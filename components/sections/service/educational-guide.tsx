import Link from 'next/link';
import type { ReactNode } from 'react';
import {
  Award,
  BarChart3,
  Building2,
  CalendarDays,
  Clapperboard,
  Compass,
  Eye,
  Handshake,
  Hash,
  Heart,
  Layers,
  MessageCircle,
  Quote,
  Sparkles,
  Store,
  TrendingUp,
  TriangleAlert,
  UserRound,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

import { EducationalGuideIllustration } from '@/components/illustrations/educational-guide-illustration';
import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import type {
  EducationalGuideBlock,
  EducationalGuideContent,
} from '@/data/content/instagram-educational-guides';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, LucideIcon> = {
  shield: Award,
  award: Award,
  trending: TrendingUp,
  building: Building2,
  heart: Heart,
  eye: Eye,
  spark: Sparkles,
  zap: Zap,
  compass: Compass,
  clapper: Clapperboard,
  store: Store,
  layers: Layers,
  message: MessageCircle,
  handshake: Handshake,
  users: Users,
  quote: Quote,
  calendar: CalendarDays,
  hash: Hash,
  chart: BarChart3,
};

function checklistIconFor(item: string): LucideIcon {
  const t = item.toLowerCase();
  if (t.includes('consistently') || t.includes('post')) return CalendarDays;
  if (t.includes('profile')) return UserRound;
  if (t.includes('hashtag')) return Hash;
  if (t.includes('video') || t.includes('short-form')) return Clapperboard;
  if (t.includes('comment')) return MessageCircle;
  if (t.includes('analytics')) return BarChart3;
  return Sparkles;
}


type ServiceEducationalGuideProps = {
  guide: EducationalGuideContent;
  className?: string;
};

/** Render prose with safe internal markdown links: [label](/path). */
function RichText({ text, className }: { text: string; className?: string }) {
  const parts: ReactNode[] = [];
  const linkRe = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = linkRe.exec(text)) !== null) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index));
    const href = match[2];
    if (href.startsWith('/') && !href.startsWith('//')) {
      parts.push(
        <Link
          key={`edu-link-${key++}`}
          href={href}
          className="font-medium text-[var(--brand-primary)] underline-offset-2 hover:underline"
        >
          {match[1]}
        </Link>,
      );
    } else {
      parts.push(match[1]);
    }
    lastIndex = match.index + match[0].length;
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex));

  return <p className={cn('text-[0.975rem] leading-relaxed text-[var(--text-secondary)]', className)}>{parts}</p>;
}

function BlockHeading({
  as = 'h2',
  id,
  children,
}: {
  as?: 'h2' | 'h3';
  id?: string;
  children: ReactNode;
}) {
  return (
    <Heading as={as} size={as === 'h2' ? 'h3' : 'h4'} id={id} className="tracking-tight">
      {children}
    </Heading>
  );
}

function renderBlock(block: EducationalGuideBlock, index: number) {
  switch (block.type) {
    case 'intro':
      return (
        <FadeUp key={`intro-${index}`} className="mx-auto max-w-3xl space-y-4 text-center">
          {block.paragraphs.map((p) => (
            <RichText key={p.slice(0, 32)} text={p} className="text-base sm:text-[1.05rem]" />
          ))}
        </FadeUp>
      );
    case 'split':
      return (
        <FadeUp key={block.id} delay={0.04}>
          <div
            className={cn(
              'grid items-center gap-8 sm:gap-10',
              block.illustration ? 'lg:grid-cols-2 lg:gap-12' : 'max-w-3xl',
              block.reverse && block.illustration && '[&>*:first-child]:lg:order-2',
            )}
          >
            {block.illustration ? (
              <EducationalGuideIllustration id={block.illustration} />
            ) : null}
            <div className="space-y-4 sm:space-y-5">
              <BlockHeading as="h3" id={block.id}>
                {block.heading}
              </BlockHeading>
              {block.paragraphs.map((p) => (
                <RichText key={p.slice(0, 28)} text={p} className="leading-relaxed" />
              ))}
              {block.bullets && block.bullets.length > 0 ? (
                <ul className="space-y-2.5 pt-1" role="list">
                  {block.bullets.map((item) => (
                    <li
                      key={item}
                      className="flex gap-2 text-sm leading-relaxed text-[var(--text-secondary)]"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </div>
        </FadeUp>
      );
    case 'prose':
      return (
        <FadeUp key={block.id} delay={0.04} className="mx-auto max-w-3xl space-y-4 py-1 sm:py-2">
          <BlockHeading as="h3" id={block.id}>
            {block.heading}
          </BlockHeading>
          {block.paragraphs.map((p) => (
            <RichText key={p.slice(0, 28)} text={p} />
          ))}
        </FadeUp>
      );
    case 'prose-split':
      return (
        <FadeUp key={block.id} delay={0.04}>
          <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-14">
            <div className="mx-auto w-full max-w-md lg:mx-0 lg:sticky lg:top-28">
              <EducationalGuideIllustration id={block.illustration} />
            </div>
            <div className="space-y-8 sm:space-y-9">
              {block.intro ? (
                <RichText text={block.intro} className="text-base sm:text-[1.05rem]" />
              ) : null}
              {block.sections.map((section) => (
                <div key={section.id} className="space-y-3" id={section.id}>
                  <BlockHeading as="h3">{section.heading}</BlockHeading>
                  {section.paragraphs.map((p) => (
                    <RichText key={p.slice(0, 28)} text={p} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </FadeUp>
      );
    case 'callout':
      return (
        <FadeUp key={block.id}>
          <aside className="rounded-2xl border border-[color-mix(in_srgb,var(--brand-primary)_28%,var(--border-subtle))] bg-[linear-gradient(135deg,#fffdfb_0%,#fff7ed_55%,#ffffff_100%)] p-5 shadow-[0_14px_32px_-24px_rgba(249,115,22,0.35)] sm:p-7">
            <p className="text-sm font-bold tracking-tight text-[var(--brand-primary)] uppercase">
              Key insight
            </p>
            <Heading as="h3" size="h4" className="mt-2">
              {block.title}
            </Heading>
            <div className="mt-3">
              <RichText text={block.body} />
            </div>
          </aside>
        </FadeUp>
      );
    case 'cards':
      return (
        <FadeUp key={block.id} className="space-y-5 sm:space-y-6">
          <BlockHeading as="h2" id={block.id}>
            {block.heading}
          </BlockHeading>
          {block.intro ? (
            <MutedText className="max-w-2xl leading-relaxed">{block.intro}</MutedText>
          ) : null}
          <div
            className={cn(
              'grid auto-rows-fr gap-5 sm:grid-cols-2 lg:gap-6',
              block.items.length >= 6 ? 'lg:grid-cols-3' : 'lg:grid-cols-4',
            )}
          >
            {block.items.map((item) => {
              const Icon = ICON_MAP[item.icon] ?? Sparkles;
              return (
                <div
                  key={item.id}
                  className="flex h-full min-h-[13rem] flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_12px_28px_-22px_rgba(28,25,23,0.26)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_20px_40px_-24px_rgba(28,25,23,0.34)] motion-reduce:hover:translate-y-0"
                >
                  <span className="mb-4 flex size-12 items-center justify-center rounded-xl bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                    <Icon className="size-6" aria-hidden />
                  </span>
                  <Heading as="h3" size="h4" className="text-base tracking-tight">
                    {item.title}
                  </Heading>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </FadeUp>
      );
    case 'comparison':
      return (
        <FadeUp key={block.id} className="space-y-6">
          <BlockHeading as="h2" id={block.id}>
            {block.heading}
          </BlockHeading>
          {block.intro ? <MutedText className="max-w-2xl">{block.intro}</MutedText> : null}
          <div className="grid gap-4 md:grid-cols-2">
            {[block.left, block.right].map((col, colIndex) => (
              <div
                key={col.title}
                className={cn(
                  'rounded-2xl border p-5 sm:p-6',
                  colIndex === 0
                    ? 'border-[color-mix(in_srgb,var(--brand-primary)_30%,var(--border-subtle))] bg-[color-mix(in_srgb,var(--brand-accent-soft)_55%,white)]'
                    : 'border-[var(--border-subtle)] bg-white',
                )}
              >
                <h3 className="text-base font-bold tracking-tight text-[var(--text-primary)]">
                  {col.title}
                </h3>
                <ul className="mt-4 space-y-2.5" role="list">
                  {col.points.map((point) => (
                    <li key={point} className="flex gap-2 text-sm text-[var(--text-secondary)]">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-[var(--brand-primary)]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </FadeUp>
      );
    case 'stats':
      return (
        <FadeUp key={block.id} className="space-y-6">
          <BlockHeading as="h2" id={block.id}>
            {block.heading}
          </BlockHeading>
          <div className="grid gap-4 sm:grid-cols-3">
            {block.items.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl border border-[var(--border-subtle)] bg-white p-5 text-center shadow-[0_12px_28px_-22px_rgba(28,25,23,0.26)]"
              >
                <p className="text-xs font-bold tracking-wide text-[var(--brand-primary)] uppercase">
                  {item.value}
                </p>
                <p className="mt-2 text-lg font-bold tracking-tight text-[var(--text-primary)]">
                  {item.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      );
    case 'tips-grid':
      return (
        <FadeUp key={block.id} className="space-y-5 sm:space-y-6">
          <BlockHeading as="h2" id={block.id}>
            {block.heading}
          </BlockHeading>
          {block.intro ? (
            <MutedText className="max-w-2xl leading-relaxed">{block.intro}</MutedText>
          ) : null}
          {block.illustration ? (
            <div className="mx-auto w-full max-w-md lg:mx-0">
              <EducationalGuideIllustration id={block.illustration} />
            </div>
          ) : null}
          <div className="grid auto-rows-fr gap-3 sm:grid-cols-2 sm:gap-4">
            {block.items.map((item, tipIndex) => {
              const TipIcon = item.icon ? ICON_MAP[item.icon] ?? Sparkles : null;
              return (
                <div
                  key={item.id}
                  className="flex h-full min-h-[6.5rem] gap-3 rounded-xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_10px_24px_-20px_rgba(28,25,23,0.28)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-22px_rgba(28,25,23,0.32)] motion-reduce:hover:translate-y-0 sm:min-h-[7rem]"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                    {TipIcon ? (
                      <TipIcon className="size-4" aria-hidden />
                    ) : (
                      <span className="text-sm font-bold">{tipIndex + 1}</span>
                    )}
                  </span>
                  <div className="min-w-0 flex-1">
                    <Heading as="h3" size="h4" className="text-sm">
                      {item.title}
                    </Heading>
                    <p className="mt-1.5 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>
      );
    case 'mistakes':
      return (
        <FadeUp key={block.id} className="space-y-5 sm:space-y-6">
          <BlockHeading as="h2" id={block.id}>
            {block.heading}
          </BlockHeading>
          <div className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
            {block.items.map((item) => (
              <div
                key={item.id}
                className="flex h-full min-h-[12rem] flex-col rounded-2xl border border-stone-200/90 bg-[linear-gradient(180deg,#fafaf9_0%,#ffffff_55%)] p-5 shadow-[0_12px_28px_-22px_rgba(28,25,23,0.22)]"
              >
                <span
                  className="mb-4 flex size-11 items-center justify-center rounded-xl border border-red-100 bg-red-50 text-[#DC2626]"
                  aria-hidden
                >
                  <TriangleAlert className="size-5" />
                </span>
                <span className="mb-3 h-0.5 w-8 rounded-full bg-[#FF0000]/70" aria-hidden />
                <Heading as="h3" size="h4" className="text-base tracking-tight">
                  {item.title}
                </Heading>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </FadeUp>
      );
    case 'conversation':
      return (
        <FadeUp key={block.id} className="space-y-6">
          <BlockHeading as="h2" id={block.id}>
            {block.heading}
          </BlockHeading>
          {block.intro ? <MutedText className="max-w-2xl">{block.intro}</MutedText> : null}
          <div className="mx-auto max-w-xl space-y-3 rounded-2xl border border-[var(--border-subtle)] bg-[linear-gradient(180deg,#fffdfb_0%,#ffffff_55%,#faf6f1_100%)] p-5 shadow-[0_16px_36px_-24px_rgba(28,25,23,0.3)] sm:p-6">
            {block.items.map((item, i) => {
              const isBrand = i % 2 === 1;
              return (
                <div
                  key={item.id}
                  className={cn(
                    'rounded-2xl border px-3.5 py-2.5 shadow-sm',
                    isBrand
                      ? 'ml-auto max-w-[90%] border-white bg-[var(--brand-accent-soft)]'
                      : 'max-w-[90%] border-stone-100 bg-white',
                    i === 0 && 'ring-1 ring-[var(--brand-primary)]/18',
                  )}
                >
                  {i === 0 ? (
                    <p className="mb-1 text-[9px] font-bold tracking-wide text-[var(--brand-primary)] uppercase">
                      📌 Pinned comment
                    </p>
                  ) : null}
                  <p className="inline-flex items-center gap-1.5 text-[10px] font-bold text-stone-500">
                    @{item.name}
                    {isBrand ? (
                      <>
                        <span className="inline-flex size-3.5 items-center justify-center rounded-full bg-sky-500 text-[8px] text-white">
                          ✓
                        </span>
                        <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[8px] font-bold text-[var(--brand-primary)]">
                          Brand reply
                        </span>
                      </>
                    ) : null}
                  </p>
                  <p className="mt-0.5 text-sm text-stone-800">{item.text}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-1.5">
                    <span className="rounded-full bg-stone-50 px-1.5 py-0.5 text-[10px] font-semibold text-stone-600">
                      ❤️ {8 + i * 2}
                    </span>
                    <span className="text-[11px]">{i === 0 ? '👏' : i === 1 ? '❤️' : '🔥'}</span>
                    <span className="ml-auto rounded-full border border-stone-200 bg-white px-2 py-0.5 text-[9px] font-bold text-stone-600">
                      Reply
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </FadeUp>
      );
    case 'checklist':
      return (
        <FadeUp key={block.id} className="space-y-6 sm:space-y-7">
          <BlockHeading as="h2" id={block.id}>
            {block.heading}
          </BlockHeading>
          {block.intro ? <MutedText className="max-w-2xl">{block.intro}</MutedText> : null}
          <ul className="grid gap-3.5 sm:grid-cols-2 sm:gap-4" role="list">
            {block.items.map((item) => {
              const Icon = checklistIconFor(item);
              return (
                <li
                  key={item}
                  className="flex min-h-[3.5rem] gap-3 rounded-xl border border-[var(--border-subtle)] bg-white px-4 py-3.5 shadow-[0_10px_24px_-20px_rgba(28,25,23,0.28)] transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[0_16px_32px_-20px_rgba(28,25,23,0.32)] motion-reduce:hover:translate-y-0"
                >
                  <span className="mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-lg bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="self-center text-sm font-medium leading-relaxed text-[var(--text-secondary)]">
                    {item}
                  </span>
                </li>
              );
            })}
          </ul>
        </FadeUp>
      );
    case 'timeline':
      return (
        <FadeUp key={block.id} className="space-y-6">
          <BlockHeading as="h2" id={block.id}>
            {block.heading}
          </BlockHeading>
          <ol className="grid gap-4 md:grid-cols-3">
            {block.steps.map((step, stepIndex) => (
              <li
                key={step.id}
                className="relative flex h-full flex-col rounded-2xl border border-[var(--border-subtle)] bg-white p-5 shadow-[0_12px_28px_-22px_rgba(28,25,23,0.26)]"
              >
                <span className="mb-4 flex size-10 items-center justify-center rounded-xl bg-[linear-gradient(145deg,var(--brand-primary),#ea580c)] text-sm font-bold text-white">
                  {stepIndex + 1}
                </span>
                <h3 className="text-base font-semibold text-[var(--text-primary)]">{step.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-[var(--text-secondary)]">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </FadeUp>
      );
    case 'links':
      return (
        <FadeUp key={block.id} className="space-y-4">
          <BlockHeading as="h3" id={block.id}>
            {block.heading}
          </BlockHeading>
          {block.intro ? <MutedText className="max-w-2xl">{block.intro}</MutedText> : null}
          <ul className="flex flex-wrap gap-2.5" role="list">
            {block.links.map((link) => (
              <li key={link.href + link.label}>
                <Link
                  href={link.href}
                  className="inline-flex min-h-10 items-center rounded-full border border-[var(--border-subtle)] bg-white px-4 text-sm font-semibold text-[var(--text-primary)] transition-[border-color,background-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[color-mix(in_srgb,var(--brand-primary)_35%,var(--border-subtle))] hover:bg-[var(--brand-accent-soft)] hover:text-[var(--brand-primary)] motion-reduce:hover:translate-y-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </FadeUp>
      );
    default:
      return null;
  }
}

/**
 * Premium educational growth guide — topical authority without keyword stuffing.
 * Place after reviews, before FAQ / related services.
 */
export function ServiceEducationalGuide({ guide, className }: ServiceEducationalGuideProps) {
  return (
    <Section
      id={guide.id}
      spacing="lg"
      className={cn('bg-hero-wash', className)}
      aria-labelledby={`${guide.id}-heading`}
    >
      <Container size="xl">
        <FadeUp className="mx-auto mb-12 max-w-3xl space-y-4 text-center sm:mb-14 sm:space-y-5">
          <Heading as="h2" size="h2" id={`${guide.id}-heading`}>
            {guide.title}
          </Heading>
          {guide.description ? (
            <Text className="text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg sm:leading-relaxed">
              {guide.description}
            </Text>
          ) : null}
        </FadeUp>
        <div className="space-y-14 sm:space-y-[4.25rem]">
          {guide.blocks.map((block, index) => renderBlock(block, index))}
        </div>
      </Container>
    </Section>
  );
}
