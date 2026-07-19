'use client';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

export type FAQSearchProps = {
  value: string;
  onChange: (value: string) => void;
  resultCount: number;
  id?: string;
  label?: string;
  placeholder?: string;
  className?: string;
};

/**
 * Client-side FAQ search — no page reload; announces result count.
 */
export function FAQSearch({
  value,
  onChange,
  resultCount,
  id = 'faq-search',
  label = 'Search questions',
  placeholder = 'Search by topic, keyword, or service…',
  className,
}: FAQSearchProps) {
  const statusId = `${id}-status`;

  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type="search"
        value={value}
        placeholder={placeholder}
        autoComplete="off"
        className="min-h-11"
        aria-describedby={statusId}
        onChange={(event) => onChange(event.target.value)}
      />
      <p id={statusId} className="text-sm text-muted-foreground" aria-live="polite">
        {resultCount === 1 ? '1 question shown' : `${resultCount} questions shown`}
      </p>
    </div>
  );
}
