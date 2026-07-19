import { site } from '@/config/site';
import type { LearnArticle } from '@/types/blog';
import type { Service } from '@/types/service';

function clampDescription(text: string, min = 140, max = 160): string {
  const cleaned = text.replace(/\s+/g, ' ').trim();
  if (cleaned.length <= max) {
    if (cleaned.length >= min) return cleaned;
    return cleaned;
  }
  return `${cleaned.slice(0, max - 1).trimEnd()}…`;
}

/**
 * Unique meta descriptions (templates until production copy exists).
 * Targets ~140–160 characters with primary keyword where applicable.
 */
export const descriptions = {
  home: () =>
    clampDescription(
      `InstantViral helps creators, businesses, and brands grow on Instagram, TikTok, YouTube, and Facebook with clear packages, secure checkout, and 24/7 support since 2018.`,
    ),

  service: (service: Service) => {
    if (service.slug === 'buy-instagram-followers') {
      return clampDescription(
        'Compare Instagram Followers Packages, pricing and plans. Review delivery details, choose a package, and place your order with a public username only.',
      );
    }
    if (service.slug === 'buy-instagram-likes') {
      return clampDescription(
        'Compare Instagram Likes Packages, pricing and plans. Review delivery details, choose a package, and place your order with a public post URL only.',
      );
    }
    if (service.slug === 'buy-instagram-views') {
      return clampDescription(
        'Buy Instagram views in Canada using real package options from InstantViral.ca, with no password required, clear delivery details, support, and secure checkout.',
      );
    }
    if (service.slug === 'buy-instagram-comments') {
      return clampDescription(
        'Increase Instagram engagement with comments packages that support conversation, credibility, and community trust. Public post URL only, secure checkout, and order tracking.',
      );
    }
    if (service.slug === 'buy-tiktok-followers') {
      return clampDescription(
        'Buy TikTok followers in Canada using real package options from InstantViral.ca, with no password required, clear delivery details, 24/7 support, and eligible refill coverage.',
      );
    }
    if (service.slug === 'buy-tiktok-likes') {
      return clampDescription(
        'Buy TikTok likes Canada with real packages for creators and businesses. Public video URL only, secure checkout, gradual delivery options, and order tracking.',
      );
    }
    if (service.slug === 'buy-tiktok-views') {
      return clampDescription(
        'Buy TikTok Views Canada with real video views packages. Public video URL only, secure checkout, gradual delivery and order tracking for creators and businesses.',
      );
    }
    if (service.slug === 'buy-facebook-followers') {
      return clampDescription(
        'Buy Facebook Followers Canada with clear package options, public page URL checkout, gradual delivery details and order tracking. No password required.',
      );
    }
    if (service.slug === 'buy-facebook-page-likes') {
      return clampDescription(
        'Buy Facebook page likes in Canada with InstantViral.ca packages. Public page URL only, clear delivery details, 24/7 support, secure checkout, and order tracking.',
      );
    }
    if (service.slug === 'buy-facebook-post-likes') {
      return clampDescription(
        'Buy Facebook post likes in Canada with InstantViral.ca packages. Public post URL only, clear delivery details, 24/7 support, secure checkout, and order tracking.',
      );
    }
    if (service.slug === 'buy-youtube-subscribers') {
      return clampDescription(
        'Compare YouTube subscriber packages, review pricing and delivery information, and order using your public channel URL with checkout and order tracking.',
      );
    }
    if (service.slug === 'buy-youtube-views') {
      return clampDescription(
        'Buy YouTube Views Canada with clear package options, public video URL checkout, gradual delivery details and order tracking. No password required.',
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
      `${article.title} — practical InstantViral Learn guide covering social media growth tactics, platform strategy, and safe ordering basics.`,
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
