import { hours } from "@/content/apps/hours";
import type { App } from "./types";

// Add a new app by adding one entry here after creating its content file —
// see architecture.md §4.1.
const apps: App[] = [hours];

export function getAllApps(): App[] {
  return apps;
}

export function getAppsByCategory(categorySlug: string): App[] {
  return apps.filter((app) => app.categorySlug === categorySlug);
}

export function getApp(categorySlug: string, appSlug: string): App | undefined {
  return apps.find(
    (app) => app.categorySlug === categorySlug && app.slug === appSlug
  );
}
