import type { Metadata } from 'next';
import Link from 'next/link';

import { noIndexMetadata } from '@/seo/metadata';

export const metadata: Metadata = noIndexMetadata('Page not found', '/404');

export default function NotFound() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-medium text-neutral-900">Page not found</h1>
      <p className="mt-2 text-sm text-neutral-500">
        The page you requested could not be found.
      </p>
      <Link href="/" className="mt-4 inline-block text-sm text-neutral-900 underline">
        Go home
      </Link>
    </div>
  );
}
