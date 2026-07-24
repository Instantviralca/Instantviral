/**
 * Shared helpers for marketing email subscribers.
 */

import { randomBytes } from 'node:crypto';

import type { EmailSubscriberRecord } from '@/lib/persistence/types';

export function normalizeSubscriberEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function createUnsubscribeToken(): string {
  return randomBytes(24).toString('base64url');
}

export function createSubscriberId(): string {
  return `sub_${Date.now().toString(36)}_${randomBytes(4).toString('hex')}`;
}

export function createCampaignId(): string {
  return `cmp_${Date.now().toString(36)}_${randomBytes(3).toString('hex')}`;
}

export function isActivelyOptedIn(subscriber: EmailSubscriberRecord): boolean {
  return subscriber.marketingOptIn && !subscriber.unsubscribedAt;
}

export function missingEmailSubscribersTable(message: string): boolean {
  return /relation|does not exist|email_subscribers|email_campaigns/i.test(message);
}
