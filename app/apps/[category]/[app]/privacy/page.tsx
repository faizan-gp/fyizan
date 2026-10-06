import { LegalPage, resolveLegal } from "@/components/legal-page";
import { getAllApps, getApp } from "@/lib/content/apps";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getAllApps()
    .filter((app) => app.privacyPolicy)
    .map((app) => ({ category: app.categorySlug, app: app.slug }));
}

type Params = Promise<{ category: string; app: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const app = getApp(categorySlug, appSlug);
  if (!app || !app.privacyPolicy) return {};
  return buildMetadata({
    title: `${app.name} — Privacy Policy`,
    description: `Privacy policy for ${app.name}.`,
    path: `/apps/${categorySlug}/${appSlug}/privacy`,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const { app, category, document } = resolveLegal(categorySlug, appSlug, "privacyPolicy");
  return (
    <LegalPage
      app={app}
      categorySlug={categorySlug}
      categoryName={category.name}
      pageTitle="Privacy Policy"
      slug="privacy"
      document={document}
    />
  );
}
