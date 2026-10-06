import Image from "next/image";
import Link from "next/link";
import { ButtonLink } from "@/components/button-link";
import { AppCard } from "@/components/app-card";
import { Icon } from "@/components/icons";
import { WaitlistForm } from "@/components/waitlist-form";
import { getAllApps, getWaitlistTargets } from "@/lib/content/apps";
import { getCategory } from "@/lib/content/categories";
import { STATUS_LABEL, platformList } from "@/lib/content/labels";
import type { IconName } from "@/lib/content/types";
import { buildMetadata } from "@/lib/seo/metadata";
import { SITE_DESCRIPTION, SITE_TAGLINE } from "@/lib/site";

export const metadata = buildMetadata({
  title: `Faizan Gillani — ${SITE_TAGLINE}`,
  description: SITE_DESCRIPTION,
  path: "/",
});

const PRINCIPLES: { icon: IconName; title: string; text: string }[] = [
  { icon: "ban", title: "No ads, ever", text: "No ad SDKs. No selling or sharing of your personal data. It's a rule, not a setting." },
  { icon: "lock", title: "Private by default", text: "Photos, videos and income stay on your device. Sync is opt-in and encrypted." },
  { icon: "device", title: "Works without an account", text: "Start using any app right away. The core features run on your phone." },
  { icon: "tag", title: "Fair pricing", text: "A useful free tier first. Paid upgrades are clearly optional, and MediaSort is not a subscription." },
];

const COUNT_WORDS = ["No", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten"];

export default function HomePage() {
  const apps = getAllApps();
  const withShots = apps.filter((app) => app.screenshots?.length);
  const posterApp = withShots.find((app) => app.screenshots![0].kind === "poster");
  const phoneApp = withShots.find((app) => app.screenshots![0].kind === "phone");
  const poster = posterApp?.screenshots![0];
  const phone = phoneApp?.screenshots![0];
  const targets = getWaitlistTargets();

  return (
    <div className="view">
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="pill">
              <Icon name="sparkles" /> Daily-use apps for iOS and Android
            </span>
            <h1>
              Everyday apps, <span className="grad">built to be useful.</span>
            </h1>
            <p className="lede">
              A small collection of focused apps for your money and your phone. No ads, no account to get started, and
              your data stays yours.
            </p>
            <div className="cta-row">
              <ButtonLink href="/apps" arrow>
                Explore the apps
              </ButtonLink>
              <ButtonLink href="#waitlist" variant="ghost">
                Join a waitlist
              </ButtonLink>
            </div>
            <div className="hero-facts">
              <span><Icon name="ban" /> No ads</span>
              <span><Icon name="lock" /> Private by default</span>
              <span><Icon name="device" /> iOS and Android</span>
            </div>
          </div>

          <div className="hero-art">
            {poster && (
              <div className="shot shot-a">
                <Image src={poster.src} alt={poster.alt} width={1179} height={2556} sizes="(max-width: 960px) 45vw, 300px" priority />
              </div>
            )}
            {phone && (
              <div className="phone phone-b">
                <Image src={phone.src} alt={phone.alt} width={1320} height={2868} sizes="(max-width: 960px) 40vw, 260px" priority />
              </div>
            )}
            {[phoneApp, posterApp].map((app, index) =>
              app?.icon ? (
                <div key={app.slug} className={`float f${index + 1}`}>
                  <div className="dot">
                    <Image src={app.icon.src} alt="" width={76} height={76} />
                  </div>
                  <div>
                    <b>{app.spotlight.title}</b>
                    {app.spotlight.text}
                  </div>
                </div>
              ) : null,
            )}
          </div>
        </div>
      </section>

      <section className="section tight">
        <div className="wrap">
          <div className="principles">
            {PRINCIPLES.map((item) => (
              <div key={item.title} className="card principle">
                <div className="chip-ic">
                  <Icon name={item.icon} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="lineup">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">The lineup</span>
            <h2>
              {COUNT_WORDS[apps.length] ?? apps.length} {apps.length === 1 ? "app" : "apps"}, each doing one job well.
            </h2>
            <p className="lede">
              Each app has its own page with screens, features, privacy details, pricing and answers to common questions.
            </p>
          </div>
          <div className="app-grid">
            {apps.map((app) => (
              <AppCard key={app.slug} app={app} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="sec-head">
            <span className="eyebrow">At a glance</span>
            <h2>Compare the apps side by side.</h2>
          </div>
          <div className="card table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">
                    <span className="sr">Detail</span>
                  </th>
                  {apps.map((app) => (
                    <th key={app.slug} scope="col">
                      <Link className="th-app" href={`/apps/${app.categorySlug}/${app.slug}`}>
                        {app.icon && <Image src={app.icon.src} alt="" width={56} height={56} />}
                        {app.shortName ?? app.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Category</th>
                  {apps.map((app) => (
                    <td key={app.slug}>{getCategory(app.categorySlug)?.name}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Platforms</th>
                  {apps.map((app) => (
                    <td key={app.slug}>{platformList(app.platforms)}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Status</th>
                  {apps.map((app) => (
                    <td key={app.slug}>{STATUS_LABEL[app.status]}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Pricing</th>
                  {apps.map((app) => (
                    <td key={app.slug}>{app.pricingModel}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Your data</th>
                  {apps.map((app) => (
                    <td key={app.slug}>{app.dataNote}</td>
                  ))}
                </tr>
                <tr>
                  <th scope="row">Ads</th>
                  {apps.map((app) => (
                    <td key={app.slug}>None</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section" id="waitlist">
        <div className="wrap">
          <div className="card cta">
            <div>
              <h2>Be first when an app launches.</h2>
              <p>Pick an app and leave your email. You&rsquo;ll hear once, when it&rsquo;s available.</p>
            </div>
            <WaitlistForm targets={targets} />
          </div>
        </div>
      </section>
    </div>
  );
}
