import { motionValue } from "framer-motion";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ScreenConvocatoria } from "@/components/jugadores/screens/ScreenConvocatoria";
import { ScreenEncuesta } from "@/components/jugadores/screens/ScreenEncuesta";
import { ScreenEquipos } from "@/components/jugadores/screens/ScreenEquipos";
import { ScreenHome } from "@/components/jugadores/screens/ScreenHome";
import { ScreenVotacion } from "@/components/jugadores/screens/ScreenVotacion";
import { translations } from "@/lib/i18n";

const screens = translations.es.home.story.screens;
const done = () => motionValue(1);

describe("players app screens (final state)", () => {
  it("home shows the quick actions and the tab bar", () => {
    const html = renderToStaticMarkup(<ScreenHome copy={screens.home} />);
    expect(html).toContain("Partido nuevo");
    expect(html).toContain("Actividad reciente");
    expect(html).toContain("Perfil");
  });

  it("convocatoria ends with the 10 confirmed and the guest marked", () => {
    const html = renderToStaticMarkup(<ScreenConvocatoria progress={done()} copy={screens.match} />);
    expect(html).toContain("10/10");
    expect(html).toContain("Invitado");
    expect(html).toContain("Compartir link");
  });

  it("votación ends on \"No lo conozco\" after the third vote", () => {
    const html = renderToStaticMarkup(<ScreenVotacion progress={done()} copy={screens.vote} />);
    expect(html).toContain("No lo conozco");
    expect(html).toContain("Votaste 4 de 9");
  });

  it("equipos ends with the 33.6 / 33.5 split and its verdict", () => {
    const html = renderToStaticMarkup(<ScreenEquipos progress={done()} copy={screens.teams} />);
    expect(html).toContain("33.6");
    expect(html).toContain("33.5");
    expect(html).toContain("Dif 0.1 · Muy parejo");
  });

  it("encuesta asks for the figure on step 3 of 8", () => {
    const html = renderToStaticMarkup(<ScreenEncuesta progress={done()} copy={screens.survey} />);
    expect(html).toContain("¿Quién fue la figura?");
    expect(html).toContain("Paso 3 de 8");
    expect(html).toContain("Juani");
  });
});
