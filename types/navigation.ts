import type { PlatformId } from '@/types/platform';
import type { Service } from '@/types/service';

export type NavLinkItem = {
  id: string;
  label: string;
  href: string;
};

export type NavMegaMenuItem = {
  id: string;
  type: 'mega';
  label: string;
  platformId: PlatformId;
  href: string;
};

export type NavItem = NavLinkItem | NavMegaMenuItem;

export type FooterLink = {
  label: string;
  href: string;
};

export type FooterColumn = {
  id: string;
  title: string;
  links: FooterLink[];
};

/** Convenience re-export used by navigation helpers. */
export type { Service };
