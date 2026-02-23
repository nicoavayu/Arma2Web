"use client";

import React from "react";
import { Section } from "@/components/Section";
import Image from "next/image";
import { motion } from "framer-motion";

const screenshots = [
    "/mvp.png",
    "/card_mockup.png",
    "/penalizacion.png",
    "/glove.png",
    "/red_card.png",
];

export function Screenshots() {
    return (
        <Section id="screenshots" className="overflow-hidden bg-surface/20">
            <div className="container mx-auto px-4 md:px-6 mb-12 text-center">
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
                    La experiencia <span className="text-accent">mobile-first</span>
                </h2>
                <p className="text-text-secondary text-lg max-w-2xl mx-auto">
                    Diseñada para que organizar sea tan rápido como mandar un mensaje.
                </p>
            </div>

            <div className="relative flex w-full overflow-hidden py-10">
                <div className="absolute inset-y-0 left-0 w-20 md:w-40 z-10 bg-gradient-to-r from-background to-transparent" />
                <div className="absolute inset-y-0 right-0 w-20 md:w-40 z-10 bg-gradient-to-l from-background to-transparent" />

                <motion.div
                    className="flex gap-8 px-4"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 20,
                    }}
                >
                    {[...screenshots, ...screenshots].map((src, index) => (
                        <div
                            key={index}
                            className="relative w-[280px] h-[580px] md:w-[320px] md:h-[650px] shrink-0 rounded-[2.5rem] border-4 border-surface-highlight bg-black overflow-hidden shadow-2xl"
                        >
                            <Image
                                src={src}
                                alt={`Screenshot ${index}`}
                                fill
                                className="object-cover"
                            />
                        </div>
                    ))}
                </motion.div>
            </div>
        </Section>
    );
}
