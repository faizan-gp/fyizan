import { Container } from "@/components/container";
import { BadgePill } from "@/components/badge-pill";
import { experience } from "@/content/experience";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Experience",
  description:
    "Faizan Gillani's work history — from backend microservices at Mentoring Minds to CQRS and event sourcing at Gallopade, and technical SEO at Zero Latency Webster.",
  path: "/experience",
});

export default function ExperiencePage() {
  return (
    <Container className="py-16 sm:py-24">
      <BadgePill>Experience</BadgePill>
      <h1 className="mt-4 font-display text-4xl font-black text-ink sm:text-5xl">
        Where I&rsquo;ve been
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        Reverse-chronological, exactly as it happened — including the gap.
      </p>

      <ol className="relative mt-14 space-y-10 border-l-2 border-border pl-10">
        {experience.map((entry) => (
          <li key={`${entry.company}-${entry.startDate}`} className="relative">
            <span
              aria-hidden
              className="absolute -left-[calc(2.5rem+5px)] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent ring-4 ring-bg"
            />
            <div className="rounded-2xl border border-border bg-surface p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="font-display text-xl font-black text-ink">
                  {entry.role ? `${entry.role} · ${entry.company}` : entry.company}
                </p>
                <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                  {entry.displayDate}
                </p>
              </div>
              <p className="mt-3 max-w-2xl text-sm text-ink-muted">{entry.summary}</p>
              {entry.stack.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-2">
                  {entry.stack.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-medium text-ink-muted"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </ol>
    </Container>
  );
}
