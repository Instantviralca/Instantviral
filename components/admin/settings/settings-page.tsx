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
  const [paymentWebsite, setPaymentWebsite] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [emailConfigured, setEmailConfigured] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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
            emailConfigured?: boolean;
          };
          error?: string;
        };
        if (!response.ok || !data.ok) {
          throw new Error(data.error ?? 'Unable to load settings.');
        }
        if (!cancelled) {
          setPaymentWebsite(data.settings?.paymentWebsite ?? '');
          setAdminEmail(data.settings?.adminEmail ?? '');
          setEmailConfigured(Boolean(data.settings?.emailConfigured));
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
    try {
      const csrf = readCsrfToken();
      const response = await fetch('/api/admin/settings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf ? { 'x-csrf-token': csrf } : {}),
        },
        body: JSON.stringify({ paymentWebsite, adminEmail }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        settings?: {
          paymentWebsite?: string;
          adminEmail?: string;
          emailConfigured?: boolean;
        };
        error?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? 'Unable to save settings.');
      }
      setPaymentWebsite(data.settings?.paymentWebsite ?? paymentWebsite);
      setAdminEmail(data.settings?.adminEmail ?? adminEmail);
      setEmailConfigured(Boolean(data.settings?.emailConfigured));
      setMessage('Settings saved.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to save settings.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Settings"
        description="Checkout, payment, and email notification settings."
      />
      <AdminCard title="Remote Payment">
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Website URL for Payment Collection (without trailing slash). Checkout posts
            orders to this site the same way as the WooCommerce Remote Payment client.
          </p>
          <div className="space-y-2">
            <Label htmlFor="payment-website">Payment website URL</Label>
            <Input
              id="payment-website"
              value={paymentWebsite}
              onChange={(event) => setPaymentWebsite(event.target.value)}
              placeholder="https://your-payment-collector.com"
              disabled={loading || saving}
              autoComplete="off"
            />
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
              ? 'Resend is configured — emails can send.'
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
              disabled={loading || saving}
              autoComplete="email"
            />
            <p className="text-xs text-muted-foreground">
              New orders and contact-form messages are sent here.
            </p>
          </div>
        </div>
      </AdminCard>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}
      {message ? (
        <p className="text-sm text-emerald-700" role="status">
          {message}
        </p>
      ) : null}
      <Button type="button" onClick={handleSave} disabled={loading || saving}>
        {saving ? 'Saving…' : 'Save settings'}
      </Button>
    </div>
  );
}
