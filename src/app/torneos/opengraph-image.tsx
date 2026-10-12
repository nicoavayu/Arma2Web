import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Arma2 Torneos — todo el torneo, mucho menos trabajo";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();
const fontsDir = join(root, "src/app/torneos/_fonts");
const dataUrl = (buffer: Buffer, type: string) => `data:${type};base64,${buffer.toString("base64")}`;

/** Share card for torneos.arma2.com.ar: Nico's stadium photo, the lockup and the headline. */
export default async function Image() {
  const [extraBold, semiBold, background, lockup] = await Promise.all([
    readFile(join(fontsDir, "Inter-ExtraBold.ttf")),
    readFile(join(fontsDir, "Inter-SemiBold.ttf")),
    readFile(join(root, "src/app/torneos/_og/stadium.jpg")),
    readFile(join(root, "public/torneos/logo-torneos.png")),
  ]);

  return new ImageResponse(
    (
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", background: "#04050d", fontFamily: "Inter" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
        <img src={dataUrl(background, "image/jpeg")} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, rgba(4,5,13,0.94) 0%, rgba(4,5,13,0.72) 52%, rgba(4,5,13,0.2) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
          <img src={dataUrl(lockup, "image/png")} alt="" width={363} height={42} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 80, fontWeight: 800, lineHeight: 0.95, letterSpacing: -3, color: "#fff" }}>
            <span>TODO EL TORNEO.</span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #27b8ff 0%, #6c4dff 60%, #a35bff 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              MUCHO MENOS TRABAJO.
            </span>
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "#d6d8f0" }}>
            Fixture · Resultados · Tabla · Página pública · Placas para redes
          </div>
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
