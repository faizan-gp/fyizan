# Product Requirements — Faizan Gillani Portfolio & App Studio

*A personal portfolio and the home for every independent app Faizan ships, organized by category, starting with Hours.*

Version 0.1 — September 2026
Status: Draft for v1 scoping
Scope: Product, information architecture, content, functional requirements, phasing, metrics. Technical architecture is in `architecture.md`, semantic SEO and the topical map are in `seo-strategy.md`, visual identity is in `design-system.md`.

---

## 1. Summary

This site is two things at once, on purpose: a senior engineer's personal portfolio, and a storefront for the products he builds as side hustles. Most personal sites pick one. This one has to do both without either half feeling bolted on, because the same visitor — a recruiter, a founder looking to hire out work, a stranger who found an app on the App Store — needs to land anywhere on the site and immediately understand who Faizan is and what he's built.

The site has one growing catalogue: **apps**, grouped into **categories**, each with its own landing page. Today there is one category (money & spending decisions) and one app in it (Hours, a pre-purchase regret calculator — see `/Users/faizan/Desktop/fyizan/regret`). The information architecture is built for many categories and many apps from day one, even though only one exists, because the cost of retrofitting a taxonomy later is much higher than designing for it now.

The portfolio half — about, experience, projects, research — exists to convert a different kind of visitor: someone evaluating Faizan for a role or a contract, not a product. Both halves share one identity, one navigation, and one SEO strategy, because splitting them into two sites would halve the domain authority either could build alone.

---

## 2. Goals and non-goals

### Goals

1. Be the canonical, fastest-to-update home for every app Faizan ships — adding a new app should mean writing one content file, not redesigning a page.
2. Establish personal brand and topical authority for "Faizan Gillani" as a senior full-stack engineer, so the name itself ranks and recruiters/clients find a credible, fast, well-built site.
3. Give each app a landing page that can stand on its own for organic search (its own problem space, its own keywords) while still sitting inside a coherent site structure — see `seo-strategy.md` for the topical map that makes this work.
4. Convert three kinds of visitor: a recruiter/client into a contact, a curious visitor into an app install (once apps are live) or a waitlist signup (before they are), and a researcher into a read of the published paper.
5. Ship fast and score well: Core Web Vitals in the 95+ range on PageSpeed Insights, matching what Faizan already achieved on the Zero Latency Webster project — this site is itself a portfolio piece for that skill, so it cannot underperform its own claims.

### Non-goals (v1)

- No CMS authoring UI. Content is typed data/MDX committed to the repo, not a headless CMS — see `architecture.md` §4. Revisit only if content volume (a blog, many apps) makes hand-editing painful.
- No user accounts, in-site app functionality, or payments. This site markets the apps; it does not run them.
- No multi-language support at launch. English only, matching Hours' own P0 scope.
- Not a marketplace. Apps link out to their own App Store / Play Store listings; nothing is transacted here.
- No app category is added to the navigation until it has at least one real app page behind it. An empty category page is worse for SEO and worse for trust than no category at all.

---

## 3. Audience and personas

| Persona | What they're here for | Primary path |
|---|---|---|
| **Hiring manager / engineering lead** | Evaluating Faizan for a senior/full-stack role | Home → About / Experience → Contact |
| **Founder or agency** | Looking to hire Faizan for contract full-stack, DevOps, or SEO work | Home → Projects (case studies) → Contact |
| **Prospective app user** | Found an app via search, social, or an App Store listing and checked the maker's site for legitimacy, support, or other apps | Search/social → App landing page → (store link or waitlist) |
| **Researcher / academic** | Found the Journal of Supercomputing submission | Search → Research page |
| **Faizan (future-self)** | Needs to add a new app or update an existing one in minutes | Repo → `content/apps/*.ts` |

---

## 4. Brand and positioning

- **Display name:** Faizan Gillani (matches the resume's public link text). "fyizan" is the working handle/repo name and can double as a wordmark or monogram mark in the nav — a deliberate, slightly unconventional spelling that's memorable and already his de facto brand across these repos.
- **One-line positioning:** *A full-stack engineer who builds products that respect your time and your data — and ships them himself.* This isn't filler: it's a real, defensible line, because Hours' own product principles (income never leaves the device, no ads, no dark patterns, offline-first) are a genuine pattern across Faizan's app work (HourStory and Combo/tcatemplate show the same instinct for privacy-respecting, ad-free, two-person-safe products). That consistency is worth naming as a brand pillar rather than leaving implicit.
- **Tone:** Candid and precise — engineer-to-engineer, not marketing copy. Facts first, adjectives earned. This matches the copy voice already established in the Hours app (`architecture.md` / `requirements.md` in the regret project) and should carry over rather than invent a second voice.
- **Relationship to app brands:** The portfolio is the neutral canvas. Each app can carry its own accent color and, on its own landing page, a flavor of its own visual language (Hours' paper/ink/receipt aesthetic, for instance) without the portfolio itself trying to look like any one app. See `design-system.md` §2.

---

## 5. Information architecture

```
/                          Home
/about                     About
/experience                Work experience (timeline)
/apps                      Apps hub — category grid (the studio's storefront)
/apps/[category]           Category hub, e.g. /apps/money
/apps/[category]/[app]     App landing page, e.g. /apps/money/hours
/projects                  Projects / case studies index
/projects/[slug]           Case study detail, e.g. /projects/qoineer
/research                  Publications
/contact                   Contact
/sitemap.xml, /robots.txt  Technical SEO (generated, see architecture.md)
```

Category slugs in scope at launch: `money` (Hours). Additional categories (e.g. a future `relationships` category for HourStory/Combo-style apps) are added only when an app in that category is ready to ship its own landing page — see §2 non-goals.

Full rationale for this structure — why apps sit under categories, why projects are separate from apps, and how internal links tie it together for search — is in `seo-strategy.md` §3.

---

## 6. Page-by-page content requirements

### 6.1 Home (`/`)

**Purpose:** Answer "who is this and what do they build" in one screen, then route the two visitor types to their own path.

- Hero: name, one-line positioning (§4), a short sub-line naming the current focus.
- Featured app: a single prominent card for Hours (the one live product), not a full grid — the site should never look emptier than it is.
- Skills/toolkit summary: pulled from the resume's skill set (Java, Flutter, Node.js, React/Next.js, microservices/CQRS/Axon/Kafka/gRPC, motion graphics, semantic SEO, security), grouped rather than listed flat.
- Selected experience highlights: 2–3 lines each from Gallopade / Mentoring Minds / Zero Latency Webster, linking through to `/experience` for the full story.
- Two clear CTAs: "See what I've built" → `/apps`, and "Work with me" → `/contact`.

### 6.2 About (`/about`)

- Narrative bio in first person or close third, covering the arc: computer science background → Mentoring Minds (microservices migration) → Gallopade (CQRS/event sourcing, DevOps) → the 2022–2024 career break → Zero Latency Webster (SEO/Next.js) → back to Gallopade as Senior Software Engineer, now building apps independently.
- The career break is stated plainly and without apology, framed by what came before and after it rather than explained away — this is a factual timeline document, not a cover letter.
- Skills and tools, in more depth than the home summary (motion graphics/After Effects, Adobe Creative Suite, Kali Linux/cybersecurity/encryption — these round him out beyond "backend engineer" and are worth surfacing, since they explain the design and security instincts visible elsewhere on this site).
- Photo: the resume includes a headshot. Recommend using it here (and optionally, smaller, in the site header/About link) — a personal portfolio with no face reads as less trustworthy than one with a real photo, and the "agency" half of this site's brief benefits from a visible human behind it. **Open question for Faizan: confirm he wants his photo used publicly** — flagged in §14.

### 6.3 Experience (`/experience`)

- Reverse-chronological timeline built directly from the resume: Senior Software Engineer – Gallopade (Apr 2024–present) → Full-Stack Engineer & SEO Strategist – Zero Latency Webster (May 2025–Apr 2026) → Career Break (Oct 2022–Mar 2024) → Full-Stack Developer – Gallopade (Nov 2021–Sept 2022) → Backend Developer – Mentoring Minds (Mar 2021–Nov 2022).
- Each entry: role, company, dates, 2–4 sentence summary drawn from the resume, and a short "stack" tag list (e.g. Java Spring Boot, CQRS, Axon, Kafka, Docker, Kubernetes, Azure for Gallopade; Next.js, Tailwind, technical SEO for Zero Latency Webster).
- Overlapping dates on the resume (Gallopade Nov 2021–Sept 2022 and Mentoring Minds Mar 2021–Nov 2022 both fall inside the same window) should render as-is rather than be silently corrected — note it to Faizan as a possible resume typo worth checking, but this document does not guess at the fix.

### 6.4 Apps hub (`/apps`)

**Purpose:** The studio storefront — the pillar page for every app category.

- Short framing line: what kind of apps Faizan builds and why (privacy-first, ad-free, offline-capable — see §4).
- A card per **category** (not per app, once there's more than one category): name, one-line description, accent color, app count. With only one category today, this can render as a single prominent card plus a "more categories coming" note — never fake additional categories to look fuller.
- Within the single `money` category card (or on click-through), the apps in it are listed — today just Hours, with its status badge (`In development` / `Coming soon` / `Live`, matching Hours' actual P0 status).

### 6.5 Category hub (`/apps/[category]`, e.g. `/apps/money`)

- Category name and a substantive description of the problem space (not just a label — this page needs to earn its own search relevance per `seo-strategy.md`).
- Grid of app cards in this category, each with name, tagline, status badge, accent color, and link to its landing page.
- Breadcrumb: Apps → [Category].

### 6.6 App landing page (`/apps/[category]/[app]`) — spec for Hours

This is the highest-effort template in the site and the one most likely to be reused for every future app, so it's specified in full using Hours' own `requirements.md`/`architecture.md` (`/Users/faizan/Desktop/fyizan/regret`) as source material:

1. **Hero.** App name, tagline ("A pre-purchase regret calculator. Scan a price, see what it really costs you, decide with a clear head."), status badge, primary CTA (App Store / Play Store buttons once live; a waitlist signup or "notify me" while it's pre-launch — Hours is currently pre-launch, so this ships as a waitlist capture, not dead store badges).
2. **The loop.** A visual, plain-language walkthrough of Before (price it → see it in hours → Skip/Wait/Buy → Kept total) and After (log what you bought → see its cost → "did you need it?"), taken directly from the Hours README's "The loop" section.
3. **Why hours, not money.** The core insight/positioning, restated for a web visitor rather than an app user — this is the hook line that should also anchor the page's `<title>`/meta description (see `seo-strategy.md` §7).
4. **Feature grid**, drawn from Hours `requirements.md` §6–7: Regulars (things you buy repeatedly), Kept-if-grown (what skipped money would be worth in gold/stocks/bitcoin/a deposit, strictly backward-looking and labelled illustrative), Wait/cooling-off timers, 30-day follow-ups, Insights (regret score, category breakdowns — paid tier), Share cards. Each feature: one line of copy, not a full spec — this page sells the idea, it does not reproduce the PRD.
5. **Privacy section.** A direct, differentiating claim: income never leaves the device, no ads, no selling of data — pulled verbatim in spirit from Hours `architecture.md` §12 and `requirements.md` §14. This doubles as brand content for the portfolio's privacy-first positioning (§4).
6. **Pricing teaser.** Free vs Plus, summarized from Hours `requirements.md` §9.2 — enough to set expectations, not a full pricing page (the app itself owns pricing once live).
7. **FAQ.** Real, anticipated questions (Is my income private? What platforms? Is it free? When does it launch?) — written as genuine FAQ content because it earns `FAQPage` structured data (see `seo-strategy.md` §6), not padding.
8. **Screenshots.** Placeholder slots until real screenshots exist; do not ship fake/mocked screenshots as if real.
9. **Cross-links.** Back to the `money` category hub, and to any other app in the same category once one exists.

Every section above must degrade gracefully for an app with less content than Hours (e.g. an app with no Insights/paid tier yet) — the template's sections are optional blocks driven by the app's content record (`architecture.md` §5), not a fixed form every app must fully fill in.

### 6.7 Projects / case studies (`/projects`, `/projects/[slug]`)

Distinct from **Apps**: Projects are past client/venture work (Qoineer, CIAYN from the resume) presented as technical case studies to support the hiring/contracting persona, not products Faizan is currently selling. Keeping them separate from `/apps` avoids conflating "things you can install today" with "things I built for a past engagement."

- Index: card per project — name, period, one-line summary, stack tags.
- Detail page: role, timeline, problem, technical approach (e.g. Qoineer's grid-strategy trading logic, Node.js/Dart backend, Flutter frontend, Firestore real-time sync, Binance API integration, transactional consistency guarantees; CIAYN's two-person real-time connectivity, database transaction optimization, personal-safety focus), outcome where known.
- These pages can link to an app's landing page where a project evolved into one (none currently do, but the data model should allow it — `architecture.md` §5).

### 6.8 Research (`/research`)

- The Journal of Supercomputing submission: "Balancing Financial Market Risk for Retail Investors: A Regime-Aware Bitcoin Signal Generation Framework Using Machine Learning" — status "In Review (2026)," listed with enough context (venue, status, abstract if Faizan wants to write one) to be a credible academic citation surface. Marked structurally as a `ScholarlyArticle` (see `seo-strategy.md` §6) so it's indexable as research, not read as a blog post.

### 6.9 Contact (`/contact`)

- Phone, email, and the site's own social/profile links, plus a lightweight contact form or a mailto CTA — the choice between the two is a functional requirement, see §8.

---

## 7. Content model (functional spec)

The site is driven by typed content records, not a database. The full technical shape lives in `architecture.md` §5; the fields below are the product-level requirement — what a new app, category, project, or experience entry must be able to say:

- **App:** slug, name, tagline, category, status (concept / in development / beta / live), platforms, one-paragraph summary (doubles as meta description), the loop/how-it-works steps, feature list, privacy highlights, pricing tiers (optional), FAQ, screenshots (optional, empty allowed), store links (optional), accent color, waitlist toggle.
- **Category:** slug, name, description, accent color.
- **Project:** slug, name, period, summary, role, stack, highlights, links (optional).
- **Experience entry:** company, role, start/end dates, summary, stack tags.

A new app must be addable by writing one content record and, if it has one, dropping in screenshots — no new page template, no design decisions, no manual sitemap edit.

---

## 8. Functional requirements

- **Contact:** decide between a real contact form (requires an email-sending service — e.g. Resend, or a Formspree-style hosted endpoint — since this is a static/serverless site with no backend database) and a plain `mailto:` + phone link. Recommendation: start with `mailto:` plus visible phone/email/socials for v1 — zero infrastructure, zero spam-handling surface — and upgrade to a form with a spam-resistant backend only if contact volume justifies it. This is a real open decision for Faizan, not a default to silently pick — see §14.
- **Waitlist capture (P1):** Hours' own growth plan (`requirements.md` §10.2 in the regret project) calls for "a waitlist page with a live 'hours' calculator for three famous products" during pre-launch. This portfolio site is the natural host for that page, at `/apps/money/hours` or a dedicated `/waitlist`. Scoped as P1 (§11) because it needs its own small interactive calculator component and an email-capture backend, both of which are real scope beyond a static landing page.
- **Analytics:** a privacy-respecting analytics tool (e.g. Vercel Analytics or Plausible) consistent with the site's own privacy-first brand claim (§4) — no third-party ad/tracking SDKs, mirroring the "no ad SDKs" rule already established for Hours. Provider choice is an open question (§14).
- **Store links:** App Store / Play Store buttons render only once an app actually has a live listing; a pre-launch app shows a waitlist CTA instead of dead-linking to a store page that doesn't exist yet.
- **Status badges:** every app and, transitively, every category must always show an honest status (`In development`, `Coming soon`, `Live`) — never implying availability that doesn't exist yet.

---

## 9. Design requirements (summary — full spec in `design-system.md`)

- Light background by direct instruction — no dark-mode-by-default, no pure-white starkness; an off-white/paper-adjacent base that can visually rhyme with Hours' own palette without copying it.
- A hybrid register: personal-portfolio warmth, app-landing-page clarity, and agency-site polish, in that order of priority — the personal voice should never get lost under too much "studio" gloss.
- Responsive, mobile-first (most app-discovery traffic will be mobile).
- Accessible: WCAG AA contrast, visible focus states, reduced-motion support, 44px+ tap targets on interactive elements — the last one is a direct, deliberate echo of Hours' own accessibility bar.
- Motion restrained and purposeful, never decorative for its own sake.

---

## 10. SEO and content requirements (summary — full spec in `seo-strategy.md`)

- Fully semantic HTML: one `<h1>` per page, correct heading hierarchy, landmark elements, descriptive link text (never bare "click here").
- Structured data (JSON-LD) per page type: `Person`/`ProfilePage` for the portfolio pillar, `SoftwareApplication` for each app, `BreadcrumbList` on nested pages, `FAQPage` on the app landing page, `ScholarlyArticle` for research.
- A generated `sitemap.xml` and `robots.txt` (Next.js file conventions — see `architecture.md` §7) that stay correct automatically as apps/categories/projects are added, never hand-maintained.
- Canonical URLs and Open Graph/Twitter card metadata on every page, with a per-app dynamic OG image.
- A topical map connecting the portfolio pillar, the apps pillar (category → app), and the projects pillar, with internal linking rules that avoid orphaned pages — full detail in `seo-strategy.md` §3–4.
- Core Web Vitals target: 95+ on PageSpeed Insights, mobile and desktop, matching the bar Faizan already hit on Zero Latency Webster.

---

## 11. Phasing

**P0 — launch**

- Home, About, Experience, Apps hub, `money` category page, Hours app landing page, Projects index + Qoineer + CIAYN detail pages, Research, Contact.
- Full technical SEO baseline: sitemap, robots, JSON-LD across all page types, OG images, canonical URLs.
- Light-theme design system implemented per `design-system.md`.
- Contact via `mailto:`/phone/socials (no form backend yet).

**P1 — within weeks of launch**

- Waitlist capture page/component for Hours, per its own growth plan.
- Contact form with a real backend, if inbound volume justifies the infrastructure.
- A blog/notes section — dual purpose: supports the portfolio pillar (technical/SEO writing, since that's a demonstrated skill) and supports the Hours pillar (the "Most Regretted Purchases" monthly report Hours' own growth plan calls for publishing). See `seo-strategy.md` §10.
- Second app category, once a second app is genuinely close to shippable.

**P2 — later**

- Additional app categories and apps as they're built.
- Multi-language support, if warranted.
- Revisit CMS/authoring tooling if content volume makes hand-editing content files a bottleneck.

---

## 12. Success metrics

| Metric | Target |
|---|---|
| PageSpeed Insights (mobile + desktop) | ≥ 95 |
| Organic ranking for "Faizan Gillani" | Page 1, position 1–3, within 3 months |
| Organic ranking for Hours' core problem-space terms (e.g. "pre-purchase regret calculator") | Page 1 within 6 months of the app's public launch |
| Contact inquiries (recruiter/client) | Tracked from launch; no baseline yet — establish one in month 1 |
| App Store / waitlist click-through from the app landing page | ≥ 10% of app-page visitors |
| Core Web Vitals | All "Good" in Search Console, sitewide |

---

## 13. Non-functional requirements

- **Performance:** static generation wherever content allows it (see `architecture.md` §3); no client-side JS beyond what's needed for genuinely interactive elements (nav, waitlist form, future calculator widget).
- **Accessibility:** WCAG AA baseline, sitewide.
- **Browser support:** Chrome/Edge 111+, Firefox 111+, Safari 16.4+ (Next.js 16's own minimum bar).
- **Hosting:** Vercel (implied by the Next.js App Router stack and zero-backend v1 scope) — confirm as an open question if Faizan has a different preference (§14).

---

## 14. Open questions

1. **Domain name.** No domain is currently attached to this project. `architecture.md` uses a single configurable `SITE_URL` so a real domain can be dropped in later without touching every page, but a domain should be chosen and purchased before launch (canonical URLs, sitemaps, and OG tags all depend on it being final).
2. **Photo usage.** Should Faizan's headshot (present in the resume) be used publicly on About/Home? Recommended for trust and the "agency" register, but it's his call.
3. **Contact method.** `mailto:`-only for v1 (recommended, zero infra) vs. a form with a backend from day one — see §8.
4. **Analytics provider.** Vercel Analytics vs. Plausible vs. none at launch.
5. **Hosting provider.** Assumed Vercel; confirm.
6. **Experience date overlap.** The resume shows Gallopade (Nov 2021–Sept 2022) and Mentoring Minds (Mar 2021–Nov 2022) as overlapping — worth a quick check before publishing the Experience timeline verbatim.
7. **Couple-apps category timing.** HourStory and Combo/tcatemplate suggest a second, "relationships/connection" app category is plausible down the line — not scoped now (§2), but worth confirming this is the right second category when the time comes.
8. **App Store / Play Store listings.** None exist yet for Hours; the site ships with waitlist capture instead of store badges until that changes.

---

*End of document.*
