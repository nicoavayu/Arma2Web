import { torneosContent } from "@/lib/torneos-content";
import { torneosJsonLd } from "@/lib/torneos-jsonld";
import { LocalizedMeta } from "@/components/shared/LocalizedMeta";
import { TorneosCierre } from "@/components/torneos/TorneosCierre";
import { TorneosFaq } from "@/components/torneos/TorneosFaq";
import { TorneosFooter } from "@/components/torneos/TorneosFooter";
import { TorneosNav } from "@/components/torneos/TorneosNav";
import { TorneosPlanes } from "@/components/torneos/TorneosPlanes";
import { TorneosStory } from "@/components/torneos/TorneosStory";
import { TorneosGallery } from "@/components/torneos/TorneosGallery";

/**
 * Server component: ships the FAQ JSON-LD. Metadata lives in `torneos/layout.tsx`.
 * The scenes are client-rendered because they follow the ES/EN switch and the scroll.
 */
const { faq: faqJsonLd, app: appJsonLd } = torneosJsonLd();

export default function TorneosPage() {
  return (
    <>
      <TorneosNav />
      <main className="relative min-h-screen overflow-x-clip bg-[#04050d]">
      <script
        type="application/ld+json"
        // Static, locally-built object — no user or remote input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqJsonLd, appJsonLd]) }}
      />

      <LocalizedMeta seo={{ es: torneosContent.es.seo, en: torneosContent.en.seo }} />
      <TorneosStory />
      <TorneosGallery />
      <TorneosPlanes />
      <TorneosFaq />
      <TorneosCierre />
      </main>
      <TorneosFooter />
    </>
  );
}
