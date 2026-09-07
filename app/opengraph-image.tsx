import { ImageResponse } from "next/og";
import { person } from "@/content/person";

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
          background: "#f5f5f7",
          color: "#121212",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            fontSize: 26,
            color: "#5b3df6",
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: 3,
          }}
        >
          Portfolio &amp; App Studio
        </div>
        <div style={{ fontSize: 100, fontWeight: 900, marginTop: 20, textTransform: "uppercase" }}>
          {person.displayName}
        </div>
        <div style={{ fontSize: 30, marginTop: 20, color: "#63636c", maxWidth: 900 }}>
          {person.oneLiner}
        </div>
      </div>
    ),
    { ...size }
  );
}
