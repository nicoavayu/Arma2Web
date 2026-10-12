import { torneosContent } from "@/lib/torneos-content";
import { torneosJsonLd } from "@/lib/torneos-jsonld";
import { LocalizedMeta } from "@/components/shared/LocalizedMeta";
import { TorneosCierre } from "@/components/torneos/TorneosCierre";
import { TorneosFaq } from "@/components/torneos/TorneosFaq";
import { TorneosPlanes } from "@/components/torneos/TorneosPlanes";
import { TorneosStory } from "@/components/torneos/TorneosStory";

/**
 * Server component: ships the FAQ JSON-LD. Metadata lives in `torneos/layout.tsx`.
 * The editorial experience is client-rendered because it follows the ES/EN switch.
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
      <TorneosStory />
      <TorneosPlanes />
      <TorneosFaq />
      <TorneosCierre />
    </main>
  );
}
