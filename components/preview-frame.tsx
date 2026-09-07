import type { ReactNode } from "react";

// A browser-chrome mockup card — used to preview a page or app without
// needing a real screenshot on hand. Dots echo the reference's carousel
// tab indicators.
export function PreviewFrame({
  label,
  children,
  className = "",
}: {
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${className}`}>
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <span aria-hidden className="h-2 w-2 rounded-full bg-accent" />
        <span aria-hidden className="h-2 w-2 rounded-full bg-ink/30" />
        <span aria-hidden className="h-2 w-2 rounded-full bg-ink/15" />
        {label && (
          <span className="ml-2 truncate text-xs text-ink-muted">{label}</span>
        )}
      </div>
      <div className="p-6">{children}</div>
    </div>
  );
}
