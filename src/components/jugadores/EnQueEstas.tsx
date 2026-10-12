"use client";

import { Check } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { ChapterNav } from "@/components/jugadores/ChapterNav";
import { PhoneFrame } from "@/components/shared/PhoneFrame";
import { useActiveSection } from "@/lib/use-active-section";
import { cn } from "@/lib/utils";

/**
 * Three stacked chapters, one per player situation. Everything stays in the
 * HTML (no tabs), and the sticky nav only marks and jumps between them.
 */
export function EnQueEstas() {
  const { t } = useLanguage();
  const copy = t.home.chapters;
  const active = useActiveSection(copy.items.map((item) => item.id));

  return (
    <section id="en-que-estas" className="scroll-mt-16 border-b border-white/[0.07]">
      <span id="features" aria-hidden="true" className="block -translate-y-20" />
      <div className="mx-auto max-w-[1200px] px-4 pb-10 pt-20 md:px-6 md:pt-28">
        <h2 className="text-[clamp(2rem,4.4vw,3rem)] font-extrabold tracking-[-0.03em] text-white">{copy.title}</h2>
        <p className="mt-3 text-lg text-[#a3a8b8]">{copy.lead}</p>
      </div>

      <ChapterNav label={copy.navLabel} items={copy.items} active={active} />

      {copy.items.map((item, index) => (
        <article
          key={item.id}
          id={item.id}
          aria-labelledby={`${item.id}-title`}
          className="scroll-mt-32 border-b border-white/[0.07] last:border-b-0"
        >
          <div className="mx-auto grid max-w-[1200px] items-center gap-10 px-4 py-16 md:px-6 md:py-24 lg:grid-cols-2 lg:gap-16">
            <div className={cn(index % 2 === 1 && "lg:order-2")}>
              <p className="text-sm font-semibold text-[#27b8ff]">{item.label}</p>
              <h3 id={`${item.id}-title`} className="mt-2 text-[clamp(1.75rem,3.4vw,2.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white">
                {item.title}
              </h3>
              <ul className="mt-7 space-y-4">
                {item.points.map((point, pointIndex) => (
                  <li
                    key={point}
                    // Old shared links (/#mercado-arqueros) land on the goalkeeper-market point.
                    id={item.id === "me-faltan-jugadores" && pointIndex === 2 ? "mercado-arqueros" : undefined}
                    className="grid scroll-mt-36 grid-cols-[1.5rem_1fr] gap-3 leading-relaxed text-white/80"
                  >
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 text-[#20e39b]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mx-auto grid w-full max-w-[30rem] grid-cols-2 items-start gap-4">
              {item.shots.map((shot, shotIndex) => (
                <PhoneFrame key={shot} id={shot} className={cn(shotIndex === 1 && "mt-10")} sizes="(max-width: 1024px) 44vw, 240px" />
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
