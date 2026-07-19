'use client';

import { AdminFilterBar } from '@/components/admin/common/admin-filter-bar';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ORDER_STATUSES } from '@/lib/orders/status';
import type { AdminOrderFilters, AdminOrderSort } from '@/types/admin-orders';
import type { PlatformId } from '@/types/platform';

type OrderFiltersProps = {
  filters: AdminOrderFilters;
  sort: AdminOrderSort;
  serviceOptions: Array<{ slug: string; name: string }>;
  onFiltersChange: (next: AdminOrderFilters) => void;
  onSortChange: (sort: AdminOrderSort) => void;
};

const platforms: Array<PlatformId | 'all'> = [
  'all',
  'instagram',
  'tiktok',
  'youtube',
  'facebook',
];

export function OrderFilters({
  filters,
  sort,
  serviceOptions,
  onFiltersChange,
  onSortChange,
}: OrderFiltersProps) {
  return (
    <AdminFilterBar>
      <div className="space-y-1">
        <Label htmlFor="order-status">Status</Label>
        <Select
          value={filters.status ?? 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, status: value as AdminOrderFilters['status'] })
          }
        >
          <SelectTrigger id="order-status" className="w-[160px]">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            {ORDER_STATUSES.map((status) => (
              <SelectItem key={status} value={status}>
                {status}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="order-platform">Platform</Label>
        <Select
          value={filters.platform ?? 'all'}
          onValueChange={(value) =>
            onFiltersChange({
              ...filters,
              platform: value as AdminOrderFilters['platform'],
            })
          }
        >
          <SelectTrigger id="order-platform" className="w-[160px]">
            <SelectValue placeholder="Platform" />
          </SelectTrigger>
          <SelectContent>
            {platforms.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="order-service">Service</Label>
        <Select
          value={filters.serviceSlug ?? 'all'}
          onValueChange={(value) =>
            onFiltersChange({ ...filters, serviceSlug: value })
          }
        >
          <SelectTrigger id="order-service" className="w-[200px]">
            <SelectValue placeholder="Service" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All services</SelectItem>
            {serviceOptions.map((service) => (
              <SelectItem key={service.slug} value={service.slug}>
                {service.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="order-sort">Sort</Label>
        <Select value={sort} onValueChange={(value) => onSortChange(value as AdminOrderSort)}>
          <SelectTrigger id="order-sort" className="w-[160px]">
            <SelectValue placeholder="Sort" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
            <SelectItem value="status">Status</SelectItem>
            <SelectItem value="total">Total</SelectItem>
            <SelectItem value="updated">Updated</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AdminFilterBar>
  );
}
