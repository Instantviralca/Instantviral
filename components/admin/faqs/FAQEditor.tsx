'use client';

import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { FAQ_CATEGORIES } from '@/data/faqs/categories';
import type { FaqRecord } from '@/types/faq';

export type FAQEditorProps = {
  faq: FaqRecord;
  onChange: (next: FaqRecord) => void;
};

/**
 * Admin FAQ editor shell — Document 14.04 (no backend save).
 */
export function FAQEditor({ faq, onChange }: FAQEditorProps) {
  return (
    <div className="space-y-4 rounded-lg border border-border p-4">
      <div className="space-y-1">
        <Label htmlFor="faq-editor-question">Question</Label>
        <Input
          id="faq-editor-question"
          className="min-h-11"
          value={faq.question}
          onChange={(event) => onChange({ ...faq, question: event.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="faq-editor-answer">Answer</Label>
        <Textarea
          id="faq-editor-answer"
          rows={6}
          value={faq.answer}
          onChange={(event) => onChange({ ...faq, answer: event.target.value })}
        />
      </div>
      <div className="space-y-1">
        <Label htmlFor="faq-editor-short">Short answer</Label>
        <Input
          id="faq-editor-short"
          className="min-h-11"
          value={faq.shortAnswer ?? ''}
          onChange={(event) =>
            onChange({ ...faq, shortAnswer: event.target.value || undefined })
          }
        />
      </div>
      <div className="space-y-1">
        <Label>Category</Label>
        <Select
          value={faq.category}
          onValueChange={(value) =>
            onChange({ ...faq, category: value as FaqRecord['category'] })
          }
        >
          <SelectTrigger className="min-h-11 w-full">
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
      <div className="flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <Switch
            id="faq-editor-featured"
            checked={faq.featured}
            onCheckedChange={(featured) => onChange({ ...faq, featured })}
          />
          <Label htmlFor="faq-editor-featured">Featured</Label>
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="faq-editor-schema"
            checked={faq.schemaEligible}
            onCheckedChange={(schemaEligible) => onChange({ ...faq, schemaEligible })}
          />
          <Label htmlFor="faq-editor-schema">Schema eligible</Label>
        </div>
      </div>
      <p className="text-xs text-muted-foreground">
        Status: {faq.status} · Order: {faq.order} · ID: {faq.id}
      </p>
    </div>
  );
}
