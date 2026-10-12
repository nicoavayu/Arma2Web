"use client";

import React from "react";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background">
            <Section className="pt-28 pb-16 md:pt-32 md:pb-20">
                <div className="container mx-auto max-w-3xl text-center">
                    <h1 className="mb-6 text-3xl font-bold text-white md:mb-8 md:text-5xl">
                        Contacto
                    </h1>
                    <p className="mb-10 text-base text-text-secondary md:mb-12 md:text-xl">
                        ¿Tenés alguna duda, sugerencia o feedback? Nos encantaría escucharte.
                    </p>

                    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-8">
                        <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-surface/50 p-6 md:p-8">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 md:mb-6 md:h-16 md:w-16">
                                <Mail className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">Email</h3>
                            <p className="mb-6 text-text-secondary">
                                Escribinos directamente a nuestro correo oficial.
                            </p>
                            <Button
                                variant="secondary"
                                className="w-full sm:w-auto"
                                onClick={() => window.open("mailto:arma2app@gmail.com")}
                            >
                                arma2app@gmail.com
                            </Button>
                        </div>

                        <div className="flex flex-col items-center rounded-2xl border border-white/5 bg-surface/50 p-6 md:p-8">
                            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent/10 md:mb-6 md:h-16 md:w-16">
                                <MessageSquare className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="mb-2 text-lg font-semibold text-white md:text-xl">Redes Sociales</h3>
                            <p className="mb-6 text-text-secondary">
                                Seguinos en Instagram para novedades.
                            </p>
                            <Button
                                variant="secondary"
                                className="w-full sm:w-auto"
                                onClick={() => window.open("https://instagram.com", "_blank")}
                            >
                                @arma2app
                            </Button>
                        </div>
                    </div>
                </div>
            </Section>
        </main>
    );
}
