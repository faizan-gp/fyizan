// Single source of truth for the site's own URL. Every canonical link, every
// JSON-LD `url` field, and the sitemap all read from this — see
// architecture.md §9. Production domain is fyizan.com; override via NEXT_PUBLIC_SITE_URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fyizan.com";

export const SITE_NAME = "Faizan Gillani";

export const SITE_TAGLINE = "Everyday apps for iOS and Android";

export const SITE_DESCRIPTION =
  "Focused daily-use apps for your money and your phone. No ads, no account to get started, and your data stays yours.";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
