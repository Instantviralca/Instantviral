'use client';

import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import type { OrderInternalNote } from '@/types/order';

type InternalNotesProps = {
  notes: OrderInternalNote[];
  onAdd?: (body: string) => void;
};

export function InternalNotes({ notes, onAdd }: InternalNotesProps) {
  const [body, setBody] = useState('');

  return (
    <div className="space-y-3">
      <ul className="space-y-2" aria-label="Internal notes">
        {notes.length === 0 ? (
          <li className="text-sm text-muted-foreground">No internal notes.</li>
        ) : (
          notes.map((note) => (
            <li key={note.id} className="rounded-md border p-2 text-sm">
              <p>{note.body}</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {note.createdBy.displayName ?? note.createdBy.type} ·{' '}
                {new Date(note.createdAt).toLocaleString()}
              </p>
            </li>
          ))
        )}
      </ul>
      <div className="space-y-2">
        <Label htmlFor="internal-note">Add internal note</Label>
        <Textarea
          id="internal-note"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          placeholder="Private admin note (never shown to customers)"
        />
        <Button
          type="button"
          size="sm"
          disabled={!body.trim()}
          onClick={() => {
            onAdd?.(body.trim());
            setBody('');
          }}
        >
          Add note
        </Button>
      </div>
    </div>
  );
}
