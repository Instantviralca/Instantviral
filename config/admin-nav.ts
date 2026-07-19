export type AdminNavItem = {
  id: string;
  label: string;
  href: string;
};

/** Admin sidebar navigation — Document 12.01. Auth not wired yet. */
export const adminNavItems: AdminNavItem[] = [
  { id: 'dashboard', label: 'Dashboard', href: '/admin' },
  { id: 'orders', label: 'Orders', href: '/admin/orders' },
  { id: 'services', label: 'Services', href: '/admin/services' },
  { id: 'pricing', label: 'Pricing', href: '/admin/pricing' },
  { id: 'coupons', label: 'Coupons', href: '/admin/coupons' },
  { id: 'content', label: 'Content', href: '/admin/content' },
  { id: 'learn', label: 'Learn', href: '/admin/learn' },
  { id: 'testimonials', label: 'Testimonials', href: '/admin/testimonials' },
  { id: 'faq', label: 'FAQ', href: '/admin/faq' },
  { id: 'settings', label: 'Settings', href: '/admin/settings' },
  { id: 'profile', label: 'Profile', href: '/admin/profile' },
];

export function getAdminNavItems(): AdminNavItem[] {
  return adminNavItems;
}
