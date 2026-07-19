'use client';

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import { ActiveFilterChips } from '@/components/learn/search/ActiveFilterChips';
import { ClearFiltersButton } from '@/components/learn/search/ClearFiltersButton';
import { LearnEmptyState } from '@/components/learn/search/LearnEmptyState';
import { LearnFilterDrawer } from '@/components/learn/search/LearnFilterDrawer';
import { LearnFilters } from '@/components/learn/search/LearnFilters';
import { LearnPagination } from '@/components/learn/search/LearnPagination';
import { LearnResults } from '@/components/learn/search/LearnResults';
import { LearnResultsCount } from '@/components/learn/search/LearnResultsCount';
import { LearnSearch } from '@/components/learn/search/LearnSearch';
import { LearnSortSelect } from '@/components/learn/search/LearnSortSelect';
import { LEARN_SEARCH_DEBOUNCE_MS } from '@/config/learn-search';
import {
  learnSearchAnalyticsEvents,
  trackLearnSearchEvent,
} from '@/lib/analytics/learn-search-events';
import {
  buildActiveFilterChips,
  clearLearnFilters,
  getActiveFilterCount,
  parseLearnSearchParams,
  removeFilterFromState,
  runLearnSearch,
  sanitizeSearchQuery,
  serializeLearnSearchParams,
} from '@/lib/learn/search';
import type { PublicLearnCategory, PublicLearnTag } from '@/types/learn';
import type {
  ActiveFilterChip,
  ArticleSearchDocument,
  LearnSearchState,
} from '@/types/learn-search';

export type LearnDiscoveryProps = {
  documents: ArticleSearchDocument[];
  categories: PublicLearnCategory[];
  tags: PublicLearnTag[];
  basePath: string;
  lockedCategory?: string;
  /** Server-parsed state for hydration-safe first paint. */
  initialState: LearnSearchState;
};

/**
 * Learn search & filters orchestrator — Document 15.05.
 * URL is the source of truth; search does not reload the page.
 */
export function LearnDiscovery({
  documents,
  categories,
  tags,
  basePath,
  lockedCategory,
  initialState,
}: LearnDiscoveryProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();
  const searchStartedRef = useRef(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const urlState = useMemo(() => {
    const parsed = parseLearnSearchParams(searchParams, { lockedCategory });
    return parsed.state;
  }, [searchParams, lockedCategory]);

  // Prefer URL after hydration; initialState matches SSR.
  const [hasHydrated, setHasHydrated] = useState(false);
  useEffect(() => {
    setHasHydrated(true);
  }, []);

  const state = hasHydrated ? urlState : initialState;

  const [queryInput, setQueryInput] = useState(initialState.q);
  useEffect(() => {
    setQueryInput(state.q);
  }, [state.q]);

  const [draftFilters, setDraftFilters] = useState(state);
  useEffect(() => {
    setDraftFilters(state);
  }, [state]);

  const replaceState = useCallback(
    (next: LearnSearchState) => {
      const params = serializeLearnSearchParams(next, {
        omitCategory: Boolean(lockedCategory),
      });
      const qs = params.toString();
      const href = qs ? `${basePath}?${qs}` : basePath;
      startTransition(() => {
        router.replace(href, { scroll: false });
      });
    },
    [basePath, lockedCategory, router],
  );

  const resultPage = useMemo(
    () => runLearnSearch(documents, state),
    [documents, state],
  );

  const chips = useMemo(
    () => buildActiveFilterChips(state, { lockedCategory }),
    [state, lockedCategory],
  );

  const activeCount = getActiveFilterCount(
    lockedCategory ? { ...state, category: undefined } : state,
  );

  const commitQuery = useCallback(
    (raw: string, options?: { submit?: boolean }) => {
      const q = sanitizeSearchQuery(raw);
      const next = { ...state, q, page: 1 };
      replaceState(next);

      if (options?.submit) {
        const page = runLearnSearch(documents, next);
        trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_search_submit, {
          queryLength: q.length,
          resultCount: page.total,
          category: next.category ?? lockedCategory,
          tag: next.tag,
          platform: next.platform,
          activeFilterCount: getActiveFilterCount(next),
        });
        if (page.total === 0) {
          trackLearnSearchEvent(
            learnSearchAnalyticsEvents.learn_search_no_results,
            {
              queryLength: q.length,
              resultCount: 0,
              category: next.category ?? lockedCategory,
            },
          );
        }
      }
    },
    [documents, lockedCategory, replaceState, state],
  );

  const onQueryChange = (value: string) => {
    setQueryInput(value);
    if (!searchStartedRef.current && value.trim()) {
      searchStartedRef.current = true;
      trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_search_start, {
        queryLength: value.trim().length,
      });
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      commitQuery(value);
    }, LEARN_SEARCH_DEBOUNCE_MS);
  };

  useEffect(() => {
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, []);

  const applyPartial = (partial: Partial<LearnSearchState>) => {
    replaceState({ ...state, ...partial, page: partial.page ?? 1 });
  };

  const onClearAll = () => {
    const next = clearLearnFilters({
      lockedCategory,
    });
    setQueryInput('');
    replaceState(next);
    trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_filters_clear, {
      resultCount: documents.length,
      category: lockedCategory,
    });
  };

  const onRemoveChip = (chip: ActiveFilterChip) => {
    const next = removeFilterFromState(state, chip.field);
    if (lockedCategory) next.category = lockedCategory;
    if (chip.field === 'q') setQueryInput('');
    replaceState(next);
    trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_filter_remove, {
      filterField: chip.field,
      category: next.category,
      tag: next.tag,
      platform: next.platform,
      activeFilterCount: getActiveFilterCount(next),
    });
  };

  return (
    <div className="overflow-x-hidden" data-learn-discovery data-pathname={pathname}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <LearnSearch
          value={queryInput}
          onChange={onQueryChange}
          onClear={() => {
            setQueryInput('');
            commitQuery('');
          }}
          onSubmit={() => commitQuery(queryInput, { submit: true })}
          className="w-full max-w-xl"
        />
        <div className="flex flex-wrap items-center gap-3">
          <LearnFilterDrawer
            state={state}
            draft={draftFilters}
            onDraftChange={(partial) =>
              setDraftFilters((current) => ({ ...current, ...partial }))
            }
            onApply={() => {
              const next = {
                ...draftFilters,
                category: lockedCategory ?? draftFilters.category,
                page: 1,
              };
              replaceState(next);
              trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_filter_apply, {
                category: next.category,
                tag: next.tag,
                platform: next.platform,
                readingTime: next.readingTime,
                featured: next.featured,
                activeFilterCount: getActiveFilterCount(next),
                resultCount: runLearnSearch(documents, next).total,
              });
            }}
            onClear={onClearAll}
            onOpenChange={(open) => {
              if (open) {
                setDraftFilters(state);
                trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_filter_open, {
                  category: lockedCategory ?? state.category,
                });
              }
            }}
            categories={categories}
            tags={tags}
            lockedCategory={lockedCategory}
            resultCount={resultPage.total}
          />
          <LearnSortSelect
            value={state.sort}
            hasQuery={Boolean(state.q)}
            onChange={(sort) => {
              applyPartial({ sort, page: 1 });
              trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_sort_change, {
                sort,
                category: lockedCategory ?? state.category,
              });
            }}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
        <aside className="hidden lg:block" aria-label="Filters">
          <LearnFilters
            state={state}
            categories={categories}
            tags={tags}
            lockedCategory={lockedCategory}
            onChange={(partial) => {
              applyPartial(partial);
              trackLearnSearchEvent(learnSearchAnalyticsEvents.learn_filter_apply, {
                category: partial.category ?? state.category,
                tag: partial.tag ?? state.tag,
                platform: partial.platform ?? state.platform,
                readingTime: partial.readingTime ?? state.readingTime,
                featured: partial.featured ?? state.featured,
              });
            }}
          />
          <ClearFiltersButton
            className="mt-4 w-full"
            disabled={activeCount === 0 && !state.q}
            onClick={onClearAll}
          />
        </aside>

        <div className="min-w-0 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <LearnResultsCount count={resultPage.total} />
            {activeCount > 0 || state.q ? (
              <ClearFiltersButton
                className="lg:hidden"
                disabled={activeCount === 0 && !state.q}
                onClick={onClearAll}
                label="Clear All"
              />
            ) : null}
          </div>

          <ActiveFilterChips chips={chips} onRemove={onRemoveChip} />

          {resultPage.total === 0 ? (
            <LearnEmptyState
              hasQuery={Boolean(state.q)}
              hasFilters={activeCount > 0}
              onClearSearch={() => {
                setQueryInput('');
                commitQuery('');
              }}
              onClearFilters={onClearAll}
            />
          ) : (
            <>
              <LearnResults
                items={resultPage.items}
                onResultClick={(item) => {
                  trackLearnSearchEvent(
                    learnSearchAnalyticsEvents.learn_article_result_click,
                    {
                      articleSlug: item.slug,
                      category: item.categorySlug,
                      resultCount: resultPage.total,
                    },
                  );
                }}
              />
              <LearnPagination
                page={resultPage.page}
                totalPages={resultPage.totalPages}
                onPageChange={(page) => {
                  applyPartial({ page });
                  trackLearnSearchEvent(
                    learnSearchAnalyticsEvents.learn_pagination_click,
                    {
                      page,
                      category: lockedCategory ?? state.category,
                    },
                  );
                }}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
