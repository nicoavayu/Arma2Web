"use client";

import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { TorneosLogo, useTorneosHomeHref } from "@/components/torneos/TorneosNav";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getSiteUrl } from "@/lib/site-urls";
import { TORNEOS_CONTACT_HREF, TORNEOS_LEGAL_LINKS } from "@/lib/torneos-links";

const linkClass = "text-sm text-white/60 transition-colors hover:text-white";

export function TorneosFooter({ homeHref: override }: { homeHref?: string }) {
  const homeHref = useTorneosHomeHref(override);
  const content = useTorneosContent();
  const copy = content.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.07] bg-[#04050d]">
      <div className="grid grid-cols-2 gap-x-6 gap-y-8 px-[clamp(20px,6vw,104px)] py-10 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:gap-10 md:py-14">
        <div className="col-span-2 md:col-span-1">
          <TorneosLogo className="h-5 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{copy.description}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{copy.product}</h2>
          <ul className="mt-4 space-y-3">
            {content.nav.links.map((link) => (
              <li key={link.href}>
                <a href={`${homeHref}${link.href}`} className={linkClass}>{link.label}</a>
              </li>
            ))}
            <li><a href={getSiteUrl("torneos", "/ejemplo")} className={linkClass}>{copy.example}</a></li>
          </ul>
        </div>
        {/* Phones: product and legal side by side, players below. */}
        <div className="order-last col-span-2 md:order-none md:col-span-1">
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{copy.playersTitle}</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{copy.playersBlurb}</p>
          <SiteSwitch to="jugadores" className="mt-3 text-sm font-semibold text-[#27b8ff] hover:text-white" />
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{copy.legal}</h2>
          <ul className="mt-4 space-y-3">
            <li><a href={getSiteUrl("jugadores", "/privacy")} className={linkClass}>{copy.privacy}</a></li>
            <li><a href={getSiteUrl("jugadores", "/terms")} className={linkClass}>{copy.terms}</a></li>
            <li><a href={TORNEOS_LEGAL_LINKS.termsOfSale} className={linkClass}>{copy.termsOfSale}</a></li>
            <li><a href={getSiteUrl("jugadores", TORNEOS_CONTACT_HREF)} className={linkClass}>{copy.contact}</a></li>
          </ul>
        </div>
      </div>
      {/* Consumer buttons of the purchase (Disp. DNDCyAC 954/2025): the pages live on the app host, where Premium is sold. */}
      <div className="flex flex-wrap gap-3 border-t border-white/[0.07] px-[clamp(20px,6vw,104px)] py-5">
        <a href={TORNEOS_LEGAL_LINKS.revocation} className="inline-flex min-h-11 items-center rounded-full border border-white/60 px-4 text-sm font-extrabold tracking-[0.02em] text-white hover:bg-white/10">
          {copy.revocation}
        </a>
        <a href={TORNEOS_LEGAL_LINKS.cancellation} className="inline-flex min-h-11 items-center rounded-full border border-white/60 px-4 text-sm font-extrabold tracking-[0.02em] text-white hover:bg-white/10">
          {copy.cancellation}
        </a>
      </div>
      <div className="border-t border-white/[0.07] px-[clamp(20px,6vw,104px)] py-6 text-xs text-white/55">
        © {year} Arma2. {copy.rights}
      </div>
    </footer>
  );
}
