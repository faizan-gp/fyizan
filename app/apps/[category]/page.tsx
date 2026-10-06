import { notFound } from "next/navigation";
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
  const crumbs = [
    { name: "Apps", path: "/apps" },
    { name: category.name, path: `/apps/${category.slug}` },
  ];

  return (
    <div className="view">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <h1 style={{ fontSize: "calc(clamp(2.2rem, 4.8vw, 3.6rem) * var(--ds))", marginBlock: "22px 16px" }}>
            {category.name}
          </h1>
          <p className="lede">{category.description}</p>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 8 }}>
        <div className="wrap">
          <div className="app-grid">
            {apps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
