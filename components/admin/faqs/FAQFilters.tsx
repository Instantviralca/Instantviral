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
import { FAQ_CATEGORIES } from '@/data/faqs/categories';
import type { AdminFaqFilters } from '@/types/admin-faqs';

export type FAQFiltersProps = {
  filters: AdminFaqFilters;
  onChange: (next: AdminFaqFilters) => void;
};

/**
 * Admin FAQ filters — Document 14.04 architecture.
 */
export function FAQFilters({ filters, onChange }: FAQFiltersProps) {
  return (
    <AdminFilterBar>
      <div className="space-y-1">
        <Label>Status</Label>
        <Select
          value={filters.status ?? 'all'}
          onValueChange={(value) =>
            onChange({ ...filters, status: value as AdminFaqFilters['status'] })
          }
        >
          <SelectTrigger className="w-[160px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="pending_review">Pending Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="hidden">Hidden</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label>Category</Label>
        <Select
          value={filters.category ?? 'all'}
          onValueChange={(value) =>
            onChange({ ...filters, category: value as AdminFaqFilters['category'] })
          }
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {FAQ_CATEGORIES.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label>Featured</Label>
        <Select
          value={
            filters.featured === true ? 'yes' : filters.featured === false ? 'no' : 'all'
          }
          onValueChange={(value) =>
            onChange({
              ...filters,
              featured: value === 'all' ? 'all' : value === 'yes',
            })
          }
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="yes">Featured</SelectItem>
            <SelectItem value="no">Not featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label>Schema</Label>
        <Select
          value={
            filters.schemaEligible === true
              ? 'yes'
              : filters.schemaEligible === false
                ? 'no'
                : 'all'
          }
          onValueChange={(value) =>
            onChange({
              ...filters,
              schemaEligible: value === 'all' ? 'all' : value === 'yes',
            })
          }
        >
          <SelectTrigger className="w-[140px]">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="yes">Eligible</SelectItem>
            <SelectItem value="no">Not eligible</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </AdminFilterBar>
  );
}
