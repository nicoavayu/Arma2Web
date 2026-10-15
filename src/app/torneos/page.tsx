import { torneosContent } from "@/lib/torneos-content";
import { torneosJsonLd } from "@/lib/torneos-jsonld";
import { LocalizedMeta } from "@/components/shared/LocalizedMeta";
import { TorneosAudiencias } from "@/components/torneos/TorneosAudiencias";
import { TorneosCierre } from "@/components/torneos/TorneosCierre";
import { TorneosFaq } from "@/components/torneos/TorneosFaq";
import { TorneosFormatos } from "@/components/torneos/TorneosFormatos";
import { TorneosGallery } from "@/components/torneos/TorneosGallery";
import { TorneosPaginaPublica } from "@/components/torneos/TorneosPaginaPublica";
import { TorneosPasos } from "@/components/torneos/TorneosPasos";
import { TorneosPlacas } from "@/components/torneos/TorneosPlacas";
import { TorneosPlanes } from "@/components/torneos/TorneosPlanes";
import { TorneosHero, TorneosSteps } from "@/components/torneos/TorneosStory";
import { TorneosVideo } from "@/components/torneos/TorneosVideo";

/**
 * Server component: ships the FAQ JSON-LD. Metadata lives in `torneos/layout.tsx`.
 * The scenes are client-rendered because they follow the ES/EN switch and the scroll.
 */
const { faq: faqJsonLd, app: appJsonLd } = torneosJsonLd();

export default function TorneosPage() {
  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#04050d]">
      <script
        type="application/ld+json"
        // Static, locally-built object — no user or remote input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqJsonLd, appJsonLd]) }}
      />

      <LocalizedMeta seo={{ es: torneosContent.es.seo, en: torneosContent.en.seo }} />
      {/* Order (spec 2026-10-15): hero, video, who it's for, formats, how it works, public page, features,
          social posts, plans, getting started, questions, closing. */}
      <TorneosHero />
      <TorneosVideo />
      <TorneosAudiencias />
      <TorneosFormatos />
      <TorneosSteps />
      <TorneosPaginaPublica />
      <TorneosGallery />
      <TorneosPlacas />
      <TorneosPlanes />
      <TorneosPasos />
      <TorneosFaq />
      <TorneosCierre />
    </main>
  );
}
