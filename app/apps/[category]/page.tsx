import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { AppCard } from "@/components/app-card";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getAllCategories, getCategory } from "@/lib/content/categories";
import { getAppsByCategory } from "@/lib/content/apps";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ category: category.slug }));
}

type Params = Promise<{ category: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) return {};
  return buildMetadata({
    title: category.name,
    description: category.description,
    path: `/apps/${category.slug}`,
  });
}

export default async function CategoryPage({ params }: { params: Params }) {
  const { category: slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();

  const apps = getAppsByCategory(category.slug);

  return (
    <Container className="py-16 sm:py-24">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Apps", path: "/apps" },
          { name: category.name, path: `/apps/${category.slug}` },
        ])}
      />
      <Breadcrumbs
        items={[
          { name: "Apps", path: "/apps" },
          { name: category.name, path: `/apps/${category.slug}` },
        ]}
      />
      <h1 className="mt-4 font-display text-4xl font-black text-ink sm:text-5xl">
        {category.name}
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-ink-muted">{category.description}</p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {apps.map((app) => (
          <AppCard key={app.slug} app={app} />
        ))}
      </div>
    </Container>
  );
}
