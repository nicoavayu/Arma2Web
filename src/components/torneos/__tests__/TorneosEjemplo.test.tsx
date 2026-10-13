import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { metadata as ejemploMetadata } from "@/app/torneos/ejemplo/page";
import sitemap from "@/app/torneos/sitemap";
import { LanguageProvider } from "@/components/LanguageProvider";
import { TorneosCierre } from "@/components/torneos/TorneosCierre";
import { TorneosEjemplo } from "@/components/torneos/TorneosEjemplo";
import { TorneosFooter } from "@/components/torneos/TorneosFooter";
import { TorneosNav } from "@/components/torneos/TorneosNav";
import { TorneosStory } from "@/components/torneos/TorneosStory";
import { getSiteUrl } from "@/lib/site-urls";
import { torneosContent } from "@/lib/torneos-content";
import { torneosEjemploContent } from "@/lib/torneos-ejemplo-content";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);
const EXAMPLE_HREF = `href="${getSiteUrl("torneos", "/ejemplo")}"`;

describe("example tournament page", () => {
  const html = render(<TorneosEjemplo />);

  it("says the data is made up", () => {
    expect(html).toContain(torneosContent.es.demoNote);
  });

  it.each(["tabla", "goleadores", "fixture", "resultados"])("has a %s section reachable from the section links", (id) => {
    expect(html).toContain(`id="${id}"`);
    expect(html).toContain(`href="#${id}"`);
  });

  it("leads the table with Los Galácticos on 15 points after round 7", () => {
    const firstRow = html.slice(html.indexOf("<tbody"), html.indexOf("</tr>", html.indexOf("<tbody")));
    expect(firstRow).toContain("Los Galácticos");
    expect(firstRow).toMatch(/>15</);
  });

  it("names every standings column in full for screen readers, with semantic headers", () => {
    const head = html.slice(html.indexOf("<thead"), html.indexOf("</thead>"));
    for (const [abbr, full] of torneosEjemploContent.es.standings.columns) {
      expect(head).toContain(`<span class="sr-only">${full}</span>`);
      expect(head).toContain(`<span aria-hidden="true">${abbr}</span>`);
    }
    expect(head.match(/<th scope="col"/g)).toHaveLength(10);
    expect(html.match(/<th scope="row"/g)).toHaveLength(4);
  });

  it("shows the rescheduled match the way the product does", () => {
    expect(html).toContain("Reprogramado · antes era Sáb 10/10 · 18:00");
  });

  it("keeps a made-up data label on screen while scrolling", () => {
    expect(html).toMatch(new RegExp(`class="[^"]*sticky[^"]*"[^>]*>[\\s\\S]*?${torneosEjemploContent.es.badge}`));
  });

  it("can't send anything: no forms or buttons", () => {
    expect(html).not.toMatch(/<form|<button|<input/);
  });

  it("offers to start for free and never a purchase", () => {
    expect(html).toContain(torneosEjemploContent.es.cta.start);
    expect(html).not.toContain("intent=premium");
  });
});

describe("links around the example", () => {
  it("points the nav and footer back to the home sections from other pages", () => {
    const home = getSiteUrl("torneos", "/");
    const nav = render(<TorneosNav homeHref={home} />);
    const footer = render(<TorneosFooter homeHref={home} />);
    for (const link of torneosContent.es.nav.links) {
      expect(nav).toContain(`href="${home}${link.href}"`);
      expect(footer).toContain(`href="${home}${link.href}"`);
    }
    expect(nav).not.toContain('href="#');
  });

  it.each([
    ["hero", <TorneosStory key="hero" />],
    ["closing", <TorneosCierre key="closing" />],
    ["footer", <TorneosFooter key="footer" />],
  ])("links to the example from the %s", (_, node) => {
    expect(render(node)).toContain(EXAMPLE_HREF);
  });

  it("lists the example in the Torneos sitemap", () => {
    expect(sitemap().map((entry) => entry.url)).toContain("https://torneos.arma2.com.ar/ejemplo");
  });

  it("shares with the Torneos preview image", () => {
    const og = ejemploMetadata.openGraph as { images?: { url: string }[] };
    const twitter = ejemploMetadata.twitter as { images?: { url: string }[] };
    expect(og.images?.[0].url).toBe("/torneos/opengraph-image");
    expect(twitter.images?.[0].url).toBe("/torneos/opengraph-image");
  });
});
