import type { Metadata } from "next";
import { Barlow_Condensed } from "next/font/google";

import { TorneosFooter } from "@/components/torneos/TorneosFooter";
import { TorneosNav } from "@/components/torneos/TorneosNav";
import { torneosContent } from "@/lib/torneos-content";

/**
 * Torneos portal, served at torneos.arma2.com.ar (see `src/proxy.ts`).
 * Metadata is emitted in the default locale (es), like the players site.
 * The Open Graph image comes from `opengraph-image.tsx` next to this file.
 */
const seo = torneosContent.es.seo;

/** Display face of the Torneos headlines (echoes the italic TORNEOS logotype). */
const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["800", "900"],
  style: ["italic"],
  variable: "--font-torneos",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://torneos.arma2.com.ar"),
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
    canonical: "/",
  },
  openGraph: {
    title: seo.title,
    description: seo.description,
    url: "https://torneos.arma2.com.ar",
    siteName: "Arma2 Torneos",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: seo.title,
    description: seo.description,
  },
};

export default function TorneosLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={display.variable}>
      <TorneosNav />
      {children}
      <TorneosFooter />
    </div>
  );
}
