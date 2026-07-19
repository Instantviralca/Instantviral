import { learnConfig } from '@/config/learn';
import { Heading } from '@/components/typography/heading';
import { MutedText } from '@/components/typography/muted-text';

type NewsletterCTAProps = {
  /** Force-render for previews; production still requires learnConfig.newsletterEnabled. */
  force?: boolean;
};

/**
 * Optional Learn newsletter CTA — Document 15.01.
 * Inactive until `learnConfig.newsletterEnabled` is true and a provider is configured.
 */
export function NewsletterCTA({ force = false }: NewsletterCTAProps) {
  if (!force && !learnConfig.newsletterEnabled) return null;

  return (
    <section
      aria-labelledby="learn-newsletter-heading"
      className="border border-dashed border-neutral-300 bg-neutral-50 p-6"
    >
      <Heading as="h2" id="learn-newsletter-heading" className="text-xl">
        {learnConfig.newsletterHeading}
      </Heading>
      <MutedText className="mt-2">{learnConfig.newsletterDescription}</MutedText>
      <p className="mt-4 text-xs text-neutral-500">
        Newsletter signup is not active yet.
      </p>
    </section>
  );
}
