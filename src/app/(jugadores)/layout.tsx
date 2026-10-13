import type { Metadata, Viewport } from "next";

import { JugadoresNav } from "@/components/jugadores/JugadoresNav";
import { JugadoresFooter } from "@/components/jugadores/JugadoresFooter";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.arma2.com.ar"),
  title: "Arma2 - Organizá partidos. Armá equipos parejos.",
  description: "Organizá partidos de fútbol, encontrá jugadores, armá equipos parejos y registrá resultados con Arma2. Gratis para iOS y Android.",
  keywords: [
    "encontrar jugadores de fútbol",
    "organizar partidos",
    "fútbol 5",
    "fútbol 7",
    "jugar sin tener equipo",
    "partido automático",
    "jugadores cerca",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Arma2 – Encontrá jugadores y organizá tu próximo partido",
    description: "Organizá partidos de fútbol, encontrá jugadores, armá equipos parejos y registrá resultados con Arma2. Gratis para iOS y Android.",
    url: "https://www.arma2.com.ar",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arma2 – Encontrá jugadores y organizá tu próximo partido",
    description: "Organizá partidos de fútbol, encontrá jugadores, armá equipos parejos y registrá resultados con Arma2. Gratis para iOS y Android.",
  },
};

/** Browser chrome color on phones (matches the scene background). */
export const viewport: Viewport = { themeColor: "#05040d" };

export default function JugadoresLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <JugadoresNav />
      {children}
      <JugadoresFooter />
    </>
  );
}
