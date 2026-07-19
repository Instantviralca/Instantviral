import {
  Briefcase,
  Clapperboard,
  CreditCard,
  Headphones,
  Heart,
  Lock,
  MapPin,
  Megaphone,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import type { PackagesIconKey } from '@/data/content/packages-page-config';

const PACKAGE_ICONS: Record<PackagesIconKey, LucideIcon> = {
  briefcase: Briefcase,
  clapperboard: Clapperboard,
  heart: Heart,
  megaphone: Megaphone,
  sparkles: Sparkles,
  users: Users,
  'credit-card': CreditCard,
  headphones: Headphones,
  lock: Lock,
  'map-pin': MapPin,
  'shield-check': ShieldCheck,
  truck: Truck,
};

export function resolvePackagesIcon(key: PackagesIconKey): LucideIcon {
  return PACKAGE_ICONS[key];
}
