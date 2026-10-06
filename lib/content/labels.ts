import type { AppStatus, Platform } from "./types";
import { accentVar } from "@/lib/theme";

export const STATUS_LABEL: Record<AppStatus, string> = {
  concept: "Concept",
  "in-development": "In development",
  beta: "Beta",
  live: "Live",
};

export const PLATFORM_LABEL: Record<Platform, string> = {
  ios: "iOS",
  android: "Android",
  web: "Web",
  extension: "Extension",
};

/** Inline style that sets the per-app accent (--app) from the app's accent token. */
export function appAccentStyle(accentColor: string) {
  return { "--app": accentVar(accentColor) } as React.CSSProperties;
}

export function platformList(platforms: Platform[]): string {
  return platforms.map((p) => PLATFORM_LABEL[p]).join(" and ");
}
