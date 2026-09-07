import Link from "next/link";
import { Fragment } from "react";

export interface Crumb {
  name: string;
  path: string;
}

// Real navigation, not decoration — must match the BreadcrumbList JSON-LD
// exactly. See seo-strategy.md §4.5.
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm font-medium text-ink-muted">
      <ol className="flex flex-wrap items-center gap-2">
        {items.map((item, index) => (
          <Fragment key={item.path}>
            {index > 0 && <span aria-hidden className="text-border">/</span>}
            <li>
              {index === items.length - 1 ? (
                <span className="text-ink">{item.name}</span>
              ) : (
                <Link href={item.path} className="hover:text-accent">
                  {item.name}
                </Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
