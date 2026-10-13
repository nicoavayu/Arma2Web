"use client";

import { ArrowUpRight, Check, ChevronDown } from "lucide-react";

import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { COMMERCIAL } from "@/lib/torneos-content";
import { getCreateTournamentTarget, getPremiumTournamentTarget, type CtaTarget } from "@/lib/torneos-links";
import { cn } from "@/lib/utils";

function CtaLink({ target, label, tone }: { target: CtaTarget; label: string; tone: "ghost" | "violet" }) {
  return (
    <a
      href={target.href}
      target={target.isExternal ? "_blank" : undefined}
      rel={target.isExternal ? "noopener noreferrer" : undefined}
      className={cn(
        "inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl px-5 text-base font-bold transition-transform hover:-translate-y-0.5",
        tone === "ghost"
          ? "border border-white/20 bg-white/[0.04] text-white"
          : "bg-[linear-gradient(135deg,#7b5cff,#5a3df0)] text-white shadow-[0_12px_34px_-10px_rgba(108,77,255,0.9)]",
      )}
    >
      {label}
      <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
    </a>
  );
}

function Badge({ children, tone }: { children: string; tone: "live" | "soon" }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.1em]",
        tone === "live" ? "bg-[#2ee59d]/15 text-[#7ff5c4]" : "bg-white/12 text-white/85",
      )}
    >
      {children}
    </span>
  );
}

/**
 * Plans and comparison. Every number comes from `plans` in torneos-content.ts,
 * which builds them from COMMERCIAL. While Premium can't be bought, its card
 * says "Próximamente" and has no purchase link.
 */
export function TorneosPlanes() {
  const copy = useTorneosContent().plans;

  return (
    <section id="torneos-planes" className="relative overflow-hidden bg-[#04050d] text-white">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(50%_50%_at_50%_35%,rgba(108,77,255,0.22),transparent_70%)]" />
      <div className="relative px-[clamp(20px,6vw,104px)] py-24 md:py-32">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="disp-t text-[clamp(2.6rem,5.4vw,5.2rem)]">{copy.title}</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-white/70">{copy.lead}</p>
        </div>

        <div className="mx-auto mt-14 grid max-w-[920px] gap-5 lg:grid-cols-2">
          <article className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.045] p-7 md:p-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xs font-extrabold tracking-[0.16em] text-[#c9c2ff]">{copy.free.name}</h3>
              <Badge tone="live">{copy.free.tag}</Badge>
            </div>
            <p className="mt-4 flex items-baseline gap-2">
              <span className="disp-t text-6xl">{copy.free.price}</span>
              <span className="text-sm text-white/65">{copy.free.priceDetail}</span>
            </p>
            <p className="mt-3 text-white/70">{copy.free.lead}</p>
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{copy.includes}</p>
            <ul className="mt-3 flex-1 space-y-2.5">
              {copy.free.features.map((feature) => (
                <li key={feature} className="grid grid-cols-[1.25rem_1fr] gap-2.5 text-[15px] leading-snug text-white/85">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 text-[#2ee59d]" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <CtaLink target={getCreateTournamentTarget()} label={copy.start} tone="ghost" />
            </div>
          </article>

          <article className="flex flex-col rounded-3xl border border-[#8b6dff]/60 bg-[linear-gradient(170deg,rgba(108,77,255,0.28),rgba(108,77,255,0.06))] p-7 shadow-[0_30px_80px_-30px_rgba(108,77,255,0.8)] md:p-8">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xs font-extrabold tracking-[0.16em] text-[#c9c2ff]">{copy.premium.name}</h3>
              {!COMMERCIAL.premiumAvailable && <Badge tone="soon">{copy.premium.tag}</Badge>}
            </div>
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.12em] text-white/65">{copy.premium.priceLabel}</p>
            <p className="mt-1 flex flex-wrap items-baseline gap-x-2 gap-y-1">
              <span className="disp-t text-6xl">{copy.premium.price}</span>
              <span className="text-sm text-white/70">{copy.premium.priceDetail}</span>
            </p>
            {copy.premium.season.map((line) => (
              <p key={line} className="mt-3 text-[15px] leading-snug text-white/75">
                {line}
              </p>
            ))}
            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.12em] text-white/60">{copy.premiumAdds}</p>
            <ul className="mt-3 flex-1 space-y-2.5">
              {copy.premium.features.map((feature) => (
                <li key={feature} className="grid grid-cols-[1.25rem_1fr] gap-2.5 text-[15px] leading-snug text-white/90">
                  <Check aria-hidden="true" className="mt-0.5 h-4 w-4 text-[#2ee59d]" />
                  {feature}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              {COMMERCIAL.premiumAvailable ? (
                <CtaLink target={getPremiumTournamentTarget()} label={copy.choosePremium} tone="violet" />
              ) : (
                <>
                  <p className="flex min-h-12 w-full items-center justify-center rounded-xl border border-dashed border-white/30 px-5 text-base font-bold text-white/80">
                    {copy.comingSoon}
                  </p>
                  <p className="mt-3 text-center text-xs text-white/65">{copy.comingSoonNote}</p>
                </>
              )}
            </div>
          </article>
        </div>

        <p className="mx-auto mt-6 max-w-[920px] text-center text-sm text-white/60">{copy.photosNotice}</p>

        <details className="group mx-auto mt-12 max-w-[920px] rounded-2xl border border-white/10 bg-white/[0.03]">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-base font-semibold [&::-webkit-details-marker]:hidden">
            {copy.comparison.toggle}
            <ChevronDown aria-hidden="true" className="h-5 w-5 text-white/70 transition-transform group-open:rotate-180" />
          </summary>
          <p className="px-5 text-xs text-white/55 md:hidden">{copy.comparison.scrollHint}</p>
          <div className="mt-2 overflow-x-auto px-1 pb-4">
            <table className="w-full min-w-[620px] border-collapse text-left text-sm">
              <caption className="sr-only">{copy.comparison.caption}</caption>
              <thead>
                <tr className="border-b border-white/10 text-xs uppercase tracking-[0.1em] text-white/60">
                  <th scope="col" className="sticky left-0 bg-[#0b0c18] px-5 py-3 font-semibold">{copy.comparison.plan}</th>
                  <th scope="col" className="px-5 py-3 font-semibold">{copy.free.name}</th>
                  <th scope="col" className="px-5 py-3 font-semibold text-[#b8a8ff]">{copy.premium.name}</th>
                </tr>
              </thead>
              <tbody>
                {copy.comparison.rows.map(([label, free, premium]) => (
                  <tr key={label} className="border-b border-white/[0.06] last:border-b-0">
                    <th scope="row" className="sticky left-0 bg-[#0b0c18] px-5 py-3 font-medium text-white/90">{label}</th>
                    {[free, premium].map((value, index) => (
                      <td key={index} className="px-5 py-3 text-white/75">
                        {value === "✓" ? (
                          <>
                            <Check aria-hidden="true" className="h-4 w-4 text-[#2ee59d]" />
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
        </details>
      </div>
    </section>
  );
}
