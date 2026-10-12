"use client";

import Image from "next/image";

import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { cn } from "@/lib/utils";

export function TorneosStudio() {
  const copy = useTorneosContent().studio;

  return (
    <section id="torneos-social-studio" className="scroll-mt-16 bg-[#f5f1e9] text-[#070711]">
      <div className="mx-auto max-w-[1240px] px-4 py-20 md:px-6 md:py-28">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2rem,4.8vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]">{copy.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#44465a]">{copy.body}</p>
        </div>

        <ul aria-label={copy.postersLabel} className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {copy.posters.map((poster) => (
            <li key={poster.src}>
              <figure>
                <Image
                  src={poster.src}
                  alt={`${poster.label} — ${copy.postersLabel}`}
                  width={1080}
                  height={1350}
                  sizes="(max-width: 768px) 46vw, 280px"
                  className="h-auto w-full rounded-lg shadow-[0_20px_40px_-20px_rgba(7,7,17,0.6)]"
                />
                <figcaption className="mt-2 flex items-baseline justify-between text-sm">
                  <strong className="font-semibold">{poster.label}</strong>
                  <span className="text-xs text-[#44465a]">{poster.meta}</span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-center">
          <BrowserFrame id="torneos/social-studio" sizes="(max-width: 1024px) 92vw, 720px" />
          <div>
            <p className="text-sm font-semibold">{copy.stylesLabel}</p>
            <ul className="mt-3 flex flex-wrap gap-2">
              {copy.styles.map((style, index) => (
                <li
                  key={style}
                  className={cn(
                    "inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 text-sm font-semibold",
                    index === 0 ? "border-[#070711] bg-[#070711] text-white" : "border-[#070711]/20",
                  )}
                >
                  {style}
                  <span className={cn("text-[10px] font-bold uppercase tracking-wide", index === 0 ? "text-[#20e39b]" : "text-[#5b4bff]")}>
                    {index === 0 ? copy.freeTag : copy.premiumTag}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 leading-relaxed text-[#44465a]">{copy.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
