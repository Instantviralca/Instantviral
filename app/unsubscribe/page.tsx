import { Suspense } from 'react';
import type { Metadata } from 'next';

import { UnsubscribeClient } from '@/components/email/unsubscribe-client';
import { StatusPageShell } from '@/components/feedback/status-page-shell';
import { MutedText } from '@/components/typography/muted-text';
import { noIndexMetadata } from '@/seo/metadata';

export const metadata: Metadata = noIndexMetadata('Unsubscribe', '/unsubscribe');

export default function UnsubscribePage() {
  return (
    <Suspense
      fallback={
        <StatusPageShell>
          <MutedText>Loading…</MutedText>
        </StatusPageShell>
      }
    >
      <UnsubscribeClient />
    </Suspense>
  );
}
