import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { LegalDocumentBody } from "@/components/legal-document";
import { getApp } from "@/lib/content/apps";
import { getCategory } from "@/lib/content/categories";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import type { App, LegalDocument } from "@/lib/content/types";

type LegalKey = "privacyPolicy" | "termsOfService" | "accountDeletion";

/** Resolves an app plus one of its legal documents, or 404s. Shared by the privacy, terms and delete-account routes. */
export function resolveLegal(categorySlug: string, appSlug: string, key: LegalKey) {
  const app = getApp(categorySlug, appSlug);
  const category = getCategory(categorySlug);
  const document = app?.[key];
  if (!app || !category || !document) notFound();
  return { app, category, document };
}

export function LegalPage({
  app,
  categorySlug,
  categoryName,
  pageTitle,
  slug,
  document,
}: {
  app: App;
  categorySlug: string;
  categoryName: string;
  /** Heading and last breadcrumb, e.g. "Privacy Policy". */
  pageTitle: string;
  /** URL segment, e.g. "privacy". */
  slug: string;
  document: LegalDocument;
}) {
  const name = app.shortName ?? app.name;
  const base = `/apps/${categorySlug}/${app.slug}`;
  const crumbs = [
    { name: "Apps", path: "/apps" },
    { name: categoryName, path: `/apps/${categorySlug}` },
    { name, path: base },
    { name: pageTitle, path: `${base}/${slug}` },
  ];

  return (
    <div className="wrap legal view">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <div className="legal-head">
        <h1>{pageTitle}</h1>
        <span className="pill" style={{ marginTop: 14 }}>{name}</span>
      </div>
      <LegalDocumentBody document={document} />
    </div>
  );
}
