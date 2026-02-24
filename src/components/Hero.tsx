"use client";

import React from "react";
import Image from "next/image";
import { Button } from "@/components/Button";
import { Section } from "@/components/Section";
import { ArrowRight, Download, Play } from "lucide-react";
import { motion } from "framer-motion";

export function Hero() {
    return (
        <Section id="home" className="relative min-h-screen h-[100svh] md:h-auto md:min-h-screen flex items-center pt-24 md:pt-20 pb-[calc(2rem+env(safe-area-inset-bottom))] md:pb-12 overflow-hidden">
            {/* Tech Grid Background */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.2]"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
                                      linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)',
                    WebkitMaskImage: 'radial-gradient(circle at center, black 60%, transparent 100%)'
                }}
            />

            {/* Background gradients */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none -z-10" />
            <div className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-accent/10 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="container mx-auto px-4 md:px-6 relative">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Left Column: Image */}
                    <div className="order-1 md:order-1 relative h-[350px] md:h-[600px] flex items-center justify-center">
                        {/* Premium Glow Effect - Increased visibility */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-indigo-500/40 blur-[100px] rounded-full pointer-events-none -z-10" />

                        <motion.div
                            initial={{ opacity: 0, x: -20, scale: 0.95 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            // Desktop: Centered and scaled to fit the space without rotation or excessive offset
                            // Mobile: Centered, Gigantic scale. Desktop: Balanced large scale and subtle vertical lift for full visibility.
                            className="relative w-full max-w-[320px] md:max-w-none md:w-full h-full flex items-center justify-center md:justify-end md:translate-x-0 md:-translate-y-2 z-10 scale-[1.3] md:scale-[1.65]"
                        >
                            {/* Phone Image Container */}
                            <div className="relative w-full h-full">
                                <Image
                                    src="/HERO3.png"
                                    alt="Arma2 App Interface"
                                    fill
                                    className="object-contain object-center md:object-right select-none pointer-events-none drop-shadow-2xl"
                                    priority
                                />
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Text & Buttons */}
                    <div className="flex flex-col items-center text-center md:items-start md:text-left order-2 md:order-2 relative z-20">

                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-[32px] md:text-7xl font-bold tracking-tight text-white mb-2 md:mb-4 leading-[1.1] md:leading-tight"
                        >
                            Organizá partidos. <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-indigo-300 to-accent-secondary">
                                Armá equipos parejos.
                            </span> <br />
                            Jugá.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-base md:text-xl text-text-secondary max-w-xl mb-3 md:mb-6 leading-tight md:leading-relaxed"
                        >
                            Todos votan el nivel de cada jugador. El sistema calcula promedios y arma equipos balanceados.
                            Olvidate de las discusiones y concentrate en jugar con Armá2.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 w-full md:w-auto"
                        >
                            {/* App Store Button */}
                            <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-3 cursor-pointer inline-flex items-center justify-center rounded-none md:rounded-xl text-white tracking-wider border border-white/10 outline-none bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm group"
                                onClick={() => window.open("https://apps.apple.com", "_blank")} // Placeholder link
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="36px" fill="#fff" className="inline mr-2" viewBox="0 0 22.773 22.773">
                                    <path
                                        d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                                    />
                                </svg>
                                <div>
                                    <p className="text-[10px] text-white leading-none text-left font-medium">Download on the</p>
                                    <span className="text-sm font-semibold">App Store</span>
                                </div>
                            </button>

                            {/* Google Play Button */}
                            <button
                                type="button"
                                className="w-full sm:w-auto px-6 py-3 cursor-pointer inline-flex items-center justify-center rounded-none md:rounded-xl text-white tracking-wider border border-white/10 outline-none bg-white/5 hover:bg-white/10 transition-all backdrop-blur-sm group"
                                onClick={() => window.open("https://play.google.com", "_blank")} // Placeholder link
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="36px" fill="#fff" className="inline mr-2" viewBox="0 0 64 64">
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
                            </button>
                        </motion.div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
