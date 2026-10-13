"use client";

import React from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";

import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { useHomeStoryProgress } from "@/components/cinematic/useHomeStoryProgress";
import { useStaticStory } from "@/components/cinematic/useStaticStory";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { cn } from "@/lib/utils";
import { getCreateTournamentTarget } from "@/lib/torneos-links";

export function TorneosLogo({ className = "h-5 w-auto" }: { className?: string }) {
  return <Image src="/torneos/logo-torneos.png" alt="Arma2 Torneos" width={311} height={36} className={`${className} object-contain`} priority />;
}

export function TorneosNav() {
  const copy = useTorneosContent().nav;
  const [open, setOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const enter = getCreateTournamentTarget();
  // Transparent over the hero photo, glass once the story starts (or after scrolling on other pages).
  const storyProgress = useHomeStoryProgress("torneos-como-funciona");
  const story = useStaticStory() ? null : storyProgress;
  const solid = open || (story === null ? scrolled : story > 0.14);

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

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        solid ? "border-white/[0.07] bg-[#06071a]/75 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex h-16 w-full items-center justify-between gap-4 px-[clamp(16px,4vw,56px)] md:h-[4.5rem]">
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
            className="inline-flex min-h-11 items-center gap-1 rounded-xl bg-[linear-gradient(135deg,#7b5cff,#5a3df0)] px-4 text-sm font-bold text-white shadow-[0_10px_30px_-10px_rgba(108,77,255,0.9)] transition-transform hover:-translate-y-0.5"
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
            className="inline-flex h-11 w-11 items-center justify-center rounded-lg border border-white/15 text-white xl:hidden"
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
