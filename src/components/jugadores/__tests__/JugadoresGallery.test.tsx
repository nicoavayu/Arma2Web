import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { BandaTorneos } from "@/components/jugadores/BandaTorneos";
import { Descargar } from "@/components/jugadores/Descargar";
import { JugadoresGallery, JugadoresGalleryStatic } from "@/components/jugadores/JugadoresGallery";
import { Preguntas } from "@/components/jugadores/Preguntas";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);

describe("players gallery", () => {
  const html = render(<JugadoresGallery />);

  it("shows the six features as cards in a pinned scene", () => {
    expect(html.match(/<article/g)).toHaveLength(6);
    expect(html).toContain('data-scene="pinned"');
    expect(html).toMatch(/<article[^>]*data-card="mercado-arqueros"[^>]*>[\s\S]*?Mercado de arqueros/);
  });

  it("keeps the section anchor and the old #features / #mercado-arqueros links", () => {
    for (const id of ["funciones", "features", "mercado-arqueros"]) expect(html).toContain(`id="${id}"`);
  });

  it("falls back to a swipeable row with reduced motion", () => {
    const html = render(<JugadoresGalleryStatic />);
    expect(html).not.toContain('data-scene="pinned"');
    expect(html.match(/<article/g)).toHaveLength(6);
    expect(html).toContain('id="mercado-arqueros"');
  });
});

describe("players closing sections", () => {
  it("keep the FAQ anchors", () => {
    const html = render(<Preguntas />);
    expect(html).toContain('id="preguntas"');
    expect(html).toContain('id="faq"');
    expect(html.match(/<details/g)!.length).toBeGreaterThanOrEqual(7);
  });

  it("lead to Torneos with the official lockup, not typed text", () => {
    const html = render(<BandaTorneos />);
    expect(html).toContain('id="torneos"');
    expect(html).toMatch(/<img[^>]*alt="Arma2 Torneos"/);
  });

  it("close with the download call", () => {
    const html = render(<Descargar />);
    expect(html).toContain('id="descargar"');
    expect(html).toContain("empieza acá.");
    expect(html).toContain('data-store="appStore"');
  });
});
