'use client';

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function GlobalError({ error, reset }: ErrorProps) {
  const isDev = process.env.NODE_ENV === 'development';

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-medium text-neutral-900">Something went wrong</h1>
      <p className="mt-2 text-sm text-neutral-500">
        {isDev && error.message
          ? error.message
          : 'An unexpected error occurred. Please try again.'}
      </p>
      {error.digest ? (
        <p className="mt-1 text-xs text-neutral-400">Reference: {error.digest}</p>
      ) : null}
      <button
        type="button"
        onClick={reset}
        className="mt-4 border border-neutral-900 px-3 py-1.5 text-sm"
      >
        Try again
      </button>
    </div>
  );
}
