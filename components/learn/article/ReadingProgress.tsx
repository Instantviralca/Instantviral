'use client';

import { useEffect, useState } from 'react';

/**
 * Lightweight reading progress — Document 15.02.
 * Respects prefers-reduced-motion; decorative for screen readers.
 */
export function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const sync = () => setReducedMotion(media.matches);
    sync();
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const article = document.querySelector('[data-learn-article]');
      if (!article) {
        setProgress(0);
        return;
      }
      const total = article.scrollHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(100);
        return;
      }
      const rect = article.getBoundingClientRect();
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(Math.round((scrolled / total) * 100));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-40 h-1 bg-neutral-200"
    >
      <div
        className="h-full bg-neutral-900"
        style={{
          width: `${progress}%`,
          transition: reducedMotion ? undefined : 'width 150ms linear',
        }}
      />
    </div>
  );
}
