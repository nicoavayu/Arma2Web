"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
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

    const navLinks = [
        { name: "Cómo funciona", href: "/#how-it-works" },
        { name: "Features", href: "/#features" },
        { name: "FAQ", href: "/#faq" },
    ];

    return (
        <>
            <header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
                    ? "bg-background/85 backdrop-blur-md border-b border-white/5 py-3 [@media(max-width:430px)]:py-2.5 md:py-4"
                    : "bg-transparent py-4 [@media(max-width:430px)]:py-3 md:py-6"
                    }`}
                style={{ paddingTop: "max(env(safe-area-inset-top), 0px)" }}
            >
                <div className="container mx-auto flex items-center justify-between">
                    <Link href="/" className="z-50 flex items-center gap-2 translate-y-[2px] md:translate-y-[3px]">
                        <div className="relative h-9 w-9 [@media(max-width:360px)]:h-8 [@media(max-width:360px)]:w-8 md:h-10 md:w-10">
                            <Image
                                src="/logo_navbar.png"
                                alt="Arma2 Logo"
                                fill
                                className="object-contain brightness-0 invert"
                            />
                        </div>
                    </Link>

                    {/* Desktop Nav - Moved to the right */}
                    <div className="flex items-center gap-3 md:gap-8">
                        <nav className="hidden md:flex items-center gap-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="text-sm font-medium text-text-secondary hover:text-white transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </nav>

                        {/* Mobile Menu Toggle */}
                        <button
                            className="md:hidden z-50 inline-flex h-10 w-10 items-center justify-center rounded-lg text-white [@media(max-width:360px)]:h-9 [@media(max-width:360px)]:w-9"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
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
                                key={link.name}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-center text-xl font-medium text-white sm:text-2xl"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
