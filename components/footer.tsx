import Link from "next/link";
import { getAllApps } from "@/lib/content/apps";
import { SITE_NAME } from "@/lib/site";

export function Footer() {
  const apps = getAllApps();
  return (
    <footer className="foot">
      <div className="wrap">
        <Link className="brand" href="/">
          {SITE_NAME}
        </Link>
        <nav aria-label="Footer">
          <Link href="/apps">All apps</Link>
          {apps.map((app) => (
            <Link key={app.slug} href={`/apps/${app.categorySlug}/${app.slug}`}>
              {app.shortName ?? app.name}
            </Link>
          ))}
        </nav>
        <small>&copy; {new Date().getFullYear()} {SITE_NAME}. All rights reserved.</small>
      </div>
    </footer>
  );
}
