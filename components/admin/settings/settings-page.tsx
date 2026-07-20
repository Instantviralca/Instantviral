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
          settings?: { paymentWebsite?: string };
          error?: string;
        };
        if (!response.ok || !data.ok) {
          throw new Error(data.error ?? 'Unable to load settings.');
        }
        if (!cancelled) {
          setPaymentWebsite(data.settings?.paymentWebsite ?? '');
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
        body: JSON.stringify({ paymentWebsite }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        settings?: { paymentWebsite?: string };
        error?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? 'Unable to save settings.');
      }
      setPaymentWebsite(data.settings?.paymentWebsite ?? paymentWebsite);
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
        description="Checkout and payment collection settings."
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
      </AdminCard>
    </div>
  );
}
