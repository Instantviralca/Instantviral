/**
 * Public admin auth configuration flag.
 * Never expose the password. Only whether login is available.
 */

import { getAdminPassword } from '@/lib/config/env';

export function isAdminAuthConfigured(): boolean {
  if (typeof process === 'undefined') return false;
  // Prefer explicit public flag; fall back to server-only password presence during SSR.
  if (process.env.NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED === 'true') return true;
  if (process.env.NEXT_PUBLIC_ADMIN_AUTH_CONFIGURED === 'false') return false;
  return Boolean(getAdminPassword());
}
