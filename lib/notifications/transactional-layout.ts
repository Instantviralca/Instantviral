/**
 * Shared InstantViral transactional email shell.
 * Table-based, inline styles, email-client friendly. No JS / framework CSS.
 */

import { site } from '@/config/site';
import { getSiteUrl } from '@/lib/config/env';

export const EMAIL_BRAND = {
  name: 'InstantViral',
  primary: '#F07020',
  primaryDark: '#D85F14',
  text: '#141414',
  muted: '#5c5c5c',
  border: '#eadfd6',
  soft: '#fffbf8',
  white: '#ffffff',
  maxWidth: 560,
} as const;

export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/** Allow only http(s) URLs for href attributes. */
export function safeHttpUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;
  try {
    const url = new URL(trimmed);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      return url.toString();
    }
  } catch {
    return null;
  }
  return null;
}

export function renderSafeLink(label: string, href: string): string {
  const safe = safeHttpUrl(href);
  const text = escapeHtml(label);
  if (!safe) return text;
  return `<a href="${escapeHtml(safe)}" style="color:${EMAIL_BRAND.primary};word-break:break-all;">${text}</a>`;
}

export function renderCtaButton(label: string, href: string): string {
  const safe = safeHttpUrl(href);
  if (!safe) return '';
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:24px 0 8px;">
  <tr>
    <td style="border-radius:8px;background:${EMAIL_BRAND.primary};">
      <a href="${escapeHtml(safe)}" style="display:inline-block;padding:14px 22px;font-family:Arial,Helvetica,sans-serif;font-size:15px;font-weight:700;color:${EMAIL_BRAND.white};text-decoration:none;border-radius:8px;">
        ${escapeHtml(label)}
      </a>
    </td>
  </tr>
</table>`;
}

export type TransactionalShellInput = {
  /** Browser title / preview context */
  title: string;
  /** Main body HTML (already escaped / safe). */
  bodyHtml: string;
  supportEmail?: string;
  siteUrl?: string;
  companyName?: string;
};

/**
 * Branded white/light transactional wrapper with InstantViral text header.
 * Logo image omitted — text header is more reliable across clients.
 */
export function wrapTransactionalEmail(input: TransactionalShellInput): string {
  const company = escapeHtml(input.companyName?.trim() || site.name || EMAIL_BRAND.name);
  const support =
    escapeHtml(
      input.supportEmail?.trim() ||
        process.env.EMAIL_SUPPORT?.trim() ||
        site.supportEmail,
    );
  const origin = escapeHtml(
    (input.siteUrl?.trim() || getSiteUrl() || site.domain).replace(/\/$/, ''),
  );
  const title = escapeHtml(input.title);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light" />
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background:${EMAIL_BRAND.soft};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${EMAIL_BRAND.soft};">
    <tr>
      <td align="center" style="padding:24px 12px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:${EMAIL_BRAND.maxWidth}px;background:${EMAIL_BRAND.white};border:1px solid ${EMAIL_BRAND.border};border-radius:12px;">
          <tr>
            <td style="padding:28px 24px 12px;font-family:Arial,Helvetica,sans-serif;">
              <div style="font-size:13px;font-weight:700;letter-spacing:0.06em;text-transform:uppercase;color:${EMAIL_BRAND.primary};margin:0 0 18px;">
                ${company}
              </div>
              ${input.bodyHtml}
            </td>
          </tr>
          <tr>
            <td style="padding:8px 24px 28px;font-family:Arial,Helvetica,sans-serif;font-size:12px;line-height:1.6;color:${EMAIL_BRAND.muted};border-top:1px solid ${EMAIL_BRAND.border};">
              <p style="margin:16px 0 4px;font-weight:700;color:${EMAIL_BRAND.text};">${company}</p>
              <p style="margin:0;">
                <a href="mailto:${support}" style="color:${EMAIL_BRAND.muted};text-decoration:none;">${support}</a>
              </p>
              <p style="margin:4px 0 0;">
                <a href="${origin}" style="color:${EMAIL_BRAND.muted};text-decoration:none;">${origin.replace(/^https?:\/\//, '')}</a>
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export function formatEmailDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleString('en-CA', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'America/Toronto',
  });
}
