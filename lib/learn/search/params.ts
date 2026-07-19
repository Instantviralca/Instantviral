/**
 * Learn search URL state — Document 15.05.
 */

import {
  LEARN_PLATFORM_OPTIONS,
  LEARN_READING_TIME_OPTIONS,
  LEARN_SORT_OPTIONS,
} from '@/config/learn-search';
import { getCategories, getTags } from '@/lib/learn/taxonomy';
import { sanitizeSearchQuery } from '@/lib/learn/search/sanitize';
import type {
  ActiveFilterChip,
  LearnFilterValidationResult,
  LearnReadingTimeFilter,
  LearnSearchFilters,
  LearnSearchPlatform,
  LearnSearchState,
  LearnSortOption,
} from '@/types/learn-search';

const DEFAULT_STATE: LearnSearchState = {
  q: '',
  sort: 'relevance',
  page: 1,
};

export type LearnSearchParamsInput = {
  q?: string | null;
  category?: string | null;
  tag?: string | null;
  platform?: string | null;
  readingTime?: string | null;
  sort?: string | null;
  featured?: string | boolean | null;
  page?: string | number | null;
};

function isSortOption(value: string): value is LearnSortOption {
  return LEARN_SORT_OPTIONS.some((option) => option.value === value);
}

function isReadingTime(value: string): value is LearnReadingTimeFilter {
  return LEARN_READING_TIME_OPTIONS.some((option) => option.value === value);
}

function isPlatform(value: string): value is LearnSearchPlatform {
  return LEARN_PLATFORM_OPTIONS.some((option) => option.value === value);
}

function activeCategorySlugs(): Set<string> {
  return new Set(getCategories().map((category) => category.slug));
}

function activeTagSlugs(): Set<string> {
  return new Set(getTags().map((tag) => tag.slug));
}

export function clearLearnFilters(options?: {
  lockedCategory?: string;
  /** When set, keeps this query; otherwise clears search. */
  preserveQuery?: string;
}): LearnSearchState {
  return {
    ...DEFAULT_STATE,
    q: options?.preserveQuery ?? '',
    category: options?.lockedCategory,
    page: 1,
  };
}

export function getActiveFilterCount(state: LearnSearchState): number {
  let count = 0;
  if (state.q) count += 1;
  if (state.category) count += 1;
  if (state.tag) count += 1;
  if (state.platform) count += 1;
  if (state.readingTime) count += 1;
  if (state.featured) count += 1;
  return count;
}

export function validateLearnFilters(
  input: LearnSearchParamsInput,
  options?: { lockedCategory?: string },
): LearnFilterValidationResult {
  const ignored: LearnFilterValidationResult['ignored'] = [];
  const state: LearnSearchState = { ...DEFAULT_STATE };

  state.q = sanitizeSearchQuery(input.q);

  if (options?.lockedCategory) {
    state.category = options.lockedCategory;
  } else if (input.category) {
    const slug = sanitizeSearchQuery(input.category).toLowerCase();
    if (activeCategorySlugs().has(slug)) {
      state.category = slug;
    } else {
      ignored.push({
        field: 'category',
        value: String(input.category),
        message: 'Unsupported or inactive category ignored.',
      });
    }
  }

  if (input.tag) {
    const slug = sanitizeSearchQuery(input.tag).toLowerCase();
    if (activeTagSlugs().has(slug)) {
      state.tag = slug;
    } else {
      ignored.push({
        field: 'tag',
        value: String(input.tag),
        message: 'Unsupported or inactive tag ignored.',
      });
    }
  }

  if (input.platform) {
    const value = sanitizeSearchQuery(String(input.platform)).toLowerCase();
    if (isPlatform(value)) {
      state.platform = value;
    } else {
      ignored.push({
        field: 'platform',
        value: String(input.platform),
        message: 'Unsupported platform ignored.',
      });
    }
  }

  if (input.readingTime) {
    const value = sanitizeSearchQuery(String(input.readingTime));
    if (isReadingTime(value)) {
      state.readingTime = value;
    } else {
      ignored.push({
        field: 'readingTime',
        value: String(input.readingTime),
        message: 'Unsupported reading-time filter ignored.',
      });
    }
  }

  if (input.featured === true) {
    state.featured = true;
  } else if (typeof input.featured === 'string' && input.featured) {
    const value = sanitizeSearchQuery(input.featured).toLowerCase();
    if (value === 'true' || value === '1') {
      state.featured = true;
    } else if (value !== 'false' && value !== '0') {
      ignored.push({
        field: 'featured',
        value: String(input.featured),
        message: 'Unsupported featured value ignored.',
      });
    }
  }

  if (input.sort) {
    const value = sanitizeSearchQuery(String(input.sort)).toLowerCase();
    if (value === 'popular') {
      ignored.push({
        field: 'sort',
        value: 'popular',
        message: 'Popular sort is unavailable until a popularity metric exists.',
      });
      state.sort = 'relevance';
    } else if (isSortOption(value)) {
      state.sort = value;
    } else {
      ignored.push({
        field: 'sort',
        value: String(input.sort),
        message: 'Unsupported sort ignored.',
      });
    }
  }

  const pageRaw = input.page;
  const pageNum =
    typeof pageRaw === 'number'
      ? pageRaw
      : Number.parseInt(sanitizeSearchQuery(String(pageRaw ?? '1')), 10);
  state.page = Number.isFinite(pageNum) && pageNum > 0 ? Math.floor(pageNum) : 1;

  return {
    valid: ignored.length === 0,
    state,
    ignored,
  };
}

export function parseLearnSearchParams(
  params: URLSearchParams | Record<string, string | string[] | undefined>,
  options?: { lockedCategory?: string },
): LearnFilterValidationResult {
  const get = (key: string): string | undefined => {
    if (params instanceof URLSearchParams) {
      return params.get(key) ?? undefined;
    }
    const value = params[key];
    if (Array.isArray(value)) return value[0];
    return value;
  };

  return validateLearnFilters(
    {
      q: get('q'),
      category: get('category'),
      tag: get('tag'),
      platform: get('platform'),
      readingTime: get('readingTime'),
      sort: get('sort'),
      featured: get('featured'),
      page: get('page'),
    },
    options,
  );
}

export function serializeLearnSearchParams(
  state: LearnSearchState,
  options?: { omitCategory?: boolean },
): URLSearchParams {
  const params = new URLSearchParams();
  if (state.q) params.set('q', state.q);
  if (state.category && !options?.omitCategory) {
    params.set('category', state.category);
  }
  if (state.tag) params.set('tag', state.tag);
  if (state.platform) params.set('platform', state.platform);
  if (state.readingTime) params.set('readingTime', state.readingTime);
  if (state.sort && state.sort !== 'relevance') params.set('sort', state.sort);
  if (state.featured) params.set('featured', 'true');
  if (state.page > 1) params.set('page', String(state.page));
  return params;
}

export function buildActiveFilterChips(
  state: LearnSearchState,
  options?: { lockedCategory?: string },
): ActiveFilterChip[] {
  const chips: ActiveFilterChip[] = [];

  if (state.q) {
    chips.push({
      id: 'q',
      field: 'q',
      label: 'Search',
      value: state.q,
      removeLabel: `Remove search query ${state.q}`,
    });
  }

  if (state.category && state.category !== options?.lockedCategory) {
    const category = getCategories().find((item) => item.slug === state.category);
    chips.push({
      id: 'category',
      field: 'category',
      label: 'Category',
      value: category?.name ?? state.category,
      removeLabel: `Remove category filter ${category?.name ?? state.category}`,
    });
  }

  if (state.tag) {
    const tag = getTags().find((item) => item.slug === state.tag);
    chips.push({
      id: 'tag',
      field: 'tag',
      label: 'Tag',
      value: tag?.name ?? state.tag,
      removeLabel: `Remove tag filter ${tag?.name ?? state.tag}`,
    });
  }

  if (state.platform) {
    const platform = LEARN_PLATFORM_OPTIONS.find(
      (item) => item.value === state.platform,
    );
    chips.push({
      id: 'platform',
      field: 'platform',
      label: 'Platform',
      value: platform?.label ?? state.platform,
      removeLabel: `Remove platform filter ${platform?.label ?? state.platform}`,
    });
  }

  if (state.readingTime) {
    const reading = LEARN_READING_TIME_OPTIONS.find(
      (item) => item.value === state.readingTime,
    );
    chips.push({
      id: 'readingTime',
      field: 'readingTime',
      label: 'Reading time',
      value: reading?.label ?? state.readingTime,
      removeLabel: `Remove reading time filter ${reading?.label ?? state.readingTime}`,
    });
  }

  if (state.featured) {
    chips.push({
      id: 'featured',
      field: 'featured',
      label: 'Featured',
      value: 'Featured only',
      removeLabel: 'Remove featured filter',
    });
  }

  return chips;
}

export function removeFilterFromState(
  state: LearnSearchState,
  field: ActiveFilterChip['field'],
): LearnSearchState {
  const next: LearnSearchState = { ...state, page: 1 };
  if (field === 'q') next.q = '';
  if (field === 'category') delete next.category;
  if (field === 'tag') delete next.tag;
  if (field === 'platform') delete next.platform;
  if (field === 'readingTime') delete next.readingTime;
  if (field === 'featured') delete next.featured;
  return next;
}

export function filtersFromState(state: LearnSearchState): LearnSearchFilters {
  return {
    category: state.category,
    tag: state.tag,
    platform: state.platform,
    readingTime: state.readingTime,
    featured: state.featured,
  };
}
