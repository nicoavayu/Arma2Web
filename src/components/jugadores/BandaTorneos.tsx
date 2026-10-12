"use client";

import Image from "next/image";
import React from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { SiteSwitch } from "@/components/shared/SiteSwitch";
import { BRAND } from "@/lib/brand-assets";

/** Doorway to Arma2 Torneos, over Nico's stadium photo. */
export function BandaTorneos() {
  const { t } = useLanguage();
  const copy = t.home.torneosBand;
  const ref = React.useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} id="torneos" className="relative flex min-h-[92vh] items-center overflow-hidden bg-[#05040d]">
      <motion.div aria-hidden="true" className="absolute inset-x-0 -inset-y-[8%]" style={{ y }}>
        <Image src={BRAND.bgStadium.src} alt="" fill sizes="100vw" className="object-cover object-[70%_50%]" />
      </motion.div>
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,4,13,0.92)_0%,rgba(5,4,13,0.6)_42%,rgba(5,4,13,0.05)_75%),linear-gradient(180deg,#05040d_0%,transparent_18%,transparent_82%,#05040d_100%)]"
      />
      <div className="relative max-w-[720px] px-[clamp(20px,6vw,104px)] py-24">
        <Image src="/torneos/logo-torneos.png" alt="Arma2 Torneos" width={1452} height={168} className="mb-7 h-[clamp(24px,2.8vw,36px)] w-auto" />
        <h2 className="text-[clamp(2.3rem,5vw,4.6rem)] font-extrabold leading-[1] tracking-[-0.045em] text-white">{copy.title}</h2>
        <p className="mb-8 mt-5 max-w-[36ch] text-[clamp(1rem,1.3vw,1.2rem)] leading-relaxed text-[#d6d2ee]">{copy.body}</p>
        <SiteSwitch
          to="torneos"
          label={copy.cta}
          className="min-h-12 rounded-full bg-white px-6 text-sm font-bold text-[#0b0820] transition-transform hover:-translate-y-0.5"
        />
      </div>
    </section>
  );
}
