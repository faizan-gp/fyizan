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
    <nav aria-label="Breadcrumb" className="crumbs">
      <ol>
        {items.map((item, index) => (
          <Fragment key={item.path}>
            {index > 0 && <li aria-hidden>/</li>}
            <li>
              {index === items.length - 1 ? (
                <span aria-current="page">{item.name}</span>
              ) : (
                <Link href={item.path}>{item.name}</Link>
              )}
            </li>
          </Fragment>
        ))}
      </ol>
    </nav>
  );
}
