import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { TorneosAudiencias } from "@/components/torneos/TorneosAudiencias";
import { TorneosFormatos } from "@/components/torneos/TorneosFormatos";
import { TorneosGallery } from "@/components/torneos/TorneosGallery";
import { TorneosPaginaPublica } from "@/components/torneos/TorneosPaginaPublica";
import { TorneosPasos } from "@/components/torneos/TorneosPasos";
import { TorneosPlacas } from "@/components/torneos/TorneosPlacas";
import TorneosPage from "@/app/torneos/page";
import { torneosContent } from "@/lib/torneos-content";
import { showTorneosVideo } from "@/lib/torneos-video";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);
const all = (locale: "es" | "en") => JSON.stringify(torneosContent[locale]);

describe("structural redesign (spec 2026-10-15)", () => {
  it("renders the sections in the agreed order", () => {
    const html = render(<TorneosPage />);
    const ids = ["torneos-hero", "torneos-video", "torneos-para-quien", "torneos-formatos", "torneos-como-funciona", "torneos-pagina-publica", "torneos-funciones", "torneos-placas", "torneos-planes", "torneos-pasos", "torneos-faq", "torneos-empezar"];
    const positions = ids.map((id) => html.indexOf(`id="${id}"`));
    expect(positions.every((position) => position >= 0)).toBe(true);
    expect([...positions].sort((a, b) => a - b)).toEqual(positions);
  });

  it("keeps the how-it-works link first in the nav and adds formats", () => {
    const links = torneosContent.es.nav.links.map((link) => link.href);
    expect(links[0]).toBe("#capitulo-cargas");
    expect(links).toContain("#torneos-formatos");
  });
});

describe("video block", () => {
  it("is left out of Production until the video file exists", () => {
    expect(showTorneosVideo("production", null)).toBe(false);
    expect(showTorneosVideo("production", "/torneos/video.mp4")).toBe(true);
  });

  it("shows the labelled poster in previews and locally", () => {
    expect(showTorneosVideo("preview", null)).toBe(true);
    expect(showTorneosVideo(undefined, null)).toBe(true);
  });
});

describe("audiences", () => {
  it("has an organiser block with the start CTA and a players block linking the players site", () => {
    const html = render(<TorneosAudiencias />);
    expect(html).toContain('data-audience="organizador"');
    expect(html).toContain('data-audience="jugadores"');
    expect(html).toContain("https://app.arma2.com.ar/torneos");
    expect(html).toContain("sin app ni cuenta");
    expect(html).toContain("app Arma2");
  });
});

describe("formats (names the organiser picks in the product's wizard)", () => {
  it.each([
    ["es", ["Liga", "Eliminación directa", "Fase de grupos", "Grupos y playoffs", "Liga y playoffs"]],
    ["en", ["League", "Knockout", "Group stage", "Groups and playoffs", "League and playoffs"]],
  ] as const)("lists exactly the five real formats (%s)", (locale, formats) => {
    expect(torneosContent[locale].formats.formats).toEqual(formats);
  });

  it("states the real options: home and away, points and tie-breaks, 5 to 11-a-side", () => {
    const html = render(<TorneosFormatos />);
    expect(html).toContain("Ida y vuelta");
    expect(html).toContain("Fútbol 5, 6, 7, 8, 9 y 11");
    expect(html).toMatch(/diferencia de gol, goles a favor, resultado entre sí/);
  });
});

describe("public page", () => {
  it("shows the product's real tabs and the public URL, labelled as example data", () => {
    const html = render(<TorneosPaginaPublica />);
    for (const tab of ["Inicio", "Fixture", "Resultados", "Tabla", "Goleadores", "Equipos", "Disciplina"]) expect(html).toContain(`>${tab}<`);
    expect(html).toContain("app.arma2.com.ar/torneos/publico/copa-primavera-2026");
    expect(html).toContain("Ejemplo con datos ficticios");
  });
});

describe("features, grouped", () => {
  it("keeps the six cards, in three groups", () => {
    const html = render(<TorneosGallery />);
    expect(html.match(/<article/g)).toHaveLength(6);
    expect(html.match(/data-group="/g)).toHaveLength(3);
    const grouped = torneosContent.es.gallery.groups.flatMap((group) => group.cards).sort();
    expect(grouped).toEqual(torneosContent.es.gallery.cards.map((card) => card.id).sort());
  });
});

describe("social posts", () => {
  it("says what FREE exports and what Premium adds, as the product does", () => {
    const html = render(<TorneosPlacas />);
    expect(html).toContain("Resultados de la fecha, Tabla de posiciones y Próxima fecha");
    expect(html).toMatch(/Heritage, Street, Scoreboard y Editorial/);
    expect(html).toContain("Feed 4:5");
    expect(html).toContain("Historia 9:16");
    expect(html).toMatch(/hasta 100 fotos por temporada en vez de 25/);
  });

  it.each(["es", "en"] as const)("keeps the round summary on the Premium side, apart from the three FREE posts (%s)", (locale) => {
    const placas = torneosContent[locale].placas;
    expect(placas.premium.text).toMatch(locale === "es" ? /resumen de fecha/ : /round summary/);
    expect(placas.free.text).not.toMatch(/resumen|summary/i);
    expect(placas.free.text).toMatch(locale === "es" ? /Resultados de la fecha, Tabla de posiciones y Próxima fecha/ : /Round results, Standings and Next round/);
  });
});

describe("getting started", () => {
  it("has four steps that follow the product (login methods and wizard) and the start CTA", () => {
    const html = render(<TorneosPasos />);
    expect(html.match(/data-paso/g)).toHaveLength(4);
    expect(html).toMatch(/Google, de Apple o con tu email/);
    expect(html).toMatch(/información, modalidad, formato, reglas y categorías/);
    expect(html).toContain("https://app.arma2.com.ar/torneos");
  });
});

describe("claims", () => {
  it.each(["es", "en"] as const)("invents no usage numbers, testimonials or sponsors (%s)", (locale) => {
    // Usage metrics ("+800", "340.000 jugadores", "torneos organizados"), quotes and sponsors; squad sizes of the example are fine.
    expect(all(locale)).not.toMatch(/\+\d{2,}|\d{1,3}[.,]\d{3}\s?(jugadores|usuarios|players|users)|torneos organizados|tournaments run|países|countries|testimoni|sponsor|patrocin/i);
  });

  it.each(["es", "en"] as const)("doesn't put photos on the public page (photos are for participants) (%s)", (locale) => {
    expect(JSON.stringify(torneosContent[locale].publicPage)).not.toMatch(/fotos|photos|galer/i);
  });
});
