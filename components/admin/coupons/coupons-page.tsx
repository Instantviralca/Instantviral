'use client';

import { useEffect, useMemo, useState } from 'react';

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
import { getAdminCouponEditor, getAdminCouponRows } from '@/lib/admin/coupons';
import type {
  AdminCouponEditorModel,
  AdminCouponFilters,
  AdminCouponRow,
} from '@/types/admin-coupons';

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
      : `$${coupon.discountValue}`;
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
    return <AdminEmptyState title="No coupons found" description="Create coupons when CRUD is connected." />;
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

export function CouponStatsCard({ model }: { model: AdminCouponEditorModel }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <AdminStatCard label="Times used" value={model.stats.timesUsed} />
      <AdminStatCard label="Total discount given" value={model.stats.totalDiscountGiven} />
      <AdminStatCard label="Revenue generated" value={model.stats.revenueGenerated} />
      <AdminStatCard
        label="Last used"
        value={model.stats.lastUsedAt ? new Date(model.stats.lastUsedAt).toLocaleDateString() : '—'}
      />
    </div>
  );
}

export function CouponRulesTab({ model }: { model: AdminCouponEditorModel }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-1">
        <Label>Discount type</Label>
        <Input defaultValue={model.discountType} readOnly />
      </div>
      <div className="space-y-1">
        <Label>Discount value</Label>
        <Input defaultValue={String(model.discountValue)} readOnly />
      </div>
      <div className="space-y-1">
        <Label>Minimum order</Label>
        <Input defaultValue={model.minOrderAmount ? String(model.minOrderAmount) : '—'} readOnly />
      </div>
      <div className="space-y-1">
        <Label>Usage limit</Label>
        <Input defaultValue={model.usageLimit ? String(model.usageLimit) : '—'} readOnly />
      </div>
    </div>
  );
}

export function CouponValidityTab({ model }: { model: AdminCouponEditorModel }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-1">
        <Label>Start date</Label>
        <Input defaultValue={model.startAt ?? '—'} readOnly />
      </div>
      <div className="space-y-1">
        <Label>Expiry date</Label>
        <Input defaultValue={model.expiresAt ?? '—'} readOnly />
      </div>
      <div className="space-y-1 sm:col-span-2">
        <Label>Status</Label>
        <Input defaultValue={model.status} readOnly />
      </div>
    </div>
  );
}

export function CouponPreview({ model }: { model: AdminCouponEditorModel }) {
  const sampleSubtotal = 50;
  const discount =
    model.discountType === 'percentage'
      ? (sampleSubtotal * model.discountValue) / 100
      : model.discountValue;
  const total = Math.max(sampleSubtotal - discount, 0);
  return (
    <div className="rounded-lg border p-4 text-sm space-y-2">
      <p className="font-medium">Sample order summary</p>
      <p>Subtotal: ${sampleSubtotal.toFixed(2)}</p>
      <p>
        Coupon {model.code}: −${discount.toFixed(2)}
      </p>
      <p className="font-semibold">Total: ${total.toFixed(2)}</p>
    </div>
  );
}

type TabId = 'rules' | 'validity' | 'preview' | 'stats';

export function CouponEditor({
  open,
  model,
  onOpenChange,
}: {
  open: boolean;
  model: AdminCouponEditorModel | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<TabId>('rules');
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{model?.code ?? 'Coupon editor'}</SheetTitle>
          <SheetDescription>Architecture editor — CRUD not wired.</SheetDescription>
        </SheetHeader>
        {model ? (
          <div className="mt-4 space-y-4">
            <div className="space-y-1">
              <Label>Campaign name</Label>
              <Input defaultValue={model.campaignName} readOnly />
            </div>
            <div className="flex flex-wrap gap-2">
              {(['rules', 'validity', 'preview', 'stats'] as TabId[]).map((id) => (
                <Button
                  key={id}
                  type="button"
                  size="sm"
                  variant={tab === id ? 'default' : 'outline'}
                  onClick={() => setTab(id)}
                >
                  {id}
                </Button>
              ))}
            </div>
            {tab === 'rules' ? <CouponRulesTab model={model} /> : null}
            {tab === 'validity' ? <CouponValidityTab model={model} /> : null}
            {tab === 'preview' ? <CouponPreview model={model} /> : null}
            {tab === 'stats' ? <CouponStatsCard model={model} /> : null}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

export function CouponsPage() {
  const rows = useMemo(() => getAdminCouponRows(), []);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<AdminCouponFilters>({ status: 'all', discountType: 'all' });
  const [page, setPage] = useState(1);
  const [editor, setEditor] = useState<AdminCouponEditorModel | null>(null);
  const pageSize = 20;

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

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Coupons" description="Discount coupons for checkout." />
      <CouponSearch value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
      <CouponFilters filters={filters} onChange={(next) => { setFilters(next); setPage(1); }} />
      <CouponsTable
        coupons={paginate(filtered, page, pageSize)}
        onEdit={(id) => setEditor(getAdminCouponEditor(id))}
      />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filtered.length} coupons · Page {page}/{pages}</p>
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <Button type="button" size="sm" variant="outline" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      </div>
      <CouponEditor open={Boolean(editor)} model={editor} onOpenChange={(open) => !open && setEditor(null)} />
    </div>
  );
}
