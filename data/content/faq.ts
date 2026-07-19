import type { FAQItem } from '@/types/content';
import type { FAQCategoryId } from '@/types/copywriting';
import { faqHubItems } from '@/data/content/faq-hub';

/**
 * Shared FAQ pool. Pages reference entries by id — no duplicated Q&A copy.
 * Homepage FAQs: homepageFilter entries referenced from homepage.ts.
 * FAQ hub (/faq): Document 13.03 entries from faq-hub.ts.
 */
export const faqItems: FAQItem[] = [
  // Homepage FAQ set — UI filters via homepageFilter (not FAQ hub category)
  {
    id: 'faq-home-how-works',
    question: 'How does InstantViral work?',
    answer:
      'Choose a service for Instagram, TikTok, YouTube or Facebook, compare packages on the service page, enter the public username or content URL required, and complete checkout. After payment is confirmed, monitor available updates on the [Track Order](/track-order) page with your order ID and email. Start with a popular option such as [Buy Instagram Followers](/buy-instagram-followers) when you know which platform to grow first.',
    homepageFilter: 'General',
    order: 1,
  },
  {
    id: 'faq-home-choose-package',
    question: 'How do I choose the right package?',
    answer:
      'Pick a package that matches your platform, goals and budget. Each service page lists quantities, prices, delivery estimates and eligibility details before you buy. Review refill or gradual delivery terms when they are shown for that package. Compare options on pages such as [Buy Instagram Likes](/buy-instagram-likes) or [Buy Instagram Followers](/buy-instagram-followers), or [Contact](/contact) support if you need help deciding.',
    homepageFilter: 'General',
    order: 2,
  },
  {
    id: 'faq-home-password',
    question: 'Do I need to share my social media password?',
    answer:
      'No. InstantViral never requires your social media password. Provide only the public username, profile URL or content link needed for the selected service. Never share login credentials, recovery codes or two-factor codes with anyone claiming to process your order.',
    homepageFilter: 'Safety',
    order: 3,
  },
  {
    id: 'faq-home-public-account',
    question: 'Do I need a public account to place an order?',
    answer:
      'Many services need the relevant profile or content to remain public during delivery. Exact requirements appear on the service page before checkout. Private or restricted profiles may delay or prevent delivery. Keep the username or URL accurate, and contact support before ordering if you are unsure whether your account qualifies.',
    homepageFilter: 'Safety',
    order: 4,
  },
  {
    id: 'faq-home-multiple-services',
    question: 'Can I order more than one service at the same time?',
    answer:
      'Yes. You can place separate orders across Instagram, TikTok, YouTube and Facebook. Complete checkout for each purchase and provide the correct public username or content URL for every service. Track each order independently with its own order ID and email on the [Track Order](/track-order) page.',
    homepageFilter: 'Orders',
    order: 5,
  },
  {
    id: 'faq-home-order-start',
    question: 'When will my order start?',
    answer:
      'Start times depend on the selected service and package. Delivery estimates are shown on the service page before checkout. After purchase, use the [Track Order](/track-order) page with your order ID and email to review available status updates. Timing can also differ when gradual delivery applies.',
    homepageFilter: 'Delivery',
    order: 6,
  },
  {
    id: 'faq-home-track-order',
    question: 'How can I track my order?',
    answer:
      'Open the [Track Order](/track-order) page and enter the order ID and email from your confirmation. Tracking shows available status updates from confirmation through delivery. If your order does not load, check the spelling of those details and contact support for help.',
    homepageFilter: 'Delivery',
    order: 7,
  },
  {
    id: 'faq-home-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Gradual delivery is available for eligible services where it is clearly stated on the service page. When it applies, delivery is spread over time instead of completing at once. Availability and timing depend on the platform, service and package. If gradual delivery is not listed, that package uses the standard method shown on the page.',
    homepageFilter: 'Delivery',
    order: 8,
  },
  {
    id: 'faq-home-refill',
    question: 'Do you offer a refill guarantee?',
    answer:
      'Selected services include refill protection where it is stated on the service page. Eligibility, the refill window and other conditions vary by package. If you believe an eligible drop occurred, contact support with your order ID and checkout email so the team can review the request against the package terms.',
    homepageFilter: 'Delivery',
    order: 9,
  },
  {
    id: 'faq-home-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      "Eligible purchases are covered by InstantViral's 30-day money-back guarantee under the [refund policy](/refund-policy) and the terms shown for the selected service. Review those conditions before checkout. Contact support with your order ID and checkout email if you need help with an eligible purchase.",
    homepageFilter: 'Delivery',
    order: 10,
  },
  {
    id: 'faq-home-platforms',
    question: 'Which social media platforms do you support?',
    answer:
      'InstantViral supports Instagram, TikTok, YouTube and Facebook. Examples include [Buy Instagram Followers](/buy-instagram-followers), [Buy Instagram Likes](/buy-instagram-likes), [Buy TikTok Followers](/buy-tiktok-followers), [Buy TikTok Views](/buy-tiktok-views), [Buy YouTube Subscribers](/buy-youtube-subscribers), [Buy YouTube Views](/buy-youtube-views), [Buy Facebook Followers](/buy-facebook-followers) and [Buy Facebook Page Likes](/buy-facebook-page-likes). YouTube packages currently focus on subscribers and views.',
    homepageFilter: 'Platforms',
    order: 11,
  },
  {
    id: 'faq-home-need-help',
    question: 'What should I do if I need help?',
    answer:
      'Visit the [Contact](/contact) page for help with packages, checkout, delivery, tracking or an existing purchase. Include your order ID and checkout email when asking about an order. For pre-purchase questions, share the platform and service you are considering so support can respond with clearer guidance.',
    homepageFilter: 'General',
    order: 12,
  },
  {
    id: 'faq-password',
    question: 'Do I need to share my social media password?',
    answer:
      'No. InstantViral does not require your Instagram, TikTok, YouTube, or Facebook password. Orders use public information such as a username, profile URL, post link, page URL, channel URL, or video link, depending on the service you select.',
  },
  {
    id: 'faq-order-start',
    question: 'How quickly will my order begin?',
    answer:
      'Start times vary by service and package. Some orders may begin shortly after payment confirmation, while others require additional processing time. The relevant service page should display the expected start and delivery information before you place an order.',
  },
  {
    id: 'faq-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Yes, gradual delivery is available on eligible services. The exact delivery method and estimated timeframe depend on the platform, service, and package selected. Check the service page for the terms that apply to your order.',
  },
  {
    id: 'faq-refill',
    question: 'Do you offer a refill guarantee?',
    answer:
      'Eligible services include refill coverage. Refill periods and conditions vary by service, so the applicable terms should be shown clearly on the relevant service page before checkout.',
  },
  {
    id: 'faq-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases are covered by a 30-day money-back guarantee, subject to the Refund Policy and the conditions listed on the service page. Customers should review the applicable terms before ordering.',
  },
  {
    id: 'faq-track-order',
    question: 'How can I track my order?',
    answer:
      'Visit the Track Order page and enter the order ID and email address used during checkout. The tracking page will show the customer-safe order status and the latest update.',
  },
  {
    id: 'faq-platforms',
    question: 'Which platforms do you support?',
    answer:
      'InstantViral currently offers growth services for Instagram, TikTok, YouTube, and Facebook. Each platform has separate service pages and real package options.',
  },
  {
    id: 'faq-need-help',
    question: 'What should I do if I need help?',
    answer:
      'Contact the support team through the Contact page or the support method shown in your order confirmation. Support is available 24/7 for service questions and order assistance.',
  },
  // Shared aliases still referenced by company / service content shells
  {
    id: 'faq-what-is-instantviral',
    question: 'What is InstantViral?',
    answer:
      'InstantViral is a Canadian social media growth platform offering services for Instagram, TikTok, YouTube, and Facebook, with clear ordering, order tracking, and 24/7 support.',
  },
  {
    id: 'faq-how-ordering-works',
    question: 'How does ordering work?',
    answer:
      'Choose a service, select a real package, provide the required public information, and complete checkout. You can track progress on the Track Order page.',
  },
  {
    id: 'faq-is-it-safe',
    question: 'Is it safe for my account?',
    answer:
      'InstantViral never requires your social media password. Orders use public usernames or content links only. Always review the service page terms before purchasing.',
  },
  {
    id: 'faq-delivery-time',
    question: 'How long does delivery take?',
    answer:
      'Delivery timelines vary by service and package. Expected start and delivery information should be shown on the relevant service page before you order.',
  },
  {
    id: 'faq-refunds',
    question: 'What is the refund policy?',
    answer:
      'Eligible purchases are covered by a 30-day money-back guarantee, subject to the Refund Policy and the conditions listed on the service page.',
  },
  {
    id: 'faq-support',
    question: 'How do I contact support?',
    answer:
      'Contact the support team through the Contact page or the method shown in your order confirmation. Support is available 24/7.',
  },
  {
    id: 'faq-service-followers',
    question: 'How do follower packages work?',
    answer:
      'Open the relevant follower service page to compare real packages, review delivery details, and complete checkout with the required public profile information.',
  },
  {
    id: 'faq-service-engagement',
    question: 'How do likes and views packages work?',
    answer:
      'Open the relevant likes or views service page to compare packages, review delivery details, and provide the public post or video URL required for the order.',
  },
  // Buy Instagram Followers Canada — Document 09.11 §15
  {
    id: 'faq-ig-followers-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. InstantViral does not ask for your Instagram password. The order form only requires the public username connected to the profile receiving the followers. You remain in control of your Instagram account throughout the process.',
  },
  {
    id: 'faq-ig-followers-delivery-speed',
    question: 'How quickly will my followers begin arriving?',
    answer:
      'Start and delivery times depend on the package selected. The pricing section should display the current estimate stored with each real package. Some eligible packages may begin shortly after payment confirmation, while others can require additional processing time.',
  },
  {
    id: 'faq-ig-followers-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Gradual delivery is available on eligible Instagram follower packages. When applicable, the selected package should clearly state the estimated delivery method or timeframe before checkout.',
  },
  {
    id: 'faq-ig-followers-refill',
    question: 'Do the packages include a refill guarantee?',
    answer:
      'Eligible packages include refill protection. The refill period, eligibility rules, and limitations can vary, so the applicable terms must be displayed on the package or service page before purchase.',
  },
  {
    id: 'faq-ig-followers-private',
    question: 'What happens if my Instagram profile is private?',
    answer:
      'The profile may need to remain public while the order is being processed. If the account is private, delivery may not begin or may be interrupted. The order instructions should clearly explain the requirement before checkout.',
  },
  {
    id: 'faq-ig-followers-business',
    question: 'Can I buy followers for a business account?',
    answer:
      'Yes. Instagram follower packages can be ordered for eligible creator, personal, or business profiles, provided the public username is correct and the account meets the service requirements.',
  },
  {
    id: 'faq-ig-followers-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      "Eligible purchases are covered by InstantViral's 30-day money-back guarantee, subject to the Refund Policy and the service conditions displayed before checkout. Customers should review those terms before placing an order.",
  },
  {
    id: 'faq-ig-followers-track',
    question: 'How can I track my order?',
    answer:
      'Use the Track Order page with the order ID and email address entered during checkout. The page will show the current customer-facing status and latest update without exposing internal processing notes.',
  },
  // Instagram Followers Packages conversion FAQs
  {
    id: 'faq-ig-pkg-choose',
    question: 'How do I choose a package?',
    answer:
      'Compare quantities and prices in the Instagram Followers Pricing grid, then match the size to your goal using the package guide. Smaller packages work well for testing; larger packages suit businesses, brands and campaigns.',
  },
  {
    id: 'faq-ig-pkg-order-again',
    question: 'Can I order again later?',
    answer:
      'Yes. You can place another Instagram Followers Order at any time for the same or a different package. Each purchase uses a separate checkout and generates its own order ID for tracking.',
  },
  {
    id: 'faq-ig-pkg-split',
    question: 'Can I split my order?',
    answer:
      'Packages are ordered as individual units. If you want multiple quantities or services, complete separate checkouts for each package so delivery and tracking stay clear for every order.',
  },
  {
    id: 'faq-ig-pkg-delivery-start',
    question: 'When does delivery begin?',
    answer:
      'Delivery start times depend on the selected package and are confirmed before checkout. After payment is confirmed, you can monitor available updates on the Track Order page.',
  },
  {
    id: 'faq-ig-pkg-gradual',
    question: 'Will delivery be gradual?',
    answer:
      'Gradual delivery is available on eligible packages. When it applies, the delivery method and expectations are shown before you complete payment for that Instagram Followers Package.',
  },
  {
    id: 'faq-ig-pkg-track',
    question: 'Can I track delivery?',
    answer:
      'Yes. Use your order ID and checkout email on the [Track Order](/track-order) page to review available status updates from confirmation through delivery.',
  },
  {
    id: 'faq-ig-pkg-after-checkout',
    question: 'What happens after checkout?',
    answer:
      'You receive an order confirmation by email. The order then moves through review and delivery according to the selected package. Tracking remains available with your order ID and email.',
  },
  {
    id: 'faq-ig-pkg-upgrade',
    question: 'Can I upgrade later?',
    answer:
      'You cannot change a completed package after checkout. To increase quantity, place a new order for an additional Instagram Followers Package that matches your updated goal.',
  },
  // Instagram Likes Packages conversion FAQs
  {
    id: 'faq-ig-likes-pkg-choose',
    question: 'How do I choose a Likes package?',
    answer:
      'Compare quantities and prices in the Instagram Likes Pricing grid, then match the size to your goal using the package guide. Smaller packages work well for testing; larger packages suit businesses and high-engagement campaigns.',
  },
  {
    id: 'faq-ig-likes-pkg-order-again',
    question: 'Can I order again later?',
    answer:
      'Yes. You can place another Instagram Likes order at any time for the same or a different package. Each purchase uses a separate checkout and generates its own order ID for tracking.',
  },
  {
    id: 'faq-ig-likes-pkg-split',
    question: 'Can I split my order?',
    answer:
      'Packages are ordered as individual units. If you want likes on multiple posts or additional quantities, complete separate checkouts so delivery and tracking stay clear for every order.',
  },
  {
    id: 'faq-ig-likes-pkg-delivery-start',
    question: 'When does delivery begin?',
    answer:
      'Delivery start times depend on the selected likes package and are confirmed before checkout. After payment is confirmed, you can monitor available updates on the Track Order page.',
  },
  {
    id: 'faq-ig-likes-pkg-gradual',
    question: 'Will delivery be gradual?',
    answer:
      'Gradual delivery is available on eligible packages. When it applies, the delivery method and expectations are shown before you complete payment for that Instagram Likes Package.',
  },
  {
    id: 'faq-ig-likes-pkg-track',
    question: 'Can I track delivery?',
    answer:
      'Yes. Use your order ID and checkout email on the [Track Order](/track-order) page to review available status updates from confirmation through delivery.',
  },
  {
    id: 'faq-ig-likes-pkg-after-checkout',
    question: 'What happens after checkout?',
    answer:
      'You receive an order confirmation by email. The order then moves through review and likes delivery according to the selected package. Tracking remains available with your order ID and email.',
  },
  {
    id: 'faq-ig-likes-pkg-upgrade',
    question: 'Can I upgrade later?',
    answer:
      'You cannot change a completed package after checkout. To increase quantity, place a new order for an additional Instagram Likes Package that matches your updated goal.',
  },
  {
    id: 'faq-ig-likes-pkg-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. InstantViral never asks for your Instagram password. Orders only need the public URL of the Instagram post or Reel receiving the likes.',
  },
  {
    id: 'faq-ig-likes-pkg-any-post',
    question: 'Can I order Likes for any public post?',
    answer:
      'Yes, as long as the Instagram post or Reel remains public and accessible while the order is processed. Private or restricted content cannot be fulfilled.',
  },
  // Buy Instagram Likes Canada — Document 09.12 §15
  {
    id: 'faq-ig-likes-password',
    question: 'Do I need to share my Instagram password?',
    answer:
      'No. InstantViral does not require your Instagram password. The order form only needs the public URL of the post or Reel receiving the likes.',
  },
  {
    id: 'faq-ig-likes-links',
    question: 'Which Instagram links can I use?',
    answer:
      'Use the public link for the Instagram post or Reel you want to support. The content should remain publicly accessible while the order is being processed.',
  },
  {
    id: 'faq-ig-likes-delivery-speed',
    question: 'How quickly will the likes begin arriving?',
    answer:
      'Start and delivery times depend on the package selected. The pricing section should display the current estimate stored with each real package.',
  },
  {
    id: 'faq-ig-likes-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Gradual delivery may be available on eligible Instagram Likes packages. When applicable, the package should clearly display the delivery method or timeframe.',
  },
  {
    id: 'faq-ig-likes-refill',
    question: 'Do Instagram Likes packages include refill protection?',
    answer:
      'Eligible packages may include refill coverage. The relevant package or service page must display the applicable period, limits, and conditions before purchase.',
  },
  {
    id: 'faq-ig-likes-reel',
    question: 'Can I order likes for a Reel?',
    answer:
      'Yes, where supported by the selected package. Use the public Reel URL during order configuration and confirm that the content remains accessible.',
  },
  {
    id: 'faq-ig-likes-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases are covered by the 30-day money-back guarantee, subject to the Refund Policy and service-specific conditions.',
  },
  {
    id: 'faq-ig-likes-track',
    question: 'How can I track the order?',
    answer:
      'Use the Track Order page with the order ID and email address entered during checkout. The page will display the latest customer-facing status.',
  },
  // Buy Instagram Views — intent: reels, reach, watch time
  {
    id: 'faq-ig-views-password',
    question: 'Do views help Instagram Reel reach?',
    answer:
      'Views support discoverability by showing that people started watching a Reel or video. They work best beside strong hooks and clear creative. Watch time and saves still matter for longer circulation.',
  },
  {
    id: 'faq-ig-views-links',
    question: 'Will Reel views increase after I order?',
    answer:
      'Delivery adds views to the public video or Reel URL you provide. Keep the content public while the order processes so progress can continue as estimated on the package card.',
  },
  {
    id: 'faq-ig-views-delivery-speed',
    question: 'How fast do Instagram views start?',
    answer:
      'Start timing depends on the selected package. Review the delivery estimate shown with each Instagram Views package before checkout.',
  },
  {
    id: 'faq-ig-views-reels',
    question: 'Can I buy views specifically for Instagram Reels?',
    answer:
      'Yes, where the package supports Reels. Use the public Reel URL during configuration. If you also want reactions or conversation, compare [Instagram likes](/buy-instagram-likes) and [Instagram comments](/buy-instagram-comments).',
  },
  {
    id: 'faq-ig-views-gradual-delivery',
    question: 'Do views arrive all at once or gradually?',
    answer:
      'Eligible packages may deliver gradually. The package details should describe the delivery style or timeframe before you pay.',
  },
  {
    id: 'faq-ig-views-refill',
    question: 'Do Instagram Views packages include refill protection?',
    answer:
      'Some packages include refill coverage. Terms, limits, and eligibility appear with the package before purchase.',
  },
  {
    id: 'faq-ig-views-money-back',
    question: 'Is there a money-back guarantee on views orders?',
    answer:
      'Eligible purchases follow the 30-day money-back guarantee under the Refund Policy and service-specific conditions.',
  },
  {
    id: 'faq-ig-views-track',
    question: 'How do I track video view delivery?',
    answer:
      'Use the Track Order page with your order ID and checkout email to see the latest customer-facing status.',
  },
  // Buy Instagram Comments — community, conversation, trust intent
  {
    id: 'faq-ig-comments-password',
    question: 'Are comments relevant to my niche?',
    answer:
      'Choose packages and wording that fit the topic of your post. On-niche remarks and replies look more credible than generic praise. After delivery, answer real questions so the thread stays useful to people in your niche.',
  },
  {
    id: 'faq-ig-comments-links',
    question: 'Can comments include emojis?',
    answer:
      'Yes. Short reactions and emojis are common in Instagram discussions. Keep the overall tone consistent with your brand and hide anything that does not match your community standards.',
  },
  {
    id: 'faq-ig-comments-custom-text',
    question: 'Can comments look natural?',
    answer:
      'Natural results come from matching quantity to the post, preferring conversational language over hype, and using gradual delivery when available. Your own replies after comments land matter just as much.',
  },
  {
    id: 'faq-ig-comments-delivery-speed',
    question: 'Do I need a public post?',
    answer:
      'Yes. Comments require a public Instagram post or Reel URL. Private or restricted content cannot be fulfilled while it stays inaccessible.',
  },
  {
    id: 'faq-ig-comments-reels',
    question: 'Can I order comments for Reels?',
    answer:
      'Yes. Paste the public Reel URL during checkout when the package supports that content type. Keep the Reel public for the full delivery window.',
  },
  {
    id: 'faq-ig-comments-refill',
    question: 'Will comments appear gradually?',
    answer:
      'Many packages support gradual delivery so discussion builds over time. Check the estimate and delivery style on the package card before you pay.',
  },
  {
    id: 'faq-ig-comments-money-back',
    question: 'Can I order again later?',
    answer:
      'Yes. You can place another comments order whenever a new post or Reel needs more conversation. Match quantity to that upload rather than repeating the same volume on every tile.',
  },
  {
    id: 'faq-ig-comments-track',
    question: 'Do I need my Instagram password?',
    answer:
      'No. InstantViral never asks for your Instagram password. Orders use your public post URL and checkout email only. Track status with your order ID after purchase.',
  },
  // Buy TikTok Followers Canada — production FAQ
  {
    id: 'faq-tt-followers-choose',
    question: 'How do I choose the right TikTok followers package?',
    answer:
      'Choose a package that matches your current audience size and growth goals. Smaller packages are often suitable for newer creators, while larger packages may be a better fit for established businesses, influencers and brands.',
  },
  {
    id: 'faq-tt-followers-password',
    question: 'Do I need to provide my TikTok password?',
    answer:
      'No. We never ask for your TikTok password. Orders only require your public TikTok username so the selected package can be delivered to the correct profile.',
  },
  {
    id: 'faq-tt-followers-public',
    question: 'Should my TikTok profile be public?',
    answer:
      'Yes. Your TikTok profile should remain public while your order is being processed and delivered. A private account may prevent successful delivery.',
  },
  {
    id: 'faq-tt-followers-delivery-begin',
    question: 'When does delivery begin?',
    answer:
      'Delivery begins after your order has been confirmed. The estimated delivery timeframe depends on the package you choose and current processing times.',
  },
  {
    id: 'faq-tt-followers-track',
    question: 'Can I track my order?',
    answer:
      "Yes. After checkout you'll receive the information needed to monitor your order through [our tracking system](/track-order) until delivery is complete.",
  },
  {
    id: 'faq-tt-followers-another-order',
    question: 'Can I place another order later?',
    answer:
      'Yes. Many customers return to order [additional packages](/buy-tiktok-followers#pricing-packages) as their TikTok audience continues to grow. You can place another order whenever you feel it matches your growth strategy.',
  },
  {
    id: 'faq-tt-followers-required-info',
    question: 'What information is required to place an order?',
    answer:
      "You'll need your public TikTok username, the package you wish to purchase and a valid email address for order confirmation and tracking updates.",
  },
  {
    id: 'faq-tt-followers-who-for',
    question: 'Who are these packages designed for?',
    answer:
      'TikTok follower packages are suitable for creators, influencers, businesses, agencies and brands looking to strengthen their profile presence while continuing to publish original content.',
  },
  // Buy TikTok Likes Canada — Things To Know Before Ordering
  {
    id: 'faq-tt-likes-password',
    question: 'Do I need to share my TikTok password?',
    answer: 'No. We only require your public TikTok video URL.',
  },
  {
    id: 'faq-tt-likes-repeat',
    question: 'Can I order more than once?',
    answer: 'Yes. Many customers place additional orders for new videos.',
  },
  {
    id: 'faq-tt-likes-packages',
    question: 'Can I choose different package sizes?',
    answer: 'Yes. Select the package that best matches your campaign goals.',
  },
  {
    id: 'faq-tt-likes-delivery-speed',
    question: 'How quickly does delivery begin?',
    answer: 'Most orders begin shortly after processing is complete.',
  },
  {
    id: 'faq-tt-likes-track',
    question: 'Can I track my order?',
    answer: 'Yes. Order tracking is available after checkout.',
  },
  // Legacy TikTok Likes FAQ IDs retained for schema stability
  {
    id: 'faq-tt-likes-links',
    question: 'Which TikTok link should I use?',
    answer:
      'Use the public URL of the TikTok video you want to support. The video should remain publicly accessible while the order is being processed.',
  },
  {
    id: 'faq-tt-likes-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Gradual delivery may be available on eligible TikTok Likes packages. The selected package should display the applicable delivery method or timeframe.',
  },
  {
    id: 'faq-tt-likes-refill',
    question: 'Do TikTok Likes packages include refill protection?',
    answer:
      'Eligible packages may include refill coverage. The package or service page must display the applicable period, limits, and conditions before purchase.',
  },
  {
    id: 'faq-tt-likes-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases are covered by the 30-day money-back guarantee, subject to the Refund Policy and service-specific conditions.',
  },
  // Buy TikTok Views Canada — Things To Know Before Ordering
  {
    id: 'faq-tt-views-password',
    question: 'Do I need my TikTok password?',
    answer: 'No. We only require your public TikTok video URL.',
  },
  {
    id: 'faq-tt-views-repeat',
    question: 'Can I order more than once?',
    answer: 'Yes. Many customers purchase views for multiple videos.',
  },
  {
    id: 'faq-tt-views-packages',
    question: 'Can I select different package sizes?',
    answer: 'Yes. Choose the package that matches your campaign goals.',
  },
  {
    id: 'faq-tt-views-delivery-speed',
    question: 'How quickly does delivery begin?',
    answer: 'Most orders begin shortly after payment processing.',
  },
  {
    id: 'faq-tt-views-track',
    question: 'Can I track my order?',
    answer: 'Yes. Every order includes progress tracking.',
  },
  // Legacy IDs retained for any older references
  {
    id: 'faq-tt-views-links',
    question: 'Which TikTok link should I use?',
    answer:
      'Use the public URL of the TikTok video you want to promote. The video should remain publicly accessible while the order is being processed.',
  },
  {
    id: 'faq-tt-views-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'Gradual delivery may be available on eligible TikTok Views packages. The selected package should display the applicable delivery method or timeframe.',
  },
  {
    id: 'faq-tt-views-refill',
    question: 'Do TikTok Views packages include refill protection?',
    answer:
      'Eligible packages may include refill coverage. The package or service page must display the applicable period, limits, and conditions before purchase.',
  },
  {
    id: 'faq-tt-views-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases are covered by the 30-day money-back guarantee, subject to the Refund Policy and service-specific conditions.',
  },
  // Buy Facebook Followers Canada — Document 09.31
  {
    id: 'faq-fb-followers-choose-package',
    question: 'How do I choose the right package?',
    answer:
      'Compare available [Facebook Followers Packages](/buy-facebook-followers#pricing-packages) with your page size and growth goals. Review quantity, price and delivery details before checkout.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-fb-followers-password',
    question: 'Do I need my Facebook password?',
    answer:
      'No. Your Facebook password is never required. Orders use only your public Facebook page URL, the selected package and a valid email address.',
    homepageFilter: 'Page Requirements',
  },
  {
    id: 'faq-fb-followers-public',
    question: 'Does my Facebook page need to be public?',
    answer:
      'Yes. Keep your Facebook page publicly accessible while the order is processed. Restricted pages can delay delivery until public access is restored.',
    homepageFilter: 'Page Requirements',
  },
  {
    id: 'faq-fb-followers-delivery-begin',
    question: 'When does delivery begin?',
    answer:
      'Delivery begins after the order is reviewed and confirmed. Timing depends on the selected package and current demand. Check the package details before ordering.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-fb-followers-track',
    question: 'Can I track my order?',
    answer:
      'Yes. Use your order ID and checkout email on the [Order Tracking](/track-order) page to review available delivery updates.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-fb-followers-order-again',
    question: 'Can I order again later?',
    answer:
      'Yes. You can place another followers order when a different package better matches future page goals. Confirm the correct public page URL before each checkout.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-fb-followers-change-url',
    question: 'Can I change my page URL after checkout?',
    answer:
      'Contact [support](/contact) as soon as possible if the wrong page URL was submitted. A change may only be possible before processing or delivery begins.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-fb-followers-after-checkout',
    question: 'What happens after checkout?',
    answer:
      'You receive order confirmation after successful payment. The page URL and package are reviewed, delivery is scheduled and progress remains available through order tracking.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-fb-followers-gradual',
    question: 'Are followers delivered gradually?',
    answer:
      'Gradual delivery may be available where it is listed for the selected package. Review the delivery information shown before checkout.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-fb-followers-support',
    question: 'How do I contact support?',
    answer:
      'Visit the [Contact](/contact) page or open the [FAQ](/faq) hub with your order ID and checkout email. Do not send passwords or private Facebook account details.',
    homepageFilter: 'Support',
  },
  // Buy Facebook Page Likes Canada — Document 09.32
  {
    id: 'faq-fb-page-likes-password',
    question: 'Do I need to share my Facebook password?',
    answer: 'No. InstantViral only needs the public Facebook page URL.',
  },
  {
    id: 'faq-fb-page-likes-links',
    question: 'Which Facebook link should I use?',
    answer: 'Use the public URL of the page receiving the likes.',
  },
  {
    id: 'faq-fb-page-likes-delivery-speed',
    question: 'How quickly will the Page Likes begin arriving?',
    answer: 'Start and delivery times depend on the selected real package.',
  },
  {
    id: 'faq-fb-page-likes-gradual-delivery',
    question: 'Is gradual delivery available?',
    answer:
      'It may be available on eligible packages and must be shown in the package data.',
  },
  {
    id: 'faq-fb-page-likes-refill',
    question: 'Do Facebook Page Likes packages include refill protection?',
    answer:
      'Eligible packages may include refill coverage. Display the real terms before checkout.',
  },
  {
    id: 'faq-fb-page-likes-businesses',
    question: 'Can businesses buy Facebook Page Likes?',
    answer:
      'Yes, provided the page is public and meets the service requirements.',
  },
  {
    id: 'faq-fb-page-likes-money-back',
    question: 'Is there a money-back guarantee?',
    answer:
      'Eligible purchases are covered by the 30-day money-back guarantee, subject to the Refund Policy and service conditions.',
  },
  {
    id: 'faq-fb-page-likes-track',
    question: 'How can I track the order?',
    answer:
      'Use the Track Order page with the order ID and checkout email.',
  },
  // Buy Facebook Post Likes Canada — Document 09.33
  {
    id: 'faq-fb-post-likes-choose-package',
    question: 'How do I choose the right Facebook post likes package?',
    answer:
      'Review the post’s current engagement, campaign purpose and expected audience before choosing a package. Smaller quantities may suit routine updates, while important promotions, launches and announcements may need a larger option.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-fb-post-likes-password',
    question: 'Do I need to provide my Facebook password?',
    answer:
      'No. Your Facebook password and private account access are never required. The order only needs the exact public Facebook post URL, the selected package and a valid email address.',
    homepageFilter: 'Post Requirements',
  },
  {
    id: 'faq-fb-post-likes-public',
    question: 'Does the Facebook post need to be public?',
    answer:
      'Yes. The selected post must remain publicly accessible while the order is being processed. Restricted visibility, deletion or an incorrect URL may prevent delivery.',
    homepageFilter: 'Post Requirements',
  },
  {
    id: 'faq-fb-post-likes-page-url',
    question: 'Can I submit my Facebook page URL instead of a post URL?',
    answer:
      'No. This service requires the direct public URL of the individual Facebook post receiving likes. A page homepage or profile link does not identify the correct post.',
    homepageFilter: 'Post Requirements',
  },
  {
    id: 'faq-fb-post-likes-video',
    question: 'Can I order likes for a Facebook video post?',
    answer:
      'You may submit an eligible public Facebook post when it matches the requirements shown for the selected package. Review the service information before checkout or contact support if the post type is unclear.',
    homepageFilter: 'Post Requirements',
  },
  {
    id: 'faq-fb-post-likes-delivery-begin',
    question: 'When will delivery begin?',
    answer:
      'Delivery begins after the order has been confirmed and reviewed. Timing depends on the selected package and current processing conditions. Review the delivery estimate before placing the order.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-fb-post-likes-track',
    question: 'Can I track my post likes order?',
    answer:
      'Yes. Use your order ID and checkout email address to access the available tracking information after confirmation.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-fb-post-likes-another-post',
    question: 'Can I place another order for a different post?',
    answer:
      'Yes. You can place a separate order for another eligible public Facebook post. Check each URL carefully so every package reaches the intended content.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-fb-post-likes-change-url',
    question: 'Can I change the post URL after checkout?',
    answer:
      'Contact support immediately if the wrong URL was submitted. A change may only be possible before processing or delivery begins.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-fb-post-likes-support',
    question: 'What should I include when contacting support?',
    answer:
      'Provide your order ID, checkout email address and a clear explanation of the issue. Never send your Facebook password or private login details.',
    homepageFilter: 'Support',
  },
  // Buy YouTube Subscribers Canada — Document 09.41
  {
    id: 'faq-yt-subscribers-choose-package',
    question: 'How do I choose the right YouTube subscriber package?',
    answer:
      'Review your current subscriber count, upload activity and channel goals before choosing a package. Smaller quantities may suit newer channels, while larger options can be considered for established creators, businesses and media teams. The available package details and delivery estimate should be reviewed before checkout.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-subscribers-password',
    question: 'Do I need to provide my YouTube password?',
    answer:
      'No. Your YouTube password, recovery codes and private account access are never required. The order only needs the exact public channel URL, the selected package and a valid email address for confirmation and tracking.',
    homepageFilter: 'Channel Requirements',
  },
  {
    id: 'faq-yt-subscribers-public',
    question: 'Does my YouTube channel need to be public?',
    answer:
      'Yes. The submitted channel must remain publicly accessible while the order is being processed. If the channel is hidden, removed or otherwise unavailable, delivery may be delayed or prevented until the issue is corrected.',
    homepageFilter: 'Channel Requirements',
  },
  {
    id: 'faq-yt-subscribers-delivery-begin',
    question: 'When will subscriber delivery begin?',
    answer:
      'Delivery begins after the order has been confirmed and reviewed. The estimated timing depends on the selected package and current processing conditions. Review the package information before checkout and use order tracking for available progress updates.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-yt-subscribers-track',
    question: 'Can I track my subscriber order?',
    answer:
      'Yes. Use the order ID and email address associated with the purchase to access the public tracking page. Keep your confirmation email because it contains the information required to review the latest available order status.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-subscribers-another-order',
    question: 'Can I place another subscriber order later?',
    answer:
      'Yes. You can place another order when a different package better matches your future channel goals. Review the current subscriber count and any active delivery before submitting an additional order.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-subscribers-change-url',
    question: 'Can I change the channel URL after checkout?',
    answer:
      'Contact customer support as soon as possible if the wrong channel URL was submitted. A change may only be possible before processing or delivery begins, so always verify the destination carefully before completing checkout.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-subscribers-after-checkout',
    question: 'What happens after I complete checkout?',
    answer:
      'You receive an order confirmation after successful checkout. The submitted channel and package details are then reviewed, delivery is scheduled and available status information can be monitored through the order tracking page.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-yt-subscribers-gradual',
    question: 'Can subscriber delivery be gradual?',
    answer:
      'Gradual delivery may be available where it is listed for the selected package. Availability and timing depend on the actual package configuration, so review the delivery information shown before ordering.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-yt-subscribers-support',
    question: 'What should I include when contacting support?',
    answer:
      'Include your order ID, checkout email address and a clear description of the issue. Do not send passwords, recovery codes or private YouTube account information. Providing the correct order details helps the support team review the request efficiently.',
    homepageFilter: 'Support',
  },
  // Buy YouTube Views Canada — Document 09.42
  {
    id: 'faq-yt-views-choose-package',
    question: 'How do I choose the right package?',
    answer:
      'Compare available [YouTube Views Packages](/buy-youtube-views#pricing-packages) against your campaign goals, current audience and promotion plan. Review quantity, price and delivery information before checkout.',
    homepageFilter: 'Packages',
  },
  {
    id: 'faq-yt-views-password',
    question: 'Do I need my YouTube password?',
    answer:
      'No. Your YouTube password is never required. Orders use only the public video URL, the selected package and a valid email address.',
    homepageFilter: 'Video Requirements',
  },
  {
    id: 'faq-yt-views-public',
    question: 'Does my video need to be public?',
    answer:
      'Yes. Keep the video publicly accessible while the order is processed. If the video is private, removed or unavailable, delivery may be delayed until access is restored.',
    homepageFilter: 'Video Requirements',
  },
  {
    id: 'faq-yt-views-delivery-begin',
    question: 'When does delivery begin?',
    answer:
      'Delivery begins after the order is reviewed and confirmed. Timing depends on the selected package and current demand. Check the package details before ordering.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-yt-views-track',
    question: 'Can I track my order?',
    answer:
      'Yes. Use your order ID and checkout email on the [Order Tracking](/track-order) page to review available delivery updates.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-views-order-again',
    question: 'Can I order again later?',
    answer:
      'Yes. You can place another views order when a different package better matches a future campaign. Confirm the correct public video URL before submitting each order.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-views-change-url',
    question: 'Can I change my video URL after checkout?',
    answer:
      'Contact [support](/contact) as soon as possible if the wrong video URL was submitted. A change may only be possible before processing or delivery begins.',
    homepageFilter: 'Orders',
  },
  {
    id: 'faq-yt-views-after-checkout',
    question: 'What happens after checkout?',
    answer:
      'You receive order confirmation after successful payment. The video URL and package are reviewed, delivery is scheduled and progress remains available through order tracking.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-yt-views-gradual',
    question: 'Are views delivered gradually?',
    answer:
      'Gradual delivery may be available where it is listed for the selected package. Review the delivery information shown before checkout.',
    homepageFilter: 'Delivery',
  },
  {
    id: 'faq-yt-views-support',
    question: 'How do I contact support?',
    answer:
      'Visit the [Contact](/contact) page or open the [FAQ](/faq) hub with your order ID and checkout email. Do not send passwords or private account details.',
    homepageFilter: 'Support',
  },
  ...faqHubItems,
];

function isFaqActive(item: FAQItem): boolean {
  return item.active !== false;
}

export function getAllFaqItems(): FAQItem[] {
  return faqItems;
}

export function getFaqItemById(id: string): FAQItem | undefined {
  return faqItems.find((item) => item.id === id);
}

export function getFaqItemsByIds(ids: string[]): FAQItem[] {
  return ids
    .map((id) => getFaqItemById(id))
    .filter((item): item is FAQItem => Boolean(item));
}

/** Active FAQ hub entries for /faq (Document 13.03). */
export function getActiveFaqPageItems(): FAQItem[] {
  return faqItems
    .filter((item) => isFaqActive(item) && Boolean(item.category))
    .sort((a, b) => {
      const categoryCompare = String(a.category).localeCompare(String(b.category));
      if (categoryCompare !== 0) return categoryCompare;
      return (a.order ?? 0) - (b.order ?? 0);
    });
}

export function getActiveFaqPageItemsByCategory(category: FAQCategoryId): FAQItem[] {
  return getActiveFaqPageItems()
    .filter((item) => item.category === category)
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}
