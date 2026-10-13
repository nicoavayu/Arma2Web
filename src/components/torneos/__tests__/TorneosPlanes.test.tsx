import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { TorneosCierre } from "@/components/torneos/TorneosCierre";
import { TorneosFaq } from "@/components/torneos/TorneosFaq";
import { TorneosGallery } from "@/components/torneos/TorneosGallery";
import { TorneosPlanes } from "@/components/torneos/TorneosPlanes";
import { COMMERCIAL } from "@/lib/torneos-content";

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
  it("shows the five features", () => {
    const html = render(<TorneosGallery />);
    expect(html.match(/<article/g)).toHaveLength(5);
    expect(html).toContain('id="torneos-funciones"');
  });

  it("keep their anchors", () => {
    expect(render(<TorneosFaq />)).toContain('id="torneos-faq"');
    expect(render(<TorneosCierre />)).toContain('id="torneos-empezar"');
  });
});
