'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';

import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { AdminFilterBar } from '@/components/admin/common/admin-filter-bar';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { AdminSearch } from '@/components/admin/common/admin-search';
import { AdminStatCard } from '@/components/admin/cards/admin-stat-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { useDebouncedValue, paginate, totalPages } from '@/lib/admin/list-utils';
import type {
  AdminCouponEditorModel,
  AdminCouponFilters,
  AdminCouponRow,
} from '@/types/admin-coupons';

function readCsrfToken(): string | undefined {
  if (typeof document === 'undefined') return undefined;
  const match = document.cookie
    .split('; ')
    .find((row) => row.startsWith('iv_admin_csrf='));
  if (!match) return undefined;
  return decodeURIComponent(match.slice('iv_admin_csrf='.length));
}

type CouponDraft = {
  id?: string;
  code: string;
  campaignName: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  /** Percentage 1–100, or fixed major currency units for UI. */
  value: string;
  minOrderAmount: string;
  usageLimit: string;
  active: boolean;
  startAt: string;
  expiresAt: string;
};

function emptyDraft(): CouponDraft {
  return {
    code: '',
    campaignName: '',
    description: '',
    discountType: 'percentage',
    value: '10',
    minOrderAmount: '',
    usageLimit: '',
    active: true,
    startAt: '',
    expiresAt: '',
  };
}

function draftFromModel(model: AdminCouponEditorModel): CouponDraft {
  return {
    id: model.id,
    code: model.code,
    campaignName: model.campaignName,
    description: model.description ?? '',
    discountType: model.discountType,
    value:
      model.discountType === 'fixed'
        ? String((model.discountValue / 100).toFixed(2))
        : String(model.discountValue),
    minOrderAmount: model.minOrderAmount != null ? String(model.minOrderAmount / 100) : '',
    usageLimit: model.usageLimit != null ? String(model.usageLimit) : '',
    active: model.status === 'active',
    startAt: model.startAt?.slice(0, 10) ?? '',
    expiresAt: model.expiresAt?.slice(0, 10) ?? '',
  };
}

export function CouponSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const [local, setLocal] = useState(value);
  const debounced = useDebouncedValue(local);
  useEffect(() => onChange(debounced), [debounced]); // eslint-disable-line react-hooks/exhaustive-deps
  return (
    <AdminSearch
      value={local}
      onChange={setLocal}
      label="Search coupons"
      placeholder="Coupon code or campaign…"
    />
  );
}

export function CouponFilters({
  filters,
  onChange,
}: {
  filters: AdminCouponFilters;
  onChange: (next: AdminCouponFilters) => void;
}) {
  return (
    <AdminFilterBar>
      <div className="space-y-1">
        <Label>Status</Label>
        <Select
          value={filters.status ?? 'all'}
          onValueChange={(value) =>
            onChange({ ...filters, status: value as AdminCouponFilters['status'] })
          }
        >
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Discount type</Label>
        <Select
          value={filters.discountType ?? 'all'}
          onValueChange={(value) =>
            onChange({
              ...filters,
              discountType: value as AdminCouponFilters['discountType'],
            })
          }
        >
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="percentage">Percentage</SelectItem>
            <SelectItem value="fixed">Fixed</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AdminFilterBar>
  );
}

export function CouponRow({
  coupon,
  onEdit,
}: {
  coupon: AdminCouponRow;
  onEdit: () => void;
}) {
  const discount =
    coupon.discountType === 'percentage'
      ? `${coupon.discountValue}%`
      : `$${(coupon.discountValue / 100).toFixed(2)}`;
  return (
    <tr className="border-b last:border-0">
      <td className="px-3 py-3 font-medium">{coupon.code}</td>
      <td className="px-3 py-3">{coupon.campaignName}</td>
      <td className="px-3 py-3">{discount}</td>
      <td className="px-3 py-3">
        {coupon.usageCount}
        {coupon.usageLimit ? ` / ${coupon.usageLimit}` : ''}
      </td>
      <td className="px-3 py-3">{coupon.expiresAt ?? '—'}</td>
      <td className="px-3 py-3 capitalize">{coupon.status}</td>
      <td className="px-3 py-3">{coupon.updatedAt}</td>
      <td className="px-3 py-3">
        <Button type="button" size="sm" variant="outline" onClick={onEdit}>Edit</Button>
      </td>
    </tr>
  );
}

export function CouponsTable({
  coupons,
  onEdit,
}: {
  coupons: AdminCouponRow[];
  onEdit: (id: string) => void;
}) {
  if (coupons.length === 0) {
    return (
      <AdminEmptyState
        title="No coupons found"
        description="Create a coupon to offer checkout discounts."
      />
    );
  }
  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left">
              {['Code', 'Campaign', 'Discount', 'Usage', 'Expiry', 'Status', 'Updated', 'Actions'].map((h) => (
                <th key={h} className="px-3 py-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {coupons.map((coupon) => (
              <CouponRow key={coupon.id} coupon={coupon} onEdit={() => onEdit(coupon.id)} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 md:hidden">
        {coupons.map((coupon) => (
          <article key={coupon.id} className="rounded-lg border p-4 space-y-2">
            <p className="font-medium">{coupon.code}</p>
            <p className="text-sm text-muted-foreground capitalize">{coupon.status}</p>
            <Button type="button" size="sm" variant="outline" onClick={() => onEdit(coupon.id)}>
              Edit
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}

export function CouponEditor({
  open,
  draft,
  onDraftChange,
  onOpenChange,
  onSave,
  saving,
  error,
  isCreate,
}: {
  open: boolean;
  draft: CouponDraft | null;
  onDraftChange: (next: CouponDraft) => void;
  onOpenChange: (open: boolean) => void;
  onSave: () => void;
  saving: boolean;
  error: string | null;
  isCreate: boolean;
}) {
  if (!draft) return null;
  const sampleSubtotal = 50;
  const numericValue = Number(draft.value) || 0;
  const discount =
    draft.discountType === 'percentage'
      ? (sampleSubtotal * numericValue) / 100
      : numericValue;
  const total = Math.max(sampleSubtotal - discount, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange} modal={false}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{isCreate ? 'Create coupon' : `Edit ${draft.code}`}</SheetTitle>
          <SheetDescription>Coupons apply at checkout when active.</SheetDescription>
        </SheetHeader>
        <div className="mt-4 space-y-4">
          {error ? (
            <p className="rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="coupon-code">Code</Label>
              <Input
                id="coupon-code"
                value={draft.code}
                onChange={(e) => onDraftChange({ ...draft, code: e.target.value.toUpperCase() })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="coupon-campaign">Campaign name</Label>
              <Input
                id="coupon-campaign"
                value={draft.campaignName}
                onChange={(e) => onDraftChange({ ...draft, campaignName: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label>Discount type</Label>
              <Select
                value={draft.discountType}
                onValueChange={(value) =>
                  onDraftChange({
                    ...draft,
                    discountType: value as 'percentage' | 'fixed',
                  })
                }
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage</SelectItem>
                  <SelectItem value="fixed">Fixed amount</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1">
              <Label htmlFor="coupon-value">
                {draft.discountType === 'percentage' ? 'Percent' : 'Amount (USD)'}
              </Label>
              <Input
                id="coupon-value"
                type="number"
                min="0"
                step="0.01"
                value={draft.value}
                onChange={(e) => onDraftChange({ ...draft, value: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="coupon-min">Min order (USD)</Label>
              <Input
                id="coupon-min"
                type="number"
                min="0"
                step="0.01"
                value={draft.minOrderAmount}
                onChange={(e) => onDraftChange({ ...draft, minOrderAmount: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="coupon-limit">Usage limit</Label>
              <Input
                id="coupon-limit"
                type="number"
                min="0"
                value={draft.usageLimit}
                onChange={(e) => onDraftChange({ ...draft, usageLimit: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="coupon-start">Start date</Label>
              <Input
                id="coupon-start"
                type="date"
                value={draft.startAt}
                onChange={(e) => onDraftChange({ ...draft, startAt: e.target.value })}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="coupon-expiry">Expiry date</Label>
              <Input
                id="coupon-expiry"
                type="date"
                value={draft.expiresAt}
                onChange={(e) => onDraftChange({ ...draft, expiresAt: e.target.value })}
              />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <Label>Status</Label>
              <Select
                value={draft.active ? 'active' : 'inactive'}
                onValueChange={(value) =>
                  onDraftChange({ ...draft, active: value === 'active' })
                }
              >
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="rounded-lg border p-4 text-sm space-y-2">
            <p className="font-medium">Sample order summary</p>
            <p>Subtotal: ${sampleSubtotal.toFixed(2)}</p>
            <p>
              Coupon {draft.code || 'CODE'}: −${discount.toFixed(2)}
            </p>
            <p className="font-semibold">Total: ${total.toFixed(2)}</p>
          </div>

          <div className="flex gap-2">
            <Button type="button" onClick={onSave} disabled={saving}>
              {saving ? 'Saving…' : isCreate ? 'Create coupon' : 'Save changes'}
            </Button>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function CouponsPage() {
  const [rows, setRows] = useState<AdminCouponRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<AdminCouponFilters>({ status: 'all', discountType: 'all' });
  const [page, setPage] = useState(1);
  const [draft, setDraft] = useState<CouponDraft | null>(null);
  const [isCreate, setIsCreate] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const pageSize = 20;

  const load = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    try {
      const response = await fetch('/api/admin/coupons');
      const data = (await response.json()) as {
        ok?: boolean;
        coupons?: AdminCouponRow[];
        error?: string;
      };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? 'Unable to load coupons.');
      }
      setRows(data.coupons ?? []);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Unable to load coupons.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (filters.status && filters.status !== 'all' && row.status !== filters.status) return false;
      if (
        filters.discountType &&
        filters.discountType !== 'all' &&
        row.discountType !== filters.discountType
      ) {
        return false;
      }
      if (!q) return true;
      return (
        row.code.toLowerCase().includes(q) ||
        row.campaignName.toLowerCase().includes(q)
      );
    });
  }, [rows, query, filters]);

  const pages = totalPages(filtered.length, pageSize);
  const activeCount = rows.filter((r) => r.status === 'active').length;

  async function openEdit(id: string) {
    setSaveError(null);
    setIsCreate(false);
    const response = await fetch(`/api/admin/coupons?couponId=${encodeURIComponent(id)}`);
    const data = (await response.json()) as {
      ok?: boolean;
      coupon?: AdminCouponEditorModel;
      error?: string;
    };
    if (response.ok && data.ok && data.coupon) {
      setDraft(draftFromModel(data.coupon));
    } else {
      setSaveError(data.error ?? 'Unable to open coupon.');
    }
  }

  async function saveDraft() {
    if (!draft) return;
    setSaving(true);
    setSaveError(null);
    try {
      const csrf = readCsrfToken();
      const valueNumber = Number(draft.value);
      const payload = {
        couponId: draft.id,
        code: draft.code,
        campaignName: draft.campaignName,
        description: draft.description,
        discountType: draft.discountType,
        value:
          draft.discountType === 'fixed'
            ? Math.round(valueNumber * 100)
            : valueNumber,
        minSubtotal: draft.minOrderAmount
          ? Math.round(Number(draft.minOrderAmount) * 100)
          : '',
        maxRedemptions: draft.usageLimit ? Number(draft.usageLimit) : '',
        active: draft.active,
        startAt: draft.startAt,
        expiresAt: draft.expiresAt,
        currency: 'USD',
      };
      const response = await fetch('/api/admin/coupons', {
        method: isCreate ? 'POST' : 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          ...(csrf ? { 'x-csrf-token': csrf } : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { ok?: boolean; error?: string };
      if (!response.ok || !data.ok) {
        throw new Error(data.error ?? 'Unable to save coupon.');
      }
      setDraft(null);
      await load();
    } catch (error) {
      setSaveError(error instanceof Error ? error.message : 'Unable to save coupon.');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Coupons" description="Create and manage checkout discount coupons." />
      <div className="grid gap-3 sm:grid-cols-3">
        <AdminStatCard label="Total coupons" value={rows.length} />
        <AdminStatCard label="Active" value={activeCount} />
        <AdminStatCard label="Inactive / expired" value={rows.length - activeCount} />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <CouponSearch value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
        <Button
          type="button"
          onClick={() => {
            setIsCreate(true);
            setSaveError(null);
            setDraft(emptyDraft());
          }}
        >
          Add coupon
        </Button>
      </div>
      <CouponFilters filters={filters} onChange={(next) => { setFilters(next); setPage(1); }} />
      {loading ? <p className="text-sm text-muted-foreground">Loading coupons…</p> : null}
      {loadError ? (
        <p className="text-sm text-destructive" role="alert">{loadError}</p>
      ) : null}
      <CouponsTable
        coupons={paginate(filtered, page, pageSize)}
        onEdit={(id) => {
          void openEdit(id);
        }}
      />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filtered.length} coupons · Page {page}/{pages}</p>
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <Button type="button" size="sm" variant="outline" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      </div>
      <CouponEditor
        open={Boolean(draft)}
        draft={draft}
        isCreate={isCreate}
        saving={saving}
        error={saveError}
        onDraftChange={setDraft}
        onSave={() => {
          void saveDraft();
        }}
        onOpenChange={(open) => {
          if (!open) {
            setDraft(null);
            setSaveError(null);
          }
        }}
      />
    </div>
  );
}
