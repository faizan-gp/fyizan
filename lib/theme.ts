// Category/app accent tokens are a small, extensible CSS-variable map
// (design-system.md §2, globals.css). This resolves a token name (e.g.
// "money") to the CSS var driving it, so components stay data-driven
// instead of hardcoding color per category.
export function accentVar(token: string): string {
  return `var(--accent-${token})`;
}
