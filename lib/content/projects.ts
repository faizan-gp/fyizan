import { qoineer } from "@/content/projects/qoineer";
import { ciayn } from "@/content/projects/ciayn";
import type { Project } from "./types";

const projects: Project[] = [qoineer, ciayn];

export function getAllProjects(): Project[] {
  return projects;
}

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
