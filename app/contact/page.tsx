import { Container } from "@/components/container";
import { BadgePill } from "@/components/badge-pill";
import { person } from "@/content/person";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Contact",
  description: "Get in touch with Faizan Gillani.",
  path: "/contact",
});

const rows = [
  { label: "Email", value: person.email, href: `mailto:${person.email}` },
  { label: "Phone", value: person.phone, href: `tel:${person.phone}` },
];

export default function ContactPage() {
  return (
    <Container className="py-16 sm:py-24">
      <BadgePill>Get in touch</BadgePill>
      <h1 className="mt-4 font-display text-4xl font-black text-ink sm:text-5xl">Contact</h1>
      <p className="mt-4 max-w-xl text-lg text-ink-muted">
        Open to senior full-stack roles, contract work, and hearing from anyone curious about
        Life Hours.
      </p>

      <div className="mt-10 max-w-md divide-y divide-border rounded-2xl border border-border bg-surface p-2">
        {rows.map((row) => (
          <a
            key={row.label}
            href={row.href}
            className="flex items-center justify-between gap-4 rounded-xl px-4 py-4 transition-colors hover:bg-bg"
          >
            <span className="text-xs font-bold uppercase tracking-wide text-ink-muted">
              {row.label}
            </span>
            <span className="font-bold text-ink">{row.value}</span>
          </a>
        ))}
      </div>
    </Container>
  );
}
