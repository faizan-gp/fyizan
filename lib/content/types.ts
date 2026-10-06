// Content model — see architecture.md §4.
// Every app and category is one of these, committed as a typed record in
// content/. Pages never read content/ directly; they go through the
// accessors in lib/content/*.

export type AppStatus = "concept" | "in-development" | "beta" | "live";

export type Platform = "ios" | "android" | "web" | "extension";

export interface LoopStep {
  title: string;
  description: string;
}

export type IconName =
  | "shield" | "check" | "arrow" | "ban" | "device" | "tag" | "lock" | "coins"
  | "trend" | "repeat" | "timer" | "chart" | "share" | "gauge" | "sparkles"
  | "layers" | "compress" | "sliders";

export interface Feature {
  /** Glyph shown on the feature card. */
  icon: IconName;
  title: string;
  description: string;
}

export interface PricingTier {
  tier: string;
  price?: string;
  /** Small pill beside the tier name, e.g. "Optional". */
  badge?: string;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Screenshot {
  src: string;
  alt: string;
  /** "phone" is a raw device screen (drawn in a phone frame); "poster" is an already-framed marketing image. */
  kind: "phone" | "poster";
}

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalDocument {
  /** ISO date, shown as "Last updated" and used for sitemap lastModified. */
  updatedAt: string;
  intro: string[];
  sections: LegalSection[];
}

export interface AppSupport {
  intro: string[];
  contactEmail: string;
  /** What to include in a support email, e.g. device model and OS version. */
  includeInEmail?: string;
  /** Help topics, rendered as an FAQ on the support page. */
  topics: FaqItem[];
}

export interface AppIcon {
  src: string;
  alt: string;
}

export interface App {
  slug: string;
  categorySlug: string;
  /** Full store title, used for SEO and structured data. */
  name: string;
  /** Short display name for headings and cards. Defaults to `name`. */
  shortName?: string;
  /** Store subtitle shown under the heading, e.g. "Expense Tracker". */
  subtitle?: string;
  tagline: string;
  status: AppStatus;
  platforms: Platform[];
  icon?: AppIcon;
  /** ~150-160 chars. Doubles as the page's meta description. */
  summary: string;
  /** Short feature chips on the app card. */
  highlights: string[];
  /** One headline result from the app, shown beside the hero art on the home page. */
  spotlight: { title: string; text: string };
  /** Comparison table: how the app is paid for, and what happens to your data. */
  pricingModel: string;
  dataNote: string;
  /** Section headings on the app page that are specific to this app. */
  headlines: { steps: string; pricing: string };
  loop: LoopStep[];
  features: Feature[];
  privacyHighlights: string[];
  pricing?: PricingTier[];
  faq: FaqItem[];
  screenshots?: Screenshot[];
  storeLinks?: { ios?: string; android?: string; web?: string };
  waitlistEnabled?: boolean;
  /** Design token name — see design-system.md §2. */
  accentColor: string;
  /** ISO date. Drives sitemap lastModified. */
  updatedAt: string;
  /** Rendered at /apps/[category]/[app]/privacy when present. */
  privacyPolicy?: LegalDocument;
  /** Rendered at /apps/[category]/[app]/terms when present. */
  termsOfService?: LegalDocument;
  /** Rendered at /apps/[category]/[app]/delete-account when present. */
  accountDeletion?: LegalDocument;
  /** Rendered at /apps/[category]/[app]/support when present. */
  support?: AppSupport;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  accentColor: string;
}
