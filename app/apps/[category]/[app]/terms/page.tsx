import { LegalPage, resolveLegal } from "@/components/legal-page";
import { getAllApps, getApp } from "@/lib/content/apps";
import { buildMetadata } from "@/lib/seo/metadata";

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

export default async function Page({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const { app, category, document } = resolveLegal(categorySlug, appSlug, "termsOfService");
  return (
    <LegalPage
      app={app}
      categorySlug={categorySlug}
      categoryName={category.name}
      pageTitle="Terms & Conditions"
      slug="terms"
      document={document}
    />
  );
}
