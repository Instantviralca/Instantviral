/**
 * Article loading skeleton — Document 15.02.
 */
export function ArticleSkeleton() {
  return (
    <div className="animate-pulse overflow-x-hidden" aria-hidden="true">
      <div className="border-b border-neutral-200 bg-neutral-50 py-14">
        <div className="mx-auto max-w-3xl space-y-4 px-4">
          <div className="h-3 w-40 bg-neutral-200" />
          <div className="h-10 w-3/4 bg-neutral-200" />
          <div className="h-4 w-full bg-neutral-200" />
          <div className="h-4 w-2/3 bg-neutral-200" />
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-10 lg:grid-cols-[minmax(0,1fr)_16rem]">
        <div className="space-y-4">
          <div className="aspect-video w-full bg-neutral-200" />
          <div className="h-4 w-full bg-neutral-200" />
          <div className="h-4 w-11/12 bg-neutral-200" />
          <div className="h-4 w-10/12 bg-neutral-200" />
        </div>
        <div className="hidden space-y-3 lg:block">
          <div className="h-4 w-32 bg-neutral-200" />
          <div className="h-3 w-full bg-neutral-200" />
          <div className="h-3 w-5/6 bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
