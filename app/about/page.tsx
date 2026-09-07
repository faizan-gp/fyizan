import Image from "next/image";
import { Container } from "@/components/container";
import { BadgePill } from "@/components/badge-pill";
import { person } from "@/content/person";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "About",
  description: person.shortBio,
  path: "/about",
});

export default function AboutPage() {
  return (
    <Container className="py-16 sm:py-24">
      <div className="grid gap-12 md:grid-cols-[280px_1fr] md:items-start">
        <Image
          src={person.photo.src}
          alt={person.photo.alt}
          width={280}
          height={306}
          className="rounded-2xl border border-border object-cover shadow-sm"
        />
        <div>
          <BadgePill>About</BadgePill>
          <h1 className="mt-4 font-display text-4xl font-black text-ink sm:text-5xl">
            Faizan Gillani
          </h1>
          <div className="mt-6 space-y-5 text-lg leading-relaxed text-ink-muted">
            {person.longBio.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20 border-t border-border pt-12">
        <h2 className="font-display text-2xl font-black text-ink">Skills &amp; tools</h2>
        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          {person.skillGroups.map((group) => (
            <div key={group.name}>
              <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                {group.name}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-full border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-ink"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
