import { motionValue } from "framer-motion";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { DashboardResultado } from "@/components/torneos/screens/DashboardResultado";
import { Poster } from "@/components/torneos/screens/Poster";
import { PublicPagePhone } from "@/components/torneos/screens/PublicPagePhone";
import { TEAM_NAMES } from "@/components/torneos/screens/teams";
import { TorneosStory } from "@/components/torneos/TorneosStory";
import { torneosContent } from "@/lib/torneos-content";
import { standingsRows } from "@/lib/torneos-story";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);
const story = torneosContent.es.story;

describe("torneos hero + how it works", () => {
  const html = render(<TorneosStory />);

  it("has one h1, a section title and one h3 per step", () => {
    expect(html.match(/<h1/g)).toHaveLength(1);
    expect(html.match(/<h2/g)).toHaveLength(1);
    // The manager screen is decorative (aria-hidden); count each step's own title.
    expect(html.match(/<li[^>]*data-step[^>]*>(?:(?!<\/li>)[\s\S])*?<h3/g)).toHaveLength(4);
    expect(html).toContain("Todo el torneo.");
  });

  it("keeps the section anchor and one anchor per step", () => {
    for (const id of ["torneos-como-funciona", "torneos-hero", "capitulo-cargas", "capitulo-se-actualiza", "capitulo-se-publica", "capitulo-se-comparte"]) {
      expect(html).toContain(`id="${id}"`);
    }
  });

  it("scrolls normally: no pinned or sticky scene", () => {
    expect(html).not.toContain("data-scene");
    expect(html).not.toMatch(/position:\s*sticky/);
  });

  it("shows the dashboard, the public page and both posts in their final state on the server", () => {
    expect(html).toContain("Resultado guardado");
    expect(html).toContain(story.publicPage.lastResult);
    expect(html).toContain(story.posters.results);
    expect(html).toContain(story.posters.standings);
  });

  it("links to the example tournament next to the steps", () => {
    const steps = html.slice(html.indexOf('id="torneos-como-funciona"'));
    expect(steps).toContain('href="/torneos/ejemplo"');
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

  it("the standings post is a FREE post with the leader after the result", () => {
    const leader = [...standingsRows()].sort((a, b) => a.rank1 - b.rank1)[0];
    const html = render(<Poster kind="standings" copy={story.posters} />);
    expect(html).toContain(story.posters.standings);
    expect(html).toMatch(new RegExp(`1\\. ${TEAM_NAMES[leader.teamId]}[\\s\\S]*?>${leader.pts1}<`));
    expect(html).not.toMatch(/premium/i);
  });
});
