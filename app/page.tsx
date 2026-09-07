import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { BadgePill } from "@/components/badge-pill";
import { PillButton } from "@/components/pill-button";
import { PreviewFrame } from "@/components/preview-frame";
import { person } from "@/content/person";
import { getAllApps } from "@/lib/content/apps";
import { getAllProjects } from "@/lib/content/projects";
import { experience } from "@/content/experience";
import { buildMetadata } from "@/lib/seo/metadata";
import { MotionDiv } from "@/components/motion";
import { ArrowRight, Code2, Briefcase, Zap, Terminal } from "lucide-react";

export const metadata = buildMetadata({
  title: `${person.displayName} — Full-Stack Engineer & Indie Maker`,
  description: person.oneLiner,
  path: "/",
});

export default function HomePage() {
  const apps = getAllApps();
  const featuredApp = apps[0];
  const projects = getAllProjects().slice(0, 3);
  const recentRoles = experience.filter((entry) => entry.role).slice(0, 2);

  return (
    <div className="py-12 sm:py-24 bg-bg min-h-screen">
      <Container>
        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]">
          
          {/* Hero Tile - Spans 12 columns on large screens */}
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:col-span-4 lg:col-span-12 bg-surface rounded-3xl p-8 sm:p-12 border border-border shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-between"
          >
            <div>
              <BadgePill>Portfolio & App Studio</BadgePill>
              <h1 className="mt-8 font-display text-5xl sm:text-7xl font-black tracking-tight text-ink uppercase leading-none">
                Hi, I'm Faizan.
              </h1>
              <p className="mt-6 text-xl text-ink-muted max-w-2xl leading-relaxed">
                {person.oneLiner}
              </p>
            </div>
            
            <div className="mt-12 flex flex-wrap gap-4">
              <PillButton href="/apps">Explore my work</PillButton>
              <PillButton href="/contact" variant="secondary">Get in touch</PillButton>
            </div>
          </MotionDiv>

          {/* Featured App Tile - Spans 6 cols */}
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="md:col-span-2 lg:col-span-6 bg-accent-soft border border-accent/20 rounded-3xl p-8 hover:shadow-lg transition-all group overflow-hidden relative"
          >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
              <Terminal size={120} className="text-accent" />
            </div>
            {featuredApp && (
              <Link href={`/apps/${featuredApp.categorySlug}/${featuredApp.slug}`} className="flex flex-col h-full justify-between relative z-10">
                <div>
                  <div className="flex items-center gap-3 text-accent mb-4">
                    <Code2 size={24} />
                    <span className="font-bold text-sm uppercase tracking-wider">Featured App</span>
                  </div>
                  <h2 className="font-display text-4xl font-black text-ink group-hover:text-accent-3 transition-colors">{featuredApp.name}</h2>
                  <p className="mt-4 text-ink-muted text-lg max-w-md">{featuredApp.tagline}</p>
                </div>
                <div className="mt-8 flex items-center gap-2 text-accent-3 font-bold group-hover:translate-x-2 transition-transform w-fit">
                  View Case Study <ArrowRight size={18} />
                </div>
              </Link>
            )}
          </MotionDiv>

          {/* Projects Tile - Spans 6 cols */}
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="md:col-span-4 lg:col-span-6 bg-surface border border-border rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3 text-ink">
                <Briefcase size={24} className="text-accent" />
                <h3 className="font-display text-2xl font-black">Recent Logs</h3>
              </div>
              <Link href="/projects" className="text-sm font-bold text-accent hover:text-accent-3 transition-colors">View all</Link>
            </div>
            
            <ul className="space-y-6">
              {projects.map((project) => (
                <li key={project.slug} className="group">
                  <Link href={`/projects/${project.slug}`} className="block">
                    <h4 className="font-bold text-lg text-ink group-hover:text-accent transition-colors flex justify-between items-center">
                      {project.name}
                      <ArrowRight size={16} className="opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-accent" />
                    </h4>
                    <p className="text-sm text-ink-muted mt-1">{project.summary}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </MotionDiv>

          {/* Experience Tile - Spans 6 cols */}
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="md:col-span-2 lg:col-span-6 bg-surface border border-border rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow"
          >
            <h3 className="font-display text-2xl font-black text-ink mb-8">Where I've been</h3>
            <ul className="space-y-6">
              {recentRoles.map((entry) => (
                <li key={`${entry.company}-${entry.startDate}`} className="border-l-2 border-accent-soft pl-4 group hover:border-accent transition-colors">
                  <p className="font-bold text-ink">{entry.role}</p>
                  <div className="flex items-center gap-2 text-sm mt-1">
                    <span className="text-ink-muted">{entry.company}</span>
                    <span className="text-accent-2 text-xs font-mono bg-accent-soft px-2 py-0.5 rounded-full">{entry.displayDate}</span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Link href="/experience" className="inline-flex items-center gap-2 text-sm font-bold text-accent hover:text-accent-3 transition-colors">
                Full timeline <ArrowRight size={16} />
              </Link>
            </div>
          </MotionDiv>

          {/* Skills Tile - Spans 6 cols */}
          <MotionDiv 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="md:col-span-2 lg:col-span-6 bg-surface border border-border rounded-3xl p-8 shadow-sm hover:shadow-lg transition-shadow flex flex-col justify-center"
          >
            <h3 className="font-display text-2xl font-black text-ink mb-6">Toolkit</h3>
            <div className="flex flex-wrap gap-2">
              {person.skillGroups.flatMap(g => g.skills).slice(0, 15).map(skill => (
                <span key={skill} className="px-4 py-2 rounded-xl bg-surface-hover text-ink text-sm font-medium border border-border hover:border-accent transition-colors">
                  {skill}
                </span>
              ))}
              <span className="px-4 py-2 rounded-xl bg-accent-soft text-accent font-bold text-sm">
                + more
              </span>
            </div>
          </MotionDiv>

        </div>
      </Container>
    </div>
  );
}
