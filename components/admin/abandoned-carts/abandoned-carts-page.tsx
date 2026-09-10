'use client';

import { useCallback, useEffect, useState } from 'react';

import { AdminStatCard } from '@/components/admin/cards/admin-stat-card';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { formatMoney } from '@/lib/pricing/format';
import type { AbandonedCartStatus } from '@/config/abandoned-cart';
import type { AbandonedCartListRow, AbandonedCartMetrics } from '@/lib/abandoned-cart/types';
import type { CurrencyCode } from '@/types/pricing';

type DetailPayload = {
  cart: {
    id: string;
    email: string;
    customerName: string | null;
    status: AbandonedCartStatus;
    currency: string;
    subtotalAmount: number;
    discountAmount: number;
    totalAmount: number;
    serviceName: string | null;
    packageTitle: string | null;
    quantityLabel: string | null;
    publicDestination: string | null;
    createdAt: string;
    updatedAt: string;
    lastActivityAt: string;
    abandonedAt: string | null;
    recoveredAt: string | null;
    recoveredOrderId: string | null;
    linkedOrderId: string | null;
    recoveryClickedAt: string | null;
    recoveryClickSequence: number | null;
    lastRecoverySequence: number;
    recoveryEmailsStopped: boolean;
    checkoutData?: { items?: unknown[] };
  };
  emails: Array<{
    id: string;
    sequenceNumber: number;
    status: string;
    scheduledAt: string;
    sentAt: string | null;
    error: string | null;
    triggeredBy: string;
    providerMessageId: string | null;
  }>;
};

function readCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie.split('; ').find((row) => row.startsWith('iv_admin_csrf='));
  if (!match) return undefined;
  return decodeURIComponent(match.slice('iv_admin_csrf='.length));
}

function formatWhen(value: string | null | undefined): string {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleString();
  } catch {
    return value;
  }
}

export function AbandonedCartsPage() {
  const [metrics, setMetrics] = useState<AbandonedCartMetrics | null>(null);
  const [rows, setRows] = useState<AbandonedCartListRow[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(20);
  const [status, setStatus] = useState<AbandonedCartStatus | 'all'>('all');
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [detail, setDetail] = useState<DetailPayload | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const loadList = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        pageSize: String(pageSize),
        status,
      });
      if (query.trim()) params.set('q', query.trim());
      const response = await fetch(`/api/admin/abandoned-carts?${params.toString()}`);
      const data = (await response.json()) as {
        ok?: boolean;
        unavailable?: boolean;
        metrics?: AbandonedCartMetrics;
        rows?: AbandonedCartListRow[];
        total?: number;
        error?: string;
      };
      if (!response.ok || !data.ok) {
        setError(data.error ?? 'Unable to load abandoned carts.');
        setLoading(false);
        return;
      }
      if (data.unavailable) {
        setError('Database is not configured — abandoned cart data is unavailable.');
      }
      setMetrics(data.metrics ?? null);
      setRows(data.rows ?? []);
      setTotal(data.total ?? 0);
      setLoading(false);
    } catch {
      setError('Unable to load abandoned carts.');
      setLoading(false);
    }
  }, [page, pageSize, query, status]);

  useEffect(() => {
    void loadList();
  }, [loadList]);

  const openDetail = async (cartId: string) => {
    setActionMessage(null);
    try {
      const response = await fetch(
        `/api/admin/abandoned-carts?cartId=${encodeURIComponent(cartId)}`,
      );
      const data = (await response.json()) as DetailPayload & { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        setActionMessage(data.error ?? 'Unable to load cart detail.');
        return;
      }
      setDetail(data);
    } catch {
      setActionMessage('Unable to load cart detail.');
    }
  };

  const runAction = async (
    action: 'send_email' | 'stop_recovery' | 'mark_lost' | 'copy_recovery_url',
    cartId: string,
  ) => {
    setBusy(true);
    setActionMessage(null);
    try {
      const response = await fetch('/api/admin/abandoned-carts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(readCsrfToken() ? { 'x-csrf-token': readCsrfToken()! } : {}),
        },
        body: JSON.stringify({ cartId, action }),
      });
      const data = (await response.json()) as {
        ok?: boolean;
        error?: string;
        recoveryUrl?: string;
        sent?: boolean;
        sequenceNumber?: number;
      };
      if (!response.ok || !data.ok) {
        setActionMessage(data.error ?? 'Action failed.');
        setBusy(false);
        return;
      }
      if (action === 'copy_recovery_url' && data.recoveryUrl) {
        await navigator.clipboard.writeText(data.recoveryUrl);
        setActionMessage('Recovery URL copied to clipboard.');
      } else if (action === 'send_email') {
        setActionMessage(`Recovery email ${data.sequenceNumber ?? ''} sent.`);
      } else if (action === 'stop_recovery') {
        setActionMessage('Automated recovery stopped.');
      } else if (action === 'mark_lost') {
        setActionMessage('Cart marked as lost.');
      }
      await loadList();
      await openDetail(cartId);
    } catch {
      setActionMessage('Action failed.');
    } finally {
      setBusy(false);
    }
  };

  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currency = (metrics?.currency || 'USD') as CurrencyCode;

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Abandoned Carts"
        description="Track unfinished checkouts and recovery email performance."
      />

      <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Active checkouts" value={loading ? '…' : (metrics?.activeCheckouts ?? 0)} />
        <AdminStatCard label="Abandoned carts" value={loading ? '…' : (metrics?.abandonedCarts ?? 0)} />
        <AdminStatCard label="Recovered carts" value={loading ? '…' : (metrics?.recoveredCarts ?? 0)} />
        <AdminStatCard label="Lost carts" value={loading ? '…' : (metrics?.lostCarts ?? 0)} />
        <AdminStatCard
          label="Abandoned cart value"
          value={loading ? '…' : formatMoney(metrics?.abandonedCartValue ?? 0, currency)}
        />
        <AdminStatCard
          label="Recovered revenue"
          value={loading ? '…' : formatMoney(metrics?.recoveredRevenue ?? 0, currency)}
        />
        <AdminStatCard
          label="Recovery rate"
          value={loading ? '…' : `${metrics?.recoveryRate ?? 0}%`}
          trend="Recovered ÷ (abandoned + recovered + lost)"
        />
      </div>

      <div className="flex flex-col gap-3 rounded-lg border p-4 sm:flex-row sm:items-end">
        <div className="flex-1 space-y-1">
          <label className="text-sm text-muted-foreground" htmlFor="ac-search">
            Search
          </label>
          <Input
            id="ac-search"
            value={query}
            onChange={(e) => {
              setPage(1);
              setQuery(e.target.value);
            }}
            placeholder="Email, name, service, cart id"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-muted-foreground" htmlFor="ac-status">
            Status
          </label>
          <select
            id="ac-status"
            className="flex h-10 rounded-md border border-input bg-background px-3 text-sm"
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value as AbandonedCartStatus | 'all');
            }}
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="abandoned">Abandoned</option>
            <option value="recovered">Recovered</option>
            <option value="lost">Lost</option>
          </select>
        </div>
        <Button type="button" variant="outline" onClick={() => void loadList()}>
          Refresh
        </Button>
      </div>

      {error ? (
        <p className="text-sm text-destructive" role="alert">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b bg-muted/40 text-muted-foreground">
            <tr>
              <th className="px-3 py-2 font-medium">Customer</th>
              <th className="px-3 py-2 font-medium">Service</th>
              <th className="px-3 py-2 font-medium">Value</th>
              <th className="px-3 py-2 font-medium">Started</th>
              <th className="px-3 py-2 font-medium">Abandoned</th>
              <th className="px-3 py-2 font-medium">Last email</th>
              <th className="px-3 py-2 font-medium">Status</th>
              <th className="px-3 py-2 font-medium">Order</th>
              <th className="px-3 py-2 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td className="px-3 py-6 text-muted-foreground" colSpan={9}>
                  Loading…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td className="px-3 py-6 text-muted-foreground" colSpan={9}>
                  No carts found.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="border-b last:border-0">
                  <td className="px-3 py-2">
                    <div className="font-medium">{row.customerName || '—'}</div>
                    <div className="text-xs text-muted-foreground">{row.email}</div>
                  </td>
                  <td className="px-3 py-2">
                    <div>{row.serviceName || '—'}</div>
                    <div className="text-xs text-muted-foreground">{row.packageTitle || ''}</div>
                  </td>
                  <td className="px-3 py-2">
                    {formatMoney(row.totalAmount, (row.currency || 'USD') as CurrencyCode)}
                  </td>
                  <td className="px-3 py-2 whitespace-nowrap">{formatWhen(row.createdAt)}</td>
                  <td className="px-3 py-2 whitespace-nowrap">{formatWhen(row.abandonedAt)}</td>
                  <td className="px-3 py-2">{row.lastRecoverySequence || '—'}</td>
                  <td className="px-3 py-2 capitalize">{row.status}</td>
                  <td className="px-3 py-2 font-mono text-xs">{row.recoveredOrderId || '—'}</td>
                  <td className="px-3 py-2">
                    <Button type="button" size="sm" variant="outline" onClick={() => void openDetail(row.id)}>
                      View
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between gap-3">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages} · {total} total
        </p>
        <div className="flex gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Previous
          </Button>
          <Button
            type="button"
            variant="outline"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      </div>

      {detail ? (
        <div className="fixed inset-0 z-50 flex justify-end bg-black/40">
          <div className="flex h-full w-full max-w-lg flex-col overflow-y-auto bg-background shadow-xl">
            <div className="flex items-start justify-between gap-3 border-b p-4">
              <div>
                <h2 className="text-lg font-semibold">Cart detail</h2>
                <p className="font-mono text-xs text-muted-foreground">{detail.cart.id}</p>
              </div>
              <Button type="button" variant="ghost" onClick={() => setDetail(null)}>
                Close
              </Button>
            </div>
            <div className="space-y-4 p-4 text-sm">
              {actionMessage ? (
                <p className="rounded-md border px-3 py-2 text-sm" role="status">
                  {actionMessage}
                </p>
              ) : null}
              <div>
                <h3 className="font-medium">Customer</h3>
                <p>{detail.cart.customerName || '—'}</p>
                <p className="text-muted-foreground">{detail.cart.email}</p>
              </div>
              <div>
                <h3 className="font-medium">Package</h3>
                <p>
                  {detail.cart.serviceName || '—'}
                  {detail.cart.packageTitle ? ` · ${detail.cart.packageTitle}` : ''}
                </p>
                <p className="text-muted-foreground">{detail.cart.quantityLabel || ''}</p>
                <p className="text-muted-foreground">{detail.cart.publicDestination || ''}</p>
                <p className="mt-1 font-semibold">
                  {formatMoney(
                    detail.cart.totalAmount,
                    (detail.cart.currency || 'USD') as CurrencyCode,
                  )}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Timeline</h3>
                <ul className="mt-1 space-y-1 text-muted-foreground">
                  <li>Started: {formatWhen(detail.cart.createdAt)}</li>
                  <li>Last activity: {formatWhen(detail.cart.lastActivityAt)}</li>
                  <li>Abandoned: {formatWhen(detail.cart.abandonedAt)}</li>
                  <li>Recovery click: {formatWhen(detail.cart.recoveryClickedAt)}</li>
                  <li>Recovered: {formatWhen(detail.cart.recoveredAt)}</li>
                  <li>Status: {detail.cart.status}</li>
                  <li>Recovered order: {detail.cart.recoveredOrderId || '—'}</li>
                  <li>Linked order: {detail.cart.linkedOrderId || '—'}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Recovery emails</h3>
                {detail.emails.length === 0 ? (
                  <p className="text-muted-foreground">None sent yet.</p>
                ) : (
                  <ul className="mt-1 space-y-2">
                    {detail.emails.map((email) => (
                      <li key={email.id} className="rounded border px-3 py-2">
                        <div className="font-medium">
                          Step {email.sequenceNumber} · {email.status}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Scheduled {formatWhen(email.scheduledAt)}
                          {email.sentAt ? ` · Sent ${formatWhen(email.sentAt)}` : ''}
                          {email.triggeredBy ? ` · ${email.triggeredBy}` : ''}
                        </div>
                        {email.error ? (
                          <div className="text-xs text-destructive">{email.error}</div>
                        ) : null}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className="flex flex-wrap gap-2 border-t pt-4">
                <Button
                  type="button"
                  disabled={busy}
                  onClick={() => void runAction('send_email', detail.cart.id)}
                >
                  Send recovery email
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={() => void runAction('copy_recovery_url', detail.cart.id)}
                >
                  Copy recovery URL
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  disabled={busy}
                  onClick={() => void runAction('stop_recovery', detail.cart.id)}
                >
                  Stop recovery
                </Button>
                <Button
                  type="button"
                  variant="destructive"
                  disabled={busy}
                  onClick={() => void runAction('mark_lost', detail.cart.id)}
                >
                  Mark lost
                </Button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
