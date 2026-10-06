import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { AppCard } from "@/components/app-card";
import { Icon } from "@/components/icons";
import { JsonLd } from "@/components/json-ld";
import { StatusPill } from "@/components/status-pill";
import { WaitlistForm } from "@/components/waitlist-form";
import { getAllApps, getApp, getWaitlistTargets } from "@/lib/content/apps";
import { getCategory } from "@/lib/content/categories";
import { PLATFORM_LABEL, appAccentStyle, platformList } from "@/lib/content/labels";
import { buildMetadata } from "@/lib/seo/metadata";
import { breadcrumbJsonLd, faqJsonLd, softwareApplicationJsonLd } from "@/lib/seo/jsonld";

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

  const name = app.shortName ?? app.name;
  const base = `/apps/${category.slug}/${app.slug}`;
  const crumbs = [
    { name: "Apps", path: "/apps" },
    { name: category.name, path: `/apps/${category.slug}` },
    { name, path: base },
  ];
  const shots = app.screenshots ?? [];
  const targets = getWaitlistTargets();
  const others = getAllApps().filter((other) => other.slug !== app.slug);
  const legalLinks = [
    app.privacyPolicy && { href: `${base}/privacy`, label: "Privacy Policy" },
    app.termsOfService && { href: `${base}/terms`, label: "Terms & Conditions" },
    app.support && { href: `${base}/support`, label: "Support" },
    app.accountDeletion && { href: `${base}/delete-account`, label: "Delete Account" },
  ].filter((link): link is { href: string; label: string } => Boolean(link));

  return (
    <div className="view" style={appAccentStyle(app.accentColor)}>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd data={softwareApplicationJsonLd(app, category)} />
      <JsonLd data={faqJsonLd(app.faq)} />

      <section className="d-hero">
        <div className="wrap">
          <Breadcrumbs items={crumbs} />
          <div className="d-grid">
            <div>
              <div className="d-title">
                {app.icon && <Image src={app.icon.src} alt={app.icon.alt} width={168} height={168} priority />}
                <div>
                  <h1>{name}</h1>
                  <p className="d-sub">{app.subtitle ?? category.name}</p>
                </div>
              </div>
              <h2 className="tagline">{app.tagline}</h2>
              <div className="d-meta">
                <StatusPill status={app.status} />
                {app.platforms.map((platform) => (
                  <span key={platform} className="pill plain">
                    {PLATFORM_LABEL[platform]}
                  </span>
                ))}
                {app.subtitle && <span className="pill plain">{category.name}</span>}
              </div>
              {app.waitlistEnabled && <WaitlistForm targets={targets} only={app.slug} surface />}
            </div>

            <div className="d-art">
              <div className="blob" />
              {shots.length === 1 && shots[0].kind === "phone" && (
                <div className="phone">
                  <Image src={shots[0].src} alt={shots[0].alt} width={1320} height={2868} sizes="300px" priority />
                </div>
              )}
              {shots.length > 1 && (
                <div className="pair">
                  {shots.slice(0, 2).map((shot, index) => (
                    <div key={shot.src} className={`shot p${index + 1}`}>
                      <Image src={shot.src} alt={shot.alt} width={1179} height={2556} sizes="(max-width: 960px) 45vw, 270px" priority />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">How it works</span>
            <h2>{app.headlines.steps}</h2>
          </div>
          <ol className="steps" style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {app.loop.map((step) => (
              <li key={step.title} className="card step">
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Features</span>
            <h2>Everything {name} does.</h2>
          </div>
          <div className="features">
            {app.features.map((feature) => (
              <div key={feature.title} className="card feature">
                <div className="chip-ic">
                  <Icon name={feature.icon} />
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {shots.length > 1 && (
        <section className="section tight">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Screens</span>
              <h2>See it in action.</h2>
            </div>
            <div className="gallery">
              {shots.map((shot) => (
                <div key={shot.src} className="shot">
                  <Image src={shot.src} alt={shot.alt} width={1179} height={2556} sizes="300px" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="card privacy">
            <div>
              <span className="eyebrow">Privacy</span>
              <h2>Built so your data stays yours.</h2>
            </div>
            <ul>
              {app.privacyHighlights.map((point) => (
                <li key={point}>
                  <span className="tick">
                    <Icon name="check" />
                  </span>
                  <span>{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {app.pricing && app.pricing.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">Pricing</span>
              <h2>{app.headlines.pricing}</h2>
            </div>
            <div className="tiers">
              {app.pricing.map((tier, index) => {
                const highlighted = app.pricing!.length > 1 && index === app.pricing!.length - 1;
                const badge = tier.badge ?? tier.price;
                return (
                  <div key={tier.tier} className={`card tier ${highlighted ? "hl" : ""}`.trim()}>
                    <h3>
                      {tier.tier}
                      {badge && <span className="pill">{badge}</span>}
                    </h3>
                    <ul>
                      {tier.features.map((feature) => (
                        <li key={feature}>
                          <Icon name="check" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">Questions</span>
            <h2>Common questions.</h2>
          </div>
          <div className="faq">
            {app.faq.map((item, index) => (
              <details key={item.question} className="card" open={index === 0}>
                <summary>{item.question}</summary>
                <p>{item.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {app.waitlistEnabled && (
        <section className="section" id="waitlist">
          <div className="wrap">
            <div className="card cta">
              <div>
                <h2>Get {name} the day it ships.</h2>
                <p>
                  Leave your email and you&rsquo;ll hear once, when it&rsquo;s available on {platformList(app.platforms)}.
                </p>
              </div>
              <WaitlistForm targets={targets} only={app.slug} />
            </div>
          </div>
        </section>
      )}

      {others.length > 0 && (
        <section className="section tight">
          <div className="wrap">
            <div className="sec-head">
              <span className="eyebrow">More apps</span>
              <h2>Also in the lineup.</h2>
            </div>
            <div className="app-grid">
              {others.map((other) => (
                <AppCard key={other.slug} app={other} />
              ))}
            </div>
          </div>
        </section>
      )}

      {legalLinks.length > 0 && (
        <section className="section tight">
          <div className="wrap">
            <span className="eyebrow">Legal &amp; support</span>
            <div className="legal-links" style={{ marginTop: 14 }}>
              {legalLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
