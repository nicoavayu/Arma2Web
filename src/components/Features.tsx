"use client";

import React from "react";
import { Section } from "@/components/Section";
import { Card } from "@/components/Card";
import { Users2, Smartphone, Swords, Trophy, Star, UserRound, Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";

/* ─────────────────────────────────────────────────────────────
   Custom SVG icons
───────────────────────────────────────────────────────────── */
const ZapSVG = () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M13 2L4.5 13.5H11L10 22L19.5 10.5H13L13 2Z" fill="url(#zapGrad)" stroke="rgba(139,92,246,0.3)" strokeWidth="0.5" />
        <defs>
            <linearGradient id="zapGrad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
                <stop stopColor="#a78bfa" /><stop offset="1" stopColor="#7c3aed" />
            </linearGradient>
        </defs>
    </svg>
);

/* ─────────────────────────────────────────────────────────────
   Balance Democrático – Abstract voting visualization
   6 player dots → redistribute into 2 balanced teams
───────────────────────────────────────────────────────────── */
const playerDots5v5 = [
    { id: 1, team: "A", color: "#3B82F6" },
    { id: 2, team: "A", color: "#3B82F6" },
    { id: 3, team: "A", color: "#3B82F6" },
    { id: 4, team: "A", color: "#3B82F6" },
    { id: 5, team: "A", color: "#3B82F6" },
    { id: 6, team: "B", color: "#7c3aed" },
    { id: 7, team: "B", color: "#7c3aed" },
    { id: 8, team: "B", color: "#7c3aed" },
    { id: 9, team: "B", color: "#7c3aed" },
    { id: 10, team: "B", color: "#7c3aed" },
];

const MiniAvatar = ({ color }: { color: string }) => (
    <div className="w-5 h-5 rounded-full border border-white/20 bg-surface flex items-center justify-center overflow-hidden">
        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color, opacity: 0.5 }} />
    </div>
);

// 5 players for voting carousel (sliding left to right)
const votingPlayers = [
    { id: 1, name: "Nico", color: "#3B82F6", initialVotes: 3 },
    { id: 2, name: "Juan", color: "#7c3aed", initialVotes: 4 },
    { id: 3, name: "Mati", color: "#34d399", initialVotes: 2 },
    { id: 4, name: "Leo", color: "#f59e0b", initialVotes: 5 },
    { id: 5, name: "Lucas", color: "#ec4899", initialVotes: 3 },
];

function LiveVotingWindow() {
    const [cycle, setCycle] = React.useState(0);
    const [voted, setVoted] = React.useState(false);
    const [clicked, setClicked] = React.useState(false);
    const [scores, setScores] = React.useState<string[]>(Array(5).fill('X'));
    const reduceMotion = useReducedMotion();

    React.useEffect(() => {
        if (reduceMotion) {
            setCycle(0);
            setVoted(true);
            setClicked(true);
            setScores(["8", "7", "7", "9", "8"]);
            return;
        }

        let currentCycle = 0;

        const triggerCycle = (c: number) => {
            // Restart the reveal state for everyone when the loop restarts (every 5 cycles)
            if (c > 0 && c % 5 === 0) {
                setScores(Array(5).fill('X'));
            }

            setVoted(false);
            setClicked(false);

            setTimeout(() => setVoted(true), 1200);
            setTimeout(() => {
                setClicked(true);
                const randomScore = Math.floor(Math.random() * 10) + 1;
                setScores(prev => {
                    const next = [...prev];
                    next[c % 5] = randomScore.toString();
                    return next;
                });
            }, 1450);
        };

        // First cycle
        triggerCycle(currentCycle);

        const interval = setInterval(() => {
            currentCycle++;
            setCycle(currentCycle);
            triggerCycle(currentCycle);
        }, 3000);
        return () => clearInterval(interval);
    }, [reduceMotion]);

    return (
        <div className="relative flex h-44 w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-black/20 p-3 shadow-2xl backdrop-blur-sm [@media(max-width:430px)]:h-40 [@media(max-width:430px)]:p-2.5 sm:h-48 sm:p-4">
            <div className="relative mb-4 flex h-28 w-full items-center justify-center sm:h-32">
                {votingPlayers.map((p, i) => {
                    let diff = (i - cycle) % votingPlayers.length;
                    if (diff < 0) diff += votingPlayers.length;

                    let x = 0; let scale = 1; let opacity = 1; let zIndex = 0;

                    if (diff === 0) { x = 0; scale = 1.1; zIndex = 10; } // Center
                    else if (diff === 1) { x = -80; scale = 0.9; zIndex = 5; } // Left
                    else if (diff === 4) { x = 80; scale = 0.9; zIndex = 5; } // Right
                    else if (diff === 2) { x = -160; scale = 0.8; opacity = 0; zIndex = 1; } // Far left
                    else if (diff === 3) { x = 160; scale = 0.8; opacity = 0; zIndex = 1; } // Far right

                    const isWrapping = diff === 2;

                    const isCenter = diff === 0;
                    const isRight = diff === 4;
                    const hasVote = (isCenter && clicked) || isRight;

                    const activeGlow = isCenter && hasVote;
                    const passiveGlow = isRight;

                    const displayScore = scores[i];

                    return (
                        <motion.div
                            key={p.id}
                            className="absolute flex h-[80px] w-[56px] flex-col items-center justify-start rounded-xl border bg-white/5 p-2 shadow-xl backdrop-blur-md sm:h-[84px] sm:w-[60px]"
                            animate={{
                                x,
                                scale,
                                opacity,
                                boxShadow: activeGlow ? `0 0 20px ${p.color}80` : (passiveGlow ? `0 0 10px ${p.color}40` : `0 0 0px ${p.color}00`),
                                borderColor: activeGlow ? `${p.color}aa` : (passiveGlow ? `${p.color}55` : "rgba(255,255,255,0.1)"),
                                zIndex
                            }}
                            transition={{
                                duration: reduceMotion ? 0 : (isWrapping ? 0 : 0.6),
                                ease: "circOut"
                            }}
                        >
                            <MiniAvatar color={p.color} />
                            <span className="text-[11px] text-white/90 font-bold mt-2">{p.name}</span>

                            <motion.div
                                className="mt-1 bg-black/50 rounded flex items-center justify-center min-w-[32px] py-0.5 border"
                                animate={{
                                    backgroundColor: hasVote ? `${p.color}40` : "rgba(0,0,0,0.5)",
                                    borderColor: hasVote ? `${p.color}60` : "rgba(255,255,255,0.1)",
                                }}
                            >
                                <span className={`text-[12px] font-black tracking-tight drop-shadow-sm ${displayScore === 'X' ? 'text-white/40' : 'text-white'}`}>
                                    {displayScore}
                                </span>
                            </motion.div>
                        </motion.div>
                    );
                })}

                <motion.div
                    className="absolute z-20 text-white w-6 h-6 origin-top-left"
                    style={{ left: "54%", top: "40%" }}
                    animate={reduceMotion ? { opacity: 0 } : (
                        voted
                            ? {
                                x: [30, 0, 0, 0, 30],
                                y: [30, 0, 0, 0, 30],
                                scale: [1, 1, 0.8, 1, 1],
                                opacity: [0, 1, 1, 1, 0]
                            }
                            : { opacity: 0 }
                    )}
                    transition={reduceMotion ? { duration: 0 } : (
                        voted
                            ? { duration: 1.0, times: [0, 0.25, 0.35, 0.5, 1], ease: "easeInOut" }
                            : { duration: 0 }
                    )}
                >
                    <svg viewBox="0 0 24 24" fill="white" stroke="rgba(0,0,0,0.8)" strokeWidth="1" className="drop-shadow-lg">
                        <path d="M4 2L20 13L13 14L16 20L13 21L10 15L5 19V2Z" />
                    </svg>
                </motion.div>
            </div>

            <div className="absolute bottom-3 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 text-center text-[10px] font-bold uppercase tracking-wider text-primary-glow [@media(max-width:430px)]:bottom-2 [@media(max-width:430px)]:text-[9px] sm:px-3 sm:text-xs sm:tracking-widest">
                Votación Democrática
            </div>
        </div>
    );
}

function getDisorganizedStart(isMobile: boolean) {
    const spreadX = isMobile ? 124 : 176;
    const spreadY = isMobile ? 190 : 270;

    return playerDots5v5.map(() => ({
        x: (Math.random() - 0.5) * spreadX,
        y: (Math.random() - 0.5) * spreadY,
    }));
}

function getOrganizedEnd(isMobile: boolean) {
    const scale = isMobile ? 0.78 : 1;

    return playerDots5v5.map((p, i) => {
        const isA = p.team === "A";
        const idx = isA ? i : i - 5; // 0 to 4

        let x = 0;
        let y = 0;

        if (isA) {
            if (idx === 0) { x = 0; y = -120; } // Keeper
            else if (idx === 1) { x = -40; y = -80; } // Def L
            else if (idx === 2) { x = 40; y = -80; } // Def R
            else if (idx === 3) { x = -25; y = -25; } // Att L
            else if (idx === 4) { x = 25; y = -25; } // Att R
        } else {
            if (idx === 0) { x = -25; y = 25; } // Att L
            else if (idx === 1) { x = 25; y = 25; } // Att R
            else if (idx === 2) { x = -40; y = 80; } // Def L
            else if (idx === 3) { x = 40; y = 80; } // Def R
            else if (idx === 4) { x = 0; y = 120; } // Keeper
        }

        return {
            x: x * scale,
            y: y * scale,
        };
    });
}

function TeamBalanceWindow() {
    const [isMobile, setIsMobile] = React.useState(false);
    const reduceMotion = useReducedMotion();

    React.useEffect(() => {
        const mediaQuery = window.matchMedia("(max-width: 640px)");
        const syncViewport = () => setIsMobile(mediaQuery.matches);

        syncViewport();
        mediaQuery.addEventListener("change", syncViewport);
        return () => mediaQuery.removeEventListener("change", syncViewport);
    }, []);

    // Keep stable coordinates per viewport category so the loop is deterministic.
    const disorganized = React.useMemo(() => getDisorganizedStart(isMobile), [isMobile]);
    const organized = React.useMemo(() => getOrganizedEnd(isMobile), [isMobile]);

    return (
        <div className="relative flex h-full min-h-[320px] w-full flex-col items-center justify-between overflow-hidden rounded-xl border border-white/10 bg-black/20 px-4 py-6 shadow-2xl backdrop-blur-sm [@media(max-width:430px)]:min-h-[280px] [@media(max-width:430px)]:px-3 [@media(max-width:430px)]:py-5 [@media(max-width:360px)]:min-h-[260px] sm:min-h-[360px] sm:py-8 md:min-h-[400px]">

            <div className="flex-1 relative w-full flex items-center justify-center mt-2 mb-6">
                {/* The Pitch Background (Vertical) - Larger & Brighter */}
                <div className="absolute inset-0 m-auto flex h-[95%] w-[180px] max-h-[300px] items-center justify-center rounded-md border-2 border-white/10 opacity-100 shadow-[0_0_20px_rgba(255,255,255,0.03)] sm:w-[220px] sm:max-h-[340px] md:w-[240px] md:max-h-[380px]">
                    {/* Center Line (Horizontal) */}
                    <div className="absolute w-full h-[2px] bg-white/10" />
                    {/* Center Circle */}
                    <div className="absolute h-14 w-14 rounded-full border-2 border-white/10 sm:h-16 sm:w-16" />
                    {/* Center Spot */}
                    <div className="absolute w-1.5 h-1.5 rounded-full bg-white/20" />

                    {/* Top Penalty Area */}
                    <div className="absolute top-0 h-[45px] w-[100px] border-2 border-t-0 border-white/10 sm:h-[55px] sm:w-[120px]" />
                    {/* Top Goal Area */}
                    <div className="absolute top-0 h-[16px] w-[42px] border-2 border-t-0 border-white/10 sm:h-[20px] sm:w-[50px]" />

                    {/* Bottom Penalty Area */}
                    <div className="absolute bottom-0 h-[45px] w-[100px] border-2 border-b-0 border-white/10 sm:h-[55px] sm:w-[120px]" />
                    {/* Bottom Goal Area */}
                    <div className="absolute bottom-0 h-[16px] w-[42px] border-2 border-b-0 border-white/10 sm:h-[20px] sm:w-[50px]" />
                </div>

                {playerDots5v5.map((p, i) => (
                    <motion.div
                        key={p.id}
                        className="absolute z-10"
                        animate={{
                            x: reduceMotion
                                ? organized[i].x
                                : [disorganized[i].x, disorganized[i].x, organized[i].x, organized[i].x, disorganized[i].x],
                            y: reduceMotion
                                ? organized[i].y
                                : [disorganized[i].y, disorganized[i].y, organized[i].y, organized[i].y, disorganized[i].y],
                        }}
                        transition={reduceMotion
                            ? { duration: 0 }
                            : {
                                duration: 4.8,
                                repeat: Infinity,
                                repeatType: "loop",
                                times: [0, 0.12, 0.44, 0.9, 1],
                                ease: "easeInOut"
                            }}
                    >
                        <MiniAvatar color={p.color} />
                    </motion.div>
                ))}
            </div>

            {/* Slider Simulation */}
            <div className="absolute bottom-5 left-0 right-0 z-20 flex w-full flex-col items-center px-4 sm:px-8">
                <div className="w-full max-w-[200px] h-1.5 bg-white/10 rounded-full relative overflow-hidden mb-1.5">
                    {/* Slider thumb moves from left to center as teams balance */}
                    <motion.div
                        animate={reduceMotion ? { left: "50%" } : { left: ["0%", "0%", "50%", "50%", "0%"] }}
                        transition={reduceMotion
                            ? { duration: 0 }
                            : { duration: 4.8, repeat: Infinity, repeatType: "loop", times: [0, 0.12, 0.44, 0.9, 1], ease: "easeInOut" }}
                        className="absolute w-3 h-3 bg-white rounded-full border-2 border-primary shadow-[0_0_10px_#3B82F6] top-1/2 -translate-y-1/2 -translate-x-1/2"
                    />
                </div>
                <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">
                    Equilibrio
                </div>
            </div>
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   Award badge – unlock animation
───────────────────────────────────────────────────────────── */
function AnimatedRating() {
    const [rating, setRating] = React.useState(4.4);
    const [flyingSigns, setFlyingSigns] = React.useState<{ id: number, type: 'plus' | 'minus' }[]>([]);
    const reduceMotion = useReducedMotion();

    React.useEffect(() => {
        if (reduceMotion) {
            setRating(4.8);
            setFlyingSigns([]);
            return;
        }

        let current = 4.4;
        let direction = 1;

        const interval = setInterval(() => {
            // switch direction at boundaries
            if (current >= 5.0) direction = -1;
            else if (current <= 4.2) direction = 1;

            const isPlus = direction > 0;
            const newSign = { id: Date.now(), type: isPlus ? 'plus' : 'minus' as 'plus' | 'minus' };

            // Add the flying sign
            setFlyingSigns(prev => [...prev.slice(-4), newSign]);

            // Delay the score update until the sign "hits"
            setTimeout(() => {
                current += direction * 0.1;
                current = Math.round(current * 10) / 10;
                setRating(current);
            }, 500); // 500ms delay for the visual impact

            // Clean up the sign shortly after
            setTimeout(() => {
                setFlyingSigns(prev => prev.filter(s => s.id !== newSign.id));
            }, 1000);

        }, 1800); // Every 1.8 seconds spawn a new +/-
        return () => clearInterval(interval);
    }, [reduceMotion]);

    return (
        <div className="relative flex h-14 w-20 items-center justify-center sm:h-16 sm:w-24">
            <motion.span
                key={rating}
                initial={{ scale: 1.15, color: "#ffffff", filter: "brightness(1.5)" }}
                animate={{ scale: 1, color: "#facc15", filter: "brightness(1)" }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.4, type: "spring", bounce: 0.4 }}
                className="z-10 w-full text-center text-4xl font-black italic tracking-tighter drop-shadow-lg sm:text-5xl"
            >
                {rating.toFixed(1)}
            </motion.span>

            {flyingSigns.map(sign => {
                const isPlus = sign.type === 'plus';
                return (
                    <motion.div
                        key={sign.id}
                        initial={{ opacity: 0, x: isPlus ? 40 : -40, y: isPlus ? 20 : -20, scale: 0.5 }}
                        animate={{ opacity: [0, 1, 1, 0], x: 0, y: 0, scale: [0.5, 1.2, 1.5, 0] }}
                        transition={{ duration: 0.6, ease: "easeIn", times: [0, 0.4, 0.8, 1] }}
                        className={`absolute z-20 text-2xl font-black italic drop-shadow-[0_0_10px_currentColor] blur-[0.5px] sm:text-3xl ${isPlus ? 'text-green-400 right-[-8px]' : 'text-red-400 left-[-8px]'}`}
                    >
                        {isPlus ? '+' : '-'}
                    </motion.div>
                );
            })}
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────
   Main Features section
───────────────────────────────────────────────────────────── */
export function Features() {
    const reduceMotion = useReducedMotion();

    return (
        <Section id="features" className="bg-background">
            <div className="container mx-auto">
                <div className="mb-12 text-center [@media(max-width:430px)]:mb-10 md:mb-20 md:text-left">
                    <span className="text-primary font-medium tracking-wider uppercase text-sm mb-4 block">Features</span>
                    <h2 className="mx-auto mb-5 max-w-2xl text-[clamp(2rem,8vw,3rem)] font-bold text-white [@media(max-width:430px)]:text-[clamp(1.7rem,7.4vw,2.25rem)] md:mx-0 md:mb-6 md:text-6xl">
                        Todo lo que necesitás para{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-primary-glow">
                            profesionalizar
                        </span>{" "}
                        tu amateurismo.
                    </h2>
                </div>

                <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">

                    {/* ── Feature 1: Balance Democrático (Large) ── */}
                    <Card className="relative row-span-2 overflow-hidden border-white/10 bg-gradient-to-br from-surface/80 to-surface-highlight/50 group md:col-span-2">
                        <div className="relative z-10 flex h-full flex-col gap-6 p-5 [@media(max-width:430px)]:gap-4 [@media(max-width:430px)]:p-4 sm:p-6 md:flex-row md:gap-8 md:p-8">
                            {/* Left Column (Text + Voting) */}
                            <div className="flex-[0.8] flex flex-col justify-between h-full">
                                {/* Header */}
                                <div className="mb-6 flex flex-col md:mb-8">
                                    <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center mb-4">
                                        <ZapSVG />
                                    </div>
                                    <h3 className="mb-2 text-xl font-bold text-white [@media(max-width:430px)]:text-lg sm:text-2xl md:text-3xl">Balance Democrático</h3>
                                    <p className="text-text-secondary text-sm md:text-base leading-relaxed">
                                        Los jugadores se distribuyen en equipos parejos según la evaluación del grupo.
                                    </p>
                                </div>

                                {/* Voting Window */}
                                <div className="mt-auto">
                                    <LiveVotingWindow />
                                </div>
                            </div>

                            {/* Right Column (The Vertical Pitch) */}
                            <div className="flex-[1.2] flex items-stretch h-full">
                                <TeamBalanceWindow />
                            </div>
                        </div>

                        {/* Background glow */}
                        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-transparent via-primary/5 to-primary/10 pointer-events-none" />
                        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none group-hover:bg-primary/20 transition-all duration-700" />
                    </Card>

                    {/* ── Feature 2: Tu Perfil de Jugador ── */}
                    <Card className="relative flex h-full flex-col overflow-hidden border-white/5 bg-surface-highlight/20 group md:row-span-2">
                        <div className="flex items-center gap-3 p-5 pb-2 [@media(max-width:430px)]:p-4 [@media(max-width:430px)]:pb-2 sm:gap-4 sm:p-6">
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 backdrop-blur-sm transition-all group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)] sm:h-12 sm:w-12">
                                <UserRound className="w-6 h-6 text-blue-400" />
                            </div>
                            <div>
                                <h3 className="mb-1 text-lg font-bold text-white sm:text-xl">Tu Perfil de Jugador</h3>
                                <p className="text-text-secondary text-[13px] leading-tight">
                                    Construí identidad, acumulá premios y mostrá tu reputación.
                                </p>
                            </div>
                        </div>

                        <div className="relative flex flex-1 flex-col items-center justify-center gap-5 p-5 [@media(max-width:430px)]:gap-4 [@media(max-width:430px)]:p-4 sm:gap-6 sm:p-6 md:flex-row md:gap-6">
                            {/* Awards - Row on mobile, Column on desktop */}
                            <div className="z-10 flex flex-row justify-center gap-5 [@media(max-width:430px)]:gap-4 sm:gap-8 md:flex-col md:gap-8">
                                {[
                                    { src: "/mvp_award.png", label: "Figura", count: "3X", color: "#fbbf24" },
                                    { src: "/goalkeeper_award.png", label: "Arquero", count: "1X", color: "#38bdf8" },
                                    { src: "/redcard_award.png", label: "Tarjeta", count: "5X", color: "#ef4444" },
                                ].map((award, i) => (
                                    <motion.div
                                        key={award.label}
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        viewport={{ once: true, margin: "-50px" }}
                                        transition={{
                                            duration: 0.8,
                                            delay: i * 0.25,
                                            ease: "easeInOut"
                                        }}
                                        className="flex flex-col items-center gap-1.5 group/award hover:scale-110 transition-transform cursor-default"
                                    >
                                        <div className="relative w-10 h-10 md:w-12 md:h-12 drop-shadow-lg" style={{ filter: `drop-shadow(0 0 12px ${award.color}44)` }}>
                                            <Image src={award.src} alt={award.label} fill className="object-contain" />
                                        </div>
                                        <span className="text-[10px] md:text-[11px] font-black text-white/50 uppercase tracking-tighter">{award.count}</span>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Profile card image - MUCH BIGGER */}
                            <div className="relative mx-auto flex aspect-[4/5] w-full max-w-[180px] flex-1 items-center justify-center [@media(max-width:430px)]:max-w-[155px] sm:max-w-[220px] md:max-w-[280px] lg:max-w-[320px]">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9, rotateY: -10 }}
                                    whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, type: "spring" }}
                                    className="relative w-full h-full drop-shadow-[0_0_50px_rgba(59,130,246,0.3)] hover:drop-shadow-[0_0_70px_rgba(59,130,246,0.5)] transition-all duration-500"
                                >
                                    <Image
                                        src="/CardProfileCard.png"
                                        alt="Arma2"
                                        fill
                                        className="object-contain"
                                    />
                                </motion.div>
                            </div>
                        </div>
                    </Card>

                    {/* ── Feature 3: Comunidad ── */}
                    <Card className="relative h-full overflow-hidden border-white/5 bg-surface-highlight/20 group">
                        <div className="flex h-full flex-col p-5 [@media(max-width:430px)]:p-4 sm:p-6">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 sm:mb-6 sm:h-12 sm:w-12">
                                <Users2 className="w-6 h-6 text-blue-500" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">Comunidad</h3>
                            <p className="mb-5 text-sm text-text-secondary sm:mb-6">
                                Mantené a tu equipo informado en tiempo real sobre desafíos y resultados.
                            </p>

                            {/* Mini Floating Notification */}
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                                className="mt-auto bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-2.5 flex items-center gap-3 shadow-2xl"
                            >
                                <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center border border-blue-500/30 shrink-0">
                                    <Swords className="w-3.5 h-3.5 text-blue-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-white/50 leading-none mb-1 uppercase font-bold tracking-tighter">Desafío Grupal</p>
                                    <p className="text-[11px] text-white/90 truncate font-medium">¡Te desafiaron a jugar!</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 }}
                                className="mt-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-2.5 flex items-center gap-3 shadow-2xl"
                            >
                                <div className="w-7 h-7 rounded-full bg-purple-500/20 flex items-center justify-center border border-purple-500/30 shrink-0">
                                    <Smartphone className="w-3.5 h-3.5 text-purple-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-white/50 leading-none mb-1 uppercase font-bold tracking-tighter">Votación</p>
                                    <p className="text-[11px] text-white/90 truncate font-medium">Armá los equipos ahora</p>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.9 }}
                                className="mt-2 bg-black/40 backdrop-blur-md rounded-lg border border-white/10 p-2.5 flex items-center gap-3 shadow-2xl"
                            >
                                <div className="w-7 h-7 rounded-full bg-green-500/20 flex items-center justify-center border border-green-500/30 shrink-0">
                                    <Check className="w-3.5 h-3.5 text-green-400" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-[10px] text-white/50 leading-none mb-1 uppercase font-bold tracking-tighter">Confirmación</p>
                                    <p className="text-[11px] text-white/90 truncate font-medium">Partido confirmado</p>
                                </div>
                            </motion.div>
                        </div>
                    </Card>

                    {/* ── Feature 4: Encuesta Post-Partido ── */}
                    <Card className="relative h-full overflow-hidden border-white/5 bg-surface-highlight/20 group">
                        <div className="flex h-full flex-col p-5 [@media(max-width:430px)]:p-4 sm:p-6">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-purple-500/20 bg-purple-500/10 sm:mb-6 sm:h-12 sm:w-12">
                                <Smartphone className="w-6 h-6 text-purple-500" />
                            </div>
                            <h3 className="mb-2 text-lg font-bold text-white sm:text-xl">Encuesta Post-Partido</h3>
                            <p className="mb-5 text-sm text-text-secondary sm:mb-6">
                                Votación rápida al finalizar. Elegí las figuras y sancioná la falta de compromiso.
                            </p>

                            {/* Mini Survey Simulation - Step by Step */}
                            <div className="relative mt-auto flex flex-col gap-4 overflow-hidden rounded-lg border border-white/5 bg-white/5 p-4 [@media(max-width:430px)]:gap-3 [@media(max-width:430px)]:p-3">
                                {/* Progress Indicator */}
                                <div className="flex justify-between items-center px-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center flex-1 last:flex-none">
                                            <div className={`w-1.5 h-1.5 rounded-full transition-colors duration-500 ${i <= 2 ? "bg-primary-glow shadow-[0_0_5px_rgba(59,130,246,0.5)]" : "bg-white/20"}`} />
                                            {i < 3 && <div className={`h-[1px] flex-1 mx-1 transition-colors duration-500 ${i < 2 ? "bg-primary-glow/40" : "bg-white/10"}`} />}
                                        </div>
                                    ))}
                                </div>

                                <div className="flex justify-around items-end">
                                    {/* Step 1: Trophy (Done) */}
                                    <div className="flex flex-col items-center gap-2 opacity-30">
                                        <div className="relative w-6 h-6">
                                            <Image src="/mvp_award.png" alt="Figura" fill className="object-contain" />
                                        </div>
                                        <div className="flex -space-x-1">
                                            <div className="w-2.5 h-2.5 rounded-full border border-white/10 bg-white/5" />
                                            <div className="w-2.5 h-2.5 rounded-full border border-white/20 bg-primary-glow/60" />
                                            <div className="w-2.5 h-2.5 rounded-full border border-white/10 bg-white/5" />
                                        </div>
                                    </div>

                                    {/* Step 2: Glove (Active) */}
                                    <div className="flex flex-col items-center gap-2">
                                        <motion.div
                                            animate={reduceMotion ? { y: 0 } : { y: [0, -2, 0] }}
                                            transition={reduceMotion ? { duration: 0 } : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="relative w-9 h-9 drop-shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                                        >
                                            <Image src="/goalkeeper_award.png" alt="Arquero" fill className="object-contain" />
                                        </motion.div>
                                        <div className="flex -space-x-1.5">
                                            <div className="w-3.5 h-3.5 rounded-full border border-white/20 bg-white/5 transition-colors" />
                                            <div className="w-3.5 h-3.5 rounded-full border border-white/30 bg-primary-glow shadow-[0_0_10px_#3B82F6] z-10" />
                                            <div className="w-3.5 h-3.5 rounded-full border border-white/20 bg-white/5 transition-colors" />
                                        </div>
                                    </div>

                                    {/* Step 3: Card (Next) */}
                                    <div className="flex flex-col items-center gap-2 opacity-30">
                                        <div className="relative w-6 h-6">
                                            <Image src="/redcard_award.png" alt="Sanción" fill className="object-contain" />
                                        </div>
                                        <div className="flex -space-x-1">
                                            <div className="w-2.5 h-2.5 rounded-full border border-white/10 bg-white/5" />
                                            <div className="w-2.5 h-2.5 rounded-full border border-white/10 bg-white/5" />
                                            <div className="w-2.5 h-2.5 rounded-full border border-white/10 bg-white/5" />
                                        </div>
                                    </div>
                                </div>

                                <div className="h-8 rounded bg-primary/20 border border-primary/30 flex items-center justify-center text-[10px] font-bold text-primary-glow uppercase tracking-widest gap-2">
                                    Confirmar Votos
                                    <motion.div
                                        animate={reduceMotion ? { opacity: 1 } : { opacity: [0.4, 1, 0.4] }}
                                        transition={reduceMotion ? { duration: 0 } : { duration: 1.5, repeat: Infinity }}
                                        className="w-1 h-1 rounded-full bg-primary-glow"
                                    />
                                </div>

                                {/* Success Feedback simulation */}
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    whileInView={{ opacity: 0.6, y: 0 }}
                                    transition={{ delay: 2.5 }}
                                    className="absolute bottom-1 left-0 right-0 flex justify-center items-center gap-1.5"
                                >
                                    <span className="text-[8px] text-white/40 uppercase font-bold tracking-tighter">Encuesta registrada</span>
                                    <svg width="7" height="7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" className="text-blue-400">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                </motion.div>
                            </div>
                        </div>
                    </Card>

                    {/* ── Feature 5: Premios y Sanciones ── */}
                    <Card className="relative h-full overflow-hidden border-white/5 bg-surface-highlight/20 group">
                        <div className="flex h-full flex-col p-5 [@media(max-width:430px)]:p-4 sm:p-6">
                            <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/10 backdrop-blur-sm transition-all group-hover:shadow-[0_0_15px_rgba(251,191,36,0.2)] sm:mb-6 sm:h-12 sm:w-12">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                            </div>
                            <h3 className="mb-2 text-center text-lg font-bold text-white sm:text-xl">Premios y Sanciones</h3>
                            <p className="mb-5 text-center text-sm text-text-secondary sm:mb-6">
                                Los premios quedan en tu historia. Las tarjetas también.
                            </p>

                            {/* Rating badge simulation - CENTERED and BIGGER */}
                            <motion.div
                                animate={reduceMotion ? { opacity: 1, scale: 1 } : { opacity: [0.8, 1, 0.8], scale: [1, 1.05, 1] }}
                                transition={reduceMotion ? { duration: 0 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="mb-8 flex items-center gap-3 self-center rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 shadow-[0_0_30px_rgba(251,191,36,0.1)] sm:mb-10 sm:px-6 sm:py-3"
                            >
                                <div className="w-6 h-6 rounded-full bg-yellow-400 flex items-center justify-center shadow-[0_0_15px_#fbbf24]">
                                    <Star className="w-4 h-4 text-black" fill="currentColor" />
                                </div>
                                <AnimatedRating />
                            </motion.div>

                            <div className="mt-auto flex items-center justify-center gap-4 rounded-2xl border-t border-white/5 bg-white/[0.03] py-4 [@media(max-width:430px)]:gap-3 sm:gap-8 sm:py-5">
                                {[
                                    { src: "/mvp_award.png", label: "Trophy", color: "rgba(251,191,36,0.4)" },
                                    { src: "/goalkeeper_award.png", label: "Glove", color: "rgba(56,189,248,0.4)" },
                                    { src: "/redcard_award.png", label: "Tarjeta", color: "rgba(239,68,68,0.4)" },
                                ].map((item, i) => (
                                    <motion.div
                                        key={item.label}
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.2 + i * 0.1 }}
                                        className="relative group/icon"
                                    >
                                        <div
                                            className="relative h-14 w-14 transition-transform duration-500 group-hover/icon:scale-125 [@media(max-width:430px)]:h-12 [@media(max-width:430px)]:w-12"
                                            style={{ filter: `drop-shadow(0 0 15px ${item.color})` }}
                                        >
                                            <Image src={item.src} alt={item.label} fill className="object-contain" />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
        </Section>
    );
}
