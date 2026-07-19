'use client';

import { useState } from 'react';

type ArticleShareProps = {
  url: string;
  title: string;
  enabled?: boolean;
};

/**
 * Lightweight share actions — Document 15.02.
 * No social SDKs. Uses the canonical URL only.
 */
export function ArticleShare({ url, title, enabled = true }: ArticleShareProps) {
  const [copied, setCopied] = useState(false);

  if (!enabled) return null;

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="flex flex-wrap gap-2" aria-label="Share this article">
      <button
        type="button"
        onClick={() => void copy()}
        className="border border-neutral-200 px-3 py-2 text-sm outline-none hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        {copied ? 'Copied' : 'Copy link'}
      </button>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-neutral-200 px-3 py-2 text-sm outline-none hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        LinkedIn
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-neutral-200 px-3 py-2 text-sm outline-none hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        X
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className="border border-neutral-200 px-3 py-2 text-sm outline-none hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        Facebook
      </a>
      <a
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        className="border border-neutral-200 px-3 py-2 text-sm outline-none hover:border-neutral-400 focus-visible:ring-2 focus-visible:ring-neutral-900 focus-visible:ring-offset-2"
      >
        Email
      </a>
    </div>
  );
}
