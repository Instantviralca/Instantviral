/**
 * Lightweight UA → device/browser/OS classification.
 * Not fingerprinting — coarse categories only.
 */

export type DeviceInfo = {
  deviceCategory: 'mobile' | 'tablet' | 'desktop' | 'other';
  browser: string;
  os: string;
};

export function parseUserAgent(uaRaw: string | null | undefined): DeviceInfo {
  const ua = (uaRaw || '').trim();
  if (!ua) {
    return { deviceCategory: 'other', browser: 'Unknown', os: 'Unknown' };
  }

  const lower = ua.toLowerCase();
  let deviceCategory: DeviceInfo['deviceCategory'] = 'desktop';
  if (/ipad|tablet|kindle|silk|(android(?!.*mobile))/i.test(ua)) {
    deviceCategory = 'tablet';
  } else if (/mobi|iphone|ipod|android.*mobile|windows phone/i.test(ua)) {
    deviceCategory = 'mobile';
  } else if (/bot|crawler|spider|slurp|facebookexternalhit|preview/i.test(ua)) {
    deviceCategory = 'other';
  }

  let os = 'Unknown';
  if (/windows nt/i.test(ua)) os = 'Windows';
  else if (/android/i.test(ua)) os = 'Android';
  else if (/iphone|ipad|ipod/i.test(ua)) os = 'iOS';
  else if (/mac os x|macintosh/i.test(ua)) os = 'macOS';
  else if (/linux/i.test(ua)) os = 'Linux';
  else if (/cros/i.test(ua)) os = 'ChromeOS';

  let browser = 'Unknown';
  if (/edg\//i.test(ua)) browser = 'Edge';
  else if (/opr\/|opera/i.test(ua)) browser = 'Opera';
  else if (/chrome\//i.test(ua) && !/edg\//i.test(ua)) browser = 'Chrome';
  else if (/safari\//i.test(ua) && !/chrome\//i.test(ua)) browser = 'Safari';
  else if (/firefox\//i.test(ua)) browser = 'Firefox';
  else if (/bot|crawler|spider/i.test(lower)) browser = 'Bot';

  return { deviceCategory, browser, os };
}
