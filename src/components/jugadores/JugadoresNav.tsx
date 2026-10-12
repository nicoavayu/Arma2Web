"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { cn } from "@/lib/utils";
import { pickStore, STORE_LINKS } from "@/lib/store-links";

/** Download target: the visitor's store on a phone, the download section otherwise. */
function useDownloadHref() {
  const [href, setHref] = React.useState("/#descargar");
  React.useEffect(() => {
    const store = pickStore(window.navigator.userAgent);
    if (store) setHref(STORE_LINKS[store]);
  }, []);
  return href;
}

export function JugadoresNav() {
  const { t } = useLanguage();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const downloadHref = useDownloadHref();
  const external = downloadHref.startsWith("http");

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-200",
        scrolled || open ? "border-white/[0.07] bg-[#070711]/[0.92]" : "border-transparent bg-transparent",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="mx-auto flex h-16 max-w-[1200px] items-center justify-between gap-4 px-4 md:h-[4.5rem] md:px-6">
        <Link href="/" onClick={close} className="flex items-center gap-2.5">
          <Image src="/logo_navbar.png" alt="" width={30} height={37} className="h-8 w-auto brightness-0 invert" priority />
          <span className="text-[15px] font-extrabold tracking-tight text-white">Arma2</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 lg:flex">
          {t.nav.links.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm font-medium text-white/70 transition-colors hover:text-white">
              {link.label}
            </Link>
          ))}
          <SiteSwitch to="torneos" className="text-sm font-medium text-white/70 transition-colors hover:text-white" />
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <a
            href={downloadHref}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className="inline-flex min-h-11 items-center rounded-lg bg-white px-4 text-sm font-semibold text-[#070711] transition-colors hover:bg-white/90"
          >
            {t.common.download}
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="jugadores-menu"
            aria-label={open ? t.nav.closeMenu : t.nav.openMenu}
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white lg:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="jugadores-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.07] bg-[#070711] px-4 pb-8 lg:hidden">
          <nav aria-label="Principal" className="flex flex-col">
            {t.nav.links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                className="border-b border-white/[0.07] py-5 text-2xl font-bold tracking-tight text-white"
              >
                {link.label}
              </Link>
            ))}
            <SiteSwitch to="torneos" className="border-b border-white/[0.07] py-5 text-2xl font-bold tracking-tight text-white" />
          </nav>
          <div className="mt-6">
            <LanguageToggle />
          </div>
        </div>
      )}
    </header>
  );
}
