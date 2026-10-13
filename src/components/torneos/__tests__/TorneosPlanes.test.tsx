import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { TorneosCierre } from "@/components/torneos/TorneosCierre";
import { TorneosFaq } from "@/components/torneos/TorneosFaq";
import { TorneosGallery } from "@/components/torneos/TorneosGallery";
import { TorneosPlanes } from "@/components/torneos/TorneosPlanes";
import { COMMERCIAL, torneosContent } from "@/lib/torneos-content";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);

describe("torneos plans", () => {
  const html = render(<TorneosPlanes />);

  it("prints the Premium price and limits from COMMERCIAL", () => {
    expect(html).toContain(new Intl.NumberFormat("es-AR").format(COMMERCIAL.premiumPriceArs));
    expect(html).toContain(`Hasta ${COMMERCIAL.photosFree} fotos`);
    expect(html).toContain(`Hasta ${COMMERCIAL.photosPremium} fotos`);
  });

  it("keeps the full comparison, folded", () => {
    expect(html).toContain("<details");
    expect(html).toContain("<caption");
    expect(html).toContain('id="torneos-planes"');
  });
});

describe("torneos gallery and closing sections", () => {
  it("shows the six features", () => {
    const html = render(<TorneosGallery />);
    expect(html.match(/<article/g)).toHaveLength(6);
    expect(html).toContain('id="torneos-funciones"');
    expect(html).not.toContain("data-scene");
  });

  it("shows captain registration as the organiser's request list", () => {
    const html = render(<TorneosGallery />);
    const art = torneosContent.es.gallery.art.registration;
    expect(html).toContain('data-card="inscripcion"');
    expect(html).toContain(art.title);
    for (const action of art.actions) expect(html).toContain(action);
  });

  it("shows a rescheduled match as an in-app notice with before and now", () => {
    const html = render(<TorneosGallery />);
    expect(html).toContain('data-card="reprogramacion"');
    expect(html).toContain(torneosContent.es.gallery.art.reschedule.title);
    expect(html).toContain("Antes: Sáb 10/10 · 18:00 · Ahora: Mié 21/10 · 21:00");
  });

  it("offers help for a first season by email, without WhatsApp or support promises", () => {
    const html = render(<TorneosCierre />);
    expect(html).toContain(torneosContent.es.cierre.help.question);
    expect(html).toMatch(/href="mailto:arma2app@gmail\.com\?subject=[^"]+"/);
    expect(html).not.toMatch(/whatsapp|wa\.me|soporte|24\s*h/i);
  });

  it("keep their anchors", () => {
    expect(render(<TorneosFaq />)).toContain('id="torneos-faq"');
    expect(render(<TorneosCierre />)).toContain('id="torneos-empezar"');
  });
});
