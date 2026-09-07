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
          background: "#f5f5f7",
          color: "#121212",
        }}
      >
        <div
          style={{
            fontSize: 24,
            color: "#5b3df6",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          Faizan Gillani · App
        </div>
        <div style={{ fontSize: 108, fontWeight: 900, marginTop: 20, textTransform: "uppercase" }}>
          {name}
        </div>
        <div style={{ fontSize: 32, marginTop: 20, color: "#63636c", maxWidth: 940 }}>{tagline}</div>
      </div>
    ),
    { ...size }
  );
}
