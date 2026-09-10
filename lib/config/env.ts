/**
 * Environment validation — production launch blockers.
 * Never logs secret values.
 *
 * Canonical keys (preferred):
 * - DATABASE_URL (any standard PostgreSQL — Contabo local Postgres later)
 * - NEXT_PUBLIC_SITE_URL
 * - STRIPE_SECRET_KEY / NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY / STRIPE_WEBHOOK_SECRET
 * - IV_ADMIN_PASSWORD / IV_ADMIN_SESSION_SECRET
 * - EMAIL_FROM (+ SMTP_* preferred, or temporary RESEND_API_KEY on Vercel)
 *
 * Accepted aliases (for operator convenience):
 * - SITE_URL → NEXT_PUBLIC_SITE_URL
 * - STRIPE_PUBLISHABLE_KEY → NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY (server checks only)
 * - ADMIN_PASSWORD → IV_ADMIN_PASSWORD
 * - SESSION_SECRET → IV_ADMIN_SESSION_SECRET
 * - RESEND_FROM_EMAIL → EMAIL_FROM
 */

export type EnvIssue = {
  key: string;
  level: 'error' | 'warning';
  message: string;
};

export type EmailTransportKind = 'smtp' | 'resend' | 'none';

export type SmtpConfig = {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
};

function present(key: string): boolean {
  const value = process.env[key];
  return Boolean(value && value.trim());
}

function firstPresent(...keys: string[]): string | undefined {
  for (const key of keys) {
    const value = process.env[key]?.trim();
    if (value) return value;
  }
  return undefined;
}

export function isProductionRuntime(): boolean {
  return process.env.NODE_ENV === 'production' && process.env.IV_ENV !== 'test';
}

/** True during `next build` when secrets may not yet be injected. */
export function isProductionBuildPhase(): boolean {
  return process.env.NEXT_PHASE === 'phase-production-build';
}

export function getAdminPassword(): string | undefined {
  return firstPresent('IV_ADMIN_PASSWORD', 'ADMIN_PASSWORD');
}

export function getAdminSessionSecret(): string | undefined {
  return firstPresent('IV_ADMIN_SESSION_SECRET', 'SESSION_SECRET', 'IV_SHARED_SECRET');
}

export function getEmailFrom(): string | undefined {
  const raw = firstPresent('EMAIL_FROM', 'RESEND_FROM_EMAIL');
  if (!raw) return undefined;
  // Strip accidental wrapping quotes from Vercel / .env paste.
  return raw.replace(/^['"]+|['"]+$/g, '').trim() || undefined;
}

export function getEmailFromName(): string | undefined {
  const raw = firstPresent('EMAIL_FROM_NAME', 'EMAIL_COMPANY_NAME');
  if (!raw) return undefined;
  return raw.replace(/^['"]+|['"]+$/g, '').trim() || undefined;
}

/** RFC-ish From header: `Name <email@domain>` when EMAIL_FROM_NAME is set. */
export function getFormattedEmailFrom(): string | undefined {
  const from = getEmailFrom();
  if (!from) return undefined;
  const name = getEmailFromName();
  if (!name) return from;
  if (from.includes('<')) return from;
  return `${name} <${from}>`;
}

export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  if (!host || !user || !pass) return null;

  const portRaw = process.env.SMTP_PORT?.trim();
  const port = portRaw ? Number.parseInt(portRaw, 10) : 587;
  if (!Number.isFinite(port) || port <= 0) return null;

  const secureRaw = process.env.SMTP_SECURE?.trim().toLowerCase();
  const secure =
    secureRaw === '1' ||
    secureRaw === 'true' ||
    secureRaw === 'yes' ||
    port === 465;

  return { host, port, secure, user, pass };
}

/** Preferred Contabo / self-hosted transport. */
export function isSmtpConfigured(): boolean {
  return Boolean(getSmtpConfig()) && Boolean(getEmailFrom());
}

/** Temporary Vercel-period Resend adapter. */
export function isResendConfigured(): boolean {
  return present('RESEND_API_KEY') && Boolean(getEmailFrom());
}

/**
 * Active email transport.
 * SMTP wins when configured so Contabo cutover is env-only.
 */
export function getEmailTransportKind(): EmailTransportKind {
  if (isSmtpConfigured()) return 'smtp';
  if (isResendConfigured()) return 'resend';
  return 'none';
}

/** True when any supported transactional email transport is ready. */
export function isEmailConfigured(): boolean {
  return getEmailTransportKind() !== 'none';
}

export function getStripePublishableKey(): string | undefined {
  return firstPresent('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY', 'STRIPE_PUBLISHABLE_KEY');
}

export function isStripeConfigured(): boolean {
  return (
    present('STRIPE_SECRET_KEY') &&
    Boolean(getStripePublishableKey()) &&
    present('STRIPE_WEBHOOK_SECRET')
  );
}

export function isDatabaseConfigured(): boolean {
  return present('DATABASE_URL');
}

export function allowFileStore(): boolean {
  return process.env.IV_ALLOW_FILE_STORE === '1' && !isProductionRuntime();
}

export function allowMockPayments(): boolean {
  return (
    process.env.IV_PAYMENTS_MODE === 'mock' &&
    process.env.NODE_ENV !== 'production'
  );
}

export function getSiteUrl(): string {
  return (
    firstPresent('NEXT_PUBLIC_SITE_URL', 'SITE_URL')?.replace(/\/$/, '') ||
    'http://localhost:3000'
  );
}

/** @deprecated Unused for customer URLs. Leftover checkout URL env only (legacy redirect hint). */
export function getCheckoutUrlFromEnv(): string | undefined {
  return firstPresent('NEXT_PUBLIC_CHECKOUT_URL')?.replace(/\/$/, '');
}

const WEAK_ADMIN_PASSWORDS = new Set([
  'change-me-admin',
  'ChangeMe_Admin_2026',
  'admin',
  'password',
  'password123',
]);

export function validateEnv(options: {
  throwOnProductionErrors?: boolean;
  /** Force production rules (used by verify-production-env script / tests). */
  forceProduction?: boolean;
} = {}): {
  ok: boolean;
  issues: EnvIssue[];
} {
  const issues: EnvIssue[] = [];
  const production = options.forceProduction === true || isProductionRuntime();

  if (production && !isDatabaseConfigured()) {
    issues.push({
      key: 'DATABASE_URL',
      level: 'error',
      message: 'DATABASE_URL is required in production.',
    });
  } else if (!isDatabaseConfigured() && !allowFileStore() && process.env.NODE_ENV !== 'test') {
    issues.push({
      key: 'DATABASE_URL',
      level: 'warning',
      message:
        'DATABASE_URL is unset. Set DATABASE_URL or IV_ALLOW_FILE_STORE=1 for local development.',
    });
  }

  const adminPassword = getAdminPassword();
  if (!adminPassword) {
    issues.push({
      key: 'IV_ADMIN_PASSWORD',
      level: production ? 'error' : 'warning',
      message: 'IV_ADMIN_PASSWORD (or ADMIN_PASSWORD) is required for admin login.',
    });
  } else if (production && WEAK_ADMIN_PASSWORDS.has(adminPassword)) {
    issues.push({
      key: 'IV_ADMIN_PASSWORD',
      level: 'error',
      message: 'IV_ADMIN_PASSWORD must not use a documented/default development password in production.',
    });
  }

  if (production && !getAdminSessionSecret()) {
    issues.push({
      key: 'IV_ADMIN_SESSION_SECRET',
      level: 'error',
      message:
        'IV_ADMIN_SESSION_SECRET (or SESSION_SECRET) is required in production.',
    });
  }

  if (production && !firstPresent('NEXT_PUBLIC_SITE_URL', 'SITE_URL')) {
    issues.push({
      key: 'NEXT_PUBLIC_SITE_URL',
      level: 'error',
      message: 'NEXT_PUBLIC_SITE_URL (or SITE_URL) is required in production.',
    });
  } else if (
    production &&
    getSiteUrl().startsWith('http://') &&
    !getSiteUrl().includes('localhost')
  ) {
    issues.push({
      key: 'NEXT_PUBLIC_SITE_URL',
      level: 'error',
      message: 'NEXT_PUBLIC_SITE_URL must use HTTPS in production.',
    });
  }

  if (!isStripeConfigured()) {
    if (
      present('STRIPE_SECRET_KEY') ||
      present('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY') ||
      present('STRIPE_WEBHOOK_SECRET')
    ) {
      issues.push({
        key: 'STRIPE_SECRET_KEY',
        level: 'warning',
        message:
          'Stripe keys are incomplete or unused. Checkout uses remote payment (Admin → Settings).',
      });
    }
  } else if (production && !present('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY')) {
    issues.push({
      key: 'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY',
      level: 'warning',
      message:
        'Stripe publishable key missing — ignored while remote payment is the checkout provider.',
    });
  }

  if (!isEmailConfigured()) {
    issues.push({
      key: 'EMAIL_FROM',
      level: 'warning',
      message:
        'Email requires SMTP_* + EMAIL_FROM (preferred) or temporary RESEND_API_KEY + EMAIL_FROM. Transactional mail will be skipped until set.',
    });
  }

  if (production && allowFileStore()) {
    issues.push({
      key: 'IV_ALLOW_FILE_STORE',
      level: 'error',
      message: 'File store is not allowed in production.',
    });
  }

  if (production && process.env.IV_PAYMENTS_MODE === 'mock') {
    issues.push({
      key: 'IV_PAYMENTS_MODE',
      level: 'error',
      message: 'Mock payments are not allowed in production.',
    });
  }

  const ok = !issues.some((i) => i.level === 'error');
  if (!ok && options.throwOnProductionErrors && production) {
    const keys = issues.filter((i) => i.level === 'error').map((i) => i.key);
    throw new Error(`Missing required production configuration: ${keys.join(', ')}`);
  }

  return { ok, issues };
}
