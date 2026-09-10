'use client';

import {
  StatusPageShell,
} from '@/components/feedback/status-page-shell';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { Button } from '@/components/ui/button';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/** Next/React sometimes surfaces raw browser Events as errors → "[object Event]". */
function formatErrorMessage(error: unknown): string | null {
  if (!error) return null;
  if (error instanceof Error && error.message && error.message !== '[object Event]') {
    return error.message;
  }
  if (typeof Event !== 'undefined' && error instanceof Event) {
    const target = error.target;
    if (target instanceof HTMLScriptElement && target.src) {
      return `Failed to load script: ${target.src}`;
    }
    if (target instanceof HTMLLinkElement && target.href) {
      return `Failed to load stylesheet: ${target.href}`;
    }
    if (target instanceof HTMLImageElement && target.src) {
      return `Failed to load image: ${target.src}`;
    }
    return `Browser ${error.type || 'error'} event (resource load or runtime)`;
  }
  if (typeof error === 'object' && error !== null && 'message' in error) {
    const message = (error as { message?: unknown }).message;
    if (typeof message === 'string' && message && message !== '[object Event]') {
      return message;
    }
  }
  return null;
}

export default function GlobalError({ error, reset }: ErrorProps) {
  const isDev = process.env.NODE_ENV === 'development';
  const detail = isDev ? formatErrorMessage(error) : null;

  return (
    <StatusPageShell>
      <p className="text-sm font-medium text-[var(--brand)]">Error</p>
      <Heading as="h1" size="h2" className="mt-2">
        Something went wrong
      </Heading>
      <MutedText className="mt-3 max-w-lg text-base">
        {detail ?? 'An unexpected error occurred. Please try again.'}
      </MutedText>
      {error.digest ? (
        <p className="mt-2 text-xs text-muted-foreground">Reference: {error.digest}</p>
      ) : null}
      <Button type="button" className="mt-8 min-h-11 w-fit" onClick={reset}>
        Try again
      </Button>
    </StatusPageShell>
  );
}
