import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Arma2 Torneos — todo el torneo, mucho menos trabajo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const fontsDir = join(process.cwd(), "src/app/torneos/_fonts");

export default async function Image() {
  const [extraBold, semiBold] = await Promise.all([
    readFile(join(fontsDir, "Inter-ExtraBold.ttf")),
    readFile(join(fontsDir, "Inter-SemiBold.ttf")),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#f5f1e9",
          color: "#070711",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 600 }}>
          <div style={{ display: "flex", width: 18, height: 18, background: "#5b4bff", borderRadius: 4 }} />
          Arma2 Torneos
        </div>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 104, fontWeight: 800, lineHeight: 0.95, letterSpacing: -4 }}>
          <span>TODO EL TORNEO.</span>
          <span style={{ color: "#5b4bff" }}>MUCHO MENOS TRABAJO.</span>
        </div>
        <div style={{ display: "flex", fontSize: 30, fontWeight: 600, color: "#44465a" }}>
          Fixture · Resultados · Tabla · Página pública · Placas para redes
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: extraBold, weight: 800, style: "normal" },
        { name: "Inter", data: semiBold, weight: 600, style: "normal" },
      ],
    },
  );
}
