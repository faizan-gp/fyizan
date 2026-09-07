import Link from "next/link";
import type { Project } from "@/lib/content/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="group block rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-display text-xl font-black text-ink">{project.name}</h3>
        <span className="whitespace-nowrap text-xs font-bold uppercase tracking-wide text-ink-muted">
          {project.period}
        </span>
      </div>
      <p className="mt-3 text-sm text-ink-muted">{project.summary}</p>
      <ul className="mt-4 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-medium text-ink-muted"
          >
            {item}
          </li>
        ))}
      </ul>
    </Link>
  );
}
