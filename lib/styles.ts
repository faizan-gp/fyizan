// The four visual styles. Each one is a token set in app/globals.css under
// :root[data-style="<id>"]; this list drives the style switcher and the
// pre-paint script in the root layout.

export const STYLES = [
  {
    id: "aurora",
    name: "Aurora",
    swatch: ["#5B3CF5", "#00A8CC"],
    note: "Aurora. Light, violet to cyan gradients, soft shadows. The classic SaaS look.",
  },
  {
    id: "midnight",
    name: "Midnight",
    swatch: ["#7C97FF", "#D06BFF"],
    note: "Midnight. Dark navy with electric blue and magenta glow on a faint grid.",
  },
  {
    id: "citrus",
    name: "Citrus",
    swatch: ["#2A4DFF", "#C8F53C"],
    note: "Citrus. Bold, flat, hard-edged. Heavy outlines, offset shadows, lime highlights.",
  },
  {
    id: "lagoon",
    name: "Lagoon",
    swatch: ["#0A7C70", "#6C4DF0"],
    note: "Lagoon. Soft glass cards over a teal and lilac wash. Calm and rounded.",
  },
] as const;

export type StyleId = (typeof STYLES)[number]["id"];

export const STYLE_STORAGE_KEY = "fg-style";
export const DEFAULT_LIGHT_STYLE: StyleId = "aurora";
export const DEFAULT_DARK_STYLE: StyleId = "midnight";

// Runs synchronously in <head>, before first paint, so a returning visitor
// never sees the default style flash. Falls back to Midnight for dark-mode
// systems and Aurora otherwise. See node_modules/next/dist/docs/01-app/02-guides/preventing-flash-before-hydration.md
export const STYLE_BOOT_SCRIPT = `(function(){try{var ids=${JSON.stringify(
  STYLES.map((s) => s.id),
)};var s=null;try{s=localStorage.getItem(${JSON.stringify(
  STYLE_STORAGE_KEY,
)})}catch(e){}if(ids.indexOf(s)<0){s=matchMedia("(prefers-color-scheme: dark)").matches?${JSON.stringify(
  DEFAULT_DARK_STYLE,
)}:${JSON.stringify(DEFAULT_LIGHT_STYLE)}}document.documentElement.setAttribute("data-style",s)}catch(e){}})();`;
