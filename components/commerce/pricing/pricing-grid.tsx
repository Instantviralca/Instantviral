'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check } from 'lucide-react';

import { PricingCTA } from '@/components/commerce/pricing/pricing-cta';
import type { PricingCardModel, PricingGridProps } from '@/components/commerce/pricing/types';
import { PlatformIcon } from '@/components/marketing/platform-selector/platform-icon';
import { Skeleton } from '@/components/ui/skeleton';
import { getBadgeLabel } from '@/data/pricing/badges';
import { formatMoney } from '@/lib/pricing/format';
import { cn } from '@/lib/utils';
import type { PackageBadgeId } from '@/types/pricing';
import type { PlatformId } from '@/types/platform';

function formatQuantityShort(quantity: number): string {
  if (quantity >= 1000 && quantity % 1000 === 0) {
    return `${quantity / 1000}K`;
  }
  if (quantity >= 1000) {
    const k = quantity / 1000;
    return `${Number.isInteger(k) ? k : k.toFixed(1).replace(/\.0$/, '')}K`;
  }
  return new Intl.NumberFormat('en-US').format(quantity);
}

function resolveChipBadge(
  model: PricingCardModel,
  packages: PricingCardModel[],
): PackageBadgeId | undefined {
  if (model.package.badge) return model.package.badge;

  const bestValueId = packages.reduce((best, current) => {
    const bestUnit = best.package.price / Math.max(best.package.quantity, 1);
    const currentUnit = current.package.price / Math.max(current.package.quantity, 1);
    return currentUnit < bestUnit ? current : best;
  }).package.id;

  const popularIsBestValue = packages.some(
    (item) => item.package.badge === 'most-popular' && item.package.id === bestValueId,
  );

  if (model.package.id === bestValueId && !popularIsBestValue) {
    return 'best-value';
  }

  const qty = model.package.quantity;
  if (qty <= 100) return 'starter';
  if (qty >= 10000) return 'agency';
  if (qty >= 2500) return 'business';
  return undefined;
}

const SUMMARY_BENEFITS = [
  'Public Username Only',
  'Secure Checkout',
  'Delivery Starts Today',
  'Live Order Tracking',
  'Professional Support',
] as const;

const SELECTED_CHIP_STYLE = {
  background: 'linear-gradient(145deg, var(--brand-primary) 0%, #ea580c 55%, #c2410c 100%)',
} as const;

function PricingSkeletonCompact() {
  return (
    <div
      className="mx-auto w-full max-w-[1200px] space-y-5"
      aria-busy="true"
      aria-label="Loading packages"
    >
      <div className="flex gap-2.5 overflow-hidden sm:grid sm:grid-cols-4 lg:grid-cols-7">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-20 w-[5.2rem] shrink-0 rounded-xl sm:w-full" />
        ))}
      </div>
      <Skeleton className="h-40 w-full rounded-2xl" />
    </div>
  );
}

/**
 * Compact package chips + one selected-package summary panel.
 * When packages include commentType tiers, shows a High Quality / Premium toggle.
 */
export function PricingGrid({
  packages,
  onSelect,
  onContinue,
  className,
  loading,
  selectedPackageId,
  platformId,
  serviceName,
  summaryBenefits = SUMMARY_BENEFITS,
  infoPills,
}: PricingGridProps) {
  const commentTiers = useMemo(() => {
    const tiers = [
      ...new Set(
        packages
          .map((model) => model.package.commentType)
          .filter((tier): tier is string => Boolean(tier)),
      ),
    ];
    const preferred = ['High Quality', 'Premium'];
    return tiers.sort((a, b) => {
      const ai = preferred.indexOf(a);
      const bi = preferred.indexOf(b);
      if (ai === -1 && bi === -1) return a.localeCompare(b);
      if (ai === -1) return 1;
      if (bi === -1) return -1;
      return ai - bi;
    });
  }, [packages]);

  const hasTier = commentTiers.length > 1;
  const [activeTier, setActiveTier] = useState<string | null>(null);

  useEffect(() => {
    if (!hasTier) {
      setActiveTier(null);
      return;
    }
    setActiveTier((current) =>
      current && commentTiers.includes(current) ? current : commentTiers[0],
    );
  }, [hasTier, commentTiers]);

  const visiblePackages = useMemo(() => {
    if (!hasTier || !activeTier) return packages;
    return packages.filter((model) => model.package.commentType === activeTier);
  }, [packages, hasTier, activeTier]);

  const popularId = useMemo(() => {
    const featured = visiblePackages.find(
      (m) =>
        m.package.badge === 'most-popular' ||
        m.package.badge === 'best-value' ||
        m.package.badge === 'recommended',
    );
    return featured?.package.id ?? visiblePackages[0]?.package.id;
  }, [visiblePackages]);

  const activeId =
    selectedPackageId && visiblePackages.some((m) => m.package.id === selectedPackageId)
      ? selectedPackageId
      : (popularId ?? null);
  const active = visiblePackages.find((m) => m.package.id === activeId) ?? visiblePackages[0];
  const swipeable = visiblePackages.length > 4;
  const resolvedPlatform = (platformId ?? 'instagram') as PlatformId;
  const [priceAnimKey, setPriceAnimKey] = useState(active?.package.id ?? 'price');

  useEffect(() => {
    if (active?.package.id) setPriceAnimKey(active.package.id);
  }, [active?.package.id]);

  useEffect(() => {
    if (!hasTier || !activeTier || !popularId) return;
    if (selectedPackageId && visiblePackages.some((m) => m.package.id === selectedPackageId)) {
      return;
    }
    onSelect?.(popularId);
  }, [activeTier, hasTier, popularId, selectedPackageId, visiblePackages, onSelect]);

  const includedBenefits =
    active?.package.features && active.package.features.length > 0
      ? active.package.features
      : [...summaryBenefits];

  if (loading) return <PricingSkeletonCompact />;
  if (packages.length === 0) return null;

  return (
    <div
      className={cn('mx-auto w-full max-w-[1200px] space-y-11', className)}
      data-analytics="pricing-grid-compact"
    >
      {hasTier ? (
        <div
          className="mx-auto flex w-full max-w-md rounded-xl border border-[var(--border-subtle)] bg-white p-1 shadow-sm"
          role="tablist"
          aria-label="Comment package quality"
        >
          {commentTiers.map((tier) => {
            const selected = tier === activeTier;
            return (
              <button
                key={tier}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTier(tier)}
                className={cn(
                  'flex-1 rounded-lg px-3 py-2.5 text-sm font-semibold transition-[background-color,color,box-shadow] duration-200',
                  selected
                    ? 'bg-[linear-gradient(145deg,var(--brand-primary)_0%,#ea580c_100%)] text-white shadow-[0_10px_20px_-12px_rgba(249,115,22,0.85)]'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--brand-accent-soft)] hover:text-[var(--brand-primary)]',
                )}
              >
                {tier}
                {tier === 'Premium' ? (
                  <span
                    className={cn(
                      'ml-1.5 text-[10px] font-bold uppercase',
                      selected ? 'text-white/90' : 'text-[var(--brand-primary)]',
                    )}
                  >
                    Rec
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>
      ) : null}

      <div
        className={cn(
          swipeable
            ? 'flex snap-x snap-mandatory gap-2.5 overflow-x-auto pb-1 sm:grid sm:grid-cols-4 sm:overflow-visible sm:pb-0 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7'
            : 'grid grid-cols-2 gap-2.5 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7',
        )}
        role="listbox"
        aria-label="Package quantities"
      >
        {visiblePackages.map((model) => {
          const pkg = model.package;
          const selected = pkg.id === activeId;
          const badge = resolveChipBadge(model, visiblePackages);
          const savePercent =
            pkg.compareAtPrice && pkg.compareAtPrice > pkg.price
              ? Math.round(((pkg.compareAtPrice - pkg.price) / pkg.compareAtPrice) * 100)
              : null;

          return (
            <button
              key={pkg.id}
              type="button"
              role="option"
              aria-selected={selected}
              data-package-id={pkg.id}
              data-analytics="package-card"
              data-selected={selected ? 'true' : 'false'}
              onClick={() => onSelect?.(pkg.id)}
              style={selected ? SELECTED_CHIP_STYLE : undefined}
              className={cn(
                'group relative flex min-h-[5.75rem] flex-col items-center justify-center rounded-2xl border px-2.5 py-3.5 text-center transition-[transform,box-shadow,border-color,background-color,filter] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
                swipeable && 'w-[5.5rem] shrink-0 snap-start sm:w-auto sm:shrink',
                selected
                  ? 'z-[1] scale-[1.12] border-2 border-orange-200/90 text-white shadow-[0_22px_44px_-10px_rgba(249,115,22,0.72),0_0_0_1px_rgba(255,255,255,0.35)_inset] ring-4 ring-orange-200/50 brightness-105 motion-reduce:scale-100 motion-safe:animate-[iv-glow-pulse_3.2s_ease-in-out_infinite]'
                  : 'border-[var(--border-subtle)] bg-white text-[var(--text-primary)] shadow-[0_8px_20px_-14px_rgba(28,25,23,0.28)] hover:-translate-y-2 hover:scale-[1.03] hover:border-[color-mix(in_srgb,var(--brand-primary)_45%,var(--border-subtle))] hover:bg-[var(--brand-accent-soft)] hover:shadow-[0_18px_36px_-14px_rgba(249,115,22,0.42)] motion-reduce:hover:translate-y-0 motion-reduce:hover:scale-100',
              )}
            >
              {badge ? (
                <span
                  className={cn(
                    'absolute -top-2.5 left-1/2 z-10 max-w-[calc(100%-2px)] -translate-x-1/2 truncate rounded-full px-2.5 py-1 text-[9px] font-bold tracking-wide uppercase shadow-[0_10px_18px_-8px_rgba(249,115,22,0.8)]',
                    selected
                      ? 'bg-white text-[var(--brand-primary)]'
                      : badge === 'most-popular' || badge === 'recommended'
                        ? 'bg-[linear-gradient(145deg,var(--brand-primary)_0%,#ea580c_100%)] text-white ring-2 ring-orange-200/80'
                        : 'bg-[var(--brand-primary)] text-white',
                  )}
                >
                  {getBadgeLabel(badge)}
                </span>
              ) : null}
              {savePercent ? (
                <span className="absolute -top-2.5 right-0.5 rounded-full bg-emerald-500 px-1.5 py-0.5 text-[8px] font-bold text-white shadow-sm">
                  Save {savePercent}%
                </span>
              ) : null}
              <span
                className={cn(
                  'text-xl font-bold tracking-tight sm:text-2xl',
                  selected ? 'text-white' : 'text-[var(--text-primary)]',
                )}
              >
                {formatQuantityShort(pkg.quantity)}
              </span>
              <span
                className={cn(
                  'mt-1 max-w-full truncate text-sm font-bold tabular-nums sm:text-[15px]',
                  selected ? 'text-white/95' : 'text-[var(--brand-primary)]',
                )}
              >
                {formatMoney(pkg.price, pkg.currency)}
              </span>
            </button>
          );
        })}
      </div>

      {swipeable ? (
        <p className="text-center text-[11px] text-[var(--text-muted)] sm:hidden">
          Swipe to see more packages
        </p>
      ) : null}

      {active ? (
        <div
          className={cn(
            'group/summary relative mt-2 flex flex-col gap-7 overflow-hidden rounded-2xl border p-6 transition-[transform,box-shadow,border-color] duration-300 sm:mt-3 sm:flex-row sm:items-stretch sm:justify-between sm:gap-10 sm:p-8',
            'bg-[linear-gradient(165deg,#ffffff_0%,#fffdfb_45%,#fff7ed_100%)]',
            'hover:-translate-y-0.5 hover:shadow-[0_28px_56px_-26px_rgba(28,25,23,0.4)] motion-reduce:hover:translate-y-0',
            active.package.badge === 'most-popular' || active.package.badge === 'recommended'
              ? 'border-[color-mix(in_srgb,var(--brand-primary)_55%,var(--border-subtle))] shadow-[0_28px_56px_-20px_rgba(249,115,22,0.55)] ring-1 ring-orange-200/60'
              : 'border-[var(--border-subtle)] shadow-[0_20px_44px_-24px_rgba(28,25,23,0.34)]',
          )}
          data-analytics="package-summary"
        >
          <div
            className="pointer-events-none absolute inset-0 opacity-80"
            style={{
              background:
                'radial-gradient(ellipse 55% 60% at 100% 0%, rgba(249,115,22,0.12), transparent 58%)',
            }}
            aria-hidden
          />
          {active.package.badge === 'most-popular' || active.package.badge === 'recommended' ? (
            <span className="absolute -top-3 left-5 z-[1] rounded-full bg-[linear-gradient(145deg,var(--brand-primary)_0%,#ea580c_100%)] px-3.5 py-1.5 text-[11px] font-bold tracking-wide text-white uppercase shadow-[0_12px_24px_-10px_rgba(249,115,22,0.85)] ring-2 ring-white">
              {active.package.badge === 'recommended' ? 'Recommended' : 'Most Popular'}
            </span>
          ) : null}
          <div className="relative flex min-w-0 flex-1 gap-4">
            <PlatformIcon
              platformId={resolvedPlatform}
              iconKey={resolvedPlatform}
              className="size-12 shrink-0 rounded-xl shadow-[0_10px_22px_-14px_rgba(28,25,23,0.4)]"
            />
            <div className="min-w-0 flex-1 space-y-5">
              <div>
                <p
                  key={`qty-${priceAnimKey}`}
                  className="text-2xl font-bold tracking-tight text-[var(--text-primary)] motion-safe:animate-iv-price-pop sm:text-[1.75rem]"
                >
                  {new Intl.NumberFormat('en-US').format(active.package.quantity)}
                </p>
                <p className="mt-1 truncate text-sm font-medium text-[var(--text-secondary)]">
                  {active.package.commentType
                    ? `${active.package.commentType} · ${serviceName || active.package.title}`
                    : serviceName || active.package.title}
                </p>
              </div>
              <div>
                <p className="mb-3 text-[11px] font-bold tracking-wide text-[var(--text-muted)] uppercase">
                  What&apos;s Included
                </p>
                <ul className="grid gap-2.5 sm:grid-cols-2">
                  {includedBenefits.map((feature) => (
                    <li
                      key={feature}
                      className="inline-flex items-center gap-2 rounded-lg border border-white/80 bg-white/80 px-3 py-2 text-sm text-[var(--text-secondary)] shadow-sm backdrop-blur-sm"
                    >
                      <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[var(--brand-accent-soft)] text-[var(--brand-primary)]">
                        <Check className="size-3" strokeWidth={2.75} aria-hidden="true" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="relative flex w-full shrink-0 flex-col justify-center gap-5 border-t border-[var(--border-subtle)] pt-6 sm:w-72 sm:border-t-0 sm:border-l sm:pt-0 sm:pl-8 md:w-80">
            <div className="flex flex-wrap items-baseline gap-2 sm:justify-end">
              <p
                key={`price-${priceAnimKey}`}
                className="text-5xl font-bold tracking-tight text-[var(--brand-primary)] motion-safe:animate-iv-price-pop sm:text-6xl"
                aria-live="polite"
              >
                {formatMoney(active.package.price, active.package.currency)}
              </p>
              {active.package.compareAtPrice &&
              active.package.compareAtPrice > active.package.price ? (
                <>
                  <span className="text-sm text-[var(--text-muted)] line-through">
                    {formatMoney(active.package.compareAtPrice, active.package.currency)}
                  </span>
                  <span className="rounded-full bg-[var(--brand-accent-soft)] px-2.5 py-1 text-xs font-bold text-[#c2410c]">
                    Save{' '}
                    {Math.round(
                      ((active.package.compareAtPrice - active.package.price) /
                        active.package.compareAtPrice) *
                        100,
                    )}
                    %
                  </span>
                </>
              ) : null}
            </div>

            {infoPills && infoPills.length > 0 ? (
              <ul className="flex flex-wrap gap-2 sm:justify-end">
                {infoPills.map((pill) => (
                  <li
                    key={pill}
                    className="rounded-full border border-[color-mix(in_srgb,var(--brand-primary)_22%,var(--border-subtle))] bg-[var(--brand-accent-soft)] px-3 py-1.5 text-[11px] font-semibold leading-none text-[#c2410c]"
                  >
                    {pill}
                  </li>
                ))}
              </ul>
            ) : null}

            <PricingCTA
              cta={{
                ...active.primaryCta,
                label: active.primaryCta.label || 'Order Now',
              }}
              packageId={active.package.id}
              emphasized
              onSelect={(id) => (onContinue ?? onSelect)?.(id)}
              className="min-h-[3.65rem] w-full rounded-xl bg-[linear-gradient(145deg,var(--brand-primary)_0%,#ea580c_100%)] text-sm font-bold tracking-wide text-white shadow-[0_14px_30px_-14px_rgba(249,115,22,0.8)] transition-[transform,box-shadow] duration-200 hover:-translate-y-1.5 hover:shadow-[0_22px_44px_-12px_rgba(249,115,22,1)] active:scale-[0.99] motion-reduce:hover:translate-y-0 motion-reduce:active:scale-100"
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}
