"use client";

import { motion, useTransform } from "framer-motion";
import { Check, Link2 } from "lucide-react";

import { DeviceFrame } from "@/components/cinematic/DeviceFrame";
import { usePlayWhenVisible } from "@/components/cinematic/usePlayWhenVisible";
import { SECTION_PAD, SectionHead } from "@/components/torneos/SectionHead";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { cn } from "@/lib/utils";

import { PublicPagePhone } from "./screens/PublicPagePhone";

/** Every tournament's own public page: the link, the real tabs, and the page on a phone (example data). */
export function TorneosPaginaPublica() {
  const content = useTorneosContent();
  const copy = content.publicPage;
  const [ref, progress] = usePlayWhenVisible<HTMLDivElement>(1.4);
  const phone = {
    opacity: useTransform(progress, [0, 0.5], [0, 1]),
    y: useTransform(progress, [0, 0.5], [24, 0]),
  };
  const chip = {
    opacity: useTransform(progress, [0.45, 0.9], [0, 1]),
    y: useTransform(progress, [0.45, 0.9], [10, 0]),
  };

  return (
    <section
      id="torneos-pagina-publica"
      aria-labelledby="torneos-pagina-publica-titulo"
      className={cn(
        "relative overflow-hidden bg-[#04050d] py-14 text-white md:py-24",
        SECTION_PAD,
      )}
    >
      <div className="mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1.1fr_1fr] lg:gap-16">
        <div className="order-last flex flex-col items-center gap-4 lg:order-first">
          <div
            ref={ref}
            aria-hidden="true"
            className="relative flex min-h-[300px] w-full items-center justify-center sm:min-h-[360px] lg:min-h-[460px]"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(45%_45%_at_50%_50%,rgba(108,77,255,0.28),transparent_70%)]" />
            <motion.div style={phone} className="relative">
              <DeviceFrame time="9:41" className="w-[188px] sm:w-[228px]">
                <PublicPagePhone copy={content.story.publicPage} />
              </DeviceFrame>
            </motion.div>
            <motion.span
              style={chip}
              className="absolute bottom-6 left-1/2 flex max-w-[92%] -translate-x-1/2 items-center gap-2 truncate rounded-full border border-white/15 bg-[#0b0c18]/90 px-3.5 py-2 text-xs font-semibold text-white/85 sm:bottom-10"
            >
              <Link2 className="h-3.5 w-3.5 shrink-0 text-[#9fdcff]" />
              <span className="truncate">{content.story.publicPage.url}</span>
            </motion.span>
          </div>
          <p className="text-xs font-semibold text-white/60">
            {content.demoNote}
          </p>
        </div>

        <div>
          <SectionHead
            id="torneos-pagina-publica-titulo"
            eyebrow={copy.eyebrow}
            title={copy.title}
            accent={copy.accent}
            lead={copy.lead}
          />
          <p className="mt-7 text-xs font-bold uppercase tracking-[0.14em] text-white/60">
            {copy.tabsLabel}
          </p>
          <ul className="mt-3 flex flex-wrap gap-2" data-public-tabs>
            {copy.tabs.map((tab) => (
              <li
                key={tab}
                className="rounded-lg bg-white/[0.07] px-3 py-1.5 text-sm font-semibold text-white/90"
              >
                {tab}
              </li>
            ))}
          </ul>
          <ul className="mt-6 space-y-3">
            {copy.points.map((point) => (
              <li
                key={point}
                className="grid grid-cols-[1.25rem_1fr] gap-2.5 text-[15px] leading-snug text-white/85"
              >
                <Check
                  aria-hidden="true"
                  className="mt-0.5 h-4 w-4 text-[#2ee59d]"
                />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
