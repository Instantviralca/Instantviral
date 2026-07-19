import Link from 'next/link';

import { cn } from '@/lib/utils';
import type { AuthorSocialLinks } from '@/types/author';

type AuthorSocialLinksProps = {
  links?: AuthorSocialLinks;
  website?: string;
  className?: string;
};

const LABEL_MAP: Record<string, string> = {
  website: 'Website',
  twitter: 'X (Twitter)',
  linkedin: 'LinkedIn',
  facebook: 'Facebook',
  instagram: 'Instagram',
  youtube: 'YouTube',
  github: 'GitHub',
};

/**
 * Author social links — Document 15.03.
 * Renders nothing when no links are configured (no fabricated profiles).
 */
export function AuthorSocialLinks({
  links,
  website,
  className,
}: AuthorSocialLinksProps) {
  const entries: { key: string; href: string; label: string }[] = [];

  if (website) {
    entries.push({ key: 'website', href: website, label: LABEL_MAP.website });
  }

  if (links) {
    for (const [key, href] of Object.entries(links)) {
      if (!href) continue;
      entries.push({
        key,
        href,
        label: LABEL_MAP[key] ?? key,
      });
    }
  }

  if (entries.length === 0) {
    return null;
  }

  return (
    <nav aria-label="Author social profiles" className={cn(className)}>
      <ul className="flex flex-wrap gap-3">
        {entries.map((entry) => (
          <li key={entry.key}>
            <Link
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-900 underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
            >
              {entry.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
