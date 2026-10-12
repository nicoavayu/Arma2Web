"use client";

import Image from "next/image";
import React from "react";
import { motionValue, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

import { useLanguage } from "@/components/LanguageProvider";
import { BrandMark } from "@/components/cinematic/BrandMark";
import { DeviceFrame } from "@/components/cinematic/DeviceFrame";
import { useMounted } from "@/components/cinematic/useMounted";
import { useProgressValue } from "@/components/cinematic/useProgressValue";
import { useSceneProgress } from "@/components/cinematic/useSceneProgress";
import { StoreButtons } from "@/components/shared/StoreButtons";
import { BRAND } from "@/lib/brand-assets";
import type { TranslationDictionary } from "@/lib/i18n";
import { STORY_CHAPTERS, STORY_HERO_END } from "@/lib/jugadores-story";
import { backOut, clamp, easeInOutCubic, easeOutCubic, lerp, seg } from "@/lib/motion-math";
import { cn } from "@/lib/utils";

import { ScreenConvocatoria } from "./screens/ScreenConvocatoria";
import { ScreenEncuesta } from "./screens/ScreenEncuesta";
import { ScreenEquipos } from "./screens/ScreenEquipos";
import { ScreenHome } from "./screens/ScreenHome";
import { ScreenVotacion } from "./screens/ScreenVotacion";
import { emptyFloatRefs, StoryFloats, type FloatRefs, type RegisterFloat } from "./StoryFloats";
import s from "./story.module.css";

type StoryCopy = TranslationDictionary["home"]["story"];

const SECTION_ID = "como-se-arman";
/** Scene height; the scroll range is this minus one viewport. */
const SCENE_HEIGHT = "860svh";
const TINTS = [s.t0, s.t1, s.t2, s.t3];
/** Hero pose of the phone: rotateX, rotateY, rotateZ (deg). */
const HERO_TILT = { desktop: [9, -26, 4], mobile: [5, 0, -3] } as const;
/** Vote chips around the phone, relative to its right edge (px) and height (fraction). */
const CHIP_POS = [[110, -0.34], [300, -0.2], [130, -0.04], [330, 0.1], [120, 0.22], [280, 0.33]] as const;
/** Awards fanning out of the phone: desktop (px from the right edge, fraction of height) and mobile (fraction of width, fraction of height). */
const AWARD_POS = { desktop: [[170, -0.22], [330, 0.06], [165, 0.29]], mobile: [[0, 0.27], [-0.27, 0.29], [0.27, 0.29]] } as const;

export const chapterAnchor = (id: string) => `capitulo-${id}`;

/** Static version (reduced motion) when the visitor asks for it. Always the scene on the server. */
export function useStaticStory(): boolean {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  return mounted && reduce === true;
}

export function JugadoresStory() {
  return useStaticStory() ? <JugadoresStoryStatic /> : <JugadoresStoryScene />;
}

function HeroCopy({ hero }: { hero: TranslationDictionary["home"]["hero"] }) {
  return (
    <>
      <p className={s.eyebrow}>{hero.eyebrow}</p>
      <h1 className={s.title}>
        <span>{hero.title[0]}</span>
        <span className="text-grad-j">{hero.title[1]}</span>
        <span>{hero.title[2]}</span>
      </h1>
      <p className={s.lead}>{hero.lead}</p>
      <StoreButtons tone="glass" />
    </>
  );
}

function ChapterTitle({ chapter }: { chapter: StoryCopy["chapters"][number] }) {
  return (
    <h2 className={s.capTitle}>
      <span>{chapter.title}</span>
      {chapter.accent && (
        <>
          {" "}
          <span className="text-grad-j">{chapter.accent}</span>
        </>
      )}
    </h2>
  );
}

/** The four chapter screens, each driven by its chapter progress. */
function chapterScreens(copy: StoryCopy["screens"], progress: readonly MotionValue<number>[]) {
  return [
    <ScreenConvocatoria key="convocatoria" progress={progress[0]} copy={copy.match} />,
    <ScreenVotacion key="votacion" progress={progress[1]} copy={copy.vote} />,
    <ScreenEquipos key="equipos" progress={progress[2]} copy={copy.teams} />,
    <ScreenEncuesta key="encuesta" progress={progress[3]} copy={copy.survey} />,
  ];
}

/** Sum of offsetLeft/offsetTop from `el` up to `ancestor` (layout position, ignoring transforms). */
function layoutBox(el: HTMLElement, ancestor: HTMLElement) {
  let x = 0;
  let y = 0;
  let node: HTMLElement | null = el;
  while (node && node !== ancestor) {
    x += node.offsetLeft;
    y += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return { x, y, w: el.offsetWidth, h: el.offsetHeight };
}

function JugadoresStoryScene() {
  const { t } = useLanguage();
  const story = t.home.story;

  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const bgLeftRef = React.useRef<HTMLDivElement>(null);
  const heroCopyRef = React.useRef<HTMLDivElement>(null);
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const phoneRef = React.useRef<HTMLDivElement>(null);
  const backRef = React.useRef<HTMLDivElement>(null);
  const bigMarkRef = React.useRef<HTMLDivElement>(null);
  const chaptersRef = React.useRef<HTMLElement>(null);
  const nodesRef = React.useRef({
    tints: [] as (HTMLDivElement | null)[],
    caps: [] as (HTMLDivElement | null)[],
    layers: [] as (HTMLDivElement | null)[],
    floats: emptyFloatRefs() as FloatRefs,
  });
  const registerFloat = React.useCallback<RegisterFloat>((key, index, el) => {
    const floats = nodesRef.current.floats;
    if (key === "chat" || key === "nums") floats[key] = el;
    else floats[key][index] = el;
  }, []);

  const progress = useSceneProgress(sectionRef);
  const c1 = useTransform(progress, (p) => seg(p, STORY_CHAPTERS[0][0], STORY_CHAPTERS[0][1]));
  const c2 = useTransform(progress, (p) => seg(p, STORY_CHAPTERS[1][0], STORY_CHAPTERS[1][1]));
  const c3 = useTransform(progress, (p) => seg(p, STORY_CHAPTERS[2][0], STORY_CHAPTERS[2][1]));
  const c4 = useTransform(progress, (p) => seg(p, STORY_CHAPTERS[3][0], STORY_CHAPTERS[3][1]));
  const active = useProgressValue(progress, (p) => STORY_CHAPTERS.findIndex(([a, b]) => p >= a && p < b));

  React.useEffect(() => {
    const stage = stageRef.current;
    const anchor = anchorRef.current;
    const phone = phoneRef.current;
    const bigMark = bigMarkRef.current;
    const nodes = nodesRef.current;
    if (!stage || !anchor || !phone || !bigMark) return;

    const measure = () => {
      const W = stage.clientWidth;
      const H = stage.clientHeight;
      const isMobile = W < 900;
      const box = layoutBox(anchor, stage);
      const heroPh = phone.offsetHeight;
      const ph = isMobile ? Math.min(0.54 * H, 480) : Math.min(0.76 * H, 700);
      const pw = ph * 0.485;
      const cxE = isMobile ? W * 0.5 : W * 0.6;
      const cyE = isMobile ? H * 0.64 : H * 0.52;
      // The nav is fixed and the stage is pinned at the top, so viewport and stage coordinates match.
      const navMark = document.querySelector<HTMLElement>('[data-brand-mark="nav"]')?.getBoundingClientRect();
      return {
        W,
        H,
        isMobile,
        acx: box.x + box.w / 2,
        acy: box.y + box.h / 2,
        heroPh,
        heroPw: heroPh * 0.485,
        ph,
        pw,
        cxE,
        cyE,
        fs: isMobile ? 1 : clamp((W - (cxE + pw / 2) - 24) / 400, 0.55, 1),
        // Destination of the big mark: the nav mark (fallback: where the nav mark sits).
        nx: navMark ? navMark.left + navMark.width / 2 : clamp(W * 0.04, 16, 56) + 18,
        ny: navMark ? navMark.top + navMark.height / 2 : 34,
        nw: navMark?.width ?? 36,
        bm: bigMark.offsetWidth,
      };
    };

    let g = measure();

    const place = (el: HTMLElement | null, dx: number, dy: number, o: { o: number; x?: number; y?: number; sc?: number; r?: number }) => {
      if (!el) return;
      const x = g.cxE + dx * g.fs + (o.x ?? 0);
      const y = g.cyE + dy * g.fs + (o.y ?? 0);
      el.style.transform = `translate3d(${x}px,${y}px,0) translate(-50%,-50%) scale(${(o.sc ?? 1) * g.fs}) rotate(${o.r ?? 0}deg)`;
      el.style.opacity = String(o.o);
    };

    const floats = nodes.floats;
    const chapterFloats = [
      (c: number, v: number) => {
        const k = easeOutCubic(seg(c, 0.03, 0.2));
        place(floats.chat, g.pw / 2 + 190, -g.ph * 0.2, { o: v * k, x: (1 - k) * 60, sc: 0.95 + 0.05 * k });
        floats.toasts.forEach((toast, i) => {
          const t = easeOutCubic(seg(c, 0.32 + i * 0.13, 0.44 + i * 0.13));
          place(toast, g.pw / 2 + 150, g.ph * 0.06 + i * 64, { o: v * t, y: (1 - t) * 22 });
        });
      },
      (c: number, v: number) => {
        floats.chips.forEach((chip, i) => {
          const t = seg(c, 0.05 + i * 0.09, 0.2 + i * 0.09);
          const [dx, dy] = CHIP_POS[i];
          place(chip, g.pw / 2 + dx, g.ph * dy, { o: v * clamp(t * 2), sc: 0.5 + 0.5 * backOut(t), y: Math.sin((c * 6 + i) * 1.3) * 6 });
        });
      },
      (c: number, v: number) => {
        const k = easeOutCubic(seg(c, 0.56, 0.72));
        place(floats.nums, g.pw / 2 + 215, 0, { o: v * k, y: (1 - k) * 34 });
      },
      (c: number, v: number) => {
        floats.awards.forEach((award, i) => {
          const t = seg(c, 0.26 + i * 0.1, 0.56 + i * 0.1);
          const e = easeOutCubic(t);
          const [ax, ay] = g.isMobile ? AWARD_POS.mobile[i] : AWARD_POS.desktop[i];
          const dx = g.isMobile ? ax * g.W : g.pw / 2 + ax;
          const dy = g.ph * ay;
          const size = g.isMobile ? (i ? 0.52 : 0.5) : 1;
          place(award, lerp(0, dx, e), lerp(g.ph * 0.05, dy, e), {
            o: v * clamp(t * 2.5),
            sc: size * lerp(0.2, 1, clamp(backOut(t), 0, 1.15)),
            r: lerp(-20, 0, e),
          });
        });
      },
    ];

    const apply = (p: number) => {
      const h = easeInOutCubic(seg(p, 0, STORY_HERO_END));

      if (bgRef.current) {
        bgRef.current.style.opacity = String(1 - h * 0.74);
        bgRef.current.style.transform = `scale(${1.05 + p * 0.2})`;
      }
      if (bgLeftRef.current) bgLeftRef.current.style.opacity = String(1 - h);

      const heroCopy = heroCopyRef.current;
      if (heroCopy) {
        const out = seg(p, 0, 0.1);
        heroCopy.style.opacity = String(1 - seg(p, 0, 0.07));
        heroCopy.style.transform = g.isMobile ? `translateY(${-out * 70}px)` : `translateX(${-out * 90}px)`;
        heroCopy.style.visibility = p > 0.11 ? "hidden" : "visible";
      }

      const [rx, ry, rz] = g.isMobile ? HERO_TILT.mobile : HERO_TILT.desktop;
      phone.style.transform =
        `translate3d(${(g.cxE - g.acx) * h}px,${(g.cyE - g.acy) * h}px,0) perspective(1800px) ` +
        `rotateX(${lerp(rx, 0, h)}deg) rotateY(${lerp(ry, 0, h)}deg) rotateZ(${lerp(rz, 0, h)}deg) scale(${lerp(1, g.ph / g.heroPh, h)})`;

      const back = backRef.current;
      if (back) {
        back.style.opacity = String(1 - seg(p, 0, 0.07));
        back.style.transform = `translate3d(${g.heroPw * 0.64 + h * g.W * 0.3}px,${-g.heroPh * 0.05}px,0) perspective(1800px) rotateX(9deg) rotateY(-26deg) rotateZ(4deg) scale(0.88)`;
      }

      const m = easeInOutCubic(seg(p, 0, 0.12));
      const bmx = g.isMobile ? 0 : g.heroPw * 0.32;
      bigMark.style.transform = `translate3d(${lerp(bmx, g.nx - g.acx, m)}px,${lerp(0, g.ny - g.acy, m)}px,0) scale(${Math.pow(g.nw / g.bm, m)})`;
      bigMark.style.opacity = String(lerp(g.isMobile ? 0.5 : 0.42, 1, m) * (1 - seg(m, 0.9, 1)));

      const home = nodes.layers[0];
      if (home) home.style.opacity = String(1 - seg(p, 0.155, 0.18));
      STORY_CHAPTERS.forEach(([a, b], i) => {
        const vin = seg(p, a, a + 0.03);
        const vout = i === 3 ? 1 : 1 - seg(p, b - 0.03, b);
        const v = vin * vout;
        const cap = nodes.caps[i];
        if (cap) {
          cap.style.opacity = String(v);
          cap.style.transform = `translateY(${(1 - vin) * 28 - (1 - vout) * 28}px)`;
        }
        const tint = nodes.tints[i];
        if (tint) tint.style.opacity = String(v);
        const layer = nodes.layers[i + 1];
        if (layer) layer.style.opacity = String(seg(p, a, a + 0.025) * (i === 3 ? 1 : 1 - seg(p, b, b + 0.025)));
        chapterFloats[i](seg(p, a, b), v);
      });

      const chapters = chaptersRef.current;
      if (chapters) {
        const o = seg(p, 0.15, 0.18) * (1 - seg(p, 0.995, 1));
        chapters.style.opacity = String(o);
        chapters.style.visibility = o > 0.01 ? "visible" : "hidden";
      }
    };

    const refresh = () => {
      g = measure();
      apply(progress.get());
    };

    apply(progress.get());
    const unsubscribe = progress.on("change", apply);
    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);
    document.fonts?.ready.then(refresh).catch(() => {});
    return () => {
      unsubscribe();
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
    };
  }, [progress]);

  const [rx, ry, rz] = HERO_TILT.desktop;
  const chapterProgress = [c1, c2, c3, c4];

  return (
    <section ref={sectionRef} id={SECTION_ID} className={s.scene} style={{ height: SCENE_HEIGHT }}>
      <span id="how-it-works" className={s.anchor} style={{ top: `calc(${STORY_CHAPTERS[0][0] + 0.01} * (100% - 100svh))` }} />
      <span id="como-funciona" className={s.anchor} style={{ top: `calc(${STORY_CHAPTERS[0][0] + 0.01} * (100% - 100svh))` }} />
      {story.chapters.map((chapter, i) => (
        <span
          key={chapter.id}
          id={chapterAnchor(chapter.id)}
          className={s.anchor}
          style={{ top: `calc(${STORY_CHAPTERS[i][0] + 0.04} * (100% - 100svh))` }}
        />
      ))}

      <div ref={stageRef} className={s.stage} data-scene="pinned">
        <div ref={bgRef} className={s.bg}>
          <Image src={BRAND.bgHero.src} alt="" fill priority sizes="100vw" />
          <div className={s.bgShade} />
        </div>
        {TINTS.map((tint, i) => (
          <div key={tint} ref={(el) => { nodesRef.current.tints[i] = el; }} className={cn(s.tint, tint)} />
        ))}
        <div className={s.grain} />
        <div ref={bgLeftRef} className={s.bgLeft} />

        <div className={s.heroLayout}>
          <div ref={heroCopyRef} className={s.heroCopy} data-hero-copy>
            <HeroCopy hero={t.home.hero} />
          </div>
          <div ref={anchorRef} className={s.heroAnchor}>
            <div ref={bigMarkRef} className={s.bigMark} style={{ opacity: 0.42, transform: "translateX(calc(min(76vh, 700px) * 0.1552))" }}>
              <BrandMark data-brand-mark="hero" />
            </div>
            <div
              ref={backRef}
              className={s.backPhone}
              style={{ transform: `translate3d(${64}%,-5%,0) perspective(1800px) rotateX(9deg) rotateY(-26deg) rotateZ(4deg) scale(0.88)` }}
            >
              <DeviceFrame>
                <div className={s.splash}>
                  <Image src={BRAND.logoArma2.src} alt="" width={BRAND.logoArma2.width} height={BRAND.logoArma2.height} />
                </div>
              </DeviceFrame>
            </div>
            <div
              ref={phoneRef}
              className={s.phone}
              style={{ transform: `perspective(1800px) rotateX(${rx}deg) rotateY(${ry}deg) rotateZ(${rz}deg)` }}
            >
              <div className={s.phoneGlow} />
              <div className={s.bob}>
                <DeviceFrame>
                  <div ref={(el) => { nodesRef.current.layers[0] = el; }} className={s.layer}>
                    <ScreenHome copy={story.screens.home} />
                  </div>
                  {chapterScreens(story.screens, chapterProgress).map((screen, i) => (
                    <div key={i} ref={(el) => { nodesRef.current.layers[i + 1] = el; }} className={s.layer} style={{ opacity: 0 }}>
                      {screen}
                    </div>
                  ))}
                </DeviceFrame>
              </div>
            </div>
          </div>
        </div>

        {story.chapters.map((chapter, i) => (
          <div key={chapter.id} ref={(el) => { nodesRef.current.caps[i] = el; }} className={s.cap}>
            <span className={s.step}>
              <i>{i + 1}</i>
              {chapter.step}
            </span>
            <ChapterTitle chapter={chapter} />
            <p className={s.capText}>{chapter.text}</p>
          </div>
        ))}

        <StoryFloats copy={story} register={registerFloat} />

        <nav ref={chaptersRef} aria-label={story.navLabel} className={s.chapters}>
          {story.chapters.map((chapter, i) => (
            <a key={chapter.id} href={`#${chapterAnchor(chapter.id)}`} aria-current={active === i ? "step" : undefined}>
              {chapter.step}
            </a>
          ))}
        </nav>
      </div>
    </section>
  );
}

/** Reduced motion: hero and the four chapters, one under the other, nothing pinned. */
export function JugadoresStoryStatic() {
  const { t } = useLanguage();
  const story = t.home.story;
  const [done] = React.useState(() => motionValue(1));
  const screens = chapterScreens(story.screens, [done, done, done, done]);

  return (
    <section id={SECTION_ID} className={s.static}>
      <span id="how-it-works" />
      <div className={s.staticHero}>
        <div>
          <HeroCopy hero={t.home.hero} />
        </div>
        <DeviceFrame className={s.staticPhone}>
          <ScreenHome copy={story.screens.home} />
        </DeviceFrame>
      </div>
      {story.chapters.map((chapter, i) => (
        <div key={chapter.id} id={chapterAnchor(chapter.id)} className={s.staticRow}>
          {i === 0 && <span id="como-funciona" />}
          <div>
            <span className={s.step}>
              <i>{i + 1}</i>
              {chapter.step}
            </span>
            <ChapterTitle chapter={chapter} />
            <p className={s.capText}>{chapter.text}</p>
          </div>
          <DeviceFrame className={s.staticPhone}>{screens[i]}</DeviceFrame>
        </div>
      ))}
    </section>
  );
}
