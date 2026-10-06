import { notFound } from "next/navigation";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { BadgePill } from "@/components/badge-pill";
import { PillButton } from "@/components/pill-button";
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

  const breadcrumbItems = [
    { name: "Apps", path: "/apps" },
    { name: category.name, path: `/apps/${category.slug}` },
    { name: app.name, path: `/apps/${category.slug}/${app.slug}` },
    { name: "Support", path: `/apps/${category.slug}/${app.slug}/support` },
  ];

  const mailto = `mailto:${support.contactEmail}?subject=${encodeURIComponent(
    `${app.name} support`
  )}`;

  return (
    <Container className="py-16 sm:py-24">
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <Breadcrumbs items={breadcrumbItems} />
      <BadgePill>{app.name}</BadgePill>
      <h1 className="mt-4 font-display text-4xl font-black text-ink sm:text-5xl">Support</h1>

      <div className="mt-6 max-w-2xl space-y-4 text-ink-muted">
        {support.intro.map((paragraph) => (
          <p key={paragraph.slice(0, 32)}>{paragraph}</p>
        ))}
      </div>

      <div className="mt-8 max-w-2xl rounded-2xl border border-border bg-surface p-6">
        <p className="font-display text-lg font-black text-ink">Contact</p>
        <p className="mt-2 text-ink-muted">
          Email{" "}
          <a href={mailto} className="font-bold text-ink hover:text-accent">
            {support.contactEmail}
          </a>
          .{support.includeInEmail ? ` ${support.includeInEmail}` : ""}
        </p>
        <div className="mt-4">
          <PillButton href={mailto}>Email support</PillButton>
        </div>
      </div>

      <h2 className="mt-14 font-display text-2xl font-black text-ink">Common questions</h2>
      <div className="mt-4 max-w-2xl divide-y divide-border">
        {support.topics.map((item) => (
          <details key={item.question} className="group py-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-ink marker:content-none">
              {item.question}
              <span
                aria-hidden
                className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full bg-accent-soft text-accent group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-3 text-sm text-ink-muted">{item.answer}</p>
          </details>
        ))}
      </div>
    </Container>
  );
}
