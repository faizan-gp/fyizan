import type { App, Category } from "@/lib/content/types";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

// Builder functions for JSON-LD, each fed by the same content record the
// page renders from — so structured data can never drift out of sync with
// visible content. See seo-strategy.md §6 and architecture.md §5.

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type JsonLdObject = Record<string, any>;

export function websiteJsonLd(): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
  };
}

export function softwareApplicationJsonLd(app: App, category: Category): JsonLdObject {
  const url = absoluteUrl(`/apps/${category.slug}/${app.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name,
    url,
    description: app.summary,
    applicationCategory: category.name,
    operatingSystem: app.platforms.join(", "),
    creator: {
      "@type": "Person",
      name: SITE_NAME,
    },
    ...(app.icon ? { image: absoluteUrl(app.icon.src) } : {}),
    ...(app.pricing && app.pricing.length > 0
      ? {
          offers: app.pricing.map((tier) => ({
            "@type": "Offer",
            name: tier.tier,
            price: tier.price ?? "0",
            priceCurrency: "USD",
          })),
        }
      : {}),
  };
}

export function faqJsonLd(faq: App["faq"]): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>): JsonLdObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
