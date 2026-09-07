// Content model — see requirements.md §7 and architecture.md §4.2.
// Every app, category, project, and experience entry is one of these,
// committed as a typed record in content/. Pages never read content/
// directly; they go through the accessors in lib/content/*.

export type AppStatus = "concept" | "in-development" | "beta" | "live";

export type Platform = "ios" | "android" | "web" | "extension";

export interface LoopStep {
  title: string;
  description: string;
}

export interface Feature {
  title: string;
  description: string;
}

export interface PricingTier {
  tier: string;
  price?: string;
  features: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Screenshot {
  src: string;
  alt: string;
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

export interface AppIcon {
  src: string;
  alt: string;
}

export interface App {
  slug: string;
  categorySlug: string;
  name: string;
  tagline: string;
  status: AppStatus;
  platforms: Platform[];
  icon?: AppIcon;
  /** ~150-160 chars. Doubles as the page's meta description. */
  summary: string;
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
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  accentColor: string;
}

export interface Project {
  slug: string;
  name: string;
  period: string;
  summary: string;
  role: string;
  stack: string[];
  highlights: string[];
  links?: { repo?: string; live?: string; appSlug?: string };
  updatedAt: string;
}

export interface ExperienceEntry {
  company: string;
  role: string;
  startDate: string;
  endDate: string | "present";
  displayDate: string;
  summary: string;
  stack: string[];
}

export interface Publication {
  slug: string;
  title: string;
  venue: string;
  status: string;
  year: string;
  authors: string[];
  abstract?: string;
}
