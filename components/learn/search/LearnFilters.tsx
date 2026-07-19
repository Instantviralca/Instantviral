'use client';

import type { ReactNode } from 'react';

import {
  LEARN_PLATFORM_OPTIONS,
  LEARN_READING_TIME_OPTIONS,
} from '@/config/learn-search';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import type { PublicLearnCategory, PublicLearnTag } from '@/types/learn';
import type { LearnSearchState } from '@/types/learn-search';

export type LearnFiltersProps = {
  state: LearnSearchState;
  categories: PublicLearnCategory[];
  tags: PublicLearnTag[];
  onChange: (next: Partial<LearnSearchState>) => void;
  lockedCategory?: string;
  idPrefix?: string;
  className?: string;
};

function SelectField({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <select
        id={id}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="flex min-h-11 w-full rounded-md border border-neutral-200 bg-white px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        {children}
      </select>
    </div>
  );
}

/**
 * Learn filter controls — Document 15.05.
 * Values come from shared category/tag registries.
 */
export function LearnFilters({
  state,
  categories,
  tags,
  onChange,
  lockedCategory,
  idPrefix = 'learn-filter',
  className,
}: LearnFiltersProps) {
  return (
    <div className={cn('space-y-4', className)}>
      {!lockedCategory ? (
        <SelectField
          id={`${idPrefix}-category`}
          label="Category"
          value={state.category ?? ''}
          onChange={(value) =>
            onChange({ category: value || undefined, page: 1 })
          }
        >
          <option value="">All categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>
              {category.name}
            </option>
          ))}
        </SelectField>
      ) : null}

      <SelectField
        id={`${idPrefix}-tag`}
        label="Tag"
        value={state.tag ?? ''}
        onChange={(value) => onChange({ tag: value || undefined, page: 1 })}
      >
        <option value="">All tags</option>
        {tags.map((tag) => (
          <option key={tag.id} value={tag.slug}>
            {tag.name}
          </option>
        ))}
      </SelectField>

      <SelectField
        id={`${idPrefix}-platform`}
        label="Platform"
        value={state.platform ?? ''}
        onChange={(value) =>
          onChange({
            platform: (value || undefined) as LearnSearchState['platform'],
            page: 1,
          })
        }
      >
        <option value="">All platforms</option>
        {LEARN_PLATFORM_OPTIONS.map((platform) => (
          <option key={platform.value} value={platform.value}>
            {platform.label}
          </option>
        ))}
      </SelectField>

      <SelectField
        id={`${idPrefix}-reading-time`}
        label="Reading time"
        value={state.readingTime ?? ''}
        onChange={(value) =>
          onChange({
            readingTime: (value || undefined) as LearnSearchState['readingTime'],
            page: 1,
          })
        }
      >
        <option value="">Any length</option>
        {LEARN_READING_TIME_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </SelectField>

      <div className="flex min-h-11 items-center gap-2">
        <input
          id={`${idPrefix}-featured`}
          type="checkbox"
          checked={Boolean(state.featured)}
          className="h-4 w-4 rounded border-neutral-300"
          onChange={(event) =>
            onChange({
              featured: event.target.checked ? true : undefined,
              page: 1,
            })
          }
        />
        <Label htmlFor={`${idPrefix}-featured`}>Featured only</Label>
      </div>
    </div>
  );
}
