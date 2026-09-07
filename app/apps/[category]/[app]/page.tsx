import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/container";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { StatusBadge } from "@/components/status-badge";
import { PillButton } from "@/components/pill-button";
import { JsonLd } from "@/components/json-ld";
import { getAllApps, getApp } from "@/lib/content/apps";
import { getCategory } from "@/lib/content/categories";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqJsonLd, softwareApplicationJsonLd } from "@/lib/seo/jsonld";
import { person } from "@/content/person";

export function generateStaticParams() {
  return getAllApps().map((app) => ({ category: app.categorySlug, app: app.slug }));
}

type Params = Promise<{ category: string; app: string }>;

export async function generateMetadata({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const app = getApp(categorySlug, appSlug);
  if (!app) return {};
  return buildMetadata({
    title: `${app.name} — ${app.tagline}`,
    description: app.summary,
    path: `/apps/${categorySlug}/${appSlug}`,
  });
}

export default async function AppPage({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const app = getApp(categorySlug, appSlug);
  const category = getCategory(categorySlug);
  if (!app || !category) notFound();

  const breadcrumbItems = [
    { name: "Apps", path: "/apps" },
    { name: category.name, path: `/apps/${category.slug}` },
    { name: app.name, path: `/apps/${category.slug}/${app.slug}` },
  ];

  const waitlistHref = `mailto:${person.email}?subject=${encodeURIComponent(
    `Notify me when ${app.name} launches`
  )}`;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(breadcrumbItems)} />
      <JsonLd data={softwareApplicationJsonLd(app, category)} />
      <JsonLd data={faqJsonLd(app.faq)} />

      <section className="grid-lines border-b border-border">
        <Container className="py-16 sm:py-24">
          <Breadcrumbs items={breadcrumbItems} />
          <div className="mt-6 flex flex-wrap items-center gap-4">
            {app.icon && (
              <Image
                src={app.icon.src}
                alt={app.icon.alt}
                width={72}
                height={72}
                className="rounded-2xl border border-border"
              />
            )}
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="font-display text-5xl font-black uppercase tracking-tight text-ink sm:text-6xl">
                {app.name}
              </h1>
              <StatusBadge status={app.status} />
            </div>
          </div>
          <p className="mt-4 max-w-2xl text-xl text-ink-muted">{app.tagline}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            {app.waitlistEnabled && (
              <PillButton href={waitlistHref}>Get notified at launch</PillButton>
            )}
            <PillButton href={`/apps/${category.slug}`} variant="secondary">
              More in {category.name}
            </PillButton>
          </div>
        </Container>
      </section>

      {app.screenshots && app.screenshots.length > 0 && (
        <section className="border-b border-border">
          <Container className="py-16">
            <p className="text-xs font-bold uppercase tracking-wide text-accent">Early look</p>
            <h2 className="mt-2 font-display text-3xl font-black text-ink">
              What it looks like today
            </h2>
            <p className="mt-3 max-w-2xl text-ink-muted">
              A real screen from the build in progress — not a mockup, and not final. Status,
              pricing, and copy will keep changing before launch.
            </p>
            <div className="mt-8 flex flex-wrap gap-6">
              {app.screenshots.map((screenshot) => (
                <div
                  key={screenshot.src}
                  className="w-64 overflow-hidden rounded-3xl border border-border bg-surface shadow-md"
                >
                  <Image
                    src={screenshot.src}
                    alt={screenshot.alt}
                    width={640}
                    height={1392}
                    className="h-auto w-full"
                  />
                </div>
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="border-b border-border">
        <Container className="py-16">
          <p className="text-xs font-bold uppercase tracking-wide text-accent">The loop</p>
          <h2 className="mt-2 font-display text-3xl font-black text-ink">How it works</h2>
          <ol className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {app.loop.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-border bg-surface p-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-soft font-display text-sm font-black text-accent">
                  {index + 1}
                </span>
                <p className="mt-4 font-display text-lg font-black text-ink">{step.title}</p>
                <p className="mt-2 text-sm text-ink-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-16">
          <h2 className="font-display text-3xl font-black text-ink">Features</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((feature) => (
              <div key={feature.title} className="rounded-2xl border border-border bg-surface p-6">
                <p className="font-display text-lg font-black text-ink">{feature.title}</p>
                <p className="mt-2 text-sm text-ink-muted">{feature.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-b border-border">
        <Container className="py-16">
          <h2 className="font-display text-3xl font-black text-ink">Privacy, by construction</h2>
          <ul className="mt-6 max-w-2xl space-y-4">
            {app.privacyHighlights.map((point) => (
              <li key={point} className="flex items-start gap-3">
                <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold text-white">
                  ✓
                </span>
                <span className="text-ink-muted">{point}</span>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {app.pricing && app.pricing.length > 0 && (
        <section className="border-b border-border">
          <Container className="py-16">
            <h2 className="font-display text-3xl font-black text-ink">Pricing</h2>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {app.pricing.map((tier, index) => {
                const highlighted = index === app.pricing!.length - 1 && app.pricing!.length > 1;
                return (
                  <div
                    key={tier.tier}
                    className={`rounded-2xl border p-6 ${
                      highlighted ? "border-accent bg-accent-soft" : "border-border bg-surface"
                    }`}
                  >
                    <div className="flex items-baseline justify-between">
                      <p className="font-display text-xl font-black text-ink">{tier.tier}</p>
                      {tier.price && (
                        <p className="text-sm font-bold text-ink-muted">{tier.price}</p>
                      )}
                    </div>
                    <ul className="mt-4 space-y-2">
                      {tier.features.map((feature) => (
                        <li key={feature} className="text-sm text-ink-muted">
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      <section className="border-b border-border">
        <Container className="py-16">
          <h2 className="font-display text-3xl font-black text-ink">FAQ</h2>
          <div className="mt-8 max-w-2xl divide-y divide-border">
            {app.faq.map((item) => (
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
      </section>

      {(app.privacyPolicy || app.termsOfService || app.accountDeletion) && (
        <section>
          <Container className="py-10">
            <p className="text-xs font-bold uppercase tracking-wide text-ink-muted">Legal</p>
            <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
              {app.privacyPolicy && (
                <Link
                  href={`/apps/${category.slug}/${app.slug}/privacy`}
                  className="text-sm font-bold text-ink hover:text-accent"
                >
                  Privacy Policy
                </Link>
              )}
              {app.termsOfService && (
                <Link
                  href={`/apps/${category.slug}/${app.slug}/terms`}
                  className="text-sm font-bold text-ink hover:text-accent"
                >
                  Terms &amp; Conditions
                </Link>
              )}
              {app.accountDeletion && (
                <Link
                  href={`/apps/${category.slug}/${app.slug}/delete-account`}
                  className="text-sm font-bold text-ink hover:text-accent"
                >
                  Delete Account
                </Link>
              )}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
