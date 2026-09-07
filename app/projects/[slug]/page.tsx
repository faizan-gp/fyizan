import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getAllProjects, getProject } from "@/lib/content/projects";
import { getApp } from "@/lib/content/apps";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, projectJsonLd } from "@/lib/seo/jsonld";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

type Params = Promise<{ slug: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.name,
    description: project.summary,
    path: `/projects/${project.slug}`,
  });
}

export default async function ProjectPage({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  const relatedApp = project.links?.appSlug ? getApp("money", project.links.appSlug) : undefined;

  const breadcrumbItems = [
    { name: "Projects", path: "/projects" },
    { name: project.name, path: `/projects/${project.slug}` },
  ];

  return (
    <Container className="py-16 sm:py-24">
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={projectJsonLd(project)} />
      <Breadcrumbs items={breadcrumbItems} />

      <div className="mt-6 flex flex-wrap items-baseline justify-between gap-3">
        <h1 className="font-display text-5xl font-black uppercase tracking-tight text-ink sm:text-6xl">
          {project.name}
        </h1>
        <span className="text-sm font-bold uppercase tracking-wide text-ink-muted">
          {project.period}
        </span>
      </div>
      <p className="mt-4 max-w-2xl text-xl text-ink-muted">{project.summary}</p>
      <p className="mt-3 text-xs font-bold uppercase tracking-wide text-accent">{project.role}</p>

      <ul className="mt-6 flex flex-wrap gap-2">
        {project.stack.map((item) => (
          <li
            key={item}
            className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-ink-muted"
          >
            {item}
          </li>
        ))}
      </ul>

      <ul className="mt-10 max-w-2xl space-y-4 border-t border-border pt-8">
        {project.highlights.map((point) => (
          <li key={point} className="flex items-start gap-3">
            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
              ✓
            </span>
            <span className="text-ink-muted">{point}</span>
          </li>
        ))}
      </ul>

      {relatedApp && (
        <p className="mt-10 text-sm text-ink-muted">
          This work continues in{" "}
          <Link href={`/apps/${relatedApp.categorySlug}/${relatedApp.slug}`} className="font-bold text-accent hover:underline">
            {relatedApp.name}
          </Link>
          .
        </p>
      )}
    </Container>
  );
}
