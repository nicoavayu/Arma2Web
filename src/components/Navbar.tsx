"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/components/LanguageProvider";

export function Navbar() {
    const router = useRouter();
    const pathname = usePathname();
    const { locale, setLocale, t } = useLanguage();
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    const navLinks = t.nav.links;

    const handleHomeClick = () => {
        setMobileMenuOpen(false);

        if (pathname !== "/") {
            router.push("/");
            return;
        }

        const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        window.scrollTo({
            top: 0,
            behavior: prefersReducedMotion ? "auto" : "smooth",
        });
    };

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/85 backdrop-blur-md border-b border-white/5 py-3 [@media(max-width:430px)]:py-2.5 md:py-4"
                    : "bg-transparent py-4 [@media(max-width:430px)]:py-3 md:py-6"
                    }`}
                style={{ paddingTop: "max(env(safe-area-inset-top), 0px)" }}
            >
                <div className="container mx-auto flex items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={handleHomeClick}
                        aria-label={t.nav.homeAria}
                        className="z-50 inline-flex items-center justify-center"
                    >
                        <div className="relative h-9 w-9 [@media(max-width:360px)]:h-8 [@media(max-width:360px)]:w-8 md:h-10 md:w-10">
                            <Image
                                src="/logo_navbar.png"
                                alt="Arma2 Logo"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                    </button>

                    <div className="flex items-center gap-2 md:gap-6">
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    href={link.href}
                                    className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>

                        <div
                            className="inline-flex items-center rounded-full border border-accent-secondary/30 bg-gradient-to-r from-accent/20 to-primary-glow/15 p-0.5 shadow-[0_0_18px_rgba(124,58,237,0.2)] backdrop-blur-md"
                            role="group"
                            aria-label={t.nav.languageLabel}
                        >
                            {(["es", "en"] as const).map((value) => {
                                const active = locale === value;

                                return (
                                    <button
                                        key={value}
                                        type="button"
                                        onClick={() => setLocale(value)}
                                        aria-pressed={active}
                                        className={`min-w-[2.2rem] rounded-full px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.14em] transition-all duration-200 ${active
                                            ? "bg-gradient-to-r from-accent-secondary to-primary-glow text-white shadow-[0_0_16px_rgba(139,92,246,0.45)]"
                                            : "text-white/65 hover:bg-white/5 hover:text-white"
                                            }`}
                                    >
                                        {value}
                                    </button>
                                );
                            })}
                        </div>

                        <button
                            className="md:hidden z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg text-white [@media(max-width:360px)]:h-9 [@media(max-width:360px)]:w-9"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? t.nav.closeMenu : t.nav.openMenu}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed inset-0 z-40 bg-background/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-6 px-6 sm:gap-8"
                        style={{
                            paddingTop: "calc(var(--nav-height-mobile) + env(safe-area-inset-top))",
                            paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))",
                        }}
                    >
                        {navLinks.map((link) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-center text-xl font-medium text-white sm:text-2xl"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
