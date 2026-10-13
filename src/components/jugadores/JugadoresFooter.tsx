"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/LanguageProvider";
import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { StoreButtons } from "@/components/shared/StoreButtons";
import { BRAND } from "@/lib/brand-assets";

const linkClass = "text-sm text-white/60 transition-colors hover:text-white";

export function JugadoresFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.07] bg-[#05040d]">
      <div className="grid gap-10 px-[clamp(20px,6vw,104px)] py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" className="inline-flex items-center">
            <Image src={BRAND.logoArma2.src} alt="Arma2" width={BRAND.logoArma2.width} height={BRAND.logoArma2.height} className="h-10 w-auto" />
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t.footer.description}</p>
          <StoreButtons tone="glass" className="mt-6" />
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{t.footer.productTitle}</h2>
          <ul className="mt-4 space-y-3">
            <li><Link href="/#como-funciona" className={linkClass}>{t.footer.links.howItWorks}</Link></li>
            <li><Link href="/#funciones" className={linkClass}>{t.footer.links.features}</Link></li>
            <li><Link href="/#preguntas" className={linkClass}>{t.footer.links.faq}</Link></li>
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{t.footer.torneosTitle}</h2>
          <p className="mt-4 text-sm leading-relaxed text-white/60">{t.footer.torneosBlurb}</p>
          <SiteSwitch to="torneos" label={t.footer.links.torneos} className="mt-3 text-sm font-semibold text-[#27b8ff] hover:text-white" />
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{t.footer.legalTitle}</h2>
          <ul className="mt-4 space-y-3">
            <li><Link href="/privacy" className={linkClass}>{t.footer.links.privacy}</Link></li>
            <li><Link href="/terms" className={linkClass}>{t.footer.links.terms}</Link></li>
            <li><Link href="/delete-account" className={linkClass}>{t.footer.links.deleteAccount}</Link></li>
            <li><Link href="/contact" className={linkClass}>{t.footer.links.contact}</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/[0.07] px-[clamp(20px,6vw,104px)] py-6 text-xs text-white/55">
        © {year} Arma2. {t.footer.rights}
      </div>
    </footer>
  );
}
