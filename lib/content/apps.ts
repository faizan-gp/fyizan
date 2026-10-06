import { hours } from "@/content/apps/hours";
import { mediasort } from "@/content/apps/mediasort";
import type { App } from "./types";

// Add a new app by adding one entry here after creating its content file —
// see architecture.md §4.1.
const apps: App[] = [hours, mediasort];

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

export interface WaitlistTarget {
  slug: string;
  name: string;
  contactEmail: string;
}

/** Apps that take waitlist signups, reduced to what the form needs (keeps legal text out of the client bundle). */
export function getWaitlistTargets(): WaitlistTarget[] {
  return apps
    .filter((app) => app.waitlistEnabled && app.support)
    .map((app) => ({
      slug: app.slug,
      name: app.shortName ?? app.name,
      contactEmail: app.support!.contactEmail,
    }));
}
