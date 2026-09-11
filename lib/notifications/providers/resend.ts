/**
 * Optional Resend HTTP adapter (used when SMTP is unset).
 * Abandoned-cart / order business logic must not import this directly —
 * use sendEmail() from lib/notifications/send-email.ts instead.
 */

import { getFormattedEmailFrom, isResendConfigured } from '@/lib/config/env';
import type { NotificationProvider } from '@/types/notification';

export const resendEmailProvider: NotificationProvider = {
  id: 'resend',
  channel: 'email',
  async send({ to, subject, html, text }) {
    if (!isResendConfigured()) {
      throw new Error('Resend is not configured (RESEND_API_KEY / EMAIL_FROM).');
    }
    const apiKey = process.env.RESEND_API_KEY!.trim().replace(/^['"]+|['"]+$/g, '');
    const from = getFormattedEmailFrom();
    if (!from) {
      throw new Error('EMAIL_FROM (or RESEND_FROM_EMAIL) is not configured.');
    }
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: [to],
        subject,
        html,
        text,
      }),
    });
    if (!response.ok) {
      const body = await response.text();
      let detail = body.slice(0, 300);
      try {
        const parsed = JSON.parse(body) as { message?: string; name?: string };
        if (parsed.message) detail = parsed.message;
      } catch {
        // keep raw body snippet
      }
      throw new Error(`Resend ${response.status}: ${detail}`);
    }
    const data = (await response.json()) as { id?: string };
    return { messageId: data.id ?? `resend_${Date.now()}` };
  },
};
