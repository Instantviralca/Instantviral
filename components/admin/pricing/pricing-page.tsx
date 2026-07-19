'use client';

import { useEffect, useMemo, useState } from 'react';

import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { AdminFilterBar } from '@/components/admin/common/admin-filter-bar';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { AdminSearch } from '@/components/admin/common/admin-search';
import { PricingCard } from '@/components/commerce/pricing/pricing-card';
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
import { getPackageBadges } from '@/data/pricing/badges';
import { useDebouncedValue, paginate, totalPages } from '@/lib/admin/list-utils';
import {
  getAdminPackageEditor,
  getAdminPricingRows,
  getAdminPricingServiceOptions,
} from '@/lib/admin/pricing';
import { formatMoney } from '@/lib/pricing/format';
import type {
  AdminPackageEditorModel,
  AdminPricingFilters,
  AdminPricingRow,
} from '@/types/admin-pricing';
import type { PackageBadgeId } from '@/types/pricing';
import type { PlatformId } from '@/types/platform';

export function PricingSearch({
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
      label="Search packages"
      placeholder="Package, service, platform, quantity…"
    />
  );
}

export function PricingFilters({
  filters,
  serviceOptions,
  onChange,
}: {
  filters: AdminPricingFilters;
  serviceOptions: Array<{ slug: string; name: string }>;
  onChange: (next: AdminPricingFilters) => void;
}) {
  const platforms: Array<PlatformId | 'all'> = ['all', 'instagram', 'tiktok', 'youtube', 'facebook'];
  return (
    <AdminFilterBar>
      <div className="space-y-1">
        <Label>Platform</Label>
        <Select
          value={filters.platform ?? 'all'}
          onValueChange={(value) =>
            onChange({ ...filters, platform: value as AdminPricingFilters['platform'] })
          }
        >
          <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {platforms.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Service</Label>
        <Select
          value={filters.serviceSlug ?? 'all'}
          onValueChange={(value) => onChange({ ...filters, serviceSlug: value })}
        >
          <SelectTrigger className="w-[200px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All services</SelectItem>
            {serviceOptions.map((s) => (
              <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Status</Label>
        <Select
          value={filters.status ?? 'all'}
          onValueChange={(value) =>
            onChange({ ...filters, status: value as AdminPricingFilters['status'] })
          }
        >
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AdminFilterBar>
  );
}

export function PricingRow({
  row,
  onEdit,
}: {
  row: AdminPricingRow;
  onEdit: () => void;
}) {
  return (
    <tr className="border-b last:border-0">
      <td className="px-3 py-3 font-medium">{row.packageName}</td>
      <td className="px-3 py-3 capitalize">{row.platformId}</td>
      <td className="px-3 py-3">{row.serviceName}</td>
      <td className="px-3 py-3">{row.quantity}</td>
      <td className="px-3 py-3">{formatMoney(row.price, row.currency)}</td>
      <td className="px-3 py-3">
        {row.compareAtPrice ? formatMoney(row.compareAtPrice, row.currency) : '—'}
      </td>
      <td className="px-3 py-3">{row.badge ?? '—'}</td>
      <td className="px-3 py-3">{row.deliveryTime || '—'}</td>
      <td className="px-3 py-3">{row.active ? 'Active' : 'Inactive'}</td>
      <td className="px-3 py-3">{row.updatedAt}</td>
      <td className="px-3 py-3">
        <Button type="button" size="sm" variant="outline" onClick={onEdit}>Edit</Button>
      </td>
    </tr>
  );
}

export function PricingTable({
  rows,
  onEdit,
}: {
  rows: AdminPricingRow[];
  onEdit: (id: string) => void;
}) {
  if (rows.length === 0) {
    return (
      <AdminEmptyState
        title="No packages found"
        description="Only real InstantViral.ca packages are listed. Adjust filters if needed."
      />
    );
  }
  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[1100px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left">
              {['Package', 'Platform', 'Service', 'Qty', 'Price', 'Compare', 'Badge', 'Delivery', 'Status', 'Updated', 'Actions'].map((h) => (
                <th key={h} className="px-3 py-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <PricingRow key={row.id} row={row} onEdit={() => onEdit(row.id)} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 md:hidden">
        {rows.map((row) => (
          <article key={row.id} className="rounded-lg border p-4 space-y-2">
            <p className="font-medium">{row.packageName}</p>
            <p className="text-sm text-muted-foreground">
              {row.serviceName} · {formatMoney(row.price, row.currency)}
            </p>
            <Button type="button" size="sm" variant="outline" onClick={() => onEdit(row.id)}>
              Edit
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}

export function PackageBadgeSelector({
  value,
}: {
  value?: PackageBadgeId;
}) {
  return (
    <Select defaultValue={value ?? 'none'}>
      <SelectTrigger><SelectValue placeholder="Badge" /></SelectTrigger>
      <SelectContent>
        <SelectItem value="none">None</SelectItem>
        {getPackageBadges().map((badge) => (
          <SelectItem key={badge.id} value={badge.id}>{badge.label}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export function PackagePricingTab({ model }: { model: AdminPackageEditorModel }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      <div className="space-y-1">
        <Label>Currency</Label>
        <Input defaultValue={model.currency} readOnly />
      </div>
      <div className="space-y-1">
        <Label>Quantity</Label>
        <Input defaultValue={String(model.quantity)} readOnly />
      </div>
      <div className="space-y-1">
        <Label>Regular / current price</Label>
        <Input defaultValue={formatMoney(model.price, model.currency)} readOnly />
      </div>
      <div className="space-y-1">
        <Label>Compare-at</Label>
        <Input
          defaultValue={
            model.compareAtPrice
              ? formatMoney(model.compareAtPrice, model.currency)
              : '—'
          }
          readOnly
        />
      </div>
    </div>
  );
}

export function PackageDeliveryTab({ model }: { model: AdminPackageEditorModel }) {
  return (
    <div className="space-y-1">
      <Label>Delivery time</Label>
      <Input defaultValue={model.deliveryTime || '(not set in InstantViral source)'} readOnly />
    </div>
  );
}

export function PackageFeaturesTab({ model }: { model: AdminPackageEditorModel }) {
  return (
    <ul className="list-disc space-y-1 pl-5 text-sm">
      {model.features.length === 0 ? (
        <li className="text-muted-foreground">No features in InstantViral source data.</li>
      ) : (
        model.features.map((feature) => <li key={feature}>{feature}</li>)
      )}
    </ul>
  );
}

export function PackagePreview({ model }: { model: AdminPackageEditorModel }) {
  return (
    <div className="max-w-sm">
      <PricingCard
        model={{
          package: model.source,
          priceDisplay: formatMoney(model.price, model.currency),
          compareAtDisplay: model.compareAtPrice
            ? formatMoney(model.compareAtPrice, model.currency)
            : undefined,
          badgeLabel: model.badge,
          primaryCta: { label: 'Order Now', href: `#${model.id}` },
        }}
      />
    </div>
  );
}

type TabId = 'pricing' | 'delivery' | 'features' | 'preview';

export function PackageEditor({
  open,
  model,
  onOpenChange,
}: {
  open: boolean;
  model: AdminPackageEditorModel | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<TabId>('pricing');
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{model?.packageName ?? 'Package editor'}</SheetTitle>
          <SheetDescription>
            Values come from InstantViral.ca pricing data. CRUD not wired.
          </SheetDescription>
        </SheetHeader>
        {model ? (
          <div className="mt-4 space-y-4">
            <div className="space-y-1">
              <Label>Badge</Label>
              <PackageBadgeSelector value={model.badge} />
            </div>
            <div className="flex flex-wrap gap-2">
              {(['pricing', 'delivery', 'features', 'preview'] as TabId[]).map((id) => (
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
            {tab === 'pricing' ? <PackagePricingTab model={model} /> : null}
            {tab === 'delivery' ? <PackageDeliveryTab model={model} /> : null}
            {tab === 'features' ? <PackageFeaturesTab model={model} /> : null}
            {tab === 'preview' ? <PackagePreview model={model} /> : null}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

export function PricingPage() {
  const rows = useMemo(() => getAdminPricingRows(), []);
  const serviceOptions = useMemo(() => getAdminPricingServiceOptions(), []);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<AdminPricingFilters>({
    platform: 'all',
    serviceSlug: 'all',
    status: 'all',
  });
  const [page, setPage] = useState(1);
  const [editor, setEditor] = useState<AdminPackageEditorModel | null>(null);
  const pageSize = 20;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (filters.platform && filters.platform !== 'all' && row.platformId !== filters.platform) return false;
      if (filters.serviceSlug && filters.serviceSlug !== 'all' && row.serviceSlug !== filters.serviceSlug) return false;
      if (filters.status === 'active' && !row.active) return false;
      if (filters.status === 'inactive' && row.active) return false;
      if (!q) return true;
      return (
        row.packageName.toLowerCase().includes(q) ||
        row.serviceName.toLowerCase().includes(q) ||
        row.platformId.includes(q) ||
        String(row.quantity).includes(q)
      );
    });
  }, [rows, query, filters]);

  const pages = totalPages(filtered.length, pageSize);

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Pricing"
        description="Manage InstantViral.ca packages. No placeholder packages."
      />
      <PricingSearch value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
      <PricingFilters
        filters={filters}
        serviceOptions={serviceOptions}
        onChange={(next) => { setFilters(next); setPage(1); }}
      />
      <PricingTable
        rows={paginate(filtered, page, pageSize)}
        onEdit={(id) => setEditor(getAdminPackageEditor(id))}
      />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filtered.length} packages · Page {page}/{pages}</p>
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <Button type="button" size="sm" variant="outline" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      </div>
      <PackageEditor open={Boolean(editor)} model={editor} onOpenChange={(open) => !open && setEditor(null)} />
    </div>
  );
}
