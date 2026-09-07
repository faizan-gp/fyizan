import { Container } from "@/components/container";
import { BadgePill } from "@/components/badge-pill";
import { CategoryCard } from "@/components/category-card";
import { getAllCategories } from "@/lib/content/categories";
import { getAppsByCategory } from "@/lib/content/apps";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Apps",
  description:
    "Independent apps built by Faizan Gillani, organized by category — privacy-first, ad-free, and useful offline.",
  path: "/apps",
});

export default function AppsPage() {
  const categories = getAllCategories();

  return (
    <Container className="py-16 sm:py-24">
      <BadgePill>The studio</BadgePill>
      <h1 className="mt-4 font-display text-4xl font-black text-ink sm:text-5xl">Apps</h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">
        Side hustles with a common thread: privacy-first, ad-free, and built to work offline.
        Organized by the kind of problem they solve.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            category={category}
            appCount={getAppsByCategory(category.slug).length}
          />
        ))}
      </div>

      <p className="mt-10 text-sm font-medium text-ink-muted">More categories, coming as they ship.</p>
    </Container>
  );
}
