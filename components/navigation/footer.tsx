import Link from 'next/link';
import { Lock } from 'lucide-react';
import type { ReactNode } from 'react';

import { Container } from '@/components/layout/container';
import { site } from '@/config/site';
import { getFooterColumns } from '@/data/footer';
import { cn } from '@/lib/utils';

const SOCIAL = [
  {
    id: 'instagram',
    label: 'Instagram',
    href: site.socialLinks.instagram,
    path: 'M12 2.2c3.2 0 3.6 0 4.9.1 1.2.1 1.9.3 2.3.4.6.2 1 .5 1.5 1 .4.4.7.9 1 1.5.2.4.4 1.1.4 2.3.1 1.3.1 1.7.1 4.9s0 3.6-.1 4.9c-.1 1.2-.3 1.9-.4 2.3-.2.6-.5 1-1 1.5-.4.4-.9.7-1.5 1-.4.2-1.1.4-2.3.4-1.3.1-1.7.1-4.9.1s-3.6 0-4.9-.1c-1.2-.1-1.9-.3-2.3-.4-.6-.2-1-.5-1.5-1-.4-.4-.7-.9-1-1.5-.2-.4-.4-1.1-.4-2.3C2.2 15.6 2.2 15.2 2.2 12s0-3.6.1-4.9c.1-1.2.3-1.9.4-2.3.2-.6.5-1 1-1.5.4-.4.9-.7 1.5-1 .4-.2 1.1-.4 2.3-.4C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.2 0-3.5 0-4.8.1-1.1 0-1.7.2-2.1.4-.5.2-.8.4-1.1.8-.3.3-.6.6-.8 1.1-.2.4-.3 1-.4 2.1-.1 1.2-.1 1.6-.1 4.8s0 3.5.1 4.8c0 1.1.2 1.7.4 2.1.2.5.4.8.8 1.1.3.3.6.6 1.1.8.4.2 1 .3 2.1.4 1.2.1 1.6.1 4.8.1s3.5 0 4.8-.1c1.1 0 1.7-.2 2.1-.4.5-.2.8-.4 1.1-.8.3-.3.6-.6.8-1.1.2-.4.3-1 .4-2.1.1-1.2.1-1.6.1-4.8s0-3.5-.1-4.8c0-1.1-.2-1.7-.4-2.1-.2-.5-.4-.8-.8-1.1-.3-.3-.6-.6-1.1-.8-.4-.2-1-.3-2.1-.4-1.3-.1-1.6-.1-4.8-.1zm0 3.2a4.8 4.8 0 1 1 0 9.6 4.8 4.8 0 0 1 0-9.6zm0 1.8a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.9-.9a1.1 1.1 0 1 1 0 2.2 1.1 1.1 0 0 1 0-2.2z',
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    href: site.socialLinks.tiktok,
    path: 'M19.6 7.4a6.7 6.7 0 0 1-3.9-2.4v8.3a5.5 5.5 0 1 1-4.7-5.4v2.7a2.8 2.8 0 1 0 2 2.7V2.2h2.6c.2 1.5.9 2.9 2 3.9a6.6 6.6 0 0 0 2 .8v2.5z',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    href: site.socialLinks.youtube,
    path: 'M21.6 7.2a2.7 2.7 0 0 0-1.9-1.9C18 4.8 12 4.8 12 4.8s-6 0-7.7.5A2.7 2.7 0 0 0 2.4 7.2 28 28 0 0 0 1.9 12a28 28 0 0 0 .5 4.8 2.7 2.7 0 0 0 1.9 1.9c1.7.5 7.7.5 7.7.5s6 0 7.7-.5a2.7 2.7 0 0 0 1.9-1.9 28 28 0 0 0 .5-4.8 28 28 0 0 0-.5-4.8zM10 15.2V8.8l5.2 3.2L10 15.2z',
  },
  {
    id: 'facebook',
    label: 'Facebook',
    href: site.socialLinks.facebook,
    path: 'M14 9.3h2.7V6H14c-2.2 0-4 1.8-4 4v1.6H7.5V14H10v8h3.3v-8H16l.7-2.4h-3.4V10c0-.4.3-.7.7-.7z',
  },
] as const;

function PaymentMark({ label, children }: { label: string; children: ReactNode }) {
  return (
    <span
      className="inline-flex h-8 min-w-[2.75rem] items-center justify-center rounded-md border border-[var(--border-subtle)] bg-white px-2 text-[10px] font-bold tracking-wide text-[var(--text-secondary)] shadow-[var(--shadow-xs)]"
      aria-label={label}
      title={label}
    >
      {children}
    </span>
  );
}

export function Footer({ className }: { className?: string }) {
  const columns = getFooterColumns();

  return (
    <footer
      className={cn('mt-auto border-t border-border bg-[var(--surface-muted)]/40', className)}
      role="contentinfo"
    >
      <Container className="py-12 sm:py-16">
        <nav aria-label="Footer">
          <ul className="grid list-none gap-10 p-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-8">
            {columns.map((column) => (
              <li key={column.id} className="min-w-0">
                <h2 className="text-sm font-semibold tracking-wide text-foreground">
                  {column.title}
                </h2>
                <ul className="mt-4 space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${column.id}-${link.href}`}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground transition-colors duration-150 hover:text-[var(--brand-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-12 flex flex-col gap-6 border-t border-border pt-8 lg:flex-row lg:items-center lg:justify-between">
          {SOCIAL.some((item) => {
            const href = item.href as string;
            return href.length > 0 && href !== '#' && /^https?:\/\//i.test(href);
          }) ? (
          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[var(--text-muted)] uppercase">
              Follow InstantViral
            </p>
            <ul className="flex flex-wrap gap-2.5">
              {SOCIAL.filter((item) => {
                const href = item.href as string;
                return href.length > 0 && href !== '#' && /^https?:\/\//i.test(href);
              }).map((item) => (
                <li key={item.id}>
                  <Link
                    href={item.href}
                    aria-label={item.label}
                    className="flex size-10 items-center justify-center rounded-full border border-[var(--border-subtle)] bg-white text-[var(--text-secondary)] shadow-[var(--shadow-xs)] transition-[transform,color,box-shadow] duration-200 hover:-translate-y-0.5 hover:text-[var(--brand-primary)] hover:shadow-[var(--shadow-sm)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring motion-reduce:hover:translate-y-0"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden>
                      <path d={item.path} />
                    </svg>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          ) : (
            <div />
          )}

          <div className="space-y-3">
            <p className="text-xs font-semibold tracking-wide text-[var(--text-muted)] uppercase">
              Secure checkout
            </p>
            <div className="flex flex-wrap items-center gap-2">
              <PaymentMark label="Visa">VISA</PaymentMark>
              <PaymentMark label="Mastercard">
                <span className="flex items-center gap-0.5">
                  <span className="size-2.5 rounded-full bg-[#EB001B]/90" />
                  <span className="size-2.5 -ml-1 rounded-full bg-[#F79E1B]/90" />
                </span>
              </PaymentMark>
              <PaymentMark label="Apple Pay">Apple Pay</PaymentMark>
              <PaymentMark label="Google Pay">G Pay</PaymentMark>
              <PaymentMark label="Stripe">Stripe</PaymentMark>
              <span className="inline-flex h-8 items-center gap-1.5 rounded-md border border-emerald-200 bg-emerald-50 px-2.5 text-[10px] font-bold tracking-wide text-emerald-700">
                <Lock className="size-3" aria-hidden />
                SSL Secure
              </span>
            </div>
          </div>
        </div>
      </Container>
      <div className="border-t border-border px-4 py-5 text-center">
        <p className="text-xs tracking-wide text-muted-foreground">
          © 2026 {site.name}. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
