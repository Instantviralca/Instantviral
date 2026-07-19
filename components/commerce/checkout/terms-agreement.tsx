'use client';

import Link from 'next/link';

import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { routes } from '@/config/routes';

type TermsAgreementProps = {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  error?: string;
  termsHref?: string;
  privacyHref?: string;
};

export function TermsAgreement({
  checked,
  onCheckedChange,
  error,
  termsHref = routes.termsAndConditions,
  privacyHref = routes.privacyPolicy,
}: TermsAgreementProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3">
        <Checkbox
          id="terms-agreement"
          checked={checked}
          onCheckedChange={(value) => onCheckedChange(Boolean(value))}
          aria-invalid={Boolean(error)}
        />
        <Label htmlFor="terms-agreement" className="leading-snug font-normal">
          I agree to the{' '}
          <Link href={termsHref} className="underline underline-offset-2" target="_blank">
            Terms of Service
          </Link>
          ,{' '}
          <Link href={privacyHref} className="underline underline-offset-2" target="_blank">
            Privacy Policy
          </Link>
          , and{' '}
          <Link
            href={routes.refundPolicy}
            className="underline underline-offset-2"
            target="_blank"
          >
            Refund Policy
          </Link>
          .
        </Label>
      </div>
      {error ? (
        <p className="text-xs text-destructive" role="alert">
          {error}
        </p>
      ) : null}
    </div>
  );
}
