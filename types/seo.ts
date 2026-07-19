export type MetadataPlaceholder = {
  title?: string;
  description?: string;
  canonical?: string;
  openGraph?: Record<string, string>;
  twitter?: Record<string, string>;
};

export type SchemaPlaceholder = {
  type: string;
  data: Record<string, unknown>;
};
