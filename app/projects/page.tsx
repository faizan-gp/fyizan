import { Container } from "@/components/container";
import { BadgePill } from "@/components/badge-pill";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/content/projects";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Projects",
  description:
    "Case studies from past client and venture work by Faizan Gillani, including Qoineer and CIAYN.",
  path: "/projects",
});

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <Container className="py-16 sm:py-24">
      <BadgePill>Case studies</BadgePill>
      <h1 className="mt-4 font-display text-4xl font-black text-ink sm:text-5xl">Projects</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        Past client and venture work, kept separate from the apps above — these are things
        Faizan built for someone else, not products he&rsquo;s currently shipping.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </Container>
  );
}
