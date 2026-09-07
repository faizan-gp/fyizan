import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BadgePill } from "@/components/badge-pill";
import { LegalDocumentBody } from "@/components/legal-document";
import { JsonLd } from "@/components/json-ld";
import { getAllApps, getApp } from "@/lib/content/apps";
import { getCategory } from "@/lib/content/categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export function generateStaticParams() {
  return getAllApps()
    .filter((app) => app.termsOfService)
    .map((app) => ({ category: app.categorySlug, app: app.slug }));
}

type Params = Promise<{ category: string; app: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const app = getApp(categorySlug, appSlug);
  if (!app || !app.termsOfService) return {};
  return buildMetadata({
    title: `${app.name} — Terms & Conditions`,
    description: `Terms and conditions for ${app.name}.`,
    path: `/apps/${categorySlug}/${appSlug}/terms`,
  });
}

export default async function TermsPage({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const app = getApp(categorySlug, appSlug);
  const category = getCategory(categorySlug);
  if (!app || !category || !app.termsOfService) notFound();

  const breadcrumbItems = [
    { name: "Apps", path: "/apps" },
    { name: category.name, path: `/apps/${category.slug}` },
    { name: app.name, path: `/apps/${category.slug}/${app.slug}` },
    { name: "Terms & Conditions", path: `/apps/${category.slug}/${app.slug}/terms` },
  ];

  return (
    <Container className="py-16 sm:py-24">
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />
      <BadgePill>{app.name}</BadgePill>
      <h1 className="mt-4 font-display text-4xl font-black text-ink sm:text-5xl">
        Terms &amp; Conditions
      </h1>
      <div className="mt-10">
        <LegalDocumentBody document={app.termsOfService} />
      </div>
    </Container>
  );
}
