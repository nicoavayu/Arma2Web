"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { getCreateTournamentTarget } from "@/lib/torneos-links";

export function TorneosLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return <Image src="/torneos/logo-torneos.png" alt="Arma2 Torneos" width={1452} height={168} className={`${className} object-contain`} priority />;
}

export function TorneosNav() {
  const copy = useTorneosContent().nav;
  const [open, setOpen] = React.useState(false);
  const enter = getCreateTournamentTarget();

  React.useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-[#070711]" style={{ paddingTop: "env(safe-area-inset-top)" }}>
      <div className="mx-auto flex h-16 max-w-[1240px] items-center justify-between gap-4 px-4 md:px-6">
        <a href="#torneos-hero" aria-label={copy.home} className="flex shrink-0 items-center">
          <TorneosLogo className="h-[18px] w-auto md:h-5" />
        </a>

        <nav aria-label="Arma2 Torneos" className="hidden items-center gap-6 xl:flex">
          {copy.links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-white/70 transition-colors hover:text-white">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2 md:gap-3">
          <SiteSwitch to="jugadores" className="hidden text-sm font-medium text-white/70 hover:text-white lg:inline-flex" />
          <div className="hidden sm:block">
            <LanguageToggle />
          </div>
          <a
            href={enter.href}
            target={enter.isExternal ? "_blank" : undefined}
            rel={enter.isExternal ? "noopener noreferrer" : undefined}
            aria-label={copy.enterAria}
            className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-[#5b4bff] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#6d5fff]"
          >
            {copy.enter}
            <ArrowUpRight aria-hidden="true" className="h-4 w-4" />
          </a>
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="torneos-menu"
            aria-label={open ? copy.close : copy.open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/15 text-white xl:hidden"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div id="torneos-menu" className="h-[calc(100dvh-4rem)] overflow-y-auto border-t border-white/[0.08] bg-[#070711] px-4 pb-8 xl:hidden">
          <nav aria-label="Arma2 Torneos" className="flex flex-col">
            {copy.links.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="border-b border-white/[0.08] py-4 text-xl font-bold tracking-tight text-white">
                {link.label}
              </a>
            ))}
            <SiteSwitch to="jugadores" className="border-b border-white/[0.08] py-4 text-xl font-bold tracking-tight text-white/80" />
          </nav>
          <div className="mt-6">
            <LanguageToggle />
          </div>
        </div>
      )}
    </header>
  );
}
