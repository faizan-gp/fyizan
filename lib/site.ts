// Single source of truth for the site's own URL. Every canonical link, every
// JSON-LD `url` field, and the sitemap all read from this — see
// architecture.md §9. Production domain is fyizan.com; override via NEXT_PUBLIC_SITE_URL.
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://fyizan.com";

export const SITE_NAME = "Faizan Gillani";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
