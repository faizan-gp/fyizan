import { LegalPage, resolveLegal } from "@/components/legal-page";
import { getAllApps, getApp } from "@/lib/content/apps";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateStaticParams() {
  return getAllApps()
    .filter((app) => app.accountDeletion)
    .map((app) => ({ category: app.categorySlug, app: app.slug }));
}

type Params = Promise<{ category: string; app: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const app = getApp(categorySlug, appSlug);
  if (!app || !app.accountDeletion) return {};
  return buildMetadata({
    title: `${app.name} — Delete Account`,
    description: `How to delete your account and data for ${app.name}.`,
    path: `/apps/${categorySlug}/${appSlug}/delete-account`,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const { app, category, document } = resolveLegal(categorySlug, appSlug, "accountDeletion");
  return (
    <LegalPage
      app={app}
      categorySlug={categorySlug}
      categoryName={category.name}
      pageTitle="Delete Account"
      slug="delete-account"
      document={document}
    />
  );
}
