# SEO Strategy & Topical Map — Faizan Gillani Portfolio & App Studio

Companion to `requirements.md` (product) and `architecture.md` (technical implementation). This document exists because the site's brief explicitly calls for semantic SEO and a topical map, not just page-level metadata — search visibility is treated here as an information-architecture problem, not a checklist added after the fact.

Version 0.1 — September 2026

---

## 1. Why a dedicated document

Two different search intents live on this site — "hire this engineer" and "is this app any good" — and they don't share vocabulary. A generic SEO pass (meta tags, a sitemap) handles neither well. What actually works is **topical authority**: making it unambiguous to a search engine which entity each page is about, and how the pages relate to each other, so the site earns relevance for clusters of related queries rather than competing page-by-page for isolated keywords. That's what a topical map is, and why it's specified before any page is built rather than reverse-engineered from a finished site.

---

## 2. Core entities

Semantic SEO starts from entities, not keywords. This site has three:

1. **Faizan Gillani** (`Person`) — the connective entity across the entire site. Every app, every project, every publication is authored by this one entity, and that authorship should be explicit in structured data everywhere, not just on the About page.
2. **Each app** (`SoftwareApplication`) — Hours today, more later. Each is its own entity with its own problem space, but each also declares `Person.creator` back to Faizan, so search engines connect "who makes Hours" to "Faizan Gillani" directly.
3. **Each category** — not a schema.org entity itself, but the topical cluster that organizes apps by problem space (e.g. "money & spending decisions"). Categories exist so that as more apps ship, the site's authority compounds within a problem space instead of scattering across unrelated one-off app pages.

Projects (Qoineer, CIAYN) and the research publication are secondary entities that reinforce the Person entity's credibility (technical depth, published research) rather than compete for their own topical clusters.

---

## 3. The topical map

```
                         ┌─────────────────────────────┐
                         │   Faizan Gillani (Person)    │
                         │   — the site's root entity   │
                         └───────────────┬───────────────┘
                                         │
          ┌──────────────────────────────┼──────────────────────────────┐
          │                              │                              │
 ┌────────▼─────────┐         ┌──────────▼──────────┐         ┌─────────▼─────────┐
 │  PILLAR 1         │         │  PILLAR 2            │         │  PILLAR 3          │
 │  Engineer /       │         │  Apps (the studio)   │         │  Case studies /    │
 │  Hire-me          │         │                       │         │  research          │
 │                   │         │                       │         │                    │
 │  /about           │         │  /apps  (hub)         │         │  /projects (hub)   │
 │  /experience      │         │   └─ /apps/money      │         │   ├─ /projects/    │
 │  /contact         │         │       (category hub)  │         │   │   qoineer      │
 │                   │         │        └─ /apps/money/│         │   └─ /projects/    │
 │                   │         │            hours       │         │       ciayn        │
 │                   │         │       (future: more    │         │  /research          │
 │                   │         │        categories,     │         │   (publication)     │
 │                   │         │        more apps)      │         │                    │
 └───────────────────┘         └───────────────────────┘         └────────────────────┘
          │                              │                              │
          └──────────────────────────────┼──────────────────────────────┘
                                         │
                              All pillars link back to `/`
                              (Home) and cross-link where
                              content genuinely overlaps
                              (see §4).
```

**Pillar 1 — target intent:** "Faizan Gillani," "full-stack engineer [skill]," "hire full-stack developer [Java/Flutter/Next.js]," "[company] engineer" (Gallopade/Mentoring Minds context searches).

**Pillar 2 — target intent:** app-specific and problem-specific queries that have nothing to do with Faizan's name — "pre-purchase regret calculator," "app that shows cost in hours," "impulse spending app," "cooling off period purchase app." This pillar has to win on its own terms; nobody searching "impulse spending app" is searching for Faizan by name. The category layer (`/apps/money`) exists so that if a second money-related app ships, both apps reinforce one cluster's authority instead of splitting it.

**Pillar 3 — target intent:** lower search volume, higher trust value — "regime-aware bitcoin signal generation," "grid strategy trading app," people specifically vetting Faizan's technical depth (often arriving from Pillar 1, not organic search).

### 3.1 Page → entity → intent table

| Page | Primary entity | Target intent | Links to |
|---|---|---|---|
| `/` | Person | "Faizan Gillani," brand navigational | All pillars |
| `/about` | Person | "Faizan Gillani," background/bio queries | `/experience`, `/contact` |
| `/experience` | Person (via `hasOccupation`) | "[Company] + engineer," skill/stack queries | `/about`, relevant `/projects/*` if stack overlaps |
| `/apps` | Person (as creator) + category list | "apps by Faizan Gillani," browse intent | Every `/apps/[category]` |
| `/apps/money` | Category (topical cluster) | "money management apps," "spending decision tools" | Every app in category; `/apps` (up), apps within (down) |
| `/apps/money/hours` | SoftwareApplication (Hours) | Hours' own problem-space queries (§3, Pillar 2) | `/apps/money` (up), `/apps` (breadcrumb root), waitlist (P1) |
| `/projects` | Person (via portfolio work) | "Faizan Gillani projects," portfolio browse | Each `/projects/[slug]` |
| `/projects/qoineer` | CreativeWork/Project | "grid trading app," fintech case study queries | `/projects` (up), `/apps/money/hours` if a visitor's intent is finance-app related |
| `/research` | Person (author) | Paper title queries, academic citation | `/about` |
| `/contact` | Person | "contact Faizan Gillani," hire intent | — (terminal page) |

---

## 4. Internal linking rules

1. **Every page has a path back to `/`.** No orphaned pages — navigation and footer both link Home, so link equity always flows back to the root entity.
2. **Strict up/down linking within Pillar 2.** An app page always links up to its category and the apps hub (breadcrumb); a category always links down to every app in it. This is the topical "silo" that lets `/apps/money` accumulate relevance for the category as a whole, which then lends authority down to `/apps/money/hours` and any future sibling app.
3. **Cross-pillar links only where genuinely relevant**, never as generic "see also" filler. Example: `/experience`'s Gallopade entry can link to a `/projects` case study only if that case study is actually about Gallopade work; `/projects/qoineer` can link to `/apps/money/hours` only because both are financial-decision products — that's a real topical connection, not a forced one.
4. **Anchor text is descriptive**, never "click here" or "read more" — an internal link's anchor text is itself a relevance signal ("see how Hours calculates regret" beats "learn more").
5. **Breadcrumbs are real navigation, not decoration.** `/apps/money/hours` shows Apps → Money → Hours, matches the `BreadcrumbList` structured data exactly, and every crumb is a working link.

---

## 5. On-page semantic SEO checklist (every page)

- Exactly one `<h1>`, matching the page's primary entity/intent (e.g. the Hours page's `<h1>` is "Hours" or its tagline, not the site's own brand name).
- Heading hierarchy is strictly nested (no skipping from `<h2>` to `<h4>`).
- Landmark elements used correctly (`<main>`, `<nav>`, `<footer>`) — Next's App Router layout already encourages this structure; it must not be flattened into generic `<div>`s for styling convenience.
- Every image has descriptive `alt` text; decorative images use empty `alt=""` rather than a keyword-stuffed description.
- Every internal link uses descriptive anchor text (§4.4).
- Each page targets one primary topic — the app landing page template (`requirements.md` §6.6) is deliberately structured so it never has to compete with the category page for the same query.

---

## 6. Structured data plan

| Page type | Schema.org type(s) | Key fields |
|---|---|---|
| Root layout (sitewide) | `Person` | name, jobTitle, url, sameAs (GitHub/socials), knowsAbout (skills list) |
| `/about` | `Person` (extended) or `ProfilePage` wrapping `Person` | Same as above plus description/bio |
| `/apps/[category]/[app]` | `SoftwareApplication` | name, applicationCategory, operatingSystem (from `platforms`), description (`summary`), creator → `Person`, offers (from `pricing`, if present) |
| `/apps/[category]/[app]` (FAQ block) | `FAQPage` | mainEntity: Question/Answer pairs from `app.faq` |
| Any nested page (`/apps/[category]`, `/apps/[category]/[app]`, `/projects/[slug]`) | `BreadcrumbList` | itemListElement matching the visible breadcrumb exactly |
| `/projects/[slug]` | `CreativeWork` (or `Project`-flavored `CreativeWork`) | name, description, creator, dateCreated (from `period`) |
| `/research` | `ScholarlyArticle` | headline (paper title), author → `Person`, publicationStatus/note ("In Review"), isPartOf (venue: The Journal of Supercomputing) |
| `/` | `WebSite` (optional) | name, url — only add a `SearchAction` if/when the site actually has on-site search; don't declare a capability that doesn't exist |

All builders live in `lib/seo/jsonld.ts` (`architecture.md` §5) and take the same content record the page renders from, so structured data can never drift out of sync with visible content — a defensive design choice enforced technically, not just by convention.

---

## 7. Metadata conventions

- **Title template:** `%s · Faizan Gillani`, default `Faizan Gillani — Full-Stack Engineer & Indie Maker` (root layout). Every page supplies a specific, intent-matched title — e.g. the Hours page title is built from its own tagline ("Hours — See What Things Really Cost You in Hours of Your Life"), not a generic "Hours App."
- **Description:** each content record's `summary` field (App, Project) is written to double as the meta description — 150–160 characters, one clear sentence naming the problem the page solves, not a restatement of the title.
- **Canonical:** every page sets `alternates.canonical` from `SITE_URL` + its own path (`architecture.md` §5/§9) — prevents duplicate-content signals if the site is ever reachable via more than one host/query variant.
- **Open Graph / Twitter:** every page gets an OG image (`architecture.md` §5/§7); app and project pages get a dynamically generated one carrying the entity's own name/tagline/accent color, so a shared link is recognizable at a glance rather than showing a generic site-wide banner.

---

## 8. Technical SEO checklist

- `sitemap.xml` and `robots.txt` generated from content, not hand-maintained (`architecture.md` §6) — a new app is sitemap-included the moment its content file exists.
- No duplicate content between a category hub and its app pages — the category page describes the *problem space*; the app page describes *the product*. They must not restate each other's copy.
- URL slugs are stable, kebab-case, and human-readable (`/apps/money/hours`, not `/apps/1/hours` or `/apps/money?id=hours`) — a slug is a permanent identifier once published; changing one later needs a redirect, so slugs should be chosen deliberately up front.
- Mobile-first rendering (no separate mobile site, no content hidden on mobile that's present on desktop).
- Core Web Vitals target ≥ 95 on PageSpeed Insights (`requirements.md` §12) — a slow site actively undermines topical authority, since Core Web Vitals are a ranking input, not just a UX nicety.
- No orphaned pages (§4.1) and no thin pages — a category page with only one app still needs a real, substantive description of the problem space, not just a list wrapper (`requirements.md` §6.5).

---

## 9. Keyword/entity seed list

Not exhaustive keyword research — enough to ground the content actually being written for each page at launch.

| Page | Seed queries/entities |
|---|---|
| `/about`, `/` | Faizan Gillani, Faizan un Nabi Gillani, full-stack engineer Pakistan, Java Spring Boot CQRS engineer |
| `/apps/money` | money management apps, spending decision apps, impulse spending tools |
| `/apps/money/hours` | pre-purchase regret calculator, cost in hours app, impulse buying app, cooling off period purchase, regret calculator app, price to hours of work |
| `/projects/qoineer` | crypto grid trading app, hedge trading signals app, Binance API trading app |
| `/projects/ciayn` | two-person connectivity app, couple app real-time |
| `/research` | regime-aware bitcoin signal generation, retail investor risk machine learning |

---

## 10. Content roadmap tie-in (P1)

Hours' own growth plan (`/Users/faizan/Desktop/fyizan/regret/requirements.md` §10.1) calls for a monthly "Most Regretted Purchases" report published on the website and pitched to press. This site is that website. When built (P1, per `requirements.md` §11), each monthly report:

- Publishes at `/blog/[slug]` (or a dedicated `/reports/[slug]` if volume and structure justify a separate content type).
- Links directly to `/apps/money/hours`, feeding fresh, genuinely newsworthy internal links into Pillar 2 on a monthly cadence — the single strongest lever this site has for compounding Hours' topical authority over time, because it's real data-driven content rather than static marketing copy.
- Also indirectly reinforces Pillar 1: a site that regularly publishes original data analysis reads as more credible for hiring/contracting intent too.

This is noted here, ahead of the feature being built, so the URL structure and internal-linking pattern are decided as part of the topical map rather than improvised later.

---

## 11. Measurement

- Google Search Console attached from launch, verified against the final domain (`requirements.md` §14.1).
- Track: impressions/position for the Pillar 1 seed queries (§9), impressions/position for Hours' seed queries once the app page is live and indexed, and Core Web Vitals field data (Search Console's own report).
- Review cadence: monthly for the first 6 months, since the site and its one app are both new and search visibility takes time to establish — no meaningful signal is expected in week one.

---

*End of document.*
