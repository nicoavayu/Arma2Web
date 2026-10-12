"use client";

import { Award, ShieldAlert } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { PhoneFrame } from "@/components/shared/PhoneFrame";
import type { ShotId } from "@/lib/shots";
import { cn } from "@/lib/utils";

const SHOTS: ShotId[] = ["jugadores/encuesta-figura", "jugadores/perfil", "jugadores/estadisticas"];

export function DespuesDelPartido() {
  const { t } = useLanguage();
  const copy = t.home.after;

  return (
    <section id="despues-del-partido" className="scroll-mt-20 border-b border-white/[0.07]">
      <div className="mx-auto max-w-[1200px] px-4 py-20 md:px-6 md:py-28">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-extrabold leading-[1.02] tracking-[-0.03em] text-white">{copy.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#a3a8b8]">{copy.lead}</p>
        </div>

        <div className="mt-12">
          <h3 className="text-sm font-semibold text-white/60">{copy.stepsLabel}</h3>
          <ol className="mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-3 [scrollbar-width:thin] lg:grid lg:grid-cols-9 lg:overflow-visible">
            {copy.steps.map((step, index) => (
              <li
                key={step}
                className="flex min-w-[9.5rem] snap-start flex-col gap-3 rounded-xl border border-white/10 bg-white/[0.02] p-3 lg:min-w-0"
              >
                <span className="text-xs font-semibold tabular-nums text-[#27b8ff]">{String(index).padStart(2, "0")}</span>
                <span className="text-sm font-medium leading-snug text-white">{step}</span>
              </li>
            ))}
          </ol>
          <p className="mt-1 text-xs text-white/40 lg:hidden">{copy.swipeHint}</p>
        </div>

        <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.6fr] lg:gap-14">
          <div className="space-y-4">
            {copy.outcomes.map((outcome) => {
              const award = outcome.kind === "award";
              const Icon = award ? Award : ShieldAlert;
              return (
                <div key={outcome.title} className="rounded-xl border border-white/10 p-5">
                  <p className={cn("flex items-center gap-2 font-semibold", award ? "text-[#ec4dff]" : "text-[#ef4444]")}>
                    <Icon aria-hidden="true" className="h-5 w-5" />
                    {outcome.title}
                  </p>
                  <p className="mt-2 leading-relaxed text-white/75">{outcome.text}</p>
                </div>
              );
            })}
            <div className="rounded-xl border border-white/10 p-5">
              <p className="font-semibold text-white">{copy.profileTitle}</p>
              <p className="mt-2 leading-relaxed text-white/75">{copy.profile}</p>
            </div>
          </div>

          <div className="grid grid-cols-3 items-start gap-3 sm:gap-5">
            {SHOTS.map((shot, index) => (
              <figure key={shot} className={cn(index === 1 && "lg:mt-10")}>
                <PhoneFrame id={shot} sizes="(max-width: 1024px) 31vw, 220px" />
                <figcaption className="mt-3 text-center text-xs text-white/55">{copy.captions[index]}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
