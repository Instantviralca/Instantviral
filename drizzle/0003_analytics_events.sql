-- First-party funnel analytics for Admin → Analytics
CREATE TABLE IF NOT EXISTS analytics_events (
  id TEXT PRIMARY KEY,
  event_name TEXT NOT NULL,
  session_id TEXT NOT NULL,
  page_path TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'XX',
  metadata JSONB,
  created_at TIMESTAMPTZ NOT NULL
);

CREATE INDEX IF NOT EXISTS analytics_events_event_created_idx
  ON analytics_events (event_name, created_at);

CREATE INDEX IF NOT EXISTS analytics_events_session_created_idx
  ON analytics_events (session_id, created_at);

CREATE INDEX IF NOT EXISTS analytics_events_country_created_idx
  ON analytics_events (country, created_at);
