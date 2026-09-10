import { site } from '@/config/site';
import { clampMetaDescription } from '@/lib/seo/metadata/sanitize';
import type { LearnArticle } from '@/types/blog';
import type { Service } from '@/types/service';

function clampDescription(text: string, max = 155): string {
  return clampMetaDescription(text, max);
}

/**
 * Unique meta descriptions (templates until production copy exists).
 * Targets ~140–160 characters with primary keyword where applicable.
 */
export const descriptions = {
  home: () =>
    clampDescription(
      'Buy Instagram followers in Canada with secure checkout, no password required, gradual delivery and clear packages. Explore likes and views — InstantViral.',
    ),

  service: (service: Service) => {
    if (service.slug === 'buy-instagram-followers') {
      return clampDescription(
        'Compare Instagram followers packages, pricing, delivery details and available plan sizes. Choose an option that matches your account and growth goals.',
      );
    }
    if (service.slug === 'buy-instagram-likes') {
      return clampDescription(
        'Buy Instagram likes through InstantViral with clear package options, delivery details, secure checkout, order tracking, and a public post URL only.',
      );
    }
    if (service.slug === 'buy-instagram-views') {
      return clampDescription(
        'Buy Instagram views in Canada using real package options from InstantViral.ca, with no password required, clear delivery details, support, and secure checkout.',
      );
    }
    if (service.slug === 'buy-instagram-comments') {
      return clampDescription(
        'Buy Instagram comments in Canada with clear package options, a public post URL, secure checkout, delivery details and order tracking through InstantViral.',
      );
    }
    if (service.slug === 'buy-tiktok-followers') {
      return clampDescription(
        'Buy TikTok followers in Canada with clear packages, secure checkout, no password required, delivery details and order tracking.',
      );
    }
    if (service.slug === 'buy-tiktok-likes') {
      return clampDescription(
        'Buy TikTok likes in Canada with clear packages for creators and businesses. Public video URL only, secure checkout, gradual delivery, and order tracking.',
      );
    }
    if (service.slug === 'buy-tiktok-views') {
      return clampDescription(
        'Buy TikTok views in Canada with clear packages for public videos. Public video URL only, secure checkout, delivery details and order tracking.',
      );
    }
    if (service.slug === 'buy-facebook-followers') {
      return clampDescription(
        'Buy Facebook followers in Canada with clear packages, public page URL checkout, gradual delivery where stated, and order tracking. No password required.',
      );
    }
    if (service.slug === 'buy-facebook-page-likes') {
      return clampDescription(
        'Buy Facebook Page Likes in Canada with clear packages, public Page URL checkout, secure payment and order tracking. No password required.',
      );
    }
    if (service.slug === 'buy-facebook-post-likes') {
      return clampDescription(
        'Buy Facebook Post Likes in Canada with clear packages, public post URL checkout, secure payment and order tracking. No password required.',
      );
    }
    if (service.slug === 'buy-youtube-subscribers') {
      return clampDescription(
        'Buy YouTube subscribers in Canada with clear packages, public channel URL only, secure checkout, delivery details and order tracking. No password required.',
      );
    }
    if (service.slug === 'buy-youtube-views') {
      return clampDescription(
        'Buy YouTube views in Canada with clear packages, public video URL only, secure checkout, delivery details and order tracking. No password required.',
      );
    }
    return clampDescription(
      `${service.name} from ${site.name}. Compare packages, review delivery details, and order securely with public profile or content details only.`,
    );
  },

  learnIndex: () =>
    clampDescription(
      `Learn social media growth strategies on ${site.name}. Practical guides for Instagram, TikTok, YouTube, and Facebook for Canadian creators and businesses.`,
    ),

  learnArticle: (article: LearnArticle) =>
    clampDescription(
      `${article.title} — InstantViral Learn guide with practical social media growth tips, platform strategy, and actionable takeaways.`,
    ),

  about: () =>
    clampDescription(
      'Learn about InstantViral, our mission, customer-first approach, secure ordering process, and commitment to transparent social media growth services.',
    ),

  reviews: () =>
    clampDescription(
      `Read ${site.name} reviews from creators and brands. Customer feedback and social proof for our Instagram, TikTok, YouTube, and Facebook services.`,
    ),

  contact: () =>
    clampDescription(
      'Contact InstantViral for sales, support, order enquiries, and general questions. Reach our team through the official contact form and support channels.',
    ),

  faq: () =>
    clampDescription(
      'Find answers about InstantViral services, real packages, delivery times, payments, refunds, refill eligibility, order tracking, and customer support.',
    ),

  privacyPolicy: () =>
    clampDescription(
      'Read how InstantViral collects, uses, protects, retains, and shares personal information when customers browse the website, contact support, or place an order.',
    ),

  refundPolicy: () =>
    clampDescription(
      'Read the InstantViral refund policy, including eligibility, cancellations, partial refunds, refill coverage, and customer responsibilities.',
    ),

  termsAndConditions: () =>
    clampDescription(
      'Read the Terms & Conditions governing the use of InstantViral, website access, orders, payments, refunds, acceptable use, and customer responsibilities.',
    ),

  cookiePolicy: () =>
    clampDescription(
      'Learn how InstantViral uses cookies, similar technologies, and cookie preferences to support website functionality, analytics, and customer experience.',
    ),

  disclaimer: () =>
    clampDescription(
      'Read the InstantViral disclaimer covering third-party platform independence, service limitations, educational content, external links, and results.',
    ),
} as const;
