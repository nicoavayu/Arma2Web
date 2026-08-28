import type { Metadata } from "next";

import { torneosContent } from "@/lib/torneos-content";
import { TorneosEditorial } from "@/components/torneos/TorneosEditorial";

/**
 * Server component so the page ships real metadata. The editorial experience
 * below is client-rendered because it follows the site-wide ES/EN switch.
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
        alt: "Arma2 Torneos — todo el torneo, sin hacer el mismo trabajo dos veces",
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
    <main className="relative min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        // Static, locally-built object — no user or remote input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <TorneosEditorial />
    </main>
  );
}
