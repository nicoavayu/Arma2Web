"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { DownloadQr } from "@/components/shared/DownloadQr";
import { StoreButtons } from "@/components/shared/StoreButtons";

/** Closing call to download the app. */
export function Descargar() {
  const { t } = useLanguage();
  const copy = t.home.download;

  return (
    <section id="descargar" className="relative overflow-hidden bg-[#05040d] px-5 py-[clamp(110px,18vh,190px)] text-center">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_50%_60%,rgba(123,92,255,0.45),transparent_70%),radial-gradient(30%_40%_at_25%_40%,rgba(39,184,255,0.25),transparent_70%),radial-gradient(30%_40%_at_78%_40%,rgba(236,77,255,0.25),transparent_70%)]"
      />
      <h2 className="relative text-[clamp(2.6rem,7vw,6.4rem)] font-extrabold leading-[0.96] tracking-[-0.05em] text-white">
        <span className="block">{copy.title[0]}</span>
        <span className="text-grad-j block">{copy.title[1]}</span>
      </h2>
      <p className="relative mb-9 mt-6 text-[clamp(1rem,1.4vw,1.25rem)] text-[#d6d2ee]">{copy.lead}</p>
      <StoreButtons tone="glass" className="relative justify-center" />
      <div className="relative mt-8 flex justify-center">
        <DownloadQr className="rounded-2xl border border-white/10 bg-white/[0.05] py-2.5 pl-2.5 pr-5 text-white" />
      </div>
    </section>
  );
}
