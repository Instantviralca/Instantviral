import { cn } from '@/lib/utils';

export type RatingDisplayProps = {
  rating: number;
  bestRating?: number;
  className?: string;
  size?: 'sm' | 'md';
};

/**
 * Accessible star rating — Document 14.02.
 * Screen-reader text announces the numeric rating; stars are aria-hidden.
 */
export function RatingDisplay({
  rating,
  bestRating = 5,
  className,
  size = 'md',
}: RatingDisplayProps) {
  const clamped = Math.min(bestRating, Math.max(0, rating));
  const fullStars = Math.floor(clamped);
  const starClass = size === 'sm' ? 'text-sm' : 'text-base';

  return (
    <div
      className={cn('inline-flex items-center gap-1 text-foreground', className)}
      role="img"
      aria-label={`Rated ${clamped} out of ${bestRating} stars`}
    >
      <span className={cn('tracking-tight text-amber-600', starClass)} aria-hidden>
        {'★'.repeat(fullStars)}
        {'☆'.repeat(Math.max(0, bestRating - fullStars))}
      </span>
      <span className="sr-only">
        {clamped} out of {bestRating} stars
      </span>
    </div>
  );
}
