import Link from "next/link";
import { person } from "@/content/person";
import { Container } from "./container";

const columns = [
  {
    heading: "Studio",
    links: [
      { href: "/apps", label: "Apps" },
      { href: "/projects", label: "Projects" },
      { href: "/research", label: "Research" },
    ],
  },
  {
    heading: "About",
    links: [
      { href: "/about", label: "About" },
      { href: "/experience", label: "Experience" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-[1.5fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="flex h-8 w-8 items-center justify-center rounded-lg bg-ink font-display text-sm font-black text-white"
            >
              F
            </span>
            <p className="font-display text-lg font-black text-ink">Faizan Gillani</p>
          </div>
          <p className="mt-4 max-w-sm text-sm text-ink-muted">{person.oneLiner}</p>
        </div>
        {columns.map((column) => (
          <div key={column.heading}>
            <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
              {column.heading}
            </p>
            <ul className="mt-4 space-y-2.5">
              {column.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ink-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Container>
      <Container className="border-t border-border py-6 text-xs text-ink-muted">
        <p>&copy; {new Date().getFullYear()} Faizan Gillani. All rights reserved.</p>
      </Container>
    </footer>
  );
}
