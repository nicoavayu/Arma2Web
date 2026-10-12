"use client";

import Image from "next/image";
import Link from "next/link";

import { useLanguage } from "@/components/LanguageProvider";
import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { StoreButtons } from "@/components/shared/StoreButtons";

const linkClass = "text-sm text-white/60 transition-colors hover:text-white";

export function JugadoresFooter() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/[0.07] bg-[#070711]">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-4 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:px-6">
        <div>
          <Link href="/" className="inline-flex items-center gap-2.5">
            <Image src="/logo_navbar.png" alt="" width={26} height={32} className="h-7 w-auto brightness-0 invert" />
            <span className="text-[15px] font-extrabold tracking-tight text-white">Arma2</span>
          </Link>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">{t.footer.description}</p>
          <StoreButtons className="mt-6" />
        </div>

        <div>
          <h2 className="text-xs font-semibold uppercase tracking-[0.12em] text-white/55">{t.footer.productTitle}</h2>
          <ul className="mt-4 space-y-3">
            <li><Link href="/#como-se-arman" className={linkClass}>{t.footer.links.balance}</Link></li>
            <li><Link href="/#en-que-estas" className={linkClass}>{t.footer.links.chapters}</Link></li>
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
      <div className="mx-auto max-w-[1200px] border-t border-white/[0.07] px-4 py-6 text-xs text-white/55 md:px-6">
        © {year} Arma2. {t.footer.rights}
      </div>
    </footer>
  );
}
