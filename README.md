# Faizan Gillani — daily-use apps

A showcase site for the apps Faizan Gillani ships: focused iOS and Android apps for your money and your phone. Built with Next.js (App Router), React and plain CSS design tokens.

> This project uses a version of Next.js with breaking changes. Read the relevant guide in `node_modules/next/dist/docs/` before changing framework-level code (see `AGENTS.md`).

## Run it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

| Path | What it is |
| --- | --- |
| `app/page.tsx` | Home: hero, principles, app lineup, comparison table, waitlist |
| `app/apps/page.tsx` | Catalog with category filter |
| `app/apps/[category]/page.tsx` | One category |
| `app/apps/[category]/[app]/` | App page, plus `privacy`, `terms`, `support`, `delete-account` |
| `content/apps/*.ts` | One typed record per app. **Add an app by adding a file here and listing it in `lib/content/apps.ts`.** |
| `content/categories.ts` | App categories |
| `lib/content/types.ts` | The content model |
| `app/globals.css` | All styling, as design tokens plus component classes |
| `lib/styles.ts` | The four visual styles and the pre-paint style script |

## Visual styles

The site ships with four styles, switchable from the bar at the bottom of every page: **Aurora** (light, violet and cyan), **Midnight** (dark navy), **Citrus** (bold and flat) and **Lagoon** (soft glass). Each is one token block in `app/globals.css` under `:root[data-style="<id>"]`. The choice is stored in `localStorage` and applied before first paint; first-time visitors get Midnight on dark-mode systems and Aurora otherwise.

To ship a single style, delete the other token blocks, remove `StyleSwitcher` from `app/layout.tsx`, and set `data-style` on `<html>` to the one you keep.

## Waitlist

There is no waitlist backend yet. The form opens the visitor's email app with a pre-filled message to the app's support address (`support.contactEmail` in the app's content file). Replace the `submit` function in `components/waitlist-form.tsx` when a list service is chosen.

## Old portfolio pages

`/about`, `/experience`, `/contact`, `/research`, `/projects` and `/projects/*` were removed and permanently redirect (see `next.config.ts`).
