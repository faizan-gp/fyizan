import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// The logo mark: four rounded tiles, a launcher grid.
export default function Icon() {
  const tile = (color: string, opacity = 1) => (
    <div style={{ width: 22, height: 22, borderRadius: 7, background: color, opacity }} />
  );
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          gap: 6,
          padding: 6,
          background: "#F6F5FD",
          borderRadius: 16,
        }}
      >
        {tile("#5B3CF5")}
        {tile("#00A8CC")}
        {tile("#00A8CC", 0.55)}
        {tile("#5B3CF5", 0.55)}
      </div>
    ),
    { ...size },
  );
}
