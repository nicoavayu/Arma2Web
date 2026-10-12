"use client";

import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { TorneosLogo } from "@/components/torneos/TorneosNav";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getSiteUrl } from "@/lib/site-urls";
import { TORNEOS_CONTACT_HREF } from "@/lib/torneos-links";

const linkClass = "text-sm text-white/60 transition-colors hover:text-white";

export function TorneosFooter() {
  const content = useTorneosContent();
  const copy = content.footer;
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.08] bg-[#070711]">
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 py-14 md:grid-cols-[1.5fr_1fr_1fr_1fr] md:px-6">
        <div>
          <TorneosLogo className="h-5 w-auto" />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{copy.description}</p>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">{copy.product}</h2>
          <ul className="mt-4 space-y-3">
            {content.nav.links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className={linkClass}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">{copy.playersTitle}</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{copy.playersBlurb}</p>
          <SiteSwitch to="jugadores" className="mt-3 text-sm font-semibold text-[#27b8ff] hover:text-white" />
        </div>
        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/45">{copy.legal}</h2>
          <ul className="mt-4 space-y-3">
            <li><a href={getSiteUrl("jugadores", "/privacy")} className={linkClass}>{copy.privacy}</a></li>
            <li><a href={getSiteUrl("jugadores", "/terms")} className={linkClass}>{copy.terms}</a></li>
            <li><a href={getSiteUrl("jugadores", TORNEOS_CONTACT_HREF)} className={linkClass}>{copy.contact}</a></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-[1240px] border-t border-white/[0.08] px-4 py-6 text-xs text-white/45 md:px-6">
        © {year} Arma2. {copy.rights}
      </div>
    </footer>
  );
}
