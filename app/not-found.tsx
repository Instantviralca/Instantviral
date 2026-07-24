import type { Metadata } from 'next';

import {
  StatusPageHomeButton,
  StatusPageShell,
} from '@/components/feedback/status-page-shell';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';
import { noIndexMetadata } from '@/seo/metadata';

export const metadata: Metadata = noIndexMetadata('Page not found', '/404');

export default function NotFound() {
  return (
    <StatusPageShell>
      <p className="text-sm font-medium text-[var(--brand)]">404</p>
      <Heading as="h1" size="h2" className="mt-2">
        Page not found
      </Heading>
      <MutedText className="mt-3 max-w-lg text-base">
        The page you requested does not exist or may have been moved. Check the
        URL, or head back to the homepage to continue.
      </MutedText>
      <StatusPageHomeButton />
    </StatusPageShell>
  );
}
