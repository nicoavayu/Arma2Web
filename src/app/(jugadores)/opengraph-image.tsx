import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const alt = "Arma2 — Organizá partidos. Armá equipos parejos. Jugá.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const root = process.cwd();
const dataUrl = (buffer: Buffer, type: string) => `data:${type};base64,${buffer.toString("base64")}`;

/** Share card for arma2.com.ar: the hero's night arena, the wordmark and the headline. */
export default async function Image() {
  const [extraBold, semiBold, background, wordmark] = await Promise.all([
    readFile(join(root, "src/app/torneos/_fonts/Inter-ExtraBold.ttf")),
    readFile(join(root, "src/app/torneos/_fonts/Inter-SemiBold.ttf")),
    readFile(join(root, "src/app/(jugadores)/_og/bg-hero.jpg")),
    readFile(join(root, "public/logo_arma2.png")),
  ]);

  return new ImageResponse(
    (
      <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", background: "#05040d", fontFamily: "Inter" }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
        <img src={dataUrl(background, "image/jpeg")} alt="" width={1200} height={630} style={{ position: "absolute", inset: 0, objectFit: "cover" }} />
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            background: "linear-gradient(90deg, rgba(5,4,13,0.92) 0%, rgba(5,4,13,0.7) 50%, rgba(5,4,13,0.25) 100%)",
          }}
        />
        <div style={{ position: "relative", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 76px", width: "100%" }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- next/og renders plain <img> */}
          <img src={dataUrl(wordmark, "image/png")} alt="" width={144} height={100} />
          <div style={{ display: "flex", flexDirection: "column", fontSize: 92, fontWeight: 800, lineHeight: 0.98, letterSpacing: -4, color: "#fff" }}>
            <span>Organizá partidos.</span>
            <span
              style={{
                backgroundImage: "linear-gradient(90deg, #27b8ff 0%, #7b5cff 52%, #ec4dff 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              Armá equipos parejos.
            </span>
            <span>Jugá.</span>
          </div>
          <div style={{ display: "flex", fontSize: 28, fontWeight: 600, color: "#d2cdea" }}>Gratis en iOS y Android</div>
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
