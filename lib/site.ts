// Single source of truth for the site's own URL. Every canonical link, every
// JSON-LD `url` field, and the sitemap all read from this — see
// architecture.md §9. Replace the placeholder once a domain is chosen
// (requirements.md §14.1).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://faizangillani.com";

export const SITE_NAME = "Faizan Gillani";

export function absoluteUrl(path: string): string {
  return new URL(path, SITE_URL).toString();
}
