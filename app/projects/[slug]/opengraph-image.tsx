import { ImageResponse } from "next/og";
import { getProject } from "@/lib/content/projects";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type Params = Promise<{ slug: string }>;

export default async function Image({ params }: { params: Params }) {
  const { slug } = await params;
  const project = getProject(slug);
  const name = project?.name ?? "Project";
  const summary = project?.summary ?? "";

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
          Faizan Gillani · Project
        </div>
        <div style={{ fontSize: 108, fontWeight: 900, marginTop: 20, textTransform: "uppercase" }}>
          {name}
        </div>
        <div style={{ fontSize: 32, marginTop: 20, color: "#63636c", maxWidth: 940 }}>{summary}</div>
      </div>
    ),
    { ...size }
  );
}
