import Link from 'next/link';
import { Lock, RefreshCw, ShieldCheck } from 'lucide-react';

import { routes } from '@/config/routes';
import { cn } from '@/lib/utils';

export type PaymentConfidenceProps = {
  className?: string;
  /** When true, include a refund policy link. */
  showRefundLink?: boolean;
};

/**
 * Concise payment reassurance for cart, checkout, and order dialogs.
 * Uses existing brand tokens — no invented guarantees beyond published policy.
 */
export function PaymentConfidence({
  className,
  showRefundLink = true,
}: PaymentConfidenceProps) {
  return (
    <ul
      className={cn(
        'flex flex-col gap-2 text-xs font-medium text-[var(--text-secondary)]',
        className,
      )}
      aria-label="Payment reassurance"
    >
      <li className="inline-flex items-center gap-2">
        <ShieldCheck className="size-3.5 shrink-0 text-[var(--brand-primary)]" aria-hidden />
        <span>Secure checkout · Encrypted payment</span>
      </li>
      <li className="inline-flex items-center gap-2">
        <Lock className="size-3.5 shrink-0 text-[var(--brand-primary)]" aria-hidden />
        <span>No password required</span>
      </li>
      <li className="inline-flex items-center gap-2">
        <RefreshCw className="size-3.5 shrink-0 text-[var(--brand-primary)]" aria-hidden />
        {showRefundLink ? (
          <span>
            30-Day Money-Back Guarantee ·{' '}
            <Link
              href={routes.refundPolicy}
              className="underline underline-offset-2 hover:text-[var(--text-primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              Refund Policy
            </Link>
          </span>
        ) : (
          <span>30-Day Money-Back Guarantee</span>
        )}
      </li>
    </ul>
  );
}
