import type { AppStatus } from "@/lib/content/types";
import { BadgePill } from "./badge-pill";

const labels: Record<AppStatus, string> = {
  concept: "Concept",
  "in-development": "In development",
  beta: "Beta",
  live: "Live",
};

// Status is always shown honestly — never implying availability that
// doesn't exist yet. See requirements.md §8.
export function StatusBadge({ status }: { status: AppStatus }) {
  return (
    <BadgePill dotColor={status === "live" ? "var(--accent)" : "#a3a3ab"}>
      {labels[status]}
    </BadgePill>
  );
}
