import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { resolvePackagesIcon } from '@/components/marketing/packages/packages-icons';
import type { PackagesIconKey } from '@/data/content/packages-page-config';
import { cn } from '@/lib/utils';

type TipItem = {
  id: string;
  title: string;
  description: string;
  icon: PackagesIconKey;
};

type PackagesTipsProps = {
  id?: string;
  className?: string;
  title: string;
  description?: string;
  items: readonly TipItem[];
};

/** Short helpful tips — ecommerce support, not SEO article. */
export function PackagesTips({
  id = 'helpful-tips',
  className,
  title,
  description,
  items,
}: PackagesTipsProps) {
  if (items.length === 0) return null;

  return (
    <Section id={id} spacing="lg" className={cn(className)} aria-labelledby={`${id}-heading`}>
      <Container size="xl">
        <FadeUp className="mb-8 max-w-2xl space-y-2">
          <Heading as="h2" size="h2" id={`${id}-heading`}>
            {title}
          </Heading>
          {description ? <MutedText>{description}</MutedText> : null}
        </FadeUp>

        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {items.map((item, index) => {
            const Icon = resolvePackagesIcon(item.icon);
            return (
              <li key={item.id}>
                <FadeUp delay={0.03 * index}>
                  <article className="flex h-full gap-3 rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_12px_28px_-22px_rgba(28,25,23,0.26)] sm:p-5">
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[linear-gradient(145deg,var(--brand-accent-soft)_0%,#ffd7b8_100%)] text-[var(--brand-primary)]">
                      <Icon className="size-5" aria-hidden />
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</h3>
                      <p className="mt-1 text-sm leading-snug text-[var(--text-secondary)]">
                        {item.description}
                      </p>
                    </div>
                  </article>
                </FadeUp>
              </li>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}
