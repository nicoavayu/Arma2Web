"use client";

import Image from "next/image";
import { Check } from "lucide-react";
import { motion, useTransform, type MotionValue } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { BrandMark } from "@/components/cinematic/BrandMark";
import { DeviceFrame } from "@/components/cinematic/DeviceFrame";
import { usePlayWhenVisible } from "@/components/cinematic/usePlayWhenVisible";
import { StoreButtons } from "@/components/shared/StoreButtons";
import { BRAND } from "@/lib/brand-assets";
import type { TranslationDictionary } from "@/lib/i18n";
import { PLAYER_COLORS, STORY_SPLIT } from "@/lib/jugadores-story";
import { cn } from "@/lib/utils";

import { ScreenConvocatoria } from "./screens/ScreenConvocatoria";
import { ScreenEncuesta } from "./screens/ScreenEncuesta";
import { ScreenEquipos } from "./screens/ScreenEquipos";
import { ScreenHome } from "./screens/ScreenHome";
import { ScreenVotacion } from "./screens/ScreenVotacion";
import s from "./story.module.css";
import st from "./steps.module.css";

type StoryCopy = TranslationDictionary["home"]["story"];

export const chapterAnchor = (id: string) => `capitulo-${id}`;

/** Vote chips next to the phone in step 2; `null` is the "No lo conozco" chip. */
const VOTE_CHIPS = ["9", "7", null] as const;
const TOAST_PLAYERS = ["santi", "fede"] as const;

/** Players home, top of the page: the hero, then how a match comes together in four steps. */
export function JugadoresStory() {
  return (
    <>
      <JugadoresHero />
      <JugadoresSteps />
    </>
  );
}

function JugadoresHero() {
  const { t } = useLanguage();
  const hero = t.home.hero;
  const story = t.home.story;

  return (
    <section className={s.hero} aria-labelledby="inicio-titulo">
      <div className={s.bg}>
        <Image src={BRAND.bgHero.src} alt="" fill priority sizes="100vw" />
        <div className={s.bgShade} />
      </div>
      <div className={s.grain} />
      <div className={s.bgLeft} />

      <div className={s.heroLayout}>
        <div className={s.heroCopy} data-hero-copy>
          <p className={s.eyebrow}>{hero.eyebrow}</p>
          <h1 id="inicio-titulo" className={s.title}>
            <span>{hero.title[0]}</span>
            <span className="text-grad-j">{hero.title[1]}</span>
            <span>{hero.title[2]}</span>
          </h1>
          <p className={s.lead}>{hero.lead}</p>
          <StoreButtons tone="glass" className={s.stores} />
        </div>
        <div className={s.heroAnchor}>
          <div className={s.bigMark}>
            <BrandMark data-brand-mark="hero" />
          </div>
          <div className={s.backPhone} aria-hidden="true">
            <DeviceFrame>
              <div className={s.splash}>
                <Image src={BRAND.logoArma2.src} alt="" width={BRAND.logoArma2.width} height={BRAND.logoArma2.height} />
              </div>
            </DeviceFrame>
          </div>
          <div className={s.phone} data-hero-device aria-hidden="true">
            <div className={s.phoneGlow} />
            <div className={s.bob}>
              <DeviceFrame>
                <ScreenHome copy={story.screens.home} />
              </DeviceFrame>
            </div>
          </div>
        </div>
      </div>

      <p className={s.demoNote}>{t.common.demoNote}</p>
    </section>
  );
}

function StepTitle({ chapter }: { chapter: StoryCopy["chapters"][number] }) {
  return (
    <h3 className={st.title}>
      {chapter.title}
      {chapter.accent && (
        <>
          {" "}
          <span className="text-grad-j">{chapter.accent}</span>
        </>
      )}
    </h3>
  );
}

/** Fades a decoration in over the last part of its step's animation. */
function useLate(progress: MotionValue<number>, from: number) {
  const opacity = useTransform(progress, [from, Math.min(from + 0.15, 1)], [0, 1]);
  const y = useTransform(progress, [from, Math.min(from + 0.15, 1)], [10, 0]);
  return { opacity, y };
}

function InviteChat({ copy, progress }: { copy: StoryCopy; progress: MotionValue<number> }) {
  const floats = copy.floats;
  return (
    <motion.div className={cn(st.decor, st.chat)} style={useLate(progress, 0)}>
      <div className={st.chatHead}>
        <i>LJ</i>
        <span>
          {floats.group}
          <small>{floats.sender}</small>
        </span>
      </div>
      <div className={st.bubble}>{floats.message}</div>
      <div className={st.preview}>
        <span className={st.previewLogo}>
          <Image src="/logo_navbar.png" alt="" width={22} height={27} />
        </span>
        <span>
          <b>{floats.previewTitle}</b>
          <small>{floats.previewText}</small>
        </span>
      </div>
    </motion.div>
  );
}

function Confirmations({ copy, progress }: { copy: StoryCopy; progress: MotionValue<number> }) {
  const first = useLate(progress, 0.45);
  const second = useLate(progress, 0.7);
  return (
    <div className={cn(st.decor, st.toasts)}>
      {TOAST_PLAYERS.map((id, index) => (
        <motion.div key={id} className={st.toast} style={index ? second : first}>
          <span className={st.toastAv} style={{ background: PLAYER_COLORS[id] }}>
            {id[0].toUpperCase()}
          </span>
          {copy.floats.toasts[index]}
          <Check className={st.toastOk} />
        </motion.div>
      ))}
    </div>
  );
}

function VoteChips({ copy, progress }: { copy: StoryCopy; progress: MotionValue<number> }) {
  const styles = [useLate(progress, 0.2), useLate(progress, 0.45), useLate(progress, 0.75)];
  return (
    <div className={cn(st.decor, st.chips)}>
      {VOTE_CHIPS.map((chip, index) => (
        <motion.span key={index} className={cn(st.chip, chip === null && st.chipText)} style={styles[index]}>
          {chip === null ? copy.screens.vote.dunno : <span className="text-grad-j">{chip}</span>}
        </motion.span>
      ))}
    </div>
  );
}

function TeamTotals({ copy, progress }: { copy: StoryCopy; progress: MotionValue<number> }) {
  const floats = copy.floats;
  return (
    <motion.div className={cn(st.decor, st.nums)} style={useLate(progress, 0.7)}>
      <div className={cn(st.big, st.bigA)}>
        <small>{floats.teamA}</small>
        <b>{STORY_SPLIT.totalA.toFixed(1)}</b>
      </div>
      <div className={cn(st.big, st.bigB)}>
        <small>{floats.teamB}</small>
        <b>{STORY_SPLIT.totalB.toFixed(1)}</b>
      </div>
      <div className={st.dif}>{floats.diff.replace("{diff}", STORY_SPLIT.diff.toFixed(1))}</div>
    </motion.div>
  );
}

function Awards({ copy, progress }: { copy: StoryCopy; progress: MotionValue<number> }) {
  const styles = [useLate(progress, 0.55), useLate(progress, 0.7), useLate(progress, 0.82)];
  return (
    <div className={cn(st.decor, st.awards)}>
      {[BRAND.awardMvp, BRAND.awardGoalkeeper, BRAND.awardRedcard].map((award, index) => (
        <motion.div key={award.src} className={cn(st.award, index > 0 && st.awardSmall)} style={styles[index]} data-award>
          <Image src={award.src} alt="" width={award.width} height={award.height} sizes="160px" />
          <span>{copy.floats.awards[index]}</span>
        </motion.div>
      ))}
    </div>
  );
}

/** One step: its text, always visible, and its screen, which plays once when it comes into view. */
function Step({ copy, index }: { copy: StoryCopy; index: number }) {
  const chapter = copy.chapters[index];
  const [ref, progress] = usePlayWhenVisible<HTMLLIElement>(2.4);
  const screens = copy.screens;
  const screen = [
    <ScreenConvocatoria key="convocatoria" progress={progress} copy={screens.match} />,
    <ScreenVotacion key="votacion" progress={progress} copy={screens.vote} />,
    <ScreenEquipos key="equipos" progress={progress} copy={screens.teams} />,
    <ScreenEncuesta key="encuesta" progress={progress} copy={screens.survey} />,
  ][index];
  const decor = [
    <>
      <InviteChat copy={copy} progress={progress} />
      <Confirmations copy={copy} progress={progress} />
    </>,
    <VoteChips key="chips" copy={copy} progress={progress} />,
    <TeamTotals key="totals" copy={copy} progress={progress} />,
    <Awards key="awards" copy={copy} progress={progress} />,
  ][index];

  return (
    <li ref={ref} id={chapterAnchor(chapter.id)} className={cn(st.step, st[`tone${index}`])} data-step>
      <div className={st.art} aria-hidden="true">
        <div className={st.glow} />
        <DeviceFrame className={st.phone}>{screen}</DeviceFrame>
        {decor}
      </div>
      <div className={st.text}>
        <span className={st.num}>
          <i>{index + 1}</i>
          {chapter.step}
        </span>
        <StepTitle chapter={chapter} />
        <p className={st.copy}>{chapter.text}</p>
      </div>
    </li>
  );
}

function JugadoresSteps() {
  const { t } = useLanguage();
  const story = t.home.story;

  return (
    <section id="como-se-arman" className={st.section} aria-labelledby="como-se-arman-titulo">
      <span id="how-it-works" className={st.alias} />
      <span id="como-funciona" className={st.alias} />
      <header className={st.head}>
        <p className={st.eyebrow}>{story.eyebrow}</p>
        <h2 id="como-se-arman-titulo" className={st.heading}>
          {story.title} <span className="text-grad-j">{story.titleAccent}</span>
        </h2>
      </header>
      <ol className={st.list}>
        {story.chapters.map((chapter, index) => (
          <Step key={chapter.id} copy={story} index={index} />
        ))}
      </ol>
      <p className={st.note}>{t.common.demoNote}</p>
    </section>
  );
}
