import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import { AdminLayout } from '@/components/admin';
import { adminMetadata } from '@/seo/metadata';

export const metadata: Metadata = adminMetadata();

type AdminRootLayoutProps = {
  children: ReactNode;
};

/** Admin route group — Document 12.01. Auth enforced by middleware. Document 14.07: noindex. */
export default function AdminRootLayout({ children }: AdminRootLayoutProps) {
  return <AdminLayout>{children}</AdminLayout>;
}
