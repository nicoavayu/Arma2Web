"use client";

import React from "react";
import Image from "next/image";
import { Section } from "@/components/Section";
import { motion } from "framer-motion";
import { STORE_LINKS } from "@/lib/store-links";

export function Hero() {
    return (
        <Section
            id="home"
            className="hero-mobile-vh relative isolate flex min-h-[100dvh] min-h-[100svh] items-start overflow-hidden bg-background pt-[calc(var(--nav-height-mobile)+0.5rem+env(safe-area-inset-top))] pb-[max(0.5rem,env(safe-area-inset-bottom))] [@media(max-width:430px)]:pt-[calc(var(--nav-height-mobile)+0.35rem+env(safe-area-inset-top))] [@media(max-width:430px)]:pb-[max(0.4rem,env(safe-area-inset-bottom))] md:min-h-screen md:items-center md:pt-32 md:pb-16"
        >
            {/* Tech Grid Background */}
            <div
                className="hero-grid-layer absolute inset-0 pointer-events-none opacity-[0.2]"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 hidden h-[600px] w-[1000px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] pointer-events-none -z-10 md:block" />
            <div className="absolute bottom-0 right-0 hidden h-[600px] w-[800px] rounded-full bg-accent/10 blur-[120px] pointer-events-none -z-10 md:block" />

            <div className="container relative mx-auto">
                <div className="grid grid-cols-1 items-center gap-5 [@media(max-width:430px)]:-translate-y-3 [@media(max-width:360px)]:-translate-y-2 [@media(max-width:360px)]:gap-4 md:grid-cols-2 md:gap-10 md:translate-y-0 lg:grid-cols-[1.14fr_1fr] xl:grid-cols-[1.22fr_1fr] 2xl:grid-cols-[1fr_1.15fr]">
                    {/* Left Column: Image */}
                    <div className="order-1 relative mt-0 mb-0 flex h-[50vh] min-h-[340px] max-h-[500px] items-center justify-center [@media(max-width:430px)]:h-[48vh] [@media(max-width:430px)]:min-h-[330px] [@media(max-width:430px)]:max-h-[480px] [@media(max-width:360px)]:h-[46vh] [@media(max-width:360px)]:min-h-[300px] [@media(max-width:360px)]:max-h-[430px] sm:h-[46vh] sm:min-h-[300px] sm:max-h-[420px] md:mt-0 md:mb-0 md:h-[580px] lg:h-[640px] xl:h-[700px] 2xl:h-[600px]">
                        {/* Premium Glow Effect - Increased visibility */}
                        <div className="absolute top-1/2 left-1/2 -z-10 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/35 blur-[90px] pointer-events-none [@media(max-width:430px)]:h-[280px] [@media(max-width:430px)]:w-[280px] [@media(max-width:430px)]:blur-[80px] [@media(max-width:360px)]:h-[250px] [@media(max-width:360px)]:w-[250px] sm:h-[320px] sm:w-[320px] md:h-[600px] md:w-[600px] md:bg-indigo-500/40 md:blur-[100px]" />

                        <motion.div
                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="relative z-10 flex h-full w-full max-w-[340px] scale-[1.55] items-center justify-center [@media(max-width:430px)]:max-w-[380px] [@media(max-width:430px)]:scale-[1.8] [@media(max-width:430px)]:-translate-y-3 [@media(max-width:360px)]:max-w-[340px] [@media(max-width:360px)]:scale-[1.64] [@media(max-width:360px)]:-translate-y-2 sm:max-w-[320px] sm:scale-[1.49] md:w-full md:max-w-none md:translate-x-0 md:-translate-y-2 md:scale-[1.62] md:justify-end lg:-translate-x-1 lg:scale-[1.98] lg:justify-end xl:translate-x-1 xl:scale-[2.08] xl:justify-end 2xl:-translate-x-20 2xl:scale-[1.82] 2xl:justify-center"
                        >
                            {/* Phone Image Container */}
                            <div className="relative w-full h-full">
                                <Image
                                    src="/HERO3.png"
                                    alt="Arma2 App Interface"
                                    fill
                                    unoptimized
                                    sizes="(max-width: 430px) 92vw, (max-width: 768px) 78vw, (max-width: 1280px) 54vw, 46vw"
                                    className="object-contain object-center md:object-right select-none pointer-events-none drop-shadow-none md:drop-shadow-2xl [backface-visibility:hidden] [transform:translateZ(0)]"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Text & Buttons */}
                    <div className="order-2 relative z-20 flex flex-col items-center text-center [@media(max-width:430px)]:-mt-6 [@media(max-width:360px)]:-mt-4 md:mt-0 md:items-start md:text-left lg:-translate-x-1 xl:translate-x-1 2xl:-translate-x-14">

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-5 text-[clamp(1.85rem,8vw,2.85rem)] font-bold leading-[1.08] tracking-tight text-white [@media(max-width:430px)]:text-[clamp(1.7rem,7.6vw,2.35rem)] md:mb-4 md:text-[clamp(3.15rem,5.2vw,4.5rem)] md:leading-[1.06] xl:text-[clamp(3.25rem,3.9vw,4.25rem)] xl:leading-[1.04] 2xl:text-7xl 2xl:leading-tight"
                        >
                            Organizá partidos. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent-secondary lg:whitespace-nowrap">
                                Armá equipos parejos.
                            </span> <br />
                            Jugá.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="mb-7 max-w-xl text-[15px] leading-relaxed text-text-secondary [@media(max-width:430px)]:text-[14px] sm:text-base md:mb-6 md:text-[clamp(1.12rem,1.55vw,1.35rem)] md:leading-relaxed xl:text-[1.18rem] 2xl:text-xl"
                        >
                            Todos votan el nivel de cada jugador. El sistema calcula promedios y arma equipos balanceados.
                            Olvidate de las discusiones y concentrate en jugar con Arma2.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex w-full flex-col items-center justify-center gap-2.5 [@media(max-width:430px)]:gap-2 sm:flex-row md:w-auto md:justify-start md:gap-4"
                        >
                            {/* App Store Button */}
                            <a
                                href={STORE_LINKS.appStore}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Descargar Arma2 en App Store"
                                className="group inline-flex min-h-14 w-full cursor-pointer items-center justify-center rounded-none border border-white/10 bg-white/5 px-5 py-3 text-white tracking-wide outline-none transition-all hover:bg-white/10 backdrop-blur-none md:backdrop-blur-sm [@media(max-width:430px)]:min-h-12 [@media(max-width:430px)]:px-4 [@media(max-width:430px)]:py-2.5 sm:w-auto"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="36px" fill="#fff" className="mr-2 inline [@media(max-width:430px)]:w-8" viewBox="0 0 22.773 22.773">
                                    <path
                                        d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-[10px] text-white leading-none text-left font-medium">Download on the</p>
                                    <span className="text-sm font-semibold">App Store</span>
                                </div>
                            </a>

                            {/* Google Play Button */}
                            <a
                                href={STORE_LINKS.googlePlay}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Descargar Arma2 en Google Play"
                                className="group inline-flex min-h-14 w-full cursor-pointer items-center justify-center rounded-none border border-white/10 bg-white/5 px-5 py-3 text-white tracking-wide outline-none transition-all hover:bg-white/10 backdrop-blur-none md:backdrop-blur-sm [@media(max-width:430px)]:min-h-12 [@media(max-width:430px)]:px-4 [@media(max-width:430px)]:py-2.5 sm:w-auto"
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
                                    <p className="text-[10px] text-white leading-none text-left font-medium">Get it on</p>
                                    <span className="text-sm font-semibold">Google Play</span>
                                </div>
                            </a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
