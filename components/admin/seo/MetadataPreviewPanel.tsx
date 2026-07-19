'use client';

import { buildMetadataPreview } from '@/lib/seo/metadata';
import type { MetadataPreviewModel } from '@/types/seo-metadata';

export type MetadataPreviewPanelProps = {
  route: string;
  preview?: MetadataPreviewModel | null;
};

/**
 * Admin SEO metadata preview — Document 14.07 architecture.
 * Character counts are editorial guidance only (not Google display guarantees).
 */
export function MetadataPreviewPanel({
  route,
  preview: previewProp,
}: MetadataPreviewPanelProps) {
  const preview = previewProp ?? buildMetadataPreview(route);

  if (!preview) {
    return (
      <p className="text-sm text-muted-foreground">
        No metadata registry entry for route <code>{route}</code>.
      </p>
    );
  }

  const { entry } = preview;

  return (
    <div className="space-y-4 rounded-lg border border-border p-4 text-sm">
      <div>
        <p className="font-medium">Title preview</p>
        <p className="text-foreground">{entry.title}</p>
        <p className="text-xs text-muted-foreground">
          {preview.titleLength} characters (editorial guidance only)
        </p>
      </div>
      <div>
        <p className="font-medium">Description preview</p>
        <p className="text-muted-foreground">{entry.description}</p>
        <p className="text-xs text-muted-foreground">
          {preview.descriptionLength} characters (editorial guidance only)
        </p>
      </div>
      <div>
        <p className="font-medium">Canonical</p>
        <p className="break-all text-foreground">{preview.canonicalUrl}</p>
      </div>
      <div>
        <p className="font-medium">Open Graph</p>
        <p>{entry.openGraphTitle ?? entry.title}</p>
        <p className="text-muted-foreground">
          {entry.openGraphDescription ?? entry.description}
        </p>
        <p className="text-xs">Image: {entry.openGraphImage}</p>
      </div>
      <div>
        <p className="font-medium">Twitter / X</p>
        <p>{entry.twitterTitle ?? entry.title}</p>
        <p className="text-xs">Card: summary_large_image</p>
      </div>
      <div>
        <p className="font-medium">Robots</p>
        <p>{preview.robotsLabel}</p>
      </div>
      {preview.duplicateWarnings.length > 0 ? (
        <div role="status" className="rounded-md bg-muted/40 p-3">
          <p className="font-medium">Duplicate warnings</p>
          <ul className="mt-1 list-disc pl-5 text-muted-foreground">
            {preview.duplicateWarnings.map((issue, index) => (
              <li key={`${issue.kind}-${index}`}>{issue.detail}</li>
            ))}
          </ul>
        </div>
      ) : null}
      {preview.missingWarnings.length > 0 ? (
        <div role="status" className="rounded-md bg-muted/40 p-3">
          <p className="font-medium">Missing field warnings</p>
          <ul className="mt-1 list-disc pl-5 text-muted-foreground">
            {preview.missingWarnings.map((issue, index) => (
              <li key={`${issue.kind}-${index}`}>{issue.detail}</li>
            ))}
          </ul>
        </div>
      ) : null}
      <p className="text-xs text-muted-foreground">{preview.characterGuidance}</p>
    </div>
  );
}
