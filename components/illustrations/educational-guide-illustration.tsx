'use client';

import type { ReactNode } from 'react';

import { TikTokFollowersCreatorDashboard } from '@/components/illustrations/tiktok-followers-creator-dashboard';
import { TikTokLikesAnalyticsDashboard } from '@/components/illustrations/tiktok-likes-analytics-dashboard';
import { TikTokViewsAnalyticsDashboard } from '@/components/illustrations/tiktok-views-analytics-dashboard';
import { FacebookFollowersAnalyticsDashboard } from '@/components/illustrations/facebook-followers-analytics-dashboard';
import { FacebookPostLikesAnalyticsDashboard } from '@/components/illustrations/facebook-post-likes-analytics-dashboard';
import { YouTubeChannelPlanningDashboard } from '@/components/illustrations/youtube-channel-planning-dashboard';
import { YouTubeViewsAnalyticsDashboard } from '@/components/illustrations/youtube-views-analytics-dashboard';
import { cn } from '@/lib/utils';
import type { EducationalIllustrationId } from '@/data/content/instagram-educational-guides';

type EducationalGuideIllustrationProps = {
  id: EducationalIllustrationId;
  className?: string;
};

/** Service-specific placeholder graphics for educational sections. */
export function EducationalGuideIllustration({
  id,
  className,
}: EducationalGuideIllustrationProps) {
  if (id === 'tiktok-followers-creator') {
    return <TikTokFollowersCreatorDashboard className={className} />;
  }

  if (id === 'tiktok-likes-analytics') {
    return <TikTokLikesAnalyticsDashboard className={className} />;
  }

  if (id === 'tiktok-views-analytics') {
    return <TikTokViewsAnalyticsDashboard className={className} />;
  }

  if (id === 'youtube-channel-planning') {
    return <YouTubeChannelPlanningDashboard className={className} />;
  }

  if (id === 'youtube-views-analytics') {
    return <YouTubeViewsAnalyticsDashboard className={className} />;
  }

  if (id === 'facebook-followers-analytics') {
    return <FacebookFollowersAnalyticsDashboard className={className} />;
  }

  if (id === 'facebook-post-likes-analytics') {
    return <FacebookPostLikesAnalyticsDashboard className={className} />;
  }

  return (
    <div
      className={cn(
        'relative mx-auto aspect-[4/3] w-full max-w-[20rem] overflow-hidden rounded-2xl border border-[var(--border-subtle)] bg-white p-4 shadow-[0_18px_40px_-28px_rgba(28,25,23,0.28)]',
        className,
      )}
      data-illustration={id}
      aria-hidden
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(249,115,22,0.14),transparent_55%)]" />
      {renderIllustration(id)}
    </div>
  );
}

function Panel({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'relative rounded-xl border border-stone-100 bg-[var(--surface-muted)] p-3',
        className,
      )}
    >
      {children}
    </div>
  );
}

function VerifiedBadge() {
  return (
    <span className="inline-flex size-3 items-center justify-center rounded-full bg-sky-500 text-[7px] font-bold text-white">
      ✓
    </span>
  );
}

function renderIllustration(id: EducationalIllustrationId) {
  if (id === 'followers-growth' || id === 'followers-authority') {
    return (
      <div className="relative flex h-full flex-col justify-between gap-3">
        <Panel>
          <p className="text-[10px] font-semibold tracking-wide text-stone-400 uppercase">
            Audience
          </p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-stone-900">24,580</p>
          <p className="text-xs font-semibold text-emerald-600">+1,240 this week</p>
        </Panel>
        <div className="grid grid-cols-3 gap-2">
          {[40, 62, 84].map((h, i) => (
            <div key={i} className="flex h-20 items-end rounded-lg bg-stone-50 p-2">
              <div
                className="w-full rounded-md bg-[linear-gradient(180deg,#fb923c,#f97316)]"
                style={{ height: `${h}%` }}
              />
            </div>
          ))}
        </div>
        <Panel className="flex items-center justify-between">
          <span className="text-xs font-semibold text-stone-700">Profile growth</span>
          <span className="rounded-full bg-[var(--brand-accent-soft)] px-2 py-0.5 text-[10px] font-bold text-[var(--brand-primary)]">
            Live
          </span>
        </Panel>
      </div>
    );
  }

  if (id === 'likes-engagement' || id === 'likes-analytics') {
    return (
      <div className="relative flex h-full flex-col justify-between gap-3">
        <Panel className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-full bg-[#E1306C]/15 text-lg text-[#E1306C]">
            ❤
          </span>
          <div>
            <p className="text-[10px] font-semibold text-stone-400 uppercase">Likes</p>
            <p className="text-xl font-bold tabular-nums text-stone-900">3,482</p>
          </div>
        </Panel>
        <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(160deg,#fff7ed,#fecaca)] p-4">
          <div className="mx-auto h-24 w-20 rounded-lg border border-white/70 bg-white/70 shadow-sm" />
        </div>
        <Panel>
          <p className="text-[10px] font-semibold text-stone-400 uppercase">Engagement</p>
          <p className="mt-1 text-sm font-bold text-stone-800">+18.2% interaction</p>
        </Panel>
      </div>
    );
  }

  if (id === 'views-reel' || id === 'views-watch-time') {
    return (
      <div className="relative flex h-full flex-col justify-between gap-3">
        <div className="relative overflow-hidden rounded-xl bg-[linear-gradient(165deg,#fff7ed,#ffedd5_45%,#fb923c)] p-3">
          <div className="absolute left-3 top-3 rounded-md bg-black/50 px-1.5 py-0.5 text-[9px] font-semibold text-white">
            Reel
          </div>
          <div className="flex aspect-[4/5] max-h-36 items-center justify-center">
            <span className="flex size-10 items-center justify-center rounded-full bg-white/90 text-[var(--brand-primary)] shadow">
              ▶
            </span>
          </div>
          <div className="rounded-lg bg-white/90 px-2 py-1.5">
            <p className="text-[8px] font-semibold text-stone-500 uppercase">Views</p>
            <p className="text-sm font-bold tabular-nums">18,420</p>
          </div>
        </div>
        <Panel className="flex items-end justify-between gap-2">
          <div>
            <p className="text-[10px] font-semibold text-stone-400 uppercase">Watch time</p>
            <p className="text-sm font-bold text-stone-800">62% avg.</p>
          </div>
          <div className="flex items-end gap-1">
            {[28, 40, 36, 52, 64].map((h, i) => (
              <span
                key={i}
                className="w-2 rounded-sm bg-[linear-gradient(180deg,#E1306C,#f97316)]"
                style={{ height: h / 4 }}
              />
            ))}
          </div>
        </Panel>
      </div>
    );
  }

  // comments-conversation / comments-trust — realistic Instagram thread UI
  return (
    <div className="relative flex h-full flex-col justify-between gap-2">
      <div className="flex items-center gap-2 rounded-xl border border-[#E1306C]/12 bg-[#E1306C]/[0.05] px-2.5 py-2">
        <span className="text-sm">💬</span>
        <div>
          <p className="text-[10px] font-bold text-stone-800">New Comment</p>
          <p className="text-[9px] text-stone-500">48 people talking</p>
        </div>
      </div>

      <div className="space-y-2 overflow-hidden">
        {/* Pinned visitor comment */}
        <div className="rounded-2xl border border-[color-mix(in_srgb,var(--brand-primary)_22%,#e7e5e4)] bg-white px-3 py-2 shadow-sm ring-1 ring-[var(--brand-primary)]/15">
          <p className="mb-1 text-[8px] font-bold tracking-wide text-[var(--brand-primary)] uppercase">
            📌 Pinned comment
          </p>
          <p className="text-[10px] font-bold text-stone-500">@alex</p>
          <p className="text-[12px] leading-snug text-stone-800">
            Does this work for local shops?
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="rounded-full bg-stone-50 px-1.5 py-0.5 text-[9px] font-semibold">
              ❤️ 12
            </span>
            <span className="text-[10px]">👏</span>
            <span className="text-[10px]">🔥</span>
            <span className="ml-auto rounded-full border border-stone-200 px-1.5 py-0.5 text-[8px] font-bold text-stone-600">
              Reply
            </span>
          </div>
        </div>

        {/* Brand / creator verified reply */}
        <div className="ml-4 rounded-2xl border border-white bg-[var(--brand-accent-soft)] px-3 py-2 shadow-sm">
          <p className="inline-flex items-center gap-1 text-[10px] font-bold text-stone-500">
            @you <VerifiedBadge />
            <span className="rounded-full bg-white/80 px-1.5 py-0.5 text-[8px] font-bold text-[var(--brand-primary)]">
              Brand reply
            </span>
          </p>
          <p className="text-[12px] leading-snug text-stone-800">
            Yes — reply same day and pin FAQs.
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="rounded-full bg-white/70 px-1.5 py-0.5 text-[9px] font-semibold">
              ❤️ 8
            </span>
            <span className="text-[10px]">👏</span>
          </div>
        </div>

        {/* Follow-up */}
        <div className="rounded-2xl border border-stone-100 bg-white px-3 py-2 shadow-sm">
          <p className="text-[10px] font-bold text-stone-500">@sam</p>
          <p className="text-[12px] leading-snug text-stone-800">
            Booked after reading the thread.
          </p>
          <div className="mt-1.5 flex items-center gap-1.5">
            <span className="text-[10px]">🔥</span>
            <span className="rounded-full border border-stone-200 px-1.5 py-0.5 text-[8px] font-bold text-stone-600">
              Reply
            </span>
          </div>
        </div>
      </div>

      <Panel className="mt-0.5 flex items-center justify-between gap-2">
        <div>
          <p className="text-[10px] font-semibold text-stone-400 uppercase">Discussion</p>
          <p className="text-sm font-bold text-stone-800">Trusted thread</p>
        </div>
        <span className="flex items-center gap-1 text-[9px] font-medium text-stone-400">
          <span className="size-1.5 rounded-full bg-stone-400" />
          Typing…
        </span>
      </Panel>
    </div>
  );
}
