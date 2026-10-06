import { AppCard } from "@/components/app-card";
import { AppCatalog } from "@/components/app-catalog";
import { WaitlistForm } from "@/components/waitlist-form";
import { getAllApps, getWaitlistTargets } from "@/lib/content/apps";
import { getAllCategories } from "@/lib/content/categories";
import { buildMetadata } from "@/lib/seo/metadata";

export const metadata = buildMetadata({
  title: "Apps",
  description:
    "Daily-use apps by Faizan Gillani for your money and your phone, organized by category. No ads, no account to start, and your data stays yours.",
  path: "/apps",
});

export default function AppsPage() {
  const categories = getAllCategories();
  const items = getAllApps().map((app) => ({
    key: app.slug,
    categorySlug: app.categorySlug,
    card: <AppCard app={app} />,
  }));

  return (
    <div className="view">
      <section className="hero" style={{ paddingBottom: 40 }}>
        <div className="wrap">
          <span className="eyebrow">All apps</span>
          <h1 style={{ fontSize: "calc(clamp(2.2rem, 4.8vw, 3.6rem) * var(--ds))", marginBlock: "14px 16px" }}>
            Apps for the way you <span className="grad">actually live.</span>
          </h1>
          <p className="lede">
            Browse by category. Every app is built to work on your device first, with a free way to try it.
          </p>
          <AppCatalog categories={categories.map(({ slug, name }) => ({ slug, name }))} items={items} />
        </div>
      </section>

      <section className="section" id="waitlist">
        <div className="wrap">
          <div className="card cta">
            <div>
              <h2>Be first when an app launches.</h2>
              <p>Pick an app and leave your email. You&rsquo;ll hear once, when it&rsquo;s available.</p>
            </div>
            <WaitlistForm targets={getWaitlistTargets()} />
          </div>
        </div>
      </section>
    </div>
  );
}
