"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { DownloadQr } from "@/components/shared/DownloadQr";
import { PhoneFrame } from "@/components/shared/PhoneFrame";
import { StoreButtons } from "@/components/shared/StoreButtons";

/** Team totals exactly as shown in the jugadores/equipos capture. */
const CAPTURE_TOTALS = { a: 25.6, b: 25.7 };

function BalanceBar() {
  const { t } = useLanguage();
  const copy = t.home.hero.balance;
  const total = CAPTURE_TOTALS.a + CAPTURE_TOTALS.b;
  const diff = Math.abs(CAPTURE_TOTALS.a - CAPTURE_TOTALS.b).toFixed(1);

  return (
    <figure className="rounded-xl border border-white/10 bg-[#0d1022] px-4 py-3">
      <div className="flex items-baseline justify-between gap-3 whitespace-nowrap text-sm tabular-nums">
        <span className="text-white/70">
          {copy.teamA} <strong className="ml-1 font-semibold text-white">{CAPTURE_TOTALS.a.toFixed(1)}</strong>
        </span>
        <span className="text-white/70">
          <strong className="mr-1 font-semibold text-white">{CAPTURE_TOTALS.b.toFixed(1)}</strong> {copy.teamB}
        </span>
      </div>
      <div className="mt-2.5 flex h-1.5 overflow-hidden rounded-full" aria-hidden="true">
        <span className="bg-[#27b8ff]" style={{ flex: CAPTURE_TOTALS.a / total }} />
        <span className="w-0.5 bg-[#070711]" />
        <span className="bg-[#20e39b]" style={{ flex: CAPTURE_TOTALS.b / total }} />
      </div>
      <figcaption className="mt-2.5 text-xs leading-relaxed text-white/50">
        <strong className="mr-1.5 font-semibold text-[#20e39b]">
          {copy.diff} {diff} · {copy.verdict}.
        </strong>
        {copy.caption}
      </figcaption>
    </figure>
  );
}

export function Hero() {
  const { t } = useLanguage();
  const hero = t.home.hero;

  return (
    <section id="inicio" className="relative overflow-hidden border-b border-white/[0.07] pt-24 md:pt-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-12 px-4 pb-14 md:px-6 lg:grid-cols-[1.3fr_1fr] lg:gap-10 lg:pb-20">
        <div>
          <p className="text-sm font-medium text-white/60">{hero.eyebrow}</p>
          <h1 className="mt-4 text-[clamp(2.5rem,5.4vw,3.7rem)] font-extrabold leading-[0.98] tracking-[-0.035em] text-white">
            <span className="block">{hero.title[0]}</span>
            <span className="block text-[#27b8ff]">{hero.title[1]}</span>
            <span className="block">{hero.title[2]}</span>
          </h1>
          <p className="mt-6 max-w-[34rem] text-lg leading-relaxed text-[#a3a8b8]">{hero.lead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-5">
            <StoreButtons />
            <DownloadQr className="text-white" />
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-[34rem]">
          <div className="relative grid grid-cols-[1fr_1.08fr] items-end gap-3 sm:gap-5">
            <PhoneFrame id="jugadores/equipos" className="translate-y-6 opacity-90" sizes="(max-width: 1024px) 44vw, 250px" />
            <PhoneFrame id="jugadores/votacion" priority sizes="(max-width: 1024px) 48vw, 270px" />
          </div>
          <div className="relative mt-10">
            <BalanceBar />
          </div>
        </div>
      </div>

      <ul className="mx-auto flex max-w-[1200px] flex-wrap gap-x-6 gap-y-2 border-t border-white/[0.07] px-4 py-5 text-sm text-white/70 md:px-6">
        {hero.facts.map((fact) => (
          <li key={fact} className="flex items-center gap-2">
            <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-[#20e39b]" />
            {fact}
          </li>
        ))}
      </ul>
    </section>
  );
}
