import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t border-white/5 bg-surface/30 backdrop-blur-sm pt-16 pb-8">
            <div className="container mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="flex items-center gap-2 mb-4">
                            <div className="relative w-8 h-8">
                                <Image
                                    src="/logo_navbar.png"
                                    alt="Arma2 Logo"
                                    fill
                                    className="object-contain brightness-0 invert"
                                />
                            </div>
                        </Link>
                        <p className="text-text-secondary text-sm max-w-xs">
                            La plataforma definitiva para organizar partidos de fútbol con amigos.
                            Equipos balanceados, estadísticas y cero complicaciones.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-semibold text-white mb-4">Producto</h4>
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

                    <div>
                        <h4 className="font-semibold text-white mb-4">Legal</h4>
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

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-text-secondary text-xs">
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
