-- First-party analytics sessions / visitors + event enrichment
-- Additive only — does not modify orders or financial tables.

CREATE TABLE IF NOT EXISTS analytics_visitors (
  id TEXT PRIMARY KEY,
  first_seen_at TIMESTAMPTZ NOT NULL,
  last_seen_at TIMESTAMPTZ NOT NULL,
  first_landing_path TEXT,
  first_referrer TEXT,
  first_utm_source TEXT,
  first_utm_medium TEXT,
  first_utm_campaign TEXT,
  first_channel TEXT
);

CREATE INDEX IF NOT EXISTS analytics_visitors_last_seen_idx
  ON analytics_visitors (last_seen_at);

CREATE TABLE IF NOT EXISTS analytics_sessions (
  id TEXT PRIMARY KEY,
  visitor_id TEXT NOT NULL REFERENCES analytics_visitors(id) ON DELETE CASCADE,
  started_at TIMESTAMPTZ NOT NULL,
  last_activity_at TIMESTAMPTZ NOT NULL,
  landing_path TEXT,
  exit_path TEXT,
  referrer TEXT,
  referrer_host TEXT,
  utm_source TEXT,
  utm_medium TEXT,
  utm_campaign TEXT,
  utm_content TEXT,
  utm_term TEXT,
  gclid TEXT,
  fbclid TEXT,
  ttclid TEXT,
  channel TEXT,
  device_category TEXT,
  browser TEXT,
  os TEXT,
  country TEXT NOT NULL DEFAULT 'XX'
);

CREATE INDEX IF NOT EXISTS analytics_sessions_visitor_idx
  ON analytics_sessions (visitor_id);

CREATE INDEX IF NOT EXISTS analytics_sessions_started_idx
  ON analytics_sessions (started_at);

CREATE INDEX IF NOT EXISTS analytics_sessions_channel_idx
  ON analytics_sessions (channel, started_at);

CREATE INDEX IF NOT EXISTS analytics_sessions_landing_idx
  ON analytics_sessions (landing_path, started_at);

ALTER TABLE analytics_events
  ADD COLUMN IF NOT EXISTS visitor_id TEXT,
  ADD COLUMN IF NOT EXISTS device_category TEXT,
  ADD COLUMN IF NOT EXISTS channel TEXT,
  ADD COLUMN IF NOT EXISTS referrer_host TEXT,
  ADD COLUMN IF NOT EXISTS source TEXT NOT NULL DEFAULT 'client';

CREATE INDEX IF NOT EXISTS analytics_events_visitor_created_idx
  ON analytics_events (visitor_id, created_at);

CREATE INDEX IF NOT EXISTS analytics_events_channel_created_idx
  ON analytics_events (channel, created_at);
