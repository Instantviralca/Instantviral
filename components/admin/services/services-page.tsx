'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { AdminEmptyState } from '@/components/admin/common/admin-empty-state';
import { AdminFilterBar } from '@/components/admin/common/admin-filter-bar';
import { AdminPageHeader } from '@/components/admin/layout/admin-page-header';
import { AdminSearch } from '@/components/admin/common/admin-search';
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
import { Textarea } from '@/components/ui/textarea';
import { useDebouncedValue, paginate, totalPages } from '@/lib/admin/list-utils';
import { getAdminServiceEditor, getAdminServiceRows } from '@/lib/admin/services';
import type { AdminServiceEditorModel, AdminServiceFilters, AdminServiceRow } from '@/types/admin-services';
import type { PlatformId } from '@/types/platform';

export function ServiceSearch({
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
      label="Search services"
      placeholder="Name, slug, platform, keyword…"
    />
  );
}

export function ServiceFilters({
  filters,
  onChange,
}: {
  filters: AdminServiceFilters;
  onChange: (next: AdminServiceFilters) => void;
}) {
  const platforms: Array<PlatformId | 'all'> = ['all', 'instagram', 'tiktok', 'youtube', 'facebook'];
  return (
    <AdminFilterBar>
      <div className="space-y-1">
        <Label>Platform</Label>
        <Select
          value={filters.platform ?? 'all'}
          onValueChange={(value) => onChange({ ...filters, platform: value as AdminServiceFilters['platform'] })}
        >
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            {platforms.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Status</Label>
        <Select
          value={filters.status ?? 'all'}
          onValueChange={(value) => onChange({ ...filters, status: value as AdminServiceFilters['status'] })}
        >
          <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-1">
        <Label>Featured</Label>
        <Select
          value={filters.featured ?? 'all'}
          onValueChange={(value) => onChange({ ...filters, featured: value as AdminServiceFilters['featured'] })}
        >
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="yes">Featured</SelectItem>
            <SelectItem value="no">Not featured</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AdminFilterBar>
  );
}

export function ServiceRow({
  service,
  onEdit,
}: {
  service: AdminServiceRow;
  onEdit: () => void;
}) {
  return (
    <tr className="border-b last:border-0">
      <td className="px-3 py-3 font-medium">{service.name}</td>
      <td className="px-3 py-3 capitalize">{service.platformId}</td>
      <td className="px-3 py-3">{service.slug}</td>
      <td className="px-3 py-3 capitalize">{service.status}</td>
      <td className="px-3 py-3">{service.featured ? 'Yes' : 'No'}</td>
      <td className="px-3 py-3">{service.packageCount}</td>
      <td className="px-3 py-3">{service.seoTitle ? 'Ready' : 'Missing'}</td>
      <td className="px-3 py-3">{service.updatedAt}</td>
      <td className="px-3 py-3">
        <Button type="button" size="sm" variant="outline" onClick={onEdit}>Edit</Button>
      </td>
    </tr>
  );
}

export function ServicesTable({
  services,
  onEdit,
}: {
  services: AdminServiceRow[];
  onEdit: (slug: string) => void;
}) {
  if (services.length === 0) {
    return <AdminEmptyState title="No services found" description="Adjust search or filters." />;
  }
  return (
    <>
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full min-w-[960px] border-collapse text-sm">
          <thead>
            <tr className="border-b text-left">
              {['Service', 'Platform', 'Slug', 'Status', 'Featured', 'Packages', 'SEO', 'Updated', 'Actions'].map((h) => (
                <th key={h} className="px-3 py-2 font-medium">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <ServiceRow key={service.id} service={service} onEdit={() => onEdit(service.slug)} />
            ))}
          </tbody>
        </table>
      </div>
      <div className="grid gap-3 md:hidden">
        {services.map((service) => (
          <article key={service.id} className="rounded-lg border p-4 space-y-2">
            <p className="font-medium">{service.name}</p>
            <p className="text-sm text-muted-foreground capitalize">
              {service.platformId} · {service.status} · {service.packageCount} packages
            </p>
            <Button type="button" size="sm" variant="outline" onClick={() => onEdit(service.slug)}>
              Edit
            </Button>
          </article>
        ))}
      </div>
    </>
  );
}

export function ServicePreviewButton({ url }: { url: string }) {
  return (
    <Button asChild variant="secondary" size="sm">
      <Link href={url} target="_blank" rel="noreferrer">
        Preview page
      </Link>
    </Button>
  );
}

export function ServiceSeoTab({ model }: { model: AdminServiceEditorModel }) {
  return (
    <div className="space-y-3">
      <div className="space-y-1">
        <Label>SEO Title</Label>
        <Input defaultValue={model.seoTitle} readOnly />
      </div>
      <div className="space-y-1">
        <Label>Meta Description</Label>
        <Textarea defaultValue={model.seoDescription} readOnly />
      </div>
      <div className="space-y-1">
        <Label>Primary Keyword</Label>
        <Input defaultValue={model.primaryKeyword} readOnly />
      </div>
      <div className="rounded-md border p-3 text-sm">
        <p className="text-primary underline">{model.seoTitle}</p>
        <p className="text-xs text-muted-foreground">{model.url}</p>
        <p className="text-muted-foreground">{model.seoDescription}</p>
      </div>
    </div>
  );
}

export function ServicePricingTab({ model }: { model: AdminServiceEditorModel }) {
  return (
    <div className="space-y-2 text-sm">
      <p>{model.packageCount} linked package{model.packageCount === 1 ? '' : 's'} from Pricing System.</p>
      <ul className="list-disc pl-5">
        {model.packageIds.slice(0, 12).map((id) => (
          <li key={id}>{id}</li>
        ))}
      </ul>
      {model.packageCount === 0 ? (
        <p className="text-amber-700 dark:text-amber-400">Warning: no packages linked.</p>
      ) : null}
    </div>
  );
}

export function ServiceHomepageTab({ model }: { model: AdminServiceEditorModel }) {
  return (
    <div className="space-y-2 text-sm">
      <p>Featured on homepage: <strong>{model.featured ? 'Yes' : 'No'}</strong></p>
      <p>Display order: {model.homepageDisplayOrder ?? '—'}</p>
    </div>
  );
}

export function ServiceRelatedTab({ model }: { model: AdminServiceEditorModel }) {
  return (
    <p className="text-sm text-muted-foreground">
      Related services selected: {model.relatedServiceIds.length || 'none (resolved at runtime)'}
    </p>
  );
}

export function ServiceFaqTab({ model }: { model: AdminServiceEditorModel }) {
  return (
    <p className="text-sm text-muted-foreground">
      Linked FAQ ids: {model.faqIds.length ? model.faqIds.join(', ') : 'none configured'}
    </p>
  );
}

type TabId = 'seo' | 'pricing' | 'homepage' | 'related' | 'faq';

export function ServiceEditor({
  open,
  model,
  onOpenChange,
}: {
  open: boolean;
  model: AdminServiceEditorModel | null;
  onOpenChange: (open: boolean) => void;
}) {
  const [tab, setTab] = useState<TabId>('seo');
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle>{model?.name ?? 'Service editor'}</SheetTitle>
          <SheetDescription>Architecture editor — CRUD persistence not wired.</SheetDescription>
        </SheetHeader>
        {model ? (
          <div className="mt-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {(['seo', 'pricing', 'homepage', 'related', 'faq'] as TabId[]).map((id) => (
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
              <ServicePreviewButton url={model.url} />
            </div>
            {tab === 'seo' ? <ServiceSeoTab model={model} /> : null}
            {tab === 'pricing' ? <ServicePricingTab model={model} /> : null}
            {tab === 'homepage' ? <ServiceHomepageTab model={model} /> : null}
            {tab === 'related' ? <ServiceRelatedTab model={model} /> : null}
            {tab === 'faq' ? <ServiceFaqTab model={model} /> : null}
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
}

export function ServicesPage() {
  const rows = useMemo(() => getAdminServiceRows(), []);
  const [query, setQuery] = useState('');
  const [filters, setFilters] = useState<AdminServiceFilters>({ platform: 'all', status: 'all', featured: 'all' });
  const [page, setPage] = useState(1);
  const [editor, setEditor] = useState<AdminServiceEditorModel | null>(null);
  const pageSize = 20;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      if (filters.platform && filters.platform !== 'all' && row.platformId !== filters.platform) return false;
      if (filters.status && filters.status !== 'all' && row.status !== filters.status) return false;
      if (filters.featured === 'yes' && !row.featured) return false;
      if (filters.featured === 'no' && row.featured) return false;
      if (!q) return true;
      return (
        row.name.toLowerCase().includes(q) ||
        row.slug.toLowerCase().includes(q) ||
        row.platformId.includes(q) ||
        row.primaryKeyword.toLowerCase().includes(q)
      );
    });
  }, [rows, query, filters]);

  const pages = totalPages(filtered.length, pageSize);

  return (
    <div className="space-y-4">
      <AdminPageHeader title="Services" description="Manage commercial services from the Service Registry." />
      <ServiceSearch value={query} onChange={(v) => { setQuery(v); setPage(1); }} />
      <ServiceFilters filters={filters} onChange={(next) => { setFilters(next); setPage(1); }} />
      <ServicesTable
        services={paginate(filtered, page, pageSize)}
        onEdit={(slug) => setEditor(getAdminServiceEditor(slug))}
      />
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{filtered.length} services · Page {page}/{pages}</p>
        <div className="flex gap-2">
          <Button type="button" size="sm" variant="outline" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Previous</Button>
          <Button type="button" size="sm" variant="outline" disabled={page >= pages} onClick={() => setPage((p) => p + 1)}>Next</Button>
        </div>
      </div>
      <ServiceEditor open={Boolean(editor)} model={editor} onOpenChange={(open) => !open && setEditor(null)} />
    </div>
  );
}
