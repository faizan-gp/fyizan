import Link from "next/link";
import { Container } from "./container";
import { PillButton } from "./pill-button";

const links = [
  { href: "/apps", label: "Apps" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/about", label: "About" },
  { href: "/research", label: "Research" },
];

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/90 backdrop-blur">
      <Container className="flex h-20 items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink font-display text-sm font-black text-white"
          >
            F
          </span>
          <span className="font-display text-lg font-black tracking-tight text-ink">
            Faizan Gillani
          </span>
        </Link>
        <nav
          aria-label="Primary"
          className="hidden items-center gap-8 text-sm font-medium text-ink-muted lg:flex"
        >
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex-shrink-0">
          <PillButton href="/contact">Contact</PillButton>
        </div>
      </Container>
      <div className="border-t border-border px-6 py-2 lg:hidden">
        <nav aria-label="Primary" className="flex gap-5 overflow-x-auto whitespace-nowrap text-sm font-medium text-ink-muted [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="transition-colors hover:text-ink">
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
