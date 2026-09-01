/**
 * Admin test email — sends one message via Resend and returns the provider result.
 */

import { getEmailFrom, isEmailConfigured } from '@/lib/config/env';
import { resendEmailProvider } from '@/lib/notifications/email';
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
      error: 'RESEND_API_KEY or EMAIL_FROM is missing in Vercel env.',
      hint: 'Add both in Vercel → Settings → Environment Variables (Production), then Redeploy.',
    };
  }

  const from = getEmailFrom();
  try {
    const result = await resendEmailProvider.send({
      to: recipient,
      subject: `${site.name} test email`,
      html: `<p>This is a test email from <strong>${site.name}</strong> admin settings.</p><p>If you received this, Resend is working.</p>`,
      text: `This is a test email from ${site.name} admin settings. If you received this, Resend is working.`,
    });
    return { ok: true, messageId: result.messageId, from };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Send failed';
    let hint =
      'Check Resend Dashboard → Domains (must be verified) and Logs for the failed send.';
    if (/not verified|domain/i.test(message)) {
      hint =
        'Verify instantviral.ca in Resend → Domains (DNS records), then use EMAIL_FROM on that domain.';
    } else if (/only send testing emails|testing emails to your own/i.test(message)) {
      hint =
        'Resend test mode only allows your own inbox until the domain is verified. Verify the domain to email customers.';
    } else if (/invalid.?api.?key|unauthorized|401|403/i.test(message)) {
      hint = 'RESEND_API_KEY looks invalid. Create a new key in Resend and update Vercel, then Redeploy.';
    }
    return { ok: false, error: message, from: from ?? undefined, hint };
  }
}
