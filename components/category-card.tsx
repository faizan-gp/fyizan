import Link from "next/link";
import type { Category } from "@/lib/content/types";
import { accentVar } from "@/lib/theme";

export function CategoryCard({ category, appCount }: { category: Category; appCount: number }) {
  return (
    <Link
      href={`/apps/${category.slug}`}
      className="group block rounded-2xl border border-border bg-surface p-6 transition-all hover:-translate-y-1 hover:shadow-lg"
    >
      <span
        aria-hidden
        className="flex h-10 w-10 items-center justify-center rounded-xl font-display text-sm font-black text-white"
        style={{ background: accentVar(category.accentColor) }}
      >
        {category.name.charAt(0)}
      </span>
      <h3 className="mt-4 font-display text-xl font-black text-ink">{category.name}</h3>
      <p className="mt-2 text-sm text-ink-muted">{category.description}</p>
      <p className="mt-4 text-xs font-bold uppercase tracking-wide text-ink-muted">
        {appCount} {appCount === 1 ? "app" : "apps"}
      </p>
    </Link>
  );
}
