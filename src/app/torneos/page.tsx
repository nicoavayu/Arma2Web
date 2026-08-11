import type { Metadata } from "next";

import { torneosContent } from "@/lib/torneos-content";
import { TorneosHero } from "@/components/torneos/TorneosHero";
import { TorneosProblem } from "@/components/torneos/TorneosProblem";
import { TorneosManagement } from "@/components/torneos/TorneosManagement";
import { TorneosPublicPage } from "@/components/torneos/TorneosPublicPage";
import { TorneosPlayers } from "@/components/torneos/TorneosPlayers";
import { TorneosSocialStudio } from "@/components/torneos/TorneosSocialStudio";
import { TorneosMedia } from "@/components/torneos/TorneosMedia";
import { TorneosPlans } from "@/components/torneos/TorneosPlans";
import { TorneosPlatforms } from "@/components/torneos/TorneosPlatforms";
import { TorneosFinalCta } from "@/components/torneos/TorneosFinalCta";
import { TorneosFaq } from "@/components/torneos/TorneosFaq";

/**
 * Server component so the page ships real metadata; the sections below are
 * client components because they use the shared LanguageProvider and framer-motion.
 * Metadata is emitted in the default locale (es), matching the rest of the site.
 */
const seo = torneosContent.es.seo;

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  keywords: [
    "software para organizar torneos de fútbol",
    "app para torneos de fútbol",
    "gestión de campeonatos",
    "fixture y tabla online",
    "tabla de posiciones",
    "organizar liga de fútbol amateur",
  ],
  alternates: {
    canonical: "/torneos",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "https://www.arma2.com.ar/torneos",
    type: "website",
    images: [
      {
        url: "https://www.arma2.com.ar/og-image.jpg?v=20260224",
        width: 1200,
        height: 630,
        alt: "Arma2 Torneos — todo tu torneo en un solo lugar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
    images: ["https://www.arma2.com.ar/og-image.jpg?v=20260224"],
  },
};

/** FAQ structured data, generated from the same copy rendered on the page. */
const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: torneosContent.es.faq.items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function TorneosPage() {
  return (
    <main className="premium-page-bg relative min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        // Static, locally-built object — no user or remote input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <TorneosHero />
      <TorneosProblem />
      <TorneosManagement />
      <TorneosPublicPage />
      <TorneosPlayers />
      <TorneosSocialStudio />
      <TorneosMedia />
      <TorneosPlans />
      <TorneosPlatforms />
      <TorneosFinalCta />
      <TorneosFaq />
    </main>
  );
}
