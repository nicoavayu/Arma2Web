"use client";

import Image from "next/image";

import { useLanguage } from "@/components/LanguageProvider";
import { getSiteUrl } from "@/lib/site-urls";

const COPY = {
  es: {
    title: "No encontramos esta página.",
    body: "Puede que el link esté viejo o mal escrito.",
    players: "Ir a Arma2",
    torneos: "Ir a Arma2 Torneos",
  },
  en: {
    title: "We couldn't find this page.",
    body: "The link may be outdated or mistyped.",
    players: "Go to Arma2",
    torneos: "Go to Arma2 Tournaments",
  },
} as const;

/** Rendered inside the root layout for unknown paths on both hosts. */
export default function NotFound() {
  const { locale } = useLanguage();
  const copy = COPY[locale];

  return (
    <main className="flex min-h-[100dvh] items-center bg-[#070711] px-4 text-white">
      <div className="mx-auto w-full max-w-xl">
        <Image src="/logo_navbar.png" alt="Arma2" width={30} height={37} className="h-9 w-auto brightness-0 invert" />
        <p className="mt-8 text-sm font-semibold tabular-nums text-[#27b8ff]">404</p>
        <h1 className="mt-2 text-[clamp(2rem,6vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em]">{copy.title}</h1>
        <p className="mt-4 text-lg text-white/70">{copy.body}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href={getSiteUrl("jugadores")} className="inline-flex min-h-12 items-center rounded-lg bg-white px-5 font-semibold text-[#070711] hover:bg-white/90">
            {copy.players}
          </a>
          <a href={getSiteUrl("torneos")} className="inline-flex min-h-12 items-center rounded-lg border border-white/20 px-5 font-semibold hover:border-white/50">
            {copy.torneos}
          </a>
        </div>
      </div>
    </main>
  );
}
