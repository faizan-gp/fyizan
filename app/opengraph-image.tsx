import { ImageResponse } from "next/og";
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
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
          background: "linear-gradient(135deg, #F6F5FD 0%, #E7E2FF 55%, #D4F3FA 100%)",
          color: "#15122E",
        }}
      >
        <div style={{ display: "flex", fontSize: 26, color: "#5B3CF5", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase" }}>
          {SITE_TAGLINE}
        </div>
        <div style={{ display: "flex", fontSize: 104, fontWeight: 800, marginTop: 20, letterSpacing: -3 }}>{SITE_NAME}</div>
        <div style={{ display: "flex", fontSize: 32, marginTop: 24, color: "#5A5778", maxWidth: 940 }}>{SITE_DESCRIPTION}</div>
      </div>
    ),
    { ...size },
  );
}
