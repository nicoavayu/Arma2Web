"use client";

import React from "react";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Download } from "lucide-react";
import Image from "next/image";

export default function PressPage() {
    return (
        <main className="min-h-screen bg-background">
            <Section className="pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-6 max-w-4xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Press Kit
                    </h1>
                    <p className="text-xl text-text-secondary mb-12">
                        Recursos oficiales de marca para medios y creadores de contenido.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                        <div className="bg-surface/50 border border-white/5 p-8 rounded-2xl">
                            <h3 className="text-xl font-semibold text-white mb-6">Logos</h3>
                            <div className="bg-white/5 rounded-xl p-8 mb-6 flex items-center justify-center">
                                <div className="relative w-32 h-32">
                                    <Image src="/logo_arma2.png" alt="Arma2 Logo" fill className="object-contain" />
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    leftIcon={<Download className="w-4 h-4" />}
                                    onClick={() => window.open("/logo.svg", "_blank")}
                                >
                                    Descargar SVG
                                </Button>
                                <Button
                                    variant="secondary"
                                    size="sm"
                                    leftIcon={<Download className="w-4 h-4" />}
                                    onClick={() => window.open("/logo_arma2.png", "_blank")}
                                >
                                    Descargar PNG
                                </Button>
                            </div>
                        </div>

                        <div className="bg-surface/50 border border-white/5 p-8 rounded-2xl">
                            <h3 className="text-xl font-semibold text-white mb-6">Screenshots</h3>
                            <div className="bg-white/5 rounded-xl p-8 mb-6 flex items-center justify-center overflow-hidden">
                                <div className="relative w-full h-32">
                                    <Image src="/mvp.png" alt="App Screenshot" fill className="object-cover object-top rounded-lg" />
                                </div>
                            </div>
                            <Button
                                variant="secondary"
                                size="sm"
                                leftIcon={<Download className="w-4 h-4" />}
                                onClick={() => window.open("/mvp.png", "_blank")}
                            >
                                Descargar Pack
                            </Button>
                        </div>
                    </div>

                    <div className="prose prose-invert prose-lg text-text-secondary">
                        <h3>Sobre Arma2</h3>
                        <p>
                            Arma2 es una startup Argentina nacida en 2024 con la misión de profesionalizar el fútbol amateur.
                            Nuestra plataforma utiliza algoritmos de balanceo basados en datos para asegurar partidos competitivos y divertidos.
                        </p>
                    </div>
                </div>
            </Section>
        </main>
    );
}
