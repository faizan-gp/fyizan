import type { AppStatus } from "@/lib/content/types";
import { STATUS_LABEL } from "@/lib/content/labels";

export function StatusPill({ status }: { status: AppStatus }) {
  return <span className={`pill status ${status === "live" ? "live" : ""}`.trim()}>{STATUS_LABEL[status]}</span>;
}
