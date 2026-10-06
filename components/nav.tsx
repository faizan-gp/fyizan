import Link from "next/link";
import { getAllApps } from "@/lib/content/apps";
import { LogoMark } from "./logo-mark";
import { NavLinks } from "./nav-links";

export function Nav() {
  const apps = getAllApps().map((app) => ({
    href: `/apps/${app.categorySlug}/${app.slug}`,
    label: app.shortName ?? app.name,
  }));

  return (
    <header className="nav">
      <div className="wrap">
        <Link className="brand" href="/" aria-label="Faizan Gillani, home">
          <LogoMark />
          Faizan Gillani
        </Link>
        <NavLinks apps={apps} />
      </div>
    </header>
  );
}
