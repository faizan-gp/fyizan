import Image from "next/image";
import Link from "next/link";
import type { App } from "@/lib/content/types";
import { StatusBadge } from "./status-badge";

export function AppCard({ app }: { app: App }) {
  return (
    <Link
      href={`/apps/${app.categorySlug}/${app.slug}`}
      className="group block rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {app.icon && (
            <Image
              src={app.icon.src}
              alt={app.icon.alt}
              width={40}
              height={40}
              className="rounded-xl border border-border"
            />
          )}
          <h3 className="font-display text-xl font-black text-ink">{app.name}</h3>
        </div>
        <StatusBadge status={app.status} />
      </div>
      <p className="mt-3 text-sm text-ink-muted">{app.tagline}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-accent">
        View app
        <span aria-hidden className="transition-transform group-hover:translate-x-1">
          →
        </span>
      </span>
    </Link>
  );
}
