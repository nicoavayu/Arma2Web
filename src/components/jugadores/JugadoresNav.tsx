"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { useLanguage } from "@/components/LanguageProvider";
import { BrandMark } from "@/components/cinematic/BrandMark";
import { useHomeStoryProgress } from "@/components/cinematic/useHomeStoryProgress";
import { useMounted } from "@/components/cinematic/useMounted";
import { useStaticStory } from "@/components/cinematic/useStaticStory";
import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { cn } from "@/lib/utils";
import { easeInOutCubic, seg } from "@/lib/motion-math";
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
  const pathname = usePathname();
  const mounted = useMounted();
  const storyProgress = useHomeStoryProgress();
  const staticStory = useStaticStory();
  // On the home the big mark in the hero flies into this one; until hydration we assume the top of the story.
  // The reduced-motion home has no big mark, so the nav shows its own from the start.
  const story = staticStory ? null : (storyProgress ?? (pathname === "/" && !mounted ? 0 : null));
  const markOpacity = story === null ? 1 : seg(easeInOutCubic(seg(story, 0, 0.12)), 0.9, 1);
  const solid = story === null ? scrolled : story > 0.125;

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
        solid || open ? "border-white/[0.07] bg-[#08061a]/75 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
      style={{ paddingTop: "env(safe-area-inset-top)" }}
    >
      <div className="flex h-16 w-full items-center justify-between gap-4 px-[clamp(16px,4vw,56px)] md:h-[4.5rem]">
        <Link
          href="/"
          onClick={close}
          aria-label={`Arma2 — ${t.nav.homeAria}`}
          className="group inline-flex h-11 w-11 items-center justify-center drop-shadow-[0_0_12px_rgba(123,92,255,0.75)]"
        >
          <BrandMark
            data-brand-mark="nav"
            className="h-9 w-9 transition-transform duration-500 ease-out group-hover:rotate-90 group-hover:scale-125"
            style={{ opacity: open ? 1 : markOpacity }}
          />
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
            className="inline-flex min-h-11 items-center rounded-lg border border-[#8b6dff]/40 bg-[#7b5cff]/15 px-4 text-sm font-semibold text-white transition-colors hover:bg-[#7b5cff]/30"
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
