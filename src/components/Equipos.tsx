"use client";

import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/* ─────────────────────────────────────────────────────────────
   Ghost team cards – marketplace background with varied timing
───────────────────────────────────────────────────────────── */
const marketTeams = [
    { name: "Los Chapas", tag: "F11 · Palermo", dur: 4.2, opacities: [0, 0.22, 0.10, 0.22] },
    { name: "Cañería FC", tag: "F7 · Almagro", dur: 5.6, opacities: [0, 0.18, 0.28, 0.14] },
    { name: "Sifón de Sodas", tag: "F5 · Flores", dur: 3.8, opacities: [0, 0.30, 0.12, 0.30] },
    { name: "Depor Tapita", tag: "F11 · Villa Urquiza", dur: 6.0, opacities: [0, 0.16, 0.25, 0.10] },
    { name: "El Tanque", tag: "F7 · Boedo", dur: 4.8, opacities: [0, 0.28, 0.08, 0.28] },
    { name: "Tiki-Taka", tag: "F5 · Caballito", dur: 5.2, opacities: [0, 0.12, 0.24, 0.16] },
    { name: "Los Potros", tag: "F11 · Belgrano", dur: 4.4, opacities: [0, 0.26, 0.16, 0.26] },
    { name: "Furia Roja", tag: "F7 · Liniers", dur: 3.6, opacities: [0, 0.20, 0.30, 0.12] },
];

interface GhostCardProps {
    name: string;
    tag: string;
    delay?: number;
    dur?: number;
    opacities?: number[];
}

function GhostCard({ name, tag, delay = 0, dur = 4, opacities = [0, 0.25, 0.15, 0.25] }: GhostCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: opacities }}
            transition={{
                duration: dur,
                delay,
                repeat: Infinity,
                repeatType: "mirror",
                ease: "easeInOut",
            }}
            className="rounded-2xl border border-white/[0.07] bg-white/[0.03] px-5 py-4 backdrop-blur-sm"
        >
            <div className="mb-3 h-8 w-8 rounded-xl bg-white/10 border border-white/10" />
            <p className="text-[13px] font-semibold text-white/60 mb-1">{name}</p>
            <p className="text-[11px] text-white/30 uppercase tracking-wider">{tag}</p>
            <div className="mt-3 flex gap-1.5">
                <span className="h-1.5 w-8 rounded-full bg-white/10" />
                <span className="h-1.5 w-5 rounded-full bg-white/10" />
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   Central hero team card – badge pulses with glow
───────────────────────────────────────────────────────────── */
interface HeroTeamCardProps {
    side: "left" | "right";
    name: string;
    initials: string;
    color: string;
    glowColor: string;
}

function HeroTeamCard({ side, name, initials, color, glowColor }: HeroTeamCardProps) {
    const isLeft = side === "left";
    const badgeShadows = [`0 0 15px ${color}44`, `0 0 5px ${color}22`, `0 0 15px ${color}44`];

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const spotlightX = useSpring(mouseX, { damping: 20, stiffness: 300 });
    const spotlightY = useSpring(mouseY, { damping: 20, stiffness: 300 });

    const rotateX = useSpring(0, { damping: 20, stiffness: 300 });
    const rotateY = useSpring(0, { damping: 20, stiffness: 300 });

    function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        const x = clientX - left;
        const y = clientY - top;
        mouseX.set(x);
        mouseY.set(y);

        const rX = ((y / height) - 0.5) * -15; // 15deg tilt
        const rY = ((x / width) - 0.5) * 15;
        rotateX.set(rX);
        rotateY.set(rY);
    }

    function handleMouseLeave() {
        rotateX.set(0);
        rotateY.set(0);
    }

    return (
        <motion.div
            initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
                perspective: "1000px"
            }}
            className="group relative flex h-[340px] w-full max-w-[320px] shrink-0 items-center justify-center [@media(max-width:430px)]:h-[300px] [@media(max-width:430px)]:max-w-[280px] [@media(max-width:360px)]:h-[280px] [@media(max-width:360px)]:max-w-[260px] sm:h-[380px] md:h-[420px] md:w-80"
        >
            {/* Outer glow ring */}
            <div
                className="absolute inset-0 rounded-3xl blur-2xl opacity-30"
                style={{ background: glowColor }}
            />

            {/* Card body */}
            <div className="relative z-10 w-52 overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-[#12122a] to-[#0a0a18] p-5 shadow-2xl [@media(max-width:430px)]:w-48 [@media(max-width:430px)]:p-4 sm:w-56 sm:p-6 md:w-64"
                style={{ transform: "translateZ(30px)" }}>
                <motion.div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                        background: `radial-gradient(300px circle at ${spotlightX}px ${spotlightY}px, ${color}66, transparent 80%)`,
                    }}
                />
                {/* Shield avatar */}
                <div
                    className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border text-xl font-black text-white shadow-lg [@media(max-width:430px)]:h-14 [@media(max-width:430px)]:w-14 [@media(max-width:430px)]:text-lg"
                    style={{
                        background: `linear-gradient(135deg, ${color}33, ${color}11)`,
                        borderColor: `${color}44`,
                        boxShadow: `0 0 24px ${color}44`,
                    }}
                >
                    {initials}
                </div>

                {/* Name */}
                <h3
                    className="mb-3 text-center text-base font-bold leading-tight text-white sm:text-lg"
                    style={{ textShadow: `0 0 24px ${color}88` }}
                >
                    {name}
                </h3>

                {/* Status pill – pulsing glow */}
                <div className="flex justify-center">
                    <motion.span
                        whileHover={{ scale: 1.05 }}
                        animate={{ boxShadow: badgeShadows }}
                        transition={{ duration: isLeft ? 2.5 : 3, repeat: Infinity, ease: "easeInOut" }}
                        className="rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-widest cursor-default"
                        style={{
                            background: `${color}15`,
                            color,
                            border: `1px solid ${color}44`,
                        }}
                    >
                        {isLeft ? "En el mercado" : "Disponible"}
                    </motion.span>
                </div>

                {/* Mini Roster */}
                <div className="mt-5 flex flex-wrap justify-center gap-2 border-t border-white/5 pt-4 sm:mt-6 sm:pt-5">
                    {[
                        { n: "Nico", p: "DEL" },
                        { n: "Santi", p: "MED" },
                        { n: "Fran", p: "DEF" },
                        { n: "Agus", p: "ARQ" },
                        { n: "Lucho", p: "MED" },
                    ].map((p, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 group/player">
                            <div
                                className="h-7 w-7 rounded-full border border-white/10 flex items-center justify-center text-[9px] font-bold bg-white/5 group-hover/player:border-white/30 transition-colors"
                                style={{ color: color + "99" }}
                            >
                                {p.n[0]}
                            </div>
                            <span className="text-[8px] font-medium text-white/40 uppercase tracking-tighter group-hover/player:text-white/70 transition-colors">
                                {p.p}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}

/* ─────────────────────────────────────────────────────────────
   Energy connector – dual orbs + horizontal line
   (horizontal on desktop, vertical on mobile)
───────────────────────────────────────────────────────────── */
function EnergyConnector() {
    return (
        <div className="relative z-20 mx-2 flex flex-col items-center justify-center [@media(max-width:430px)]:mx-0 md:mx-0 md:flex-row">
            {/* ── Mobile: vertical line ── */}
            <svg
                width="70"
                height="100"
                viewBox="0 0 70 100"
                fill="none"
                className="h-[84px] w-[56px] overflow-visible md:hidden"
                aria-hidden="true"
            >
                <line x1="35" y1="0" x2="35" y2="100"
                    stroke="rgba(59,130,246,0.12)" strokeWidth="1.5" strokeDasharray="4 6" />

                {/* Orb going down */}
                <motion.circle cx="35" cy="0" r="3" fill="#3B82F6" filter="url(#blueglow-m)"
                    animate={{ cy: [0, 100] }}
                    transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
                />
                {/* Orb going up */}
                <motion.circle cx="35" cy="100" r="2.5" fill="#7c3aed" filter="url(#purpleglow-m)"
                    animate={{ cy: [100, 0] }}
                    transition={{ duration: 1.6, delay: 0.8, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
                />

                {/* VS */}
                <motion.text x="35" y="55" textAnchor="middle" dominantBaseline="middle"
                    fontSize="11" fontWeight="900" fill="white" fontFamily="system-ui"
                    animate={{
                        opacity: [0.4, 0.9, 0.4],
                        scale: [1, 1.1, 1],
                        filter: ["drop-shadow(0 0 0px white)", "drop-shadow(0 0 6px rgba(139,92,246,0.9))", "drop-shadow(0 0 0px white)"]
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                    VS
                </motion.text>

                <defs>
                    <filter id="blueglow-m" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="purpleglow-m" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
            </svg>

            {/* ── Desktop: horizontal line ── */}
            <svg
                width="120"
                height="70"
                viewBox="0 0 120 70"
                fill="none"
                className="overflow-visible hidden md:block"
                aria-hidden="true"
            >
                <line x1="0" y1="35" x2="120" y2="35"
                    stroke="rgba(59,130,246,0.12)" strokeWidth="1.5" strokeDasharray="4 6" />

                {/* Orb left → right */}
                <motion.circle cy="35" cx="0" r="3" fill="#3B82F6" filter="url(#blueglow-d)"
                    animate={{ cx: [0, 120] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
                />
                {/* Orb right → left */}
                <motion.circle cy="35" cx="120" r="2.5" fill="#7c3aed" filter="url(#purpleglow-d)"
                    animate={{ cx: [120, 0] }}
                    transition={{ duration: 1.5, delay: 0.75, repeat: Infinity, ease: "easeInOut", repeatType: "loop" }}
                />

                {/* VS at centre */}
                <motion.text x="60" y="38" textAnchor="middle" dominantBaseline="middle"
                    fontSize="12" fontWeight="900" fill="white" fontFamily="system-ui"
                    animate={{
                        opacity: [0.4, 1, 0.4],
                        scale: [1, 1.15, 1],
                        filter: ["drop-shadow(0 0 0px white)", "drop-shadow(0 0 8px rgba(139,92,246,0.9))", "drop-shadow(0 0 0px white)"]
                    }}
                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                    VS
                </motion.text>

                <defs>
                    <filter id="blueglow-d" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                    <filter id="purpleglow-d" x="-200%" y="-200%" width="500%" height="500%">
                        <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                        <feMerge><feMergeNode in="coloredBlur" /><feMergeNode in="SourceGraphic" /></feMerge>
                    </filter>
                </defs>
            </svg>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   SVG icons for bottom bullets
───────────────────────────────────────────────────────────── */
const ShieldSVG = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L3 7V12C3 16.55 6.84 20.74 12 22C17.16 20.74 21 16.55 21 12V7L12 2Z" fill="url(#shieldGrad)" stroke="rgba(99,102,241,0.5)" strokeWidth="1" />
        <defs>
            <linearGradient id="shieldGrad" x1="3" y1="2" x2="21" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#818cf8" /><stop offset="1" stopColor="#6366f1" />
            </linearGradient>
        </defs>
    </svg>
);

const SignalSVG = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="2.5" fill="#38bdf8" />
        <path d="M8.5 8.5C9.6 7.4 11 6.75 12 6.75C13 6.75 14.4 7.4 15.5 8.5" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        <path d="M5.5 5.5C7.5 3.5 10 2.25 12 2.25C14 2.25 16.5 3.5 18.5 5.5" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
        <line x1="12" y1="14.5" x2="12" y2="21" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        <line x1="9" y1="21" x2="15" y2="21" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);

const LightningSVG = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="url(#boltGrad)" stroke="rgba(250,204,21,0.4)" strokeWidth="0.5" />
        <defs>
            <linearGradient id="boltGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#fde68a" /><stop offset="1" stopColor="#f59e0b" />
            </linearGradient>
        </defs>
    </svg>
);

const bullets = [
    { icon: <ShieldSVG />, label: "Armá tu equipo" },
    { icon: <SignalSVG />, label: "Publicalo en el mercado" },
    { icon: <LightningSVG />, label: "Desafiá o aceptá desafíos" },
];

/* ─────────────────────────────────────────────────────────────
   Main section
───────────────────────────────────────────────────────────── */
export function Equipos() {
    return (
        <section
            id="equipos"
            className="relative w-full overflow-hidden bg-[#070712] py-20 [@media(max-width:430px)]:py-16 md:py-32"
        >
            {/* ── Ambient radial glow ── */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[420px] w-[420px] rounded-full bg-blue-600/10 blur-[100px] md:h-[600px] md:w-[800px] md:blur-[120px]" />
            </div>
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                <div className="h-[280px] w-[280px] rounded-full bg-violet-700/10 blur-[90px] md:h-[400px] md:w-[400px] md:blur-[100px]" />
            </div>

            {/* ── Ghost market cards grid (blurred background) ── */}
            <div className="pointer-events-none absolute inset-0 hidden select-none blur-[2px] md:block">
                <div className="mx-auto grid h-full max-w-6xl grid-cols-4 content-center gap-4 px-6">
                    {marketTeams.map((t, i) => (
                        <GhostCard
                            key={t.name}
                            name={t.name}
                            tag={t.tag}
                            delay={i * 0.35}
                            dur={t.dur}
                            opacities={t.opacities}
                        />
                    ))}
                </div>
            </div>

            {/* ── Main content ── */}
            <div className="relative z-10 mx-auto max-w-5xl px-4 text-center [@media(max-width:430px)]:px-3 sm:px-6">

                {/* Eyebrow label */}
                <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 inline-block rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-blue-400 [@media(max-width:430px)]:px-3 [@media(max-width:430px)]:tracking-[0.14em]"
                >
                    Nuevo · Equipos y Desafíos
                </motion.span>

                {/* Headline */}
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="mb-5 text-[clamp(2rem,8vw,3.5rem)] font-black leading-[1.05] tracking-tight text-white [@media(max-width:430px)]:text-[clamp(1.75rem,7.4vw,2.5rem)] md:text-6xl lg:text-7xl"
                >
                    Tu equipo.{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">
                        El mercado.
                    </span>
                </motion.h2>

                {/* Subtitle */}
                <motion.p
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="mx-auto mb-12 max-w-xl text-base text-white/55 [@media(max-width:430px)]:mb-10 [@media(max-width:430px)]:text-[15px] md:mb-16 md:text-lg"
                >
                    Publicá tu equipo, buscá rivales y confirmá el partido en segundos.
                    Una red activa de equipos esperando el desafío.
                </motion.p>

                {/* ── Two team cards + connector ── */}
                <div className="mb-12 flex flex-col items-center justify-center gap-2 md:mb-16 md:flex-row md:gap-4">
                    <HeroTeamCard
                        side="left"
                        name="Los Galácticos"
                        initials="LG"
                        color="#3B82F6"
                        glowColor="linear-gradient(135deg, #3B82F6, #6366f1)"
                    />

                    <EnergyConnector />

                    <HeroTeamCard
                        side="right"
                        name="Deportivo Tapita"
                        initials="DT"
                        color="#7c3aed"
                        glowColor="linear-gradient(135deg, #7c3aed, #ec4899)"
                    />
                </div>

                {/* ── 3 bullets ── */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="flex w-full flex-col items-center justify-center gap-3 [@media(max-width:430px)]:gap-2 sm:flex-row sm:gap-8 md:gap-10"
                >
                    {bullets.map((b, i) => (
                        <motion.div
                            key={b.label}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: 0.45 + i * 0.1 }}
                            className="flex items-center gap-3 [@media(max-width:430px)]:w-full [@media(max-width:430px)]:justify-center [@media(max-width:430px)]:gap-2 sm:gap-2 md:gap-3"
                        >
                            {i > 0 && (
                                <span className="hidden text-white/15 sm:inline-block">—</span>
                            )}
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-base">
                                {b.icon}
                            </span>
                            <span className="text-sm font-semibold text-white/80 [@media(max-width:430px)]:text-xs md:text-base">
                                {b.label}
                            </span>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
