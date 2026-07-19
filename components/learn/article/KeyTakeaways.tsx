type KeyTakeawaysProps = {
  title?: string;
  items: string[];
};

/**
 * Key takeaways — Document 15.02.
 * Renders only when items exist.
 */
export function KeyTakeaways({
  title = 'Key takeaways',
  items,
}: KeyTakeawaysProps) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="article-key-takeaways" className="border border-neutral-300 bg-neutral-50 p-5">
      <h2 id="article-key-takeaways" className="text-lg font-semibold text-neutral-900">
        {title}
      </h2>
      <ul className="mt-3 list-disc space-y-2 pl-5 text-neutral-700">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </section>
  );
}
