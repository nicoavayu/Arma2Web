"use client";

import React from "react";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { Mail, MessageSquare } from "lucide-react";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-background">
            <Section className="pt-32 pb-20">
                <div className="container mx-auto px-4 md:px-6 max-w-3xl text-center">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-8">
                        Contacto
                    </h1>
                    <p className="text-xl text-text-secondary mb-12">
                        ¿Tenés alguna duda, sugerencia o feedback? Nos encantaría escucharte.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-surface/50 border border-white/5 p-8 rounded-2xl flex flex-col items-center">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                                <Mail className="w-8 h-8 text-primary" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Email</h3>
                            <p className="text-text-secondary mb-6">
                                Escribinos directamente a nuestro correo oficial.
                            </p>
                            <Button
                                variant="secondary"
                                onClick={() => window.open("mailto:arma2app@gmail.com")}
                            >
                                arma2app@gmail.com
                            </Button>
                        </div>

                        <div className="bg-surface/50 border border-white/5 p-8 rounded-2xl flex flex-col items-center">
                            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6">
                                <MessageSquare className="w-8 h-8 text-accent" />
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">Redes Sociales</h3>
                            <p className="text-text-secondary mb-6">
                                Seguinos en Instagram para novedades.
                            </p>
                            <Button
                                variant="secondary"
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
