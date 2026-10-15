"use client";

import Image from "next/image";
import { motion, useTransform, type MotionValue } from "framer-motion";
import { ArrowRight, ArrowUpRight } from "lucide-react";

import { DeviceFrame } from "@/components/cinematic/DeviceFrame";
import { LaptopFrame } from "@/components/cinematic/LaptopFrame";
import { usePlayWhenVisible } from "@/components/cinematic/usePlayWhenVisible";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { BRAND } from "@/lib/brand-assets";
import { lerp } from "@/lib/motion-math";
import { getSiteUrl } from "@/lib/site-urls";
import type { TorneosContent } from "@/lib/torneos-content";
import { getCreateTournamentTarget } from "@/lib/torneos-links";
import { TORNEOS_HERO_END } from "@/lib/torneos-story";
import { cn } from "@/lib/utils";

import { DashboardResultado } from "./screens/DashboardResultado";
import { Poster } from "./screens/Poster";
import { PublicPagePhone } from "./screens/PublicPagePhone";
import s from "./story.module.css";
import st from "./steps.module.css";

type StoryCopy = TorneosContent["story"];

const chapterAnchor = (id: string) => `capitulo-${id}`;

/** Torneos home, top of the page: the hero, then how one result reaches everyone in four steps. */
export function TorneosStory() {
  return (
    <>
      <TorneosHero />
      <TorneosSteps />
    </>
  );
}

export function TorneosHero() {
  const copy = useTorneosContent();
  const start = getCreateTournamentTarget();

  return (
    <section id="torneos-hero" className={s.hero} aria-labelledby="torneos-hero-titulo">
      <div className={s.bg}>
        {/* The render is the hero's main image; the photo behind it can arrive a moment later. */}
        <Image src={BRAND.bgStadium.src} alt="" fill loading="eager" fetchPriority="low" sizes="100vw" quality={65} />
        <div className={s.shade} />
      </div>

      <div className={s.heroLayout}>
        <div className={s.heroCopy} data-hero-copy>
          <h1 id="torneos-hero-titulo" className={cn(s.title, s.disp)}>
            <span>{copy.hero.title[0]}</span>
            <span className="text-grad-t">{copy.hero.title[1]}</span>
          </h1>
          <p className={s.lead}>{copy.hero.body}</p>
          <div className={s.ctas}>
            <a
              className={cn(s.btn, s.btnPrimary)}
              href={start.href}
              target={start.isExternal ? "_blank" : undefined}
              rel={start.isExternal ? "noopener noreferrer" : undefined}
            >
              {copy.hero.start}
              <ArrowUpRight aria-hidden="true" size={16} />
            </a>
            <a className={cn(s.btn, s.btnGhost)} href={`#${chapterAnchor(copy.story.chapters[0].id)}`}>
              {copy.hero.explore}
            </a>
          </div>
          <p className={s.micro}>
            {copy.hero.freeNote}{" "}
            <a href={getSiteUrl("torneos", "/ejemplo")} className="font-semibold text-[#c9c2ff] underline underline-offset-4 hover:text-white">
              {copy.hero.example}
            </a>
          </p>
        </div>
        <div className={s.render} data-hero-device aria-hidden="true">
          <Image
            src={BRAND.pcTorneos.src}
            alt=""
            width={BRAND.pcTorneos.width}
            height={BRAND.pcTorneos.height}
            priority
            quality={70}
            sizes="(max-width: 900px) 92vw, 740px"
          />
        </div>
      </div>

      <p className={s.demoNote}>{copy.demoNote}</p>
    </section>
  );
}

function StepText({ chapter, index }: { chapter: StoryCopy["chapters"][number]; index: number }) {
  return (
    <>
      <span className={st.num}>
        <i>{index + 1}</i>
        {chapter.step}
      </span>
      <h3 className={cn(st.title, s.disp)}>
        {chapter.title}
        {chapter.accent && (
          <>
            {" "}
            <span className="text-grad-t">{chapter.accent}</span>
          </>
        )}
      </h3>
      <p className={st.copy}>{chapter.text}</p>
    </>
  );
}

/** Fades a piece in over part of its block's animation. */
function useLate(progress: MotionValue<number>, from: number, lift = 12) {
  const opacity = useTransform(progress, [from, Math.min(from + 0.2, 1)], [0, 1]);
  const y = useTransform(progress, [from, Math.min(from + 0.2, 1)], [lift, 0]);
  return { opacity, y };
}

/** Steps 1 and 2 share the manager: the result goes in, then the table and the scorers update. */
function ResultPair({ story }: { story: StoryCopy }) {
  const [ref, progress] = usePlayWhenVisible<HTMLDivElement>(4.2);
  // The dashboard reads the story's global timeline: play it from the end of the hero to the end.
  const timeline = useTransform(progress, (p) => lerp(TORNEOS_HERO_END, 1, p));

  return (
    <div ref={ref} className={st.pair}>
      <div className={st.pairArt} aria-hidden="true">
        <div className={st.glow} />
        <LaptopFrame className={st.laptop}>
          <DashboardResultado progress={timeline} copy={story.dashboard} />
        </LaptopFrame>
      </div>
      <ol className={st.pairSteps}>
        {story.chapters.slice(0, 2).map((chapter, index) => (
          <li key={chapter.id} id={chapterAnchor(chapter.id)} className={st.step} data-step>
            <StepText chapter={chapter} index={index} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function PublicStep({ story }: { story: StoryCopy }) {
  const [ref, progress] = usePlayWhenVisible<HTMLLIElement>(1.6);
  const chapter = story.chapters[2];
  return (
    <li ref={ref} id={chapterAnchor(chapter.id)} className={cn(st.step, st.card)} data-step>
      <div className={st.cardArt} aria-hidden="true">
        <div className={st.glow} />
        <motion.div className={st.phoneWrap} style={useLate(progress, 0, 24)}>
          <DeviceFrame className={st.phone} time="9:41">
            <PublicPagePhone copy={story.publicPage} />
          </DeviceFrame>
        </motion.div>
        <motion.span className={st.chip} style={useLate(progress, 0.55)}>
          {story.linkChip}
        </motion.span>
      </div>
      <div className={st.cardText}>
        <StepText chapter={chapter} index={2} />
      </div>
    </li>
  );
}

function PostersStep({ story }: { story: StoryCopy }) {
  const [ref, progress] = usePlayWhenVisible<HTMLLIElement>(1.6);
  const chapter = story.chapters[3];
  const front = useLate(progress, 0.1, 24);
  const back = useLate(progress, 0.4, 24);
  return (
    <li ref={ref} id={chapterAnchor(chapter.id)} className={cn(st.step, st.card)} data-step>
      <div className={st.cardArt} aria-hidden="true">
        <div className={st.glow} />
        <div className={st.posters}>
          <motion.div className={cn(st.poster, st.posterBack)} style={back}>
            <Poster kind="standings" copy={story.posters} />
          </motion.div>
          <motion.div className={st.poster} style={front}>
            <Poster kind="results" copy={story.posters} />
          </motion.div>
        </div>
      </div>
      <div className={st.cardText}>
        <StepText chapter={chapter} index={3} />
      </div>
    </li>
  );
}

export function TorneosSteps() {
  const copy = useTorneosContent();
  const story = copy.story;

  return (
    <section id="torneos-como-funciona" className={st.section} aria-labelledby="torneos-como-funciona-titulo">
      <header className={st.head}>
        <p className={st.eyebrow}>{story.eyebrow}</p>
        <h2 id="torneos-como-funciona-titulo" className={cn(st.heading, s.disp)}>
          {story.title} <span className="text-grad-t">{story.titleAccent}</span>
        </h2>
      </header>
      <ResultPair story={story} />
      <ol className={st.duo} start={3}>
        <PublicStep story={story} />
        <PostersStep story={story} />
      </ol>
      <div className={st.foot}>
        <p className={st.note}>{copy.demoNote}</p>
        <a href={getSiteUrl("torneos", "/ejemplo")} className={st.example}>
          {copy.hero.example}
          <ArrowRight aria-hidden="true" size={16} />
        </a>
      </div>
    </section>
  );
}
