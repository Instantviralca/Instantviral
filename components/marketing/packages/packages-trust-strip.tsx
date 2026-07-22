import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { FadeUp } from '@/components/motion/fade-up';
import { resolvePackagesIcon } from '@/components/marketing/packages/packages-icons';
import type { PackagesIconKey } from '@/data/content/packages-page-config';
import { cn } from '@/lib/utils';

export type PackagesTrustStripItem = {
  id: string;
  label: string;
  icon: PackagesIconKey;
};

type PackagesTrustStripProps = {
  id?: string;
  className?: string;
  items: readonly PackagesTrustStripItem[];
};

/** Compact four-item trust strip for package-selection pages. */
export function PackagesTrustStrip({
  id = 'package-trust',
  className,
  items,
}: PackagesTrustStripProps) {
  if (items.length === 0) return null;

  return (
    <Section id={id} spacing="md" className={cn(className)} aria-label="Order trust points">
      <Container size="xl">
        <FadeUp>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {items.map((item) => {
              const Icon = resolvePackagesIcon(item.icon);
              return (
                <li
                  key={item.id}
                  className="flex items-center gap-3 rounded-xl border border-[var(--border-subtle)] bg-white px-3.5 py-3.5 shadow-[0_10px_24px_-20px_rgba(28,25,23,0.28)] sm:px-4"
                >
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(145deg,var(--brand-primary)_0%,#ea580c_100%)] text-white shadow-[0_10px_20px_-12px_rgba(249,115,22,0.75)]">
                    <Icon className="size-4" aria-hidden />
                  </span>
                  <span className="text-sm font-semibold leading-snug text-[var(--text-primary)]">
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>
        </FadeUp>
      </Container>
    </Section>
  );
}
