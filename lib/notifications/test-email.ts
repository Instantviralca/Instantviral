/**
 * Admin test email — sends one message via the shared transactional transport.
 */

import {
  getEmailFrom,
  getEmailTransportKind,
  isEmailConfigured,
} from '@/lib/config/env';
import { sendEmail } from '@/lib/notifications/send-email';
import { site } from '@/config/site';

export async function sendAdminTestEmail(to: string): Promise<{
  ok: boolean;
  error?: string;
  messageId?: string;
  from?: string;
  hint?: string;
}> {
  const recipient = to.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)) {
    return { ok: false, error: 'Enter a valid test recipient email.' };
  }

  if (!isEmailConfigured()) {
    return {
      ok: false,
      error: 'Email is not configured (SMTP_* + EMAIL_FROM, or temporary RESEND_API_KEY + EMAIL_FROM).',
      hint: 'Add SMTP settings (preferred) or temporary Resend keys in env, then redeploy.',
    };
  }

  const from = getEmailFrom();
  const transport = getEmailTransportKind();
  try {
    const result = await sendEmail({
      to: recipient,
      subject: `${site.name} test email`,
      html: `<p>This is a test email from <strong>${site.name}</strong> admin settings.</p><p>Transport: <code>${transport}</code>.</p>`,
      text: `This is a test email from ${site.name} admin settings. Transport: ${transport}.`,
    });
    return { ok: true, messageId: result.messageId, from };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Send failed';
    let hint = 'Check SMTP credentials / mail logs, or temporary Resend domain verification.';
    if (/not verified|domain/i.test(message)) {
      hint =
        'Verify your sending domain (DNS SPF/DKIM) and ensure EMAIL_FROM uses that domain.';
    } else if (/only send testing emails|testing emails to your own/i.test(message)) {
      hint =
        'Provider test mode may only allow your own inbox until the domain is verified.';
    } else if (/invalid.?api.?key|unauthorized|401|403|authentication/i.test(message)) {
      hint = 'Email credentials look invalid. Update SMTP_PASS or RESEND_API_KEY and redeploy.';
    }
    return { ok: false, error: message, from: from ?? undefined, hint };
  }
}
