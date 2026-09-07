import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getApp } from "@/lib/content/apps";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = Promise<{ category: string; app: string }>;

export default async function Image({ params }: { params: Params }) {
  const { category: categorySlug, app: appSlug } = await params;
  const app = getApp(categorySlug, appSlug);
  const name = app?.name ?? "App";
  const tagline = app?.tagline ?? "";

  let iconDataUrl: string | undefined;
  if (app?.icon) {
    try {
      const bytes = await readFile(path.join(process.cwd(), "public", app.icon.src));
      iconDataUrl = `data:image/png;base64,${bytes.toString("base64")}`;
    } catch {
      iconDataUrl = undefined;
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "#fafafa",
          color: "#111827",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {iconDataUrl && (
            <img src={iconDataUrl} width={96} height={96} style={{ borderRadius: 24 }} alt="" />
          )}
          <div
            style={{
              fontSize: 24,
              color: "#8b5cf6",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: 3,
            }}
          >
            Faizan Gillani · App
          </div>
        </div>
        <div style={{ fontSize: 100, fontWeight: 900, marginTop: 24, textTransform: "uppercase" }}>
          {name}
        </div>
        <div style={{ fontSize: 32, marginTop: 20, color: "#6b7280", maxWidth: 940 }}>{tagline}</div>
      </div>
    ),
    { ...size }
  );
}
