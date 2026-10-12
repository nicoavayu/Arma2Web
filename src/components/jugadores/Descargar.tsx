"use client";

import { useLanguage } from "@/components/LanguageProvider";
import { DownloadQr } from "@/components/shared/DownloadQr";
import { StoreButtons } from "@/components/shared/StoreButtons";

export function Descargar() {
  const { t } = useLanguage();
  const copy = t.home.download;

  return (
    <section id="descargar" className="scroll-mt-20">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-4 py-20 md:px-6 md:py-28 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 className="text-[clamp(2.2rem,5vw,3.5rem)] font-extrabold leading-[1] tracking-[-0.035em] text-white">{copy.title}</h2>
          <p className="mt-3 text-lg text-[#a3a8b8]">{copy.lead}</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-5">
          <StoreButtons />
          <DownloadQr className="text-white" />
        </div>
      </div>
    </section>
  );
}
