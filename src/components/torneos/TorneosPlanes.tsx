"use client";

import { ArrowUpRight, Check } from "lucide-react";

import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getCreateTournamentTarget, getPremiumTournamentTarget, type CtaTarget } from "@/lib/torneos-links";
import { cn } from "@/lib/utils";

function CtaLink({ target, label, tone }: { target: CtaTarget; label: string; tone: "ink" | "violet" }) {
  return (
    <a
      href={target.href}
      target={target.isExternal ? "_blank" : undefined}
      rel={target.isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-base font-semibold transition-colors",
        tone === "ink" ? "bg-[#070711] text-white hover:bg-[#5b4bff]" : "bg-[#5b4bff] text-white hover:bg-[#6d5fff]",
      )}
    >
      {label}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

/**
 * Plans and comparison. Every number comes from `plans` in torneos-content.ts
 * (commercial model of spec §6.1).
 */
export function TorneosPlanes() {
  const copy = useTorneosContent().plans;

  return (
    <section id="torneos-planes" className="scroll-mt-16 bg-[#f5f1e9] text-[#070711]">
      <div className="mx-auto max-w-[1240px] px-4 py-20 md:px-6 md:py-28">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2rem,4.8vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]">{copy.title}</h2>
          <p className="mt-5 text-lg leading-relaxed text-[#44465a]">{copy.lead}</p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          <article className="flex flex-col rounded-2xl border border-[#070711]/15 bg-white p-6 md:p-8">
            <h3 className="text-sm font-bold tracking-[0.14em]">{copy.free.name}</h3>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="text-5xl font-extrabold tracking-tight">{copy.free.price}</span>
              <span className="text-sm text-[#44465a]">{copy.free.priceDetail}</span>
            </p>
            <p className="mt-3 text-[#44465a]">{copy.free.lead}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-[#44465a]">{copy.includes}</p>
            <ul className="mt-3 flex-1 space-y-2.5">
              {copy.free.features.map((feature) => (
                <li key={feature} className="grid grid-cols-[1.25rem_1fr] gap-2.5 text-[15px] leading-snug">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 text-[#5b4bff]" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaLink target={getCreateTournamentTarget()} label={copy.start} tone="ink" />
            </div>
          </article>

          <article className="flex flex-col rounded-2xl bg-[#070711] p-6 text-white md:p-8">
            <h3 className="text-sm font-bold tracking-[0.14em] text-[#8f84ff]">{copy.premium.name}</h3>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="text-5xl font-extrabold tracking-tight">{copy.premium.price}</span>
              <span className="text-sm text-white/65">{copy.premium.priceDetail}</span>
            </p>
            <p className="mt-3 text-white/70">{copy.premium.lead}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{copy.premiumAdds}</p>
            <ul className="mt-3 flex-1 space-y-2.5">
              {copy.premium.features.map((feature) => (
                <li key={feature} className="grid grid-cols-[1.25rem_1fr] gap-2.5 text-[15px] leading-snug">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 text-[#20e39b]" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaLink target={getPremiumTournamentTarget()} label={copy.choosePremium} tone="violet" />
              <p className="mt-3 text-center text-xs text-white/55">{copy.upgrade}</p>
            </div>
          </article>
        </div>

        <ul className="mt-6 space-y-1.5 text-sm text-[#44465a]">
          <li>{copy.renewal}</li>
          <li>{copy.photosNotice}</li>
        </ul>

        <p className="mt-14 text-xs text-[#44465a] md:hidden">{copy.comparison.scrollHint}</p>
        <div className="mt-2 overflow-x-auto rounded-xl border border-[#070711]/15 bg-white md:mt-14">
          <table className="w-full min-w-[620px] border-collapse text-left text-sm">
            <caption className="px-5 pt-5 text-left text-base font-semibold">{copy.comparison.caption}</caption>
            <thead>
              <tr className="border-b border-[#070711]/15 text-xs uppercase tracking-[0.1em] text-[#44465a]">
                <th scope="col" className="sticky left-0 bg-white px-5 py-3 font-semibold">{copy.comparison.plan}</th>
                <th scope="col" className="px-5 py-3 font-semibold">{copy.free.name}</th>
                <th scope="col" className="px-5 py-3 font-semibold text-[#5b4bff]">{copy.premium.name}</th>
              </tr>
            </thead>
            <tbody>
              {copy.comparison.rows.map(([label, free, premium]) => (
                <tr key={label} className="border-b border-[#070711]/10 last:border-b-0">
                  <th scope="row" className="sticky left-0 bg-white px-5 py-3 font-medium">{label}</th>
                  {[free, premium].map((value, index) => (
                    <td key={index} className="px-5 py-3 text-[#2a2c3d]">
                      {value === "✓" ? (
                        <>
                          <Check aria-hidden="true" className="h-4 w-4 text-[#5b4bff]" />
                          <span className="sr-only">{copy.comparison.included}</span>
                        </>
                      ) : (
                        value
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
