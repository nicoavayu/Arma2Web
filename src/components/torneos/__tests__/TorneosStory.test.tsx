import { motionValue } from "framer-motion";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { DashboardResultado } from "@/components/torneos/screens/DashboardResultado";
import { Poster } from "@/components/torneos/screens/Poster";
import { PublicPagePhone } from "@/components/torneos/screens/PublicPagePhone";
import { TorneosStory, TorneosStoryStatic } from "@/components/torneos/TorneosStory";
import { torneosContent } from "@/lib/torneos-content";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);
const story = torneosContent.es.story;

describe("torneos hero + story scene", () => {
  const html = render(<TorneosStory />);

  it("has one h1 and one h2 per chapter", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/<h2/g)).toHaveLength(4);
    expect(html).toContain("Todo el torneo.");
  });

  it("keeps the section anchor and one anchor per chapter", () => {
    for (const id of ["torneos-como-funciona", "torneos-hero", "capitulo-cargas", "capitulo-se-comparte"]) expect(html).toContain(`id="${id}"`);
    expect(html).toContain('data-scene="pinned"');
  });

  it("paints the hero visible on the server", () => {
    const start = html.lastIndexOf("<div", html.indexOf("data-hero-copy"));
    const hero = html.slice(start, html.indexOf("data-hero-device"));
    expect(hero).toContain("<h1");
    expect(hero).toContain("Empezar gratis");
    expect(hero).not.toMatch(/opacity:\s*0[;"]/);
    expect(hero).not.toMatch(/visibility:\s*hidden/);
  });

  it("points the nav's \"Cómo funciona\" at the first chapter, not the hero", () => {
    for (const locale of ["es", "en"] as const) {
      expect(torneosContent[locale].nav.links[0].href).toBe("#capitulo-cargas");
    }
  });

  it("labels the example data", () => {
    expect(html).toContain("Ejemplo con datos ficticios");
  });

  it("sends the start CTA to the Torneos product", () => {
    expect(html).toContain('href="https://app.arma2.com.ar/torneos"');
  });
});

describe("torneos story screens (final state)", () => {
  it("dashboard shows the saved 3–1 and every status line done", () => {
    const html = render(<DashboardResultado progress={motionValue(1)} copy={story.dashboard} />);
    expect(html).toMatch(/>3<[\s\S]*>1</);
    expect(html).toContain("Resultado guardado");
    expect(html.match(/data-done="true"/g)).toHaveLength(3);
  });

  it("public page shows Los Galácticos on top with 15", () => {
    expect(render(<PublicPagePhone copy={story.publicPage} />)).toMatch(/Los Galácticos[\s\S]*?15/);
  });

  it("the scorers post is tagged Premium", () => {
    const html = render(<Poster kind="scorers" copy={story.posters} />);
    expect(html).toContain(story.posters.scorersTag);
    expect(html).toContain("Nico");
  });
});

describe("torneos story with reduced motion", () => {
  it("is not pinned and shows every chapter", () => {
    const html = render(<TorneosStoryStatic />);
    expect(html).not.toContain('data-scene="pinned"');
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/<h2/g)).toHaveLength(4);
    expect(html).toContain("Resultado guardado");
  });
});
