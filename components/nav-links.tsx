"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavLinks({ apps }: { apps: { href: string; label: string }[] }) {
  const pathname = usePathname();
  const current = (active: boolean) => (active ? ("page" as const) : undefined);

  return (
    <nav className="nav-links" aria-label="Primary">
      <Link href="/apps" aria-current={current(pathname === "/apps")}>
        Apps
      </Link>
      {apps.map((app) => (
        <Link key={app.href} href={app.href} className="opt" aria-current={current(pathname.startsWith(app.href))}>
          {app.label}
        </Link>
      ))}
      <Link href="/#waitlist" className="btn sm" style={{ marginLeft: 8 }}>
        Join waitlist
      </Link>
    </nav>
  );
}
