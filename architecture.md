# Architecture — Faizan Gillani Portfolio & App Studio

Companion to `requirements.md` (product), `seo-strategy.md` (topical map and semantic SEO), and `design-system.md` (visual identity). Stack: **Next.js 16** (App Router), **TypeScript**, **Tailwind CSS v4**, deployed on **Vercel**.

Version 0.1 — September 2026

---

## 1. Architectural principles

1. **Content as code, not a CMS.** Every app, category, project, and experience entry is a typed record committed to the repo (`content/`). This is a portfolio site run by one engineer, not an editorial team — a CMS buys nothing at this content volume and costs a hosted dependency. Revisit only if the non-goal in `requirements.md` §2 stops holding.
2. **One template per content type, driven by data.** There is exactly one app-landing-page template, one category-hub template, one project-detail template. Adding an app or a project is a content change, never a new page file. This is the direct technical answer to `requirements.md` §7's "a new app must be addable by writing one content record."
3. **Static by default.** Nearly everything on this site is knowable at build time. Every route is statically generated (via `generateStaticParams` for dynamic segments) unless a specific feature (the P1 waitlist form) requires a server at request time. No database is needed for v1.
4. **SEO is structural, not bolted on.** Metadata, JSON-LD, sitemaps, and canonical URLs are generated from the same content records that render the page — there is no separate "SEO pass." A new app's structured data is correct the moment its content file exists, because both come from one source of truth. Full rationale in `seo-strategy.md`.
5. **This version of Next.js is not the one in training data.** Per `AGENTS.md`, Next.js 16 changed async request APIs, image config, sitemap function signatures, and more. Every convention below has been checked against `node_modules/next/dist/docs/` rather than assumed from memory — see §11 for the specific breaking changes this project relies on.

---

## 2. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js 16.x, App Router, Turbopack (default in 16, no flag needed) |
| Language | TypeScript |
| UI runtime | React 19.2 |
| Styling | Tailwind CSS v4 (`@tailwindcss/postcss`, already installed) |
| Content | Typed `.ts` data modules in `content/` (MDX only if/when the P1 blog ships — see §4.4) |
| Fonts | `next/font/google`, self-hosted at build time (already used for Geist in the scaffold; will be replaced per `design-system.md`'s type choices) |
| Images | `next/image`; local files in `public/` and `content/**/assets/` |
| Hosting | Vercel (assumed — see `requirements.md` §14) |
| Analytics | TBD (`requirements.md` §14) — wired as an isolated, optional module so "none" is a valid state |

No new runtime dependencies are required for P0. The P1 waitlist form (`requirements.md` §11) is the first feature that will need an external service (email capture — e.g. a hosted form endpoint or a small serverless route with a provider like Resend); that decision is deferred to when it's built, not made now.

---

## 3. Rendering strategy

- **Static generation everywhere possible.** `/`, `/about`, `/experience`, `/apps`, `/apps/[category]`, `/apps/[category]/[app]`, `/projects`, `/projects/[slug]`, `/research` are all fully static: their content is known at build time, so `generateStaticParams` enumerates every category/app/project slug from `content/`, and the pages render with no runtime data fetching.
- **`/contact`** is static for v1 (mailto-based, per `requirements.md` §8); if a form with a backend is added in P1, only the form's submit action needs a server function (a Server Action or a Route Handler) — the page itself stays static.
- **No client-side data fetching for content.** Content lives in the repo and is imported directly into Server Components. The only client components are interactive leaves: a mobile nav toggle, and (P1) the waitlist form and its calculator widget.
- **Async Request APIs.** Next.js 16 removed synchronous access entirely — `params`, `searchParams`, `cookies()`, `headers()` are all `Promise`s now. Every dynamic route (`[category]`, `[app]`, `[slug]`) must `await props.params`. Use `PageProps<'/apps/[category]/[app]'>` / `LayoutProps<...>` helper types (generated via `next typegen`, already how `app/layout.tsx` is typed in this repo) rather than hand-written prop types, so a route rename can't silently desync the types.

---

## 4. Project structure

```
app/
  layout.tsx                    -- root layout: fonts, <html>, global JSON-LD (Person), nav/footer shell
  page.tsx                      -- Home
  about/page.tsx
  experience/page.tsx
  apps/
    page.tsx                    -- Apps hub (category grid)
    [category]/
      page.tsx                  -- Category hub
      not-found.tsx             -- unknown category slug
      [app]/
        page.tsx                -- App landing page
        opengraph-image.tsx     -- per-app dynamic OG image (next/og)
        not-found.tsx           -- unknown app slug within a valid category
  projects/
    page.tsx
    [slug]/
      page.tsx
      opengraph-image.tsx
  research/page.tsx
  contact/page.tsx
  sitemap.ts                    -- enumerates every static + content-driven route
  robots.ts
  opengraph-image.tsx           -- default/site-level OG image
  not-found.tsx
  globals.css

content/
  person.ts                     -- canonical brand/Person data (name, bio, socials, headshot) used by metadata + JSON-LD sitewide
  categories.ts                 -- Category[] taxonomy
  apps/
    hours.ts                    -- one file per app; App record (see requirements.md §7)
  projects/
    qoineer.ts
    ciayn.ts
  experience.ts                 -- ExperienceEntry[]
  research.ts                   -- publication records

lib/
  content/
    apps.ts                     -- getApp(categorySlug, appSlug), getAppsByCategory(), getAllApps()
    categories.ts                -- getCategory(), getAllCategories()
    projects.ts
  seo/
    metadata.ts                 -- shared buildMetadata() helper (title template, OG/Twitter defaults, canonical)
    jsonld.ts                   -- personJsonLd(), softwareApplicationJsonLd(app), breadcrumbJsonLd(items), faqJsonLd(items), scholarlyArticleJsonLd()
  site.ts                       -- SITE_URL and other single-source site constants (see §9)

components/
  nav/, footer/
  app-card.tsx, category-card.tsx, project-card.tsx
  status-badge.tsx
  json-ld.tsx                   -- thin <script type="application/ld+json"> renderer, XSS-safe (JSON.stringify + no user input)
  ...
```

Each content type has exactly one accessor module in `lib/content/` — pages never read from `content/` directly, so validation (e.g. "does this app's category actually exist") lives in one place and can't drift per-page.

### 4.1 Adding a new app (the operational contract)

This is the concrete fulfillment of `requirements.md` §7's requirement that a new app costs one content record:

1. Add `content/apps/<slug>.ts` exporting an `App` record (type in `lib/content/apps.ts`).
2. If the category doesn't exist yet, add one entry to `content/categories.ts`.
3. Drop screenshots, if any, into `content/apps/<slug>/` (or reference external URLs).
4. Done — `generateStaticParams` picks it up, the sitemap includes it, JSON-LD is generated from the same record, and it appears on the category hub and apps hub automatically.

No page file, no manual sitemap edit, no separate metadata step.

### 4.2 Content model (types)

```ts
type AppStatus = 'concept' | 'in-development' | 'beta' | 'live'

interface App {
  slug: string
  categorySlug: string
  name: string
  tagline: string
  status: AppStatus
  platforms: Array<'ios' | 'android' | 'web' | 'extension'>
  summary: string                 // ~150-160 chars, doubles as meta description
  loop: Array<{ title: string; description: string }>
  features: Array<{ title: string; description: string }>
  privacyHighlights: string[]
  pricing?: Array<{ tier: string; price?: string; features: string[] }>
  faq: Array<{ question: string; answer: string }>
  screenshots?: Array<{ src: string; alt: string }>
  storeLinks?: { ios?: string; android?: string; web?: string }
  waitlistEnabled?: boolean
  accentColor: string             // design token name, see design-system.md
  updatedAt: string               // ISO date, drives sitemap lastModified
}

interface Category {
  slug: string
  name: string
  description: string
  accentColor: string
}

interface Project {
  slug: string
  name: string
  period: string
  summary: string
  role: string
  stack: string[]
  highlights: string[]
  links?: { repo?: string; live?: string; appSlug?: string } // appSlug links a case study to a live app, if one grew out of it
  updatedAt: string
}

interface ExperienceEntry {
  company: string
  role: string
  startDate: string                // ISO
  endDate: string | 'present'
  summary: string
  stack: string[]
}
```

`faq` is required (not optional) on `App` because it feeds `FAQPage` structured data — see `seo-strategy.md` §6 — and every app should ship with genuine, anticipated questions rather than skip the section.

### 4.3 First content record

`content/apps/hours.ts` is populated from the actual product docs at `/Users/faizan/Desktop/fyizan/regret/requirements.md` and `architecture.md` (loop, features, privacy rules, pricing tiers) — not invented copy. `status: 'in-development'`, `waitlistEnabled: true`, no `storeLinks` yet, per `requirements.md` §6.6 and §8.

### 4.4 MDX / blog (P1, not built now)

If/when the blog (`requirements.md` §11 P1) ships, it adds `app/blog/[slug]/page.tsx` reading MDX files from `content/blog/`, using `next-mdx-remote` or `@next/mdx`. Not decided further now — no dependency is added until the feature is actually being built.

---

## 5. Metadata and structured data

- **Title template.** Root layout sets `metadata.title = { template: '%s · Faizan Gillani', default: 'Faizan Gillani — Full-Stack Engineer & Indie Maker' }`. Every page sets its own `title` (a bare string, not the full brand line); the template appends the brand consistently, per `seo-strategy.md` §7.
- **`generateMetadata` per dynamic route,** memoized against the same `getApp`/`getProject` calls used to render the page, via React's `cache()` — so metadata and page body never fetch/derive content twice, per the Next.js docs' documented pattern for this exact situation.
- **Canonical URLs** set via `alternates.canonical` on every page, built from the single `SITE_URL` constant (§9) plus the route's own path — never hardcoded per page.
- **JSON-LD** is rendered as a `<script type="application/ld+json">` via the shared `<JsonLd data={...} />` component, fed by builder functions in `lib/seo/jsonld.ts`. Builders take the same content record used to render the page, so structured data can never disagree with visible content — a `SoftwareApplication` node's `name`/`applicationCategory` is literally `app.name` and `category.name`, not a re-typed duplicate.
- **Open Graph images.** A default sitewide `app/opengraph-image.tsx`; per-app and per-project dynamic images via `next/og`'s `ImageResponse`, using the app's name/tagline/accent color so each app's social preview is distinct without needing a designed asset per app.

Full structured-data-per-page-type table and rationale: `seo-strategy.md` §6.

---

## 6. Sitemap and robots

`app/sitemap.ts` returns one array built from `lib/content/*` accessors — every category, every app, every project, plus the static routes — so a new content file is sitemap-included automatically. Per Next.js 16, `sitemap.ts` is a cached Route Handler by default; this project has no need to opt out of that caching (content only changes at deploy time).

```ts
// app/sitemap.ts (shape, not final code)
export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ['/', '/about', '/experience', '/apps', '/projects', '/research', '/contact']
  const categoryRoutes = getAllCategories().map(c => `/apps/${c.slug}`)
  const appRoutes = getAllApps().map(a => `/apps/${a.categorySlug}/${a.slug}`)
  const projectRoutes = getAllProjects().map(p => `/projects/${p.slug}`)
  // map each to { url, lastModified, changeFrequency, priority }
}
```

`app/robots.ts` allows all crawling and points at the generated sitemap — there is no private/gated content on this site, so no `disallow` rules are needed at v1.

---

## 7. Images

- `next/image` throughout; no `next/legacy/image` (deprecated in 16).
- Screenshots and headshot live in `public/` or `content/apps/<slug>/`; no remote image hosting needed at v1, so `images.remotePatterns` stays empty unless a future app links to an externally-hosted asset.
- Next.js 16 changed `images.qualities` default to `[75]` only — if a design need for a second quality tier shows up (e.g. hero images at higher quality than thumbnails), it must be declared explicitly in `next.config.ts`, not assumed available.
- Local images with query strings (e.g. a cache-busting `?v=` on a re-exported screenshot) now require an explicit `images.localPatterns` entry — avoid the pattern entirely by renaming the file on update instead of versioning via query string.

---

## 8. Styling and theming

- Tailwind v4, already installed. Design tokens (palette, type scale, spacing rhythm) defined per `design-system.md` as CSS custom properties in `globals.css`, consumed via Tailwind's `@theme` layer — one token set for the whole site, plus a small `accentColor` token map keyed by category/app slug for the one deliberate point of per-app visual variation (card accents, status badges).
- No dark mode at v1 (`requirements.md` §9 — light background is a direct instruction). The token structure should not preclude adding dark mode later, but it is not built now.

---

## 9. Site-wide configuration

A single `lib/site.ts` holds the one value everything else derives from:

```ts
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://faizangillani.com' // placeholder — see requirements.md §14
```

`metadataBase` in the root layout, every canonical URL, every JSON-LD `url` field, and the sitemap all read from `SITE_URL`. Changing the eventual real domain is a one-line, one-file change.

---

## 10. Performance

- Server Components by default; a component becomes a Client Component only when it needs interactivity (nav toggle, P1 waitlist form) — everything else ships zero client JS.
- Fonts via `next/font/google`, self-hosted and subset, no external font request at runtime (already the pattern in the current scaffold).
- Images sized and `priority`-hinted correctly on hero images only; everything below the fold lazy-loads by default (native `next/image` behavior).
- No client-side analytics scripts that block render; if an analytics provider is chosen (`requirements.md` §14), it loads via Next's `<Script strategy="afterInteractive">` or the provider's official Next.js package, never a blocking `<head>` script.
- Target: Lighthouse/PageSpeed 95+ on both mobile and desktop, verified before each deploy that touches shared layout/nav/fonts (a targeted regression check, not a full CI pipeline at this project's size).

---

## 11. Next.js 16 conventions this project relies on

(Verified against `node_modules/next/dist/docs/` at time of writing — re-check here before assuming an older-Next pattern.)

- **Async everything.** `params`/`searchParams` in pages, and the `id` in `generateSitemaps`/image-generation functions, are all `Promise`s — always `await` them. Use the generated `PageProps<'/route/[param]'>` types (`npx next typegen`) instead of hand types.
- **`sitemap.ts` `id` is now a promise** if `generateSitemaps` is ever used to split a sitemap (not needed at this content volume, but noted for when/if it is).
- **Turbopack is the default** for both `next dev` and `next build` — no `--turbopack` flag needed; `package.json` scripts in this repo are already correct.
- **`middleware.ts` is renamed `proxy.ts`** (edge runtime not supported in `proxy`). This project has no need for either at v1 — no auth, no request rewriting.
- **Parallel routes require `default.js`.** Not used in this project's structure, so not a concern unless a future modal/parallel-route pattern is introduced.
- **`images.domains` is deprecated** in favor of `images.remotePatterns` — use the latter if any remote image source is ever added.
- **React Compiler is available but off by default** in Next 16 (`reactCompiler: true` in `next.config.ts`). Not enabled at v1; revisit if re-render performance ever becomes a measured problem, which is unlikely on a mostly-static content site.

---

## 12. Testing and QA

- `tsc --noEmit` and `eslint` (flat config, already the default for `eslint-config-next` on Next 16) on every change.
- Manual checklist when adding a new app or project (small enough not to need CI automation yet):
  - Page renders with no missing required fields (TypeScript already enforces this via the `App`/`Project` interfaces).
  - JSON-LD validates (spot-check with Google's Rich Results Test).
  - New route appears in `/sitemap.xml`.
  - OG image renders correctly for the new route.
  - Lighthouse score unaffected.

---

## 13. Deployment

- Vercel, with preview deployments per branch/PR (standard Next.js-on-Vercel flow).
- Custom domain attached once chosen (`requirements.md` §14) — `NEXT_PUBLIC_SITE_URL` env var set to match in production, falling back to the placeholder in `lib/site.ts` for local/preview builds.
- No environment-specific backend config needed at v1 (no database, no auth). The P1 waitlist form is the first feature that will need a production secret (an email-service API key), added when that feature is built.

---

## 14. Open technical questions

1. Final domain, to replace the placeholder in `lib/site.ts` (`requirements.md` §14.1).
2. Analytics provider, if any (`requirements.md` §14.4) — affects whether a `<Script>` tag and env var are needed at all.
3. Whether the P1 waitlist form uses a Server Action + a transactional-email provider, or a third-party form backend (Formspree-style) — deferred until that feature is scoped.
4. Whether the P1 blog uses local MDX files or (unlikely, given `requirements.md` §2's CMS non-goal) something hosted — default assumption is local MDX, per §4.4.

---

*End of document.*
