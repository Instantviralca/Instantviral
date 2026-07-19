import Image from 'next/image';
import Link from 'next/link';
import type { ReactNode } from 'react';

import { learnArticlePath } from '@/config/routes';
import { isApprovedServiceSlug } from '@/data/linking/approved-services';
import { getServiceBySlug } from '@/data/services';
import { cn } from '@/lib/utils';
import type {
  ArticleContentBlock,
  ArticleInlineLink,
} from '@/types/learn-article-blocks';

type ArticleContentBlockProps = {
  block: ArticleContentBlock;
};

function renderTextWithInlineLinks(
  text: string,
  links: ArticleInlineLink[] | undefined,
): ReactNode {
  if (!links || links.length === 0) return text;

  const matches = links
    .map((link) => {
      const index = text.toLowerCase().indexOf(link.label.toLowerCase());
      if (index < 0) return null;
      return {
        href: link.href,
        start: index,
        end: index + link.label.length,
        label: text.slice(index, index + link.label.length),
      };
    })
    .filter((item): item is NonNullable<typeof item> => Boolean(item))
    .sort((a, b) => a.start - b.start);

  if (matches.length === 0) return text;

  const nodes: ReactNode[] = [];
  let cursor = 0;
  matches.forEach((match, index) => {
    if (match.start < cursor) return;
    if (match.start > cursor) {
      nodes.push(text.slice(cursor, match.start));
    }
    nodes.push(
      <Link
        key={`inl-${index}-${match.href}`}
        href={match.href}
        className="font-medium text-neutral-900 underline decoration-neutral-300 underline-offset-2 transition-colors hover:decoration-neutral-700"
      >
        {match.label}
      </Link>,
    );
    cursor = match.end;
  });
  if (cursor < text.length) nodes.push(text.slice(cursor));
  return nodes;
}

function CalloutShell({
  label,
  title,
  text,
  className,
}: {
  label: string;
  title?: string;
  text: string;
  className?: string;
}) {
  return (
    <aside
      className={cn('border border-neutral-300 bg-neutral-50 p-4', className)}
      role="note"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-neutral-700">
        {label}
      </p>
      {title ? <p className="mt-1 font-medium text-neutral-900">{title}</p> : null}
      <p className="mt-2 text-sm leading-relaxed text-neutral-700">{text}</p>
    </aside>
  );
}

function ResponsiveTable({
  caption,
  headers,
  rows,
}: {
  caption?: string;
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="w-full overflow-x-auto" data-article-table>
      <table className="min-w-full border-collapse text-left text-sm">
        {caption ? <caption className="mb-2 text-left text-neutral-600">{caption}</caption> : null}
        <thead>
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                scope="col"
                className="border border-neutral-200 bg-neutral-50 px-3 py-2 font-semibold"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`row-${rowIndex}`}>
              {row.map((cell, cellIndex) => (
                <td
                  key={`cell-${rowIndex}-${cellIndex}`}
                  className="border border-neutral-200 px-3 py-2 align-top"
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/**
 * Single typed content block renderer — Document 15.02.
 * Never injects raw HTML.
 */
export function ArticleContentBlockView({ block }: ArticleContentBlockProps) {
  switch (block.type) {
    case 'paragraph':
      return (
        <p className="leading-relaxed text-neutral-800">
          {renderTextWithInlineLinks(block.text, block.inlineLinks)}
        </p>
      );
    case 'heading': {
      const Tag = block.headingLevel === 2 ? 'h2' : 'h3';
      return (
        <Tag
          id={block.anchorId}
          className={cn(
            'scroll-mt-24 font-semibold text-neutral-900',
            block.headingLevel === 2 ? 'text-2xl' : 'text-xl',
          )}
        >
          {block.text}
        </Tag>
      );
    }
    case 'bulleted_list':
      return (
        <div>
          {block.leadIn ? <p className="mb-2 text-neutral-800">{block.leadIn}</p> : null}
          <ul className="list-disc space-y-1 pl-5 text-neutral-800">
            {block.items.map((item, itemIndex) => {
              const itemLink = block.inlineItemLinks?.find(
                (link) => link.itemIndex === itemIndex,
              );
              return (
                <li key={`${itemIndex}-${item.slice(0, 24)}`}>
                  {renderTextWithInlineLinks(
                    item,
                    itemLink
                      ? [{ href: itemLink.href, label: itemLink.label }]
                      : undefined,
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      );
    case 'numbered_list':
      return (
        <div>
          {block.leadIn ? <p className="mb-2 text-neutral-800">{block.leadIn}</p> : null}
          <ol className="list-decimal space-y-1 pl-5 text-neutral-800">
            {block.items.map((item, itemIndex) => {
              const itemLink = block.inlineItemLinks?.find(
                (link) => link.itemIndex === itemIndex,
              );
              return (
                <li key={`${itemIndex}-${item.slice(0, 24)}`}>
                  {renderTextWithInlineLinks(
                    item,
                    itemLink
                      ? [{ href: itemLink.href, label: itemLink.label }]
                      : undefined,
                  )}
                </li>
              );
            })}
          </ol>
        </div>
      );
    case 'image':
    case 'figure': {
      const image = block.image;
      return (
        <figure>
          <Image
            src={image.src}
            alt={image.decorative ? '' : image.alt}
            width={image.width}
            height={image.height}
            loading={image.priority ? undefined : 'lazy'}
            priority={Boolean(image.priority)}
            className="h-auto w-full"
            sizes="(max-width: 768px) 100vw, 780px"
          />
          {image.caption || image.credit ? (
            <figcaption className="mt-2 text-sm text-neutral-500">
              {image.caption}
              {image.credit ? (
                <span className="block text-xs">Credit: {image.credit}</span>
              ) : null}
            </figcaption>
          ) : null}
        </figure>
      );
    }
    case 'blockquote':
      return (
        <blockquote className="border-l-4 border-neutral-300 pl-4 text-neutral-700 italic">
          <p>{block.text}</p>
          {block.cite ? <cite className="mt-2 block text-sm not-italic">— {block.cite}</cite> : null}
        </blockquote>
      );
    case 'callout':
      return (
        <CalloutShell
          label={block.variant}
          title={block.title}
          text={block.text}
        />
      );
    case 'tip':
      return <CalloutShell label="Tip" title={block.title} text={block.text} />;
    case 'warning':
      return (
        <CalloutShell
          label="Warning"
          title={block.title}
          text={block.text}
          className="border-neutral-800"
        />
      );
    case 'definition':
      return (
        <dl className="border border-neutral-200 p-4">
          <dt className="font-semibold text-neutral-900">{block.term}</dt>
          <dd className="mt-1 text-neutral-700">{block.definition}</dd>
        </dl>
      );
    case 'comparison_table':
    case 'data_table':
      return (
        <ResponsiveTable
          caption={block.caption}
          headers={block.headers}
          rows={block.rows}
        />
      );
    case 'step_process':
      return (
        <ol className="space-y-4">
          {block.title ? (
            <li className="list-none text-lg font-semibold text-neutral-900">
              {block.title}
            </li>
          ) : null}
          {block.steps.map((step, index) => (
            <li key={step.id} className="flex gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-neutral-300 text-xs font-semibold">
                {index + 1}
              </span>
              <div>
                <p className="font-medium text-neutral-900">{step.title}</p>
                <p className="mt-1 text-sm text-neutral-700">{step.text}</p>
              </div>
            </li>
          ))}
        </ol>
      );
    case 'key_takeaway_box':
      return (
        <aside className="border border-neutral-300 bg-neutral-50 p-4">
          <p className="text-sm font-semibold text-neutral-900">
            {block.title ?? 'Key takeaways'}
          </p>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-neutral-700">
            {block.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      );
    case 'faq_group':
      return (
        <div className="space-y-3">
          {block.title ? (
            <h3 className="text-lg font-semibold text-neutral-900">{block.title}</h3>
          ) : null}
          {block.items.map((item) => (
            <details key={item.id} className="border border-neutral-200 p-3">
              <summary className="cursor-pointer font-medium outline-none focus-visible:ring-2 focus-visible:ring-neutral-900">
                {item.question}
              </summary>
              <p className="mt-2 text-sm text-neutral-700">{item.answer}</p>
            </details>
          ))}
        </div>
      );
    case 'internal_cta':
      return (
        <div className="border border-neutral-200 p-4">
          {block.description ? (
            <p className="mb-2 text-sm text-neutral-600">{block.description}</p>
          ) : null}
          <Link
            href={block.href}
            className="font-medium text-neutral-900 underline-offset-2 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
          >
            {block.label}
          </Link>
        </div>
      );
    case 'related_service_card': {
      if (!isApprovedServiceSlug(block.serviceSlug)) return null;
      const service = getServiceBySlug(block.serviceSlug);
      if (!service) return null;
      return (
        <Link
          href={`/${block.serviceSlug}`}
          className="block border border-neutral-200 p-4 outline-none hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          <p className="font-medium text-neutral-900">{block.label}</p>
          {block.description ? (
            <p className="mt-1 text-sm text-neutral-600">{block.description}</p>
          ) : null}
        </Link>
      );
    }
    case 'related_article_card':
      return (
        <Link
          href={learnArticlePath(block.articleSlug)}
          className="block border border-neutral-200 p-4 outline-none hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
        >
          <p className="font-medium text-neutral-900">
            {block.label ?? block.articleSlug}
          </p>
          {block.description ? (
            <p className="mt-1 text-sm text-neutral-600">{block.description}</p>
          ) : null}
        </Link>
      );
    case 'divider':
      return <hr className="border-neutral-200" />;
    case 'embed_placeholder':
      return (
        <div className="border border-dashed border-neutral-300 p-4 text-sm text-neutral-600">
          <p className="font-medium text-neutral-800">{block.label}</p>
          <p className="mt-1">
            {block.note ??
              `${block.provider} embeds are disabled until an approved integration is configured.`}
          </p>
        </div>
      );
    case 'code':
      return (
        <figure>
          <pre className="overflow-x-auto border border-neutral-200 bg-neutral-950 p-4 text-sm text-neutral-100">
            <code>{block.code}</code>
          </pre>
          {block.caption ? (
            <figcaption className="mt-2 text-sm text-neutral-500">
              {block.caption}
            </figcaption>
          ) : null}
        </figure>
      );
    default: {
      const _exhaustive: never = block;
      void _exhaustive;
      return null;
    }
  }
}

/** Alias matching Document 15.02 component name. */
export { ArticleContentBlockView as ArticleContentBlock };
