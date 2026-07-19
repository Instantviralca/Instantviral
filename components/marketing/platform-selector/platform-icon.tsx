import {
  Facebook,
  Instagram,
  Youtube,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';
import type { PlatformId } from '@/types/platform';
import type { PlatformIconProps } from '@/components/marketing/platform-selector/types';

const ICONS_BY_KEY: Record<string, LucideIcon> = {
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
};

const COLOR_CLASS: Record<PlatformId, string> = {
  instagram: 'text-platform-instagram',
  tiktok: 'text-platform-tiktok',
  youtube: 'text-platform-youtube',
  facebook: 'text-platform-facebook',
};

/** Official TikTok logo colors — black + brand cyan/magenta. */
function TikTokLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Magenta offset */}
      <path
        fill="#EE1D52"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.8a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.79a8.18 8.18 0 0 0 4.76 1.52V6.86a4.85 4.85 0 0 1-1-.17z"
        transform="translate(0.55 0.35)"
        opacity="0.95"
      />
      {/* Cyan offset */}
      <path
        fill="#69C9D0"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.8a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.79a8.18 8.18 0 0 0 4.76 1.52V6.86a4.85 4.85 0 0 1-1-.17z"
        transform="translate(-0.55 -0.35)"
        opacity="0.95"
      />
      {/* Black primary glyph */}
      <path
        fill="#010101"
        d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.8a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.79a8.18 8.18 0 0 0 4.76 1.52V6.86a4.85 4.85 0 0 1-1-.17z"
      />
    </svg>
  );
}

/** Decorative platform icon — text color from design tokens, not hardcoded hex. */
export function PlatformIcon({ platformId, iconKey, className }: PlatformIconProps) {
  const isTikTok = platformId === 'tiktok' || iconKey === 'tiktok' || iconKey === 'music-2';
  const Icon = ICONS_BY_KEY[iconKey ?? ''] ?? ICONS_BY_KEY[platformId] ?? Instagram;

  return (
    <span
      className={cn(
        'inline-flex size-10 items-center justify-center rounded-md bg-muted',
        !isTikTok && COLOR_CLASS[platformId],
        className,
      )}
      aria-hidden="true"
    >
      {isTikTok ? <TikTokLogo className="size-5" /> : <Icon className="size-5" />}
    </span>
  );
}
