import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { JsonLd } from "@/components/json-ld";
import { getAllApps, getApp } from "@/lib/content/apps";
import { getCategory } from "@/lib/content/categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";

export function generateStaticParams() {
  return getAllApps()
    .filter((app) => app.support)
    .map((app) => ({ category: app.categorySlug, app: app.slug }));
}

type Params = Promise<{ category: string; app: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const app = getApp(categorySlug, appSlug);
  if (!app || !app.support) return {};
  return buildMetadata({
    title: `${app.name} — Support`,
    description: `Help and contact for ${app.name}.`,
    path: `/apps/${categorySlug}/${appSlug}/support`,
  });
}

export default async function SupportPage({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const app = getApp(categorySlug, appSlug);
  const category = getCategory(categorySlug);
  if (!app || !category || !app.support) notFound();

  const { support } = app;
  const name = app.shortName ?? app.name;
  const crumbs = [
    { name: "Apps", path: "/apps" },
    { name: category.name, path: `/apps/${category.slug}` },
    { name, path: `/apps/${category.slug}/${app.slug}` },
    { name: "Support", path: `/apps/${category.slug}/${app.slug}/support` },
  ];
  const mailto = `mailto:${support.contactEmail}?subject=${encodeURIComponent(`${app.name} support`)}`;

  return (
    <div className="wrap legal view">
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <Breadcrumbs items={crumbs} />
      <div className="legal-head">
        <h1>Support</h1>
        <span className="pill" style={{ marginTop: 14 }}>{name}</span>
      </div>

      <div className="legal-body">
        <div className="prose" style={{ marginTop: 0 }}>
          {support.intro.map((paragraph) => (
            <p key={paragraph.slice(0, 32)}>{paragraph}</p>
          ))}
        </div>
      </div>

      <div className="card contact-card">
        <h2>Contact</h2>
        <p className="muted">
          Email{" "}
          <a className="mail" href={mailto}>
            {support.contactEmail}
          </a>
          .{support.includeInEmail ? ` ${support.includeInEmail}` : ""}
        </p>
        <a className="btn" href={mailto}>
          Email support
        </a>
      </div>

      <div className="sec-head" style={{ marginTop: 56, marginBottom: 24 }}>
        <span className="eyebrow">Questions</span>
        <h2>Common questions.</h2>
      </div>
      <div className="faq">
        {support.topics.map((item) => (
          <details key={item.question} className="card">
            <summary>{item.question}</summary>
            <p>{item.answer}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
