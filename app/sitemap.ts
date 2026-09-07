import type { MetadataRoute } from "next";
import { getAllCategories } from "@/lib/content/categories";
import { getAllApps } from "@/lib/content/apps";
import { getAllProjects } from "@/lib/content/projects";
import { SITE_URL } from "@/lib/site";

// Built entirely from content/ — a new app, category, or project is
// sitemap-included the moment its content file exists. See
// architecture.md §6.
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/experience`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/apps`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/projects`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/research`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.5 },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getAllCategories().map((category) => ({
    url: `${SITE_URL}/apps/${category.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const appRoutes: MetadataRoute.Sitemap = getAllApps().map((app) => ({
    url: `${SITE_URL}/apps/${app.categorySlug}/${app.slug}`,
    lastModified: new Date(app.updatedAt),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const legalRoutes: MetadataRoute.Sitemap = getAllApps().flatMap((app) => {
    const base = `${SITE_URL}/apps/${app.categorySlug}/${app.slug}`;
    const routes: MetadataRoute.Sitemap = [];
    if (app.privacyPolicy) {
      routes.push({
        url: `${base}/privacy`,
        lastModified: new Date(app.privacyPolicy.updatedAt),
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
    if (app.termsOfService) {
      routes.push({
        url: `${base}/terms`,
        lastModified: new Date(app.termsOfService.updatedAt),
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
    if (app.accountDeletion) {
      routes.push({
        url: `${base}/delete-account`,
        lastModified: new Date(app.accountDeletion.updatedAt),
        changeFrequency: "yearly",
        priority: 0.3,
      });
    }
    return routes;
  });

  const projectRoutes: MetadataRoute.Sitemap = getAllProjects().map((project) => ({
    url: `${SITE_URL}/projects/${project.slug}`,
    lastModified: new Date(project.updatedAt),
    changeFrequency: "yearly",
    priority: 0.5,
  }));

  return [...staticRoutes, ...categoryRoutes, ...appRoutes, ...legalRoutes, ...projectRoutes];
}
