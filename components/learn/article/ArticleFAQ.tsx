import type { ArticleFaqItem } from '@/types/learn-article-blocks';

type ArticleFAQProps = {
  title?: string;
  items: ArticleFaqItem[];
};

/**
 * Visible article FAQ — Document 15.02.
 * FAQPage schema must only be emitted when this renders.
 */
export function ArticleFAQ({ title = 'Frequently asked questions', items }: ArticleFAQProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="article-faq-heading" className="space-y-4">
      <h2 id="article-faq-heading" className="text-2xl font-semibold text-neutral-900">
        {title}
      </h2>
      <div className="space-y-3">
        {items.map((item) => (
          <details key={item.id} className="border border-neutral-200 p-4">
            <summary className="cursor-pointer font-medium text-neutral-900 outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2">
              {item.question}
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-neutral-700">{item.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
