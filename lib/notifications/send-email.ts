/**
 * Provider-neutral transactional email entry point.
 *
 * Callers (abandoned cart, orders, admin, marketing) should use sendEmail()
 * and never import Resend/SMTP adapters directly.
 *
 * Resolution order:
 * 1. SMTP_*  (Contabo / self-hosted — preferred long-term)
 * 2. RESEND_API_KEY (temporary Vercel compatibility)
 */

import {
  getEmailTransportKind,
  isEmailConfigured,
} from '@/lib/config/env';
import { resendEmailProvider } from '@/lib/notifications/providers/resend';
import { smtpEmailProvider } from '@/lib/notifications/providers/smtp';
import type { NotificationProvider } from '@/types/notification';

export type SendEmailInput = {
  to: string;
  subject: string;
  html: string;
  text: string;
};

export type SendEmailResult = {
  messageId: string;
  providerId: string;
};

/** Stub when no transport is configured. */
export const stubEmailProvider: NotificationProvider = {
  id: 'stub-email',
  channel: 'email',
  async send() {
    throw new Error(
      'Email provider disabled — set SMTP_* + EMAIL_FROM (preferred) or RESEND_API_KEY + EMAIL_FROM (temporary).',
    );
  },
};

export function getEmailTransportProvider(): NotificationProvider {
  const kind = getEmailTransportKind();
  if (kind === 'smtp') return smtpEmailProvider;
  if (kind === 'resend') return resendEmailProvider;
  return stubEmailProvider;
}

/** @deprecated Prefer getEmailTransportProvider — kept for notification service naming. */
export function getNotificationEmailProvider(): NotificationProvider {
  return getEmailTransportProvider();
}

/**
 * Send one transactional email through the active transport.
 */
export async function sendEmail(input: SendEmailInput): Promise<SendEmailResult> {
  if (!isEmailConfigured()) {
    throw new Error(
      'Email provider is not configured (SMTP_* + EMAIL_FROM, or temporary RESEND_API_KEY + EMAIL_FROM).',
    );
  }
  const provider = getEmailTransportProvider();
  const result = await provider.send(input);
  return { messageId: result.messageId, providerId: provider.id };
}

/** Alias used by some call sites / docs. */
export async function sendTransactionalEmail(
  input: SendEmailInput,
): Promise<SendEmailResult> {
  return sendEmail(input);
}
