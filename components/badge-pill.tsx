import type { ReactNode } from "react";

export function BadgePill({ children, dotColor }: { children: ReactNode; dotColor?: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ink">
      <span
        aria-hidden
        className="h-1.5 w-1.5 rounded-full"
        style={{ background: dotColor ?? "var(--accent)" }}
      />
      {children}
    </span>
  );
}
