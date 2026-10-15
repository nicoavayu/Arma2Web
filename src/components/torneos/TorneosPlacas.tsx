"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";

import { usePlayWhenVisible } from "@/components/cinematic/usePlayWhenVisible";
import { SECTION_PAD, SectionHead } from "@/components/torneos/SectionHead";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { TORNEOS_PLACAS, type Placa } from "@/lib/torneos-placas";
import { cn } from "@/lib/utils";

import { Poster } from "./screens/Poster";

/** Fan positions of the posts (back to front): rotation and offset. */
const FAN = [
  { rotate: -9, x: "-62%", y: 22 },
  { rotate: -3, x: "-22%", y: 6 },
  { rotate: 4, x: "20%", y: 12 },
  { rotate: 9, x: "58%", y: 30 },
];

function FanItem({ index, total, progress, children }: { index: number; total: number; progress: MotionValue<number>; children: React.ReactNode }) {
  const spot = FAN[Math.min(index + (FAN.length - total), FAN.length - 1)];
  const from = index * 0.15;
  const opacity = useTransform(progress, [from, Math.min(from + 0.35, 1)], [0, 1]);
  const lift = useTransform(progress, [from, Math.min(from + 0.35, 1)], [30, spot.y]);
  return (
    <motion.div
      className="absolute left-1/2 top-0 w-[44%] max-w-[230px] origin-bottom overflow-hidden rounded-xl shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
      style={{ opacity, y: lift, rotate: spot.rotate, translateX: `calc(-50% + ${spot.x})`, zIndex: index }}
    >
      {children}
    </motion.div>
  );
}

function RealFan({ placas, progress }: { placas: readonly Placa[]; progress: MotionValue<number> }) {
  return (
    <>
      {placas.map((placa, index) => (
        <FanItem key={placa.src} index={index} total={placas.length} progress={progress}>
          <Image src={placa.src} alt="" width={placa.width} height={placa.height} sizes="230px" className="h-auto w-full" />
        </FanItem>
      ))}
    </>
  );
}

/** The round's summary as social posts: choose, download, share. FREE vs Premium, with real exports. */
export function TorneosPlacas() {
  const content = useTorneosContent();
  const copy = content.placas;
  const [ref, progress] = usePlayWhenVisible<HTMLDivElement>(1.8);
  const fan = TORNEOS_PLACAS.slice(0, 4);

  return (
    <section id="torneos-placas" aria-labelledby="torneos-placas-titulo" className={cn("relative overflow-hidden bg-[#05060f] py-14 text-white md:py-24", SECTION_PAD)}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(40%_50%_at_80%_40%,rgba(236,77,255,0.12),transparent_70%)]" />
      <div className="relative mx-auto grid max-w-[1180px] items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
        <div>
          <SectionHead id="torneos-placas-titulo" eyebrow={copy.eyebrow} title={copy.title} accent={copy.accent} lead={copy.lead} />
          <ol className="mt-7 grid gap-3 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
            {copy.steps.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <span className="flex items-center gap-2 text-sm font-extrabold uppercase tracking-[0.12em] text-[#c9c2ff]">
                  <i className="flex h-6 w-6 items-center justify-center rounded-full bg-[#6c4dff]/40 text-xs not-italic text-white">{index + 1}</i>
                  {step.title}
                </span>
                <p className="mt-2 text-sm leading-relaxed text-white/75">{step.text}</p>
              </li>
            ))}
          </ol>
        </div>

        <div ref={ref} aria-hidden="true" className="relative mx-auto aspect-[5/4] w-full max-w-[560px]">
          {fan.length > 0 ? (
            <RealFan placas={fan} progress={progress} />
          ) : (
            <>
              <FanItem index={0} total={2} progress={progress}>
                <Poster kind="standings" copy={content.story.posters} />
              </FanItem>
              <FanItem index={1} total={2} progress={progress}>
                <Poster kind="results" copy={content.story.posters} />
              </FanItem>
            </>
          )}
        </div>
      </div>

      <div className="relative mx-auto mt-10 grid max-w-[1180px] gap-4 md:mt-14 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5" data-placas-plan="free">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#7ff5c4]">{copy.free.label}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white/85">{copy.free.text}</p>
        </div>
        <div className="rounded-2xl border border-[#8b6dff]/50 bg-[linear-gradient(165deg,rgba(108,77,255,0.22),rgba(108,77,255,0.05))] p-5" data-placas-plan="premium">
          <p className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#c9c2ff]">{copy.premium.label}</p>
          <p className="mt-2 text-[15px] leading-relaxed text-white/90">{copy.premium.text}</p>
        </div>
      </div>
      <p className="relative mx-auto mt-5 max-w-[1180px] text-xs font-semibold text-white/60">{fan.length > 0 ? copy.note : content.demoNote}</p>
    </section>
  );
}
