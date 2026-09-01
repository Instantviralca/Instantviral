'use client';

import { useEffect, useState } from 'react';

import { AdminCard } from '@/components/admin/cards/admin-card';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

function readCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('iv_admin_csrf='));
  if (!match) return undefined;
  return decodeURIComponent(match.slice('iv_admin_csrf='.length));
}

export function SettingsPage() {
  const [paymentWebsite, setPaymentWebsite] = useState('https://carrycubes.com');
  const [mollieProductName, setMollieProductName] = useState('Cubes');
  const [mollieSharedSecret, setMollieSharedSecret] = useState('');
  const [mollieSharedSecretSet, setMollieSharedSecretSet] = useState(false);
  const [mollieConfigured, setMollieConfigured] = useState(false);
  const [mollieServerUrl, setMollieServerUrl] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [emailConfigured, setEmailConfigured] = useState(false);
  const [emailFrom, setEmailFrom] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const response = await fetch('/api/admin/settings');
        const data = (await response.json()) as {
          ok?: boolean;
          settings?: {
            paymentWebsite?: string;
            adminEmail?: string;
            mollieServerUrl?: string;
            mollieProductName?: string;
            mollieSharedSecretSet?: boolean;
            mollieConfigured?: boolean;
            emailConfigured?: boolean;
            emailFrom?: string | null;
          };
          error?: string;
        };
        if (!response.ok || !data.ok) {
          throw new Error(data.error ?? 'Unable to load settings.');
        }
        if (!cancelled) {
          setPaymentWebsite(data.settings?.paymentWebsite ?? data.settings?.mollieServerUrl ?? '');
          setMollieServerUrl(data.settings?.mollieServerUrl ?? '');
          setMollieProductName(data.settings?.mollieProductName ?? 'Cubes');
          setMollieSharedSecretSet(Boolean(data.settings?.mollieSharedSecretSet));
          setMollieConfigured(Boolean(data.settings?.mollieConfigured));
          setAdminEmail(data.settings?.adminEmail ?? '');
          setEmailConfigured(Boolean(data.settings?.emailConfigured));
          setEmailFrom(data.settings?.emailFrom ?? null);
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Unable to load settings.');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSave = async () => {
    setSaving(true);
    setMessage(null);
    setError(null);
    setHint(null);
    try {
      const csrf = readCsrfToken();
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf ? { 'x-csrf-token': csrf } : {}),
        },
        body: JSON.stringify({
          paymentWebsite,
          adminEmail,
          mollieSharedSecret: mollieSharedSecret || undefined,
          mollieProductName,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        settings?: {
          paymentWebsite?: string;
          adminEmail?: string;
          mollieServerUrl?: string;
          mollieProductName?: string;
          mollieSharedSecretSet?: boolean;
          mollieConfigured?: boolean;
          emailConfigured?: boolean;
          emailFrom?: string | null;
        };
        error?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? 'Unable to save settings.');
      }
      setPaymentWebsite(data.settings?.paymentWebsite ?? paymentWebsite);
      setMollieServerUrl(data.settings?.mollieServerUrl ?? mollieServerUrl);
      setMollieProductName(data.settings?.mollieProductName ?? mollieProductName);
      setMollieSharedSecretSet(Boolean(data.settings?.mollieSharedSecretSet));
      setMollieConfigured(Boolean(data.settings?.mollieConfigured));
      setMollieSharedSecret('');
      setAdminEmail(data.settings?.adminEmail ?? adminEmail);
      setEmailConfigured(Boolean(data.settings?.emailConfigured));
      setEmailFrom(data.settings?.emailFrom ?? null);
      setMessage('Settings saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save settings.');
    } finally {
      setSaving(false);
    }
  };

  const handleTestEmail = async () => {
    setTesting(true);
    setMessage(null);
    setError(null);
    setHint(null);
    try {
      const csrf = readCsrfToken();
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf ? { 'x-csrf-token': csrf } : {}),
        },
        body: JSON.stringify({
          action: 'test-email',
          testTo: adminEmail,
          adminEmail,
        }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        hint?: string;
        messageId?: string;
        from?: string;
      };
      if (!response.ok || !data.ok) {
        setError(data.error ?? 'Test email failed.');
        setHint(data.hint ?? null);
        return;
      }
      setMessage(
        `Test email sent to ${adminEmail.trim() || 'recipient'}${data.messageId ? ` (${data.messageId})` : ''}. Check inbox + spam.`,
      );
      setHint(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Test email failed.');
    } finally {
      setTesting(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Settings"
        description="Checkout, payment, and email notification settings."
      />
      <AdminCard title="Mollie Remote Payment">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Checkout uses the Mollie Remote Payment client protocol via{' '}
            <code className="text-xs">carrycubes.com</code>. Stripe is paused — only
            Mollie is active.
          </p>
          <p
            className={`text-sm font-medium ${mollieConfigured ? 'text-emerald-700' : 'text-amber-700'}`}
            role="status"
          >
            {mollieConfigured
              ? `Mollie is configured (${mollieServerUrl || paymentWebsite}) — live checkout enabled.`
              : 'Mollie is not fully configured — set server URL and shared secret below.'}
          </p>
          <div className="space-y-2">
            <Label htmlFor="payment-website">Payment server URL</Label>
            <Input
              id="payment-website"
              value={paymentWebsite}
              onChange={(event) => setPaymentWebsite(event.target.value)}
              placeholder="https://carrycubes.com"
              disabled={loading || saving || testing}
              autoComplete="off"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="mollie-product-name">Payment description (product name)</Label>
            <Input
              id="mollie-product-name"
              value={mollieProductName}
              onChange={(event) => setMollieProductName(event.target.value)}
              placeholder="Cubes"
              disabled={loading || saving || testing}
              autoComplete="off"
            />
            <p className="text-xs text-muted-foreground">
              Sent to Mollie as the line-item description (default: Cubes).
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mollie-shared-secret">Shared secret</Label>
            <Input
              id="mollie-shared-secret"
              type="password"
              value={mollieSharedSecret}
              onChange={(event) => setMollieSharedSecret(event.target.value)}
              placeholder={mollieSharedSecretSet ? '••••••••••••••••' : 'Min 16 characters'}
              disabled={loading || saving || testing}
              autoComplete="new-password"
            />
            <p className="text-xs text-muted-foreground">
              Must exactly match the shared secret on the Mollie Server plugin at carrycubes.com.
              {mollieSharedSecretSet ? ' A secret is already saved — leave blank to keep it.' : ''}
            </p>
          </div>
        </div>
      </AdminCard>

      <AdminCard title="Email notifications">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Order confirmations, paid alerts, and contact-form messages use Resend.
            Set <code className="text-xs">RESEND_API_KEY</code> and{' '}
            <code className="text-xs">EMAIL_FROM</code> in Vercel env, then choose where
            admin alerts go below.
          </p>
          <p
            className={`text-sm font-medium ${emailConfigured ? 'text-emerald-700' : 'text-amber-700'}`}
            role="status"
          >
            {emailConfigured
              ? `Resend is configured${emailFrom ? ` (from ${emailFrom})` : ''} — emails can send.`
              : 'Resend is not configured — emails are skipped until RESEND_API_KEY + EMAIL_FROM are set in Vercel.'}
          </p>
          <div className="space-y-2">
            <Label htmlFor="admin-email">Admin notification email</Label>
            <Input
              id="admin-email"
              type="email"
              value={adminEmail}
              onChange={(event) => setAdminEmail(event.target.value)}
              placeholder="orders@yourdomain.com"
              disabled={loading || saving || testing}
              autoComplete="email"
            />
            <p className="text-xs text-muted-foreground">
              New orders and contact-form messages are sent here. Use Send test email to
              see the exact Resend error if delivery fails.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            onClick={handleTestEmail}
            disabled={loading || saving || testing || !adminEmail.trim()}
          >
            {testing ? 'Sending test…' : 'Send test email'}
          </Button>
        </div>
      </AdminCard>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {hint ? (
        <p className="text-sm text-amber-800" role="status">
          {hint}
        </p>
      ) : null}
      {message ? (
        <p className="text-sm text-emerald-700" role="status">
          {message}
        </p>
      ) : null}
      <Button type="button" onClick={handleSave} disabled={loading || saving || testing}>
        {saving ? 'Saving…' : 'Save settings'}
      </Button>
    </div>
  );
}
