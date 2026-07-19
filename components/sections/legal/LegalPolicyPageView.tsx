/**
 * Shared legal policy page view — Documents 13.04 / 13.05.
 * Renders content from the legal content layer; no hardcoded policy copy.
 */

import { Container } from '@/components/layout/container';
import { Section } from '@/components/layout/section';
import { Stack } from '@/components/layout/stack';
import { Breadcrumb } from '@/components/navigation/breadcrumb';
import { LegalTableOfContents } from '@/components/sections/legal/LegalTableOfContents';
import { Heading } from '@/components/typography/heading';
import { Lead } from '@/components/typography/lead';
import { MutedText } from '@/components/typography/muted-text';
import { Text } from '@/components/typography/text';
import { routes } from '@/config/routes';
import type { LegalPolicyPageContent } from '@/types/legal';
import type { TocItem } from '@/types/components';

export type LegalPolicyPageViewProps = {
  content: LegalPolicyPageContent;
  effectiveDateLabel?: string;
  lastUpdatedLabel?: string;
  /** Accessible name for the main content section. */
  contentAriaLabel?: string;
};

export function LegalPolicyPageView({
  content,
  effectiveDateLabel,
  lastUpdatedLabel,
  contentAriaLabel,
}: LegalPolicyPageViewProps) {
  const tocItems: TocItem[] = content.sections.map((section) => ({
    id: section.id,
    label: section.title,
    href: `#${section.anchor}`,
  }));

  const headingPrefix = content.id;

  return (
    <>
      <Section
        spacing="lg"
        aria-label={`${content.header.title} header`}
        className="print:py-4"
      >
        <Container size="xl">
          <Stack gap="md" className="mx-auto max-w-[52rem]">
            <Breadcrumb
              items={[
                { label: 'Home', href: routes.home },
                { label: content.breadcrumbLabel },
              ]}
            />
            <Heading as="h1" size="h1">
              {content.header.title}
            </Heading>
            <Lead className="text-pretty">{content.header.intro}</Lead>
            {(effectiveDateLabel || lastUpdatedLabel) && (
              <dl className="space-y-1 text-sm text-muted-foreground">
                {effectiveDateLabel ? (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-medium text-foreground">Effective date:</dt>
                    <dd>{effectiveDateLabel}</dd>
                  </div>
                ) : null}
                {lastUpdatedLabel ? (
                  <div className="flex flex-wrap gap-x-2">
                    <dt className="font-medium text-foreground">Last updated:</dt>
                    <dd>{lastUpdatedLabel}</dd>
                  </div>
                ) : null}
              </dl>
            )}
            {!effectiveDateLabel && !lastUpdatedLabel ? (
              <MutedText className="text-sm">
                Effective and last-updated dates will appear here once they are configured for
                publication.
              </MutedText>
            ) : null}
          </Stack>
        </Container>
      </Section>

      <Section
        spacing="lg"
        className="bg-muted/20 print:bg-transparent"
        aria-label={contentAriaLabel ?? content.header.title}
      >
        <Container size="xl">
          <div className="grid gap-10 lg:grid-cols-[240px_minmax(0,1fr)]">
            <div className="print:hidden">
              <LegalTableOfContents title={content.tocTitle} items={tocItems} />
            </div>

            <article className="mx-auto w-full max-w-[52rem] space-y-12 print:max-w-none">
              {content.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.anchor}
                  aria-labelledby={`${headingPrefix}-${section.id}-heading`}
                  className="scroll-mt-28 space-y-4"
                >
                  <Heading
                    as="h2"
                    size="h2"
                    id={`${headingPrefix}-${section.id}-heading`}
                  >
                    {section.title}
                  </Heading>
                  {section.blocks.map((block, index) => {
                    if (block.type === 'paragraph') {
                      return (
                        <Text
                          key={`${section.id}-p-${index}`}
                          className="text-pretty leading-relaxed text-muted-foreground"
                        >
                          {block.text}
                        </Text>
                      );
                    }
                    if (block.type === 'subheading') {
                      return (
                        <Heading
                          key={block.id}
                          as="h3"
                          size="h3"
                          id={block.id}
                          className="scroll-mt-28 pt-2"
                        >
                          {block.text}
                        </Heading>
                      );
                    }
                    return (
                      <ul
                        key={`${section.id}-list-${index}`}
                        className="list-disc space-y-2 pl-5 text-muted-foreground"
                      >
                        {block.items.map((item) => (
                          <li key={item} className="leading-relaxed">
                            {item}
                          </li>
                        ))}
                      </ul>
                    );
                  })}
                </section>
              ))}
            </article>
          </div>
        </Container>
      </Section>
    </>
  );
}
