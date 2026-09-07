# Design System — Faizan Gillani Portfolio & App Studio

Companion to `requirements.md` §9 (design requirements) and `architecture.md` §8 (styling implementation). This document is the creative-direction decision that `requirements.md` asked for explicitly — "use your creativity," light background, a mix of personal portfolio, app landing page, and agency site — made concrete enough to implement consistently across every future page and app, rather than re-decided ad hoc per component.

Version 0.1 — September 2026

---

## 1. Direction

Three references were given, and they pull in different directions if not resolved deliberately:

- A **personal/individual portfolio** wants warmth, voice, a visible human — it should feel like Faizan, not a template.
- An **app landing page** wants clarity and momentum — a clear hero, a clear loop, a clear CTA, the way Hours' own product spec demands (`requirements.md` §6.6).
- An **agency site** wants polish and confidence — generous whitespace, considered type, the sense that whoever built this is worth hiring.

The resolution: **personal voice sets the tone, agency-level craft sets the execution, app-landing clarity sets the structure of any page selling a product.** Concretely — the copy and photo stay personal and specific (never generic "creative studio" language); the layout, spacing, and type system are held to agency-grade consistency; and any page whose job is to sell an app (§ the app landing template) borrows structural clarity from product marketing sites rather than portfolio conventions like a scrolling case-study narrative.

A second, quieter design decision: this site's own visual identity should **not** copy Hours' paper/ink/receipt aesthetic. Hours has its own brand for a reason (`/Users/faizan/Desktop/fyizan/regret/requirements.md` §5). The portfolio is the neutral canvas each app is displayed *on* — it needs its own identity, distinct enough that an app landing page can carry a flavor of the app's own brand (§6) without clashing with the site around it.

---

## 2. Color

**Base — light, warm, not stark.** An off-white paper-adjacent background (not `#FFFFFF`) with deep-ink text, close in spirit to Hours' own light-mode values (`#F5F1E8` background range, `#15130F` ink) but not identical — enough family resemblance that visitors moving from the portfolio into an app page don't feel a jarring brand switch, without the portfolio being mistaken for the app.

| Token | Role | Approx. value |
|---|---|---|
| `--bg` | Page background | warm off-white, e.g. `#FAF8F3` |
| `--surface` | Card/panel background | slightly lifted from `--bg`, e.g. `#FFFFFF` with a soft border rather than a shadow-heavy card |
| `--ink` | Primary text | near-black warm dark, e.g. `#171512` |
| `--ink-muted` | Secondary text | mid-gray-warm, e.g. `#5B564C` |
| `--accent` | Site-wide signature accent (brand, primary CTAs) | a confident teal-green — a deliberate continuity with Hours' own "Kept" accent color, since it's the one color that can plausibly be "Faizan's" across every product he ships, not just this one app |
| `--border` | Hairline borders/rules | light warm gray, e.g. `#E7E2D8` |

**Category accent colors** are a small, extensible token map — each category gets one distinct accent used on its hub page and its apps' cards/status badges, so the taxonomy is visually legible at a glance (`requirements.md` §6.4–6.5):

- `money` → the shared teal-green accent (reinforces that Hours is, for now, also the site's flagship/featured app).
- Future categories pick a new, distinct hue from the same saturation/lightness family, added to the token map in one place (`architecture.md` §8) — never invented per-page.

No pure red anywhere (a rule borrowed deliberately from Hours' own copy principles — "never scold" — and equally correct for a hiring-facing portfolio, where red reads as error/alarm rather than brand). Status badges use the accent system and neutral tones, never a stoplight red/green/yellow scheme.

---

## 3. Typography

- **Display/hero:** a high-contrast, confident serif or grotesk for the name and hero lines — the one place the site is allowed a strong, editorial personality. Candidate: a serif in the Fraunces family (already licensed and bundled as static font files in the Hours app's own `assets/fonts/`, so there's a proven, already-owned typeface to extend into the portfolio for brand continuity) or a comparable Google Font loaded via `next/font/google` if self-hosting the same files isn't wanted here.
- **Meta/labels/code-adjacent content (stack tags, dates, status badges):** a monospace face — IBM Plex Mono is, again, already present in the Hours app's asset set and reinforces the "engineer" register without resorting to a cliché terminal aesthetic. Used sparingly: tags, dates, small labels — never body copy.
- **Body copy:** a clean, highly legible sans — Inter (also already in Hours' font set) is a safe, proven choice and keeps the whole visual family consistent across both projects without literally reusing Hours' theme (§1).
- **Scale:** a restrained type scale (5–6 steps) shared sitewide; the hero size is the one place scale is allowed to feel dramatic (this is the "the number is the hero" instinct from Hours' own design principles, translated to "the name/headline is the hero" for a portfolio).

---

## 4. Layout

- Single-column-first, generous top space above the hero on every major page — direct continuity with Hours' "no screen sits between the input and the result" instinct, translated to "no clutter sits between the visitor and the one thing this page is about."
- A consistent container max-width and side padding across all pages; section rhythm (vertical spacing between major blocks) defined once and reused, not re-guessed per page.
- The app landing template (`requirements.md` §6.6) is allowed a distinct internal rhythm — hero, loop diagram, feature grid, privacy block, FAQ — because it's structurally a product page, not a portfolio page, even though it uses the same tokens and type system as the rest of the site.

---

## 5. Components (patterns, not final pixel specs)

- **Nav:** sticky, minimal — name/wordmark, a handful of top-level links (Apps, Projects, About, Contact), no mega-menu. A small monogram/wordmark using the "fyizan" handle is a reasonable mark here (`requirements.md` §4).
- **Hero patterns** differ intentionally by page type: Home's hero is personal (name, one-liner, photo per §6/`requirements.md` §6.2); an app landing page's hero is product-first (app name, tagline, status, CTA); a category hub's hero is a short, substantive framing paragraph, not a big graphic.
- **Cards:** one card pattern (surface + border + accent sliver, not a heavy shadow) reused for app cards, project cards, and category cards — differentiated by content and accent color, not by a different card shape per type.
- **Status badges:** `In development` / `Coming soon` / `Live` — small, neutral-toned, never implying more availability than is true (`requirements.md` §8).
- **Buttons/CTAs:** one primary style (filled, accent-colored) and one secondary (outline/text) sitewide. Primary is reserved for the one genuine action per section (waitlist signup, contact, store link) — never more than one primary CTA competing for attention in the same view.
- **Footer:** sitewide links (Apps, Projects, About, Contact), socials, and a short line reinforcing the brand positioning (`requirements.md` §4) — this is also where consistent internal links live that support the topical map's "no orphaned pages" rule (`seo-strategy.md` §4.1).

---

## 6. App-specific accent within the shared shell

Each app landing page may express a restrained echo of its own product's visual language — for Hours, that means monospace numerals for any figure quoted on the page (hours, prices) and the receipt/ruled-line motif used sparingly as a section divider — without switching fonts, background color, or overall layout away from the site's own system. The rule: an app's brand can color the room, but it doesn't get to redecorate it. This keeps every app page recognizably part of one site while still feeling like it's actually about that app.

---

## 7. Motion

- Short and purposeful, matching Hours' own "nothing bounces" rule. A hero can fade/rise in once on load; interactive elements (buttons, cards) get a subtle hover/focus transition; nothing loops, nothing bounces, nothing animates just to prove it can.
- All motion respects `prefers-reduced-motion` — reduced or removed entirely for visitors who've asked for that at the OS level.

---

## 8. Iconography and imagery

- Thin-line icons, sparingly used (skill tags, feature grid on app pages, nav) — a family resemblance to Hours' "receipt-inspired glyphs" without being literally the same icon set.
- No stock photography. The one photograph on the site is Faizan's own headshot (`requirements.md` §6.2/§14.2, pending his confirmation) — everything else is type, color, and simple geometric/line accents rather than decorative imagery, which keeps the site feeling authored rather than templated.
- App screenshots (once they exist) are shown honestly — real device frames or clean crops, never staged lifestyle photography around them.

---

## 9. Accessibility

- WCAG AA contrast minimum for all text/background pairs, checked explicitly for the off-white background against both `--ink` and `--ink-muted` (light backgrounds are the easiest place to accidentally fail contrast on muted/secondary text).
- Visible focus states on every interactive element — never suppressed for aesthetic reasons.
- Minimum 44px tap targets on buttons/links in any interactive UI (the waitlist form, nav toggle) — a direct, deliberate carry-over from Hours' own accessibility bar (`/Users/faizan/Desktop/fyizan/regret/requirements.md` §5.4).
- Color is never the sole carrier of meaning — status badges and category accents pair color with a text label, always.

---

## 10. What this document deliberately does not specify

Exact hex values beyond the approximations in §2, exact type sizes, and exact spacing tokens are intentionally left for implementation time in `globals.css`/Tailwind config (`architecture.md` §8) rather than locked here — this document fixes the *decisions* (palette direction, type family roles, component patterns, the relationship to Hours' brand) so implementation has a clear, consistent target without being a pixel-perfect spec that fights the realities of building in Tailwind.

---

*End of document.*
