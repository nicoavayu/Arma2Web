"use client";

import React from "react";
import Image from "next/image";
import { Section } from "@/components/Section";
import { motion } from "framer-motion";
import { STORE_LINKS } from "@/lib/store-links";
import { useLanguage } from "@/components/LanguageProvider";

function DeviceShowcase({ className = "" }: { className?: string }) {
    return (
        <div className={`hero-device-stage relative flex items-center justify-center ${className}`}>
            <div className="hero-device-halo" />

            <motion.div
                initial={{ opacity: 0, x: -22, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.25 }}
                className="hero-device-frame relative w-[min(80vw,330px)] max-w-none shrink-0 [@media(max-width:430px)]:w-[min(82vw,310px)] sm:w-[min(58vw,360px)] md:w-[min(48vw,520px)] lg:w-[min(46vw,580px)] xl:w-[min(44vw,640px)]"
            >
                <div className="premium-drift relative aspect-[1093/1145] w-full">
                    <Image
                        src="/HERO4.png"
                        alt="Arma2 app en celulares mostrando el inicio y la actividad reciente"
                        fill
                        sizes="(max-width: 768px) 82vw, (max-width: 1280px) 48vw, 640px"
                        className="hero-device-image select-none object-contain drop-shadow-[0_36px_90px_rgba(0,0,0,0.6)] [backface-visibility:hidden] [transform:translateZ(0)]"
                        priority
                    />
                </div>
            </motion.div>
        </div>
    );
}

export function Hero() {
    const { t } = useLanguage();

    return (
        <Section
            id="home"
            className="hero-mobile-vh premium-section relative isolate flex min-h-[100dvh] min-h-[100svh] items-start overflow-hidden bg-background pt-[calc(var(--nav-height-mobile)+1rem+env(safe-area-inset-top))] pb-[max(1.5rem,env(safe-area-inset-bottom))] [@media(max-width:430px)]:pt-[calc(var(--nav-height-mobile)+0.7rem+env(safe-area-inset-top))] md:min-h-screen md:items-center md:pt-32 md:pb-20"
        >
            {/* Photographic stadium background */}
            <div className="absolute inset-0 -z-30 pointer-events-none">
                <Image
                    src="/BG_HERO.png"
                    alt=""
                    aria-hidden="true"
                    fill
                    quality={60}
                    sizes="100vw"
                    className="hero-photo-img"
                    priority
                />
            </div>
            <div className="hero-photo-overlay absolute inset-0 -z-20 pointer-events-none" />

            {/* Subtle tech grid (kept from existing design) */}
            <div
                className="hero-grid-layer absolute inset-0 -z-10 pointer-events-none opacity-[0.16]"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.07) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: "44px 44px"
                }}
            />

            <div className="container relative mx-auto max-w-[92rem]">
                <div className="grid grid-cols-1 items-center gap-5 md:grid-cols-[1.08fr_1fr] md:gap-8 lg:grid-cols-[1.12fr_1fr] lg:gap-12 xl:grid-cols-[1.16fr_1fr]">
                    {/* Left: phones (protagonist) */}
                    <DeviceShowcase className="order-1 w-full md:min-h-[520px] lg:min-h-[600px] xl:min-h-[660px]" />

                    {/* Right: copy */}
                    <div className="order-2 relative z-20 flex min-w-0 flex-col items-center text-center md:items-start md:text-left">
                        <motion.span
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.45 }}
                            className="premium-eyebrow mb-3 inline-flex md:mb-4"
                        >
                            {t.hero.eyebrow}
                        </motion.span>

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="premium-display mb-4 w-full max-w-[38rem] text-white md:mb-6"
                        >
                            <span className="premium-metal block">{t.hero.title.lineOne}</span>
                            <span className="premium-gradient-text premium-hero-line block">{t.hero.title.highlight}</span>
                            <span className="premium-metal block">{t.hero.title.lineThree}</span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-6 w-full max-w-xl text-[15px] leading-relaxed text-white/72 [@media(max-width:430px)]:mb-5 [@media(max-width:430px)]:text-[14px] sm:text-base md:mb-7 md:text-lg xl:text-xl"
                        >
                            {t.hero.description}
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex w-full flex-col items-center justify-center gap-2.5 [@media(max-width:430px)]:gap-2 sm:flex-row md:w-auto md:justify-start md:gap-4"
                        >
                            <a
                                href={STORE_LINKS.appStore}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t.stores.appStore.ariaLabel}
                                className="premium-store-button group inline-flex min-h-14 w-full cursor-pointer items-center justify-center px-5 py-3 text-white tracking-wide outline-none transition-all duration-300 backdrop-blur-md [@media(max-width:430px)]:min-h-12 [@media(max-width:430px)]:px-4 [@media(max-width:430px)]:py-2.5 sm:w-auto"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="36px" fill="#fff" className="mr-2 inline [@media(max-width:430px)]:w-8" viewBox="0 0 22.773 22.773">
                                    <path
                                        d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-[10px] text-white leading-none text-left font-medium">{t.stores.appStore.eyebrow}</p>
                                    <span className="text-sm font-semibold">{t.stores.appStore.label}</span>
                                </div>
                            </a>

                            <a
                                href={STORE_LINKS.googlePlay}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={t.stores.googlePlay.ariaLabel}
                                className="premium-store-button group inline-flex min-h-14 w-full cursor-pointer items-center justify-center px-5 py-3 text-white tracking-wide outline-none transition-all duration-300 backdrop-blur-md [@media(max-width:430px)]:min-h-12 [@media(max-width:430px)]:px-4 [@media(max-width:430px)]:py-2.5 sm:w-auto"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="36px" fill="#fff" className="mr-2 inline [@media(max-width:430px)]:w-8" viewBox="0 0 64 64">
                                    <path fill="#57cef3" d="M7 3v58l33-29z" />
                                    <path fill="#fff200" d="m36 32 8-10 15 10-15 10z" />
                                    <path fill="#48ff48" d="M36 32 7 3h4l34 20z" />
                                    <path fill="#ff6c58" d="M36 32 7 61h4l34-20z" />
                                    <path fill="#f33" d="M9.1 64c-1.9 0-3.6-1-4.5-2.6L8 58.2v.7c0 .3.1.6.3.8L24 44c7.4 0 14.1-1.2 18.3-3.1l5.8-3.4v4.6L11.7 63.3c-.7.5-1.6.7-2.6.7z" />
                                    <path fill="#0779e4" d="M9.1 4C8.5 4 8 4.5 8 5.1V36c0 4.4 7.2 8 16 8L5.5 62.5c-.9-.9-1.5-2.2-1.5-3.6V5.1C4 2.3 6.3 0 9.1 0z" />
                                    <path fill="#314a52" d="M8.3 4.3c.2-.2.5-.3.8-.3.2 0 .4.1.6.2l45.5 26.6c.5.2.8.7.8 1.2s-.3 1-.7 1.3l-11.4 6.6 2.9 2.9 10.4-6.1c1.7-1 2.7-2.8 2.7-4.7s-1-3.8-2.7-4.7L11.7.7C11 .2 10.1 0 9.1 0 7.7 0 6.4.6 5.5 1.5z" />
                                </svg>
                                <div>
                                    <p className="text-[10px] text-white leading-none text-left font-medium">{t.stores.googlePlay.eyebrow}</p>
                                    <span className="text-sm font-semibold">{t.stores.googlePlay.label}</span>
                                </div>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
