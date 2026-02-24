import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-surface/30 pt-12 pb-8 backdrop-blur-sm md:pt-16">
            <div className="container mx-auto">
                <div className="mb-10 grid grid-cols-1 gap-10 md:mb-12 md:grid-cols-4 md:gap-12">
                    <div className="col-span-1 text-center md:col-span-2 md:text-left">
                        <Link href="/" className="mb-4 inline-flex items-center gap-2">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/logo_navbar.png"
                                    alt="Arma2 Logo"
                                    fill
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                        </Link>
                        <p className="mx-auto max-w-xs text-sm text-text-secondary md:mx-0">
                            La plataforma definitiva para organizar partidos de fútbol con amigos.
                            Equipos balanceados, estadísticas y cero complicaciones.
                        </p>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="mb-4 font-semibold text-white">Producto</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="#how-it-works" className="text-text-secondary hover:text-white text-sm transition-colors">
                                    Cómo funciona
                                </Link>
                            </li>
                            <li>
                                <Link href="#features" className="text-text-secondary hover:text-white text-sm transition-colors">
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link href="#faq" className="text-text-secondary hover:text-white text-sm transition-colors">
                                    FAQ
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div className="text-center md:text-left">
                        <h4 className="mb-4 font-semibold text-white">Legal</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/privacy" className="text-text-secondary hover:text-white text-sm transition-colors">
                                    Privacidad
                                </Link>
                            </li>
                            <li>
                                <Link href="/terms" className="text-text-secondary hover:text-white text-sm transition-colors">
                                    Términos
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-text-secondary hover:text-white text-sm transition-colors">
                                    Contacto
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-6 md:flex-row md:pt-8">
                    <p className="text-center text-xs text-text-secondary md:text-left">
                        © {currentYear} Arma2. Todos los derechos reservados.
                    </p>
                    <div className="flex gap-4">
                        {/* Social icons could go here */}
                    </div>
                </div>
            </div>
        </footer>
    );
}
