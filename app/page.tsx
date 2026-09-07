import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { BadgePill } from "@/components/badge-pill";
import { PillButton } from "@/components/pill-button";
import { PreviewFrame } from "@/components/preview-frame";
import { StatChip } from "@/components/stat-chip";
import { person } from "@/content/person";
import { getAllApps } from "@/lib/content/apps";
import { getAllProjects } from "@/lib/content/projects";
import { experience } from "@/content/experience";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: `${person.displayName} — Full-Stack Engineer & Indie Maker`,
  description: person.oneLiner,
  path: "/",
});

export default function HomePage() {
  const apps = getAllApps();
  const featuredApp = apps[0];
  const projects = getAllProjects().slice(0, 2);
  const recentRoles = experience.filter((entry) => entry.role).slice(0, 3);

  return (
    <>
      <section className="grid-lines border-b border-border">
        <Container className="flex flex-col items-center py-20 text-center sm:py-28">
          <BadgePill>Portfolio &amp; app studio</BadgePill>
          <h1 className="mt-6 font-display text-5xl font-black uppercase leading-[0.95] tracking-tight text-ink sm:text-7xl">
            Faizan Gillani
            <br />
            Senior engineer, <span className="italic text-accent">indie maker</span>.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-ink-muted">{person.oneLiner}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <PillButton href="/apps">See what I&rsquo;m building</PillButton>
            <PillButton href="/contact" variant="secondary">
              Work with me
            </PillButton>
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-16">
          <div className="grid gap-10 pb-6 sm:grid-cols-3">
            {featuredApp && (
              <Link href={`/apps/${featuredApp.categorySlug}/${featuredApp.slug}`}>
                <PreviewFrame label="hours.app">
                  <p className="font-display text-2xl font-black text-ink">{featuredApp.name}</p>
                  <p className="mt-2 text-sm text-ink-muted">{featuredApp.tagline}</p>
                </PreviewFrame>
              </Link>
            )}

            <div className="relative pb-6">
              <Link href="/about">
                <PreviewFrame label="about.me">
                  <Image
                    src={person.photo.src}
                    alt={person.photo.alt}
                    width={200}
                    height={220}
                    className="mx-auto rounded-xl object-cover"
                  />
                </PreviewFrame>
              </Link>
              <StatChip
                value="95+"
                label="PageSpeed score"
                className="absolute -bottom-4 -left-3 -rotate-6"
              />
              <StatChip
                value="50+"
                label="#1 rankings"
                variant="surface"
                className="absolute -bottom-6 right-2 rotate-3"
              />
            </div>

            <Link href="/projects">
              <PreviewFrame label="projects.log">
                <ul className="space-y-3">
                  {projects.map((project) => (
                    <li key={project.slug}>
                      <p className="font-display text-base font-black text-ink">{project.name}</p>
                      <p className="text-xs text-ink-muted">{project.summary}</p>
                    </li>
                  ))}
                </ul>
              </PreviewFrame>
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-16">
          <BadgePill>Toolkit</BadgePill>
          <h2 className="mt-4 font-display text-3xl font-black text-ink">What I build with</h2>
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
        </Container>
      </section>

      <section>
        <Container className="py-16">
          <div className="flex items-baseline justify-between">
            <div>
              <BadgePill>Recent work</BadgePill>
              <h2 className="mt-4 font-display text-3xl font-black text-ink">Where I&rsquo;ve been</h2>
            </div>
            <Link href="/experience" className="hidden text-sm font-bold text-accent sm:inline">
              Full timeline →
            </Link>
          </div>
          <ul className="mt-10 space-y-6">
            {recentRoles.map((entry) => (
              <li
                key={`${entry.company}-${entry.startDate}`}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-display text-lg font-black text-ink">
                    {entry.role} · {entry.company}
                  </p>
                  <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">
                    {entry.displayDate}
                  </p>
                </div>
                <p className="mt-3 max-w-2xl text-sm text-ink-muted">{entry.summary}</p>
              </li>
            ))}
          </ul>
          <Link href="/experience" className="mt-6 inline-block text-sm font-bold text-accent sm:hidden">
            Full timeline →
          </Link>
        </Container>
      </section>
    </>
  );
}
