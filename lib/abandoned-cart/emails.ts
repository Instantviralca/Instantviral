/**
 * Branded InstantViral abandoned-cart recovery emails.
 * Uses the shared transactional email service (SMTP preferred / temporary Resend).
 * No Resend or Neon imports — Contabo-portable.
 */

import { getCheckoutUrl, getSiteOrigin } from '@/lib/config/hosts';
import { isEmailConfigured } from '@/lib/config/env';
import { formatMoney } from '@/lib/pricing/format';
import { sendEmail } from '@/lib/notifications/send-email';
import type { AbandonedCartRecord } from '@/lib/abandoned-cart/types';
import type { CurrencyCode } from '@/types/pricing';

export type RecoveryEmailContent = {
  subject: string;
  html: string;
  text: string;
};

function companyName(): string {
  return process.env.EMAIL_COMPANY_NAME?.trim() || 'InstantViral';
}

function supportEmail(): string {
  return process.env.EMAIL_SUPPORT?.trim() || 'support@instantviral.ca';
}

function greetingName(cart: AbandonedCartRecord): string {
  const first = cart.customerName?.trim().split(/\s+/)[0];
  return first || 'there';
}

function serviceLine(cart: AbandonedCartRecord): string {
  const parts = [cart.serviceName, cart.packageTitle].filter(Boolean);
  if (parts.length === 0) return 'your selected package';
  return parts.join(' — ');
}

function amountLine(cart: AbandonedCartRecord): string {
  return formatMoney(cart.totalAmount, (cart.currency || 'USD') as CurrencyCode);
}

function buildShell(input: {
  headline: string;
  bodyHtml: string;
  bodyText: string;
  ctaUrl: string;
  cart: AbandonedCartRecord;
}): RecoveryEmailContent {
  const brand = companyName();
  const support = supportEmail();
  const service = serviceLine(input.cart);
  const amount = amountLine(input.cart);

  const html = `<!DOCTYPE html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f6f7f9;font-family:Arial,Helvetica,sans-serif;color:#111827;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f6f7f9;padding:24px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" style="max-width:560px;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e5e7eb;">
        <tr><td style="padding:24px 28px 8px;font-size:20px;font-weight:700;color:#111827;">${brand}</td></tr>
        <tr><td style="padding:8px 28px 0;font-size:22px;font-weight:700;line-height:1.3;">${input.headline}</td></tr>
        <tr><td style="padding:16px 28px;font-size:15px;line-height:1.6;color:#374151;">${input.bodyHtml}</td></tr>
        <tr><td style="padding:0 28px 8px;">
          <table role="presentation" width="100%" style="background:#f9fafb;border:1px solid #e5e7eb;border-radius:8px;">
            <tr><td style="padding:14px 16px;font-size:14px;color:#374151;">
              <div><strong>Service</strong><br>${service}</div>
              <div style="margin-top:10px;"><strong>Order amount</strong><br>${amount}</div>
            </td></tr>
          </table>
        </td></tr>
        <tr><td style="padding:20px 28px 8px;" align="center">
          <a href="${input.ctaUrl}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:12px 22px;border-radius:8px;font-weight:600;font-size:15px;">Complete Your Order</a>
        </td></tr>
        <tr><td style="padding:12px 28px 28px;font-size:13px;line-height:1.5;color:#6b7280;">
          Need help? Contact <a href="mailto:${support}" style="color:#111827;">${support}</a>.<br><br>
          ${brand}<br>
          <a href="${getSiteOrigin()}" style="color:#6b7280;">${getSiteOrigin().replace(/^https?:\/\//, '')}</a>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  const text = `${brand}

${input.headline}

${input.bodyText}

Service: ${service}
Order amount: ${amount}

Complete your order: ${input.ctaUrl}

Need help? ${support}

${brand}
${getSiteOrigin()}`;

  return { subject: '', html, text };
}

export function buildRecoveryEmailContent(input: {
  cart: AbandonedCartRecord;
  sequenceNumber: number;
  recoveryUrl: string;
}): RecoveryEmailContent {
  const name = greetingName(input.cart);
  const brand = companyName();

  if (input.sequenceNumber === 1) {
    const shell = buildShell({
      cart: input.cart,
      ctaUrl: input.recoveryUrl,
      headline: 'You left something behind',
      bodyHtml: `<p>Hi ${name},</p><p>You started a checkout on ${brand} but did not finish your order. Your selections are still available — you can complete checkout whenever you are ready.</p>`,
      bodyText: `Hi ${name},\n\nYou started a checkout on ${brand} but did not finish your order. Your selections are still available — you can complete checkout whenever you are ready.`,
    });
    return { ...shell, subject: `You left something behind at ${brand}` };
  }

  if (input.sequenceNumber === 2) {
    const shell = buildShell({
      cart: input.cart,
      ctaUrl: input.recoveryUrl,
      headline: 'Still thinking it over?',
      bodyHtml: `<p>Hi ${name},</p><p>Just a friendly follow-up — your unfinished order is still saved. If you ran into a question at checkout, our support team is happy to help before you complete payment.</p>`,
      bodyText: `Hi ${name},\n\nJust a friendly follow-up — your unfinished order is still saved. If you ran into a question at checkout, our support team is happy to help before you complete payment.`,
    });
    return { ...shell, subject: `Your ${brand} order is still waiting` };
  }

  const shell = buildShell({
    cart: input.cart,
    ctaUrl: input.recoveryUrl,
    headline: 'Last reminder about your order',
    bodyHtml: `<p>Hi ${name},</p><p>This is our final reminder about the order you started. If you still want it, you can complete checkout using the button below. If not, you can ignore this email — no further reminders will be sent.</p>`,
    bodyText: `Hi ${name},\n\nThis is our final reminder about the order you started. If you still want it, you can complete checkout using the button below. If not, you can ignore this email — no further reminders will be sent.`,
  });
  return { ...shell, subject: `Final reminder from ${brand}` };
}

export function buildRecoveryUrl(rawToken: string, sequenceNumber?: number): string {
  const path = `/checkout/recover/${encodeURIComponent(rawToken)}`;
  const url = new URL(getCheckoutUrl(path));
  if (sequenceNumber && sequenceNumber > 0) {
    url.searchParams.set('step', String(sequenceNumber));
  }
  return url.toString();
}

export async function sendRecoveryEmail(input: {
  cart: AbandonedCartRecord;
  sequenceNumber: number;
  rawToken: string;
}): Promise<{ ok: boolean; messageId?: string; skipped?: boolean; error?: string }> {
  if (!isEmailConfigured()) {
    return { ok: false, skipped: true, error: 'Email provider is not configured.' };
  }

  const recoveryUrl = buildRecoveryUrl(input.rawToken, input.sequenceNumber);
  const content = buildRecoveryEmailContent({
    cart: input.cart,
    sequenceNumber: input.sequenceNumber,
    recoveryUrl,
  });

  try {
    const result = await sendEmail({
      to: input.cart.email,
      subject: content.subject,
      html: content.html,
      text: content.text,
    });
    return { ok: true, messageId: result.messageId };
  } catch (error) {
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Delivery failed',
    };
  }
}
