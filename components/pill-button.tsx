import Link from "next/link";
import type { ReactNode } from "react";

// The signature CTA: a rounded pill with a circular icon cap, lifted
// directly from the agency-template reference. Primary = filled accent
// with a white cap; secondary = white/outline with an accent cap.
export function PillButton({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  external?: boolean;
}) {
  const isPrimary = variant === "primary";
  return (
    <Link
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className={`group inline-flex items-center gap-4 rounded-full py-1.5 pl-6 pr-1.5 text-sm font-bold transition-transform hover:-translate-y-0.5 ${
        isPrimary
          ? "bg-accent text-white"
          : "border border-border bg-surface text-ink"
      }`}
    >
      {children}
      <span
        aria-hidden
        className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full text-sm ${
          isPrimary ? "bg-white text-accent" : "bg-accent text-white"
        }`}
      >
        →
      </span>
    </Link>
  );
}
