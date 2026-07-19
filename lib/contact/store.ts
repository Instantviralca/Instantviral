/**
 * Contact message store facade — durable persistence via resolver.
 */

import type { ContactFormValues } from '@/lib/contact/validation';
import { getPersistence } from '@/lib/persistence';
import type { ContactMessageRecord } from '@/lib/persistence/types';

export type ContactMessage = ContactMessageRecord;

export async function saveContactMessage(
  values: ContactFormValues,
  meta?: { userAgent?: string },
): Promise<ContactMessage> {
  return getPersistence().saveContactMessage(values, meta);
}

export async function listContactMessages(): Promise<ContactMessage[]> {
  return getPersistence().listContactMessages();
}
