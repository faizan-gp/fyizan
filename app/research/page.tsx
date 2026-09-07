import { Container } from "@/components/container";
import { BadgePill } from "@/components/badge-pill";
import { JsonLd } from "@/components/json-ld";
import { publications } from "@/content/research";
import { buildMetadata } from "@/lib/seo/metadata";
import { scholarlyArticleJsonLd } from "@/lib/seo/jsonld";

export const metadata = buildMetadata({
  title: "Research",
  description: "Published and in-review research by Faizan Gillani.",
  path: "/research",
});

export default function ResearchPage() {
  return (
    <Container className="py-16 sm:py-24">
      <BadgePill>Research</BadgePill>
      <h1 className="mt-4 font-display text-4xl font-black text-ink sm:text-5xl">Publications</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        Academic work, alongside the product and engineering work elsewhere on this site.
      </p>

      <ul className="mt-12 max-w-2xl space-y-6">
        {publications.map((publication) => (
          <li key={publication.slug} className="rounded-2xl border border-border bg-surface p-6">
            <JsonLd data={scholarlyArticleJsonLd(publication)} />
            <p className="text-xs font-bold uppercase tracking-wide text-accent">
              {publication.venue} · {publication.status} · {publication.year}
            </p>
            <h2 className="mt-2 font-display text-xl font-black text-ink">
              {publication.title}
            </h2>
            <p className="mt-3 text-sm text-ink-muted">{publication.authors.join(", ")}</p>
            {publication.abstract && (
              <p className="mt-4 text-sm text-ink-muted">{publication.abstract}</p>
            )}
          </li>
        ))}
      </ul>
    </Container>
  );
}
