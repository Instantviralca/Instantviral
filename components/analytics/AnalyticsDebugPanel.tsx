'use client';

/**
 * Development-only analytics debug panel — Document 14.09.
 * Never renders in production builds.
 */

import { useEffect, useState } from 'react';

import { isAnalyticsDebugEnabled } from '@/config/analytics';
import {
  getAnalyticsDebugRecords,
  subscribeAnalyticsDebug,
} from '@/lib/analytics/core/debug-store';
import type { AnalyticsDebugRecord } from '@/types/analytics';

export function AnalyticsDebugPanel() {
  const enabled =
    process.env.NODE_ENV !== 'production' && isAnalyticsDebugEnabled();
  const [records, setRecords] = useState<AnalyticsDebugRecord[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!enabled) return;
    setRecords(getAnalyticsDebugRecords());
    return subscribeAnalyticsDebug(setRecords);
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      data-analytics-debug="true"
      style={{
        position: 'fixed',
        left: 12,
        top: 72,
        zIndex: 40,
        maxWidth: 420,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
        fontSize: 11,
      }}
    >
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        style={{
          background: '#111',
          color: '#fff',
          border: 'none',
          padding: '8px 12px',
          cursor: 'pointer',
        }}
      >
        Analytics Debug ({records.length})
      </button>
      {open ? (
        <div
          style={{
            marginTop: 8,
            maxHeight: 360,
            overflow: 'auto',
            background: '#0b0b0b',
            color: '#d7d7d7',
            padding: 12,
            border: '1px solid #333',
          }}
        >
          {records.length === 0 ? (
            <div>No events yet</div>
          ) : (
            records.map((record) => (
              <div
                key={`${record.id}-${record.at}`}
                style={{
                  marginBottom: 12,
                  paddingBottom: 12,
                  borderBottom: '1px solid #333',
                }}
              >
                <div>
                  <strong>{record.eventName}</strong>
                </div>
                <div>consent: {record.consentAllowed ? 'allowed' : 'denied'}</div>
                <div>duplicate: {record.duplicate ? 'yes' : 'no'}</div>
                <div>providers: {record.providers.join(', ') || 'none'}</div>
                {record.issues.length > 0 ? (
                  <div>issues: {record.issues.map((issue) => issue.code).join(', ')}</div>
                ) : null}
                <pre style={{ whiteSpace: 'pre-wrap', margin: '6px 0 0' }}>
                  {JSON.stringify(record.sanitizedPayload, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      ) : null}
    </div>
  );
}

/** Test helper — production builds must never show the panel. */
export function isAnalyticsDebugPanelEnabled(): boolean {
  if (process.env.NODE_ENV === 'production') return false;
  return isAnalyticsDebugEnabled();
}
