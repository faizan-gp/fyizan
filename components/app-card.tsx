import Image from "next/image";
import Link from "next/link";
import type { App } from "@/lib/content/types";
import { appAccentStyle } from "@/lib/content/labels";
import { getCategory } from "@/lib/content/categories";
import { Icon } from "./icons";
import { StatusPill } from "./status-pill";

export function AppCard({ app }: { app: App }) {
  const category = getCategory(app.categorySlug);
  const name = app.shortName ?? app.name;
  const peek = app.screenshots?.[0];
  return (
    <Link
      href={`/apps/${app.categorySlug}/${app.slug}`}
      className="card app-card"
      style={appAccentStyle(app.accentColor)}
    >
      <div className="top">
        <div className="row">
          {app.icon && (
            <Image className="icon" src={app.icon.src} alt={app.icon.alt} width={56} height={56} />
          )}
          <StatusPill status={app.status} />
        </div>
        {peek && (
          <Image
            className="peek"
            src={peek.src}
            alt={peek.alt}
            width={480}
            height={1040}
            sizes="(max-width: 680px) 60vw, 240px"
          />
        )}
      </div>
      <div className="body">
        <span className="tag">{category?.name}</span>
        <h3>{name}</h3>
        <p className="muted">{app.summary}</p>
        <div className="meta">
          {app.highlights.map((item) => (
            <span key={item} className="pill">
              {item}
            </span>
          ))}
        </div>
        <span className="link-more">
          View app <Icon name="arrow" />
        </span>
      </div>
    </Link>
  );
}
