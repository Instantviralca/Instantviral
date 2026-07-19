'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FAQ_CATEGORIES } from '@/data/faqs/categories';
import type { FaqPageLocation, FaqRecord } from '@/types/faq';
import type { PlatformId } from '@/types/platform';

const PAGE_LOCATIONS: FaqPageLocation[] = [
  'homepage',
  'faq_page',
  'contact',
  'checkout',
  'track_order',
  'about',
  'service_page',
  'platform_group',
  'legal_support',
  'learn',
];

const PLATFORMS: Array<PlatformId | 'none'> = [
  'none',
  'instagram',
  'tiktok',
  'facebook',
  'youtube',
];

export type FAQAssignmentPanelProps = {
  faq: FaqRecord;
  onChange: (next: FaqRecord) => void;
};

/**
 * Assign category, platform, services, and page locations — Document 14.04.
 */
export function FAQAssignmentPanel({ faq, onChange }: FAQAssignmentPanelProps) {
  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      <h3 className="text-sm font-medium">Assignments</h3>

      <div className="space-y-1">
        <Label>Category</Label>
        <Select
          value={faq.category}
          onValueChange={(value) =>
            onChange({ ...faq, category: value as FaqRecord['category'] })
          }
        >
          <SelectTrigger className="min-h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {FAQ_CATEGORIES.map((category) => (
              <SelectItem key={category.id} value={category.id}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label>Platform</Label>
        <Select
          value={faq.platform ?? 'none'}
          onValueChange={(value) =>
            onChange({
              ...faq,
              platform: value === 'none' ? undefined : (value as PlatformId),
            })
          }
        >
          <SelectTrigger className="min-h-11">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PLATFORMS.map((platform) => (
              <SelectItem key={platform} value={platform}>
                {platform === 'none' ? 'None' : platform}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-1">
        <Label htmlFor="faq-services">Service slugs (comma-separated)</Label>
        <Input
          id="faq-services"
          className="min-h-11"
          value={faq.serviceSlugs.join(', ')}
          onChange={(event) =>
            onChange({
              ...faq,
              serviceSlugs: event.target.value
                .split(',')
                .map((slug) => slug.trim())
                .filter(Boolean),
            })
          }
        />
      </div>

      <fieldset className="space-y-2">
        <legend className="text-sm font-medium">Page locations</legend>
        <div className="grid gap-2 sm:grid-cols-2">
          {PAGE_LOCATIONS.map((location) => {
            const checked = faq.pageLocations.includes(location);
            return (
              <label
                key={location}
                className="flex min-h-11 items-center gap-2 text-sm"
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => {
                    const next = checked
                      ? faq.pageLocations.filter((item) => item !== location)
                      : [...faq.pageLocations, location];
                    onChange({ ...faq, pageLocations: next });
                  }}
                />
                <span>{location}</span>
              </label>
            );
          })}
        </div>
      </fieldset>
    </div>
  );
}
