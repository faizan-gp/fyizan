"use client";

import { useState, type ReactNode } from "react";

export interface CatalogItem {
  categorySlug: string;
  card: ReactNode;
  key: string;
}

// Filters pre-rendered app cards by category. The cards are server-rendered
// and passed in, so no app content is shipped to the client twice.
export function AppCatalog({
  categories,
  items,
}: {
  categories: { slug: string; name: string }[];
  items: CatalogItem[];
}) {
  const [active, setActive] = useState("all");
  const visible = items.filter((item) => active === "all" || item.categorySlug === active);
  const options = [{ slug: "all", name: "All apps" }, ...categories];

  return (
    <>
      <div className="catalog-filters" role="group" aria-label="Filter by category">
        {options.map((option) => (
          <button
            key={option.slug}
            type="button"
            className={`btn ${active === option.slug ? "" : "ghost"}`.trim()}
            aria-pressed={active === option.slug}
            onClick={() => setActive(option.slug)}
          >
            {option.name}
          </button>
        ))}
      </div>
      <div className="app-grid catalog-grid">
        {visible.map((item) => (
          <div key={item.key} style={{ display: "contents" }}>
            {item.card}
          </div>
        ))}
      </div>
    </>
  );
}
