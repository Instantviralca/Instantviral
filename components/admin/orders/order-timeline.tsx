import type { OrderTimelineEvent } from '@/types/order';

type OrderTimelineProps = {
  events: OrderTimelineEvent[];
};

export function OrderTimeline({ events }: OrderTimelineProps) {
  if (events.length === 0) {
    return <p className="text-sm text-muted-foreground">No timeline events yet.</p>;
  }

  return (
    <ol className="space-y-3" aria-label="Order timeline">
      {events.map((event) => (
        <li key={event.id} className="border-l-2 border-muted pl-3">
          <p className="text-sm font-medium">
            {event.previousStatus ? `${event.previousStatus} → ` : ''}
            {event.newStatus ?? event.status}
          </p>
          <p className="text-xs text-muted-foreground">{event.message}</p>
          <time className="text-xs text-muted-foreground" dateTime={event.at}>
            {new Date(event.at).toLocaleString()} · {event.updatedBy.displayName ?? event.updatedBy.type}
          </time>
          {event.internalNote ? (
            <p className="mt-1 text-xs italic text-muted-foreground">Note: {event.internalNote}</p>
          ) : null}
        </li>
      ))}
    </ol>
  );
}
