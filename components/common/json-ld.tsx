import type { JsonLd } from '@/schemas';
import { serializeJsonLd } from '@/lib/seo/schema';

type JsonLdScriptProps = {
  data: JsonLd | JsonLd[] | null | undefined;
  id?: string;
};

/** Inject JSON-LD without affecting visible UI. */
export function JsonLdScript({ data, id }: JsonLdScriptProps) {
  if (!data) return null;

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
    />
  );
}
