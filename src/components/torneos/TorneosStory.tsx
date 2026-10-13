"use client";

import Image from "next/image";
import React from "react";
import { motionValue } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import { DeviceFrame } from "@/components/cinematic/DeviceFrame";
import { LaptopFrame } from "@/components/cinematic/LaptopFrame";
import { useProgressValue } from "@/components/cinematic/useProgressValue";
import { useSceneProgress } from "@/components/cinematic/useSceneProgress";
import { useStaticStory } from "@/components/cinematic/useStaticStory";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import { BRAND } from "@/lib/brand-assets";
import { backOut, clamp, easeInOutCubic, easeOutCubic, lerp, seg } from "@/lib/motion-math";
import { getSiteUrl } from "@/lib/site-urls";
import type { TorneosContent } from "@/lib/torneos-content";
import { getCreateTournamentTarget } from "@/lib/torneos-links";
import { TORNEOS_HERO_END, TORNEOS_STORY_CHAPTERS } from "@/lib/torneos-story";
import { cn } from "@/lib/utils";

import { DashboardResultado } from "./screens/DashboardResultado";
import { Poster } from "./screens/Poster";
import { PublicPagePhone } from "./screens/PublicPagePhone";
import s from "./story.module.css";

const SECTION_ID = "torneos-como-funciona";
const [, , CH3, CH4] = TORNEOS_STORY_CHAPTERS;

const chapterAnchor = (id: string) => `capitulo-${id}`;

export function TorneosStory() {
  return useStaticStory() ? <TorneosStoryStatic /> : <TorneosStoryScene />;
}

function HeroCopy({ copy, howHref }: { copy: TorneosContent; howHref: string }) {
  const start = getCreateTournamentTarget();
  return (
    <>
      <h1 className={cn(s.title, s.disp)}>
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
        <a className={cn(s.btn, s.btnGhost)} href={howHref}>
          {copy.hero.explore}
        </a>
      </div>
      <p className={s.micro}>
        {copy.hero.freeNote}{" "}
        <a href={getSiteUrl("torneos", "/ejemplo")} className="font-semibold text-[#c9c2ff] underline underline-offset-4 hover:text-white">
          {copy.hero.example}
        </a>
      </p>
    </>
  );
}

function RenderImage({ priority = false }: { priority?: boolean }) {
  return (
    <Image
      src={BRAND.pcTorneos.src}
      alt=""
      width={BRAND.pcTorneos.width}
      height={BRAND.pcTorneos.height}
      priority={priority}
      quality={70}
      sizes="(max-width: 900px) 92vw, 740px"
    />
  );
}

function ChapterCopy({ chapter, index }: { chapter: TorneosContent["story"]["chapters"][number]; index: number }) {
  return (
    <>
      <span className={s.step}>
        <i>{index + 1}</i>
        {chapter.step}
      </span>
      <h2 className={cn(s.capTitle, s.disp)}>
        {chapter.title}
        {chapter.accent && (
          <>
            {" "}
            <span className="text-grad-t">{chapter.accent}</span>
          </>
        )}
      </h2>
      <p className={s.capText}>{chapter.text}</p>
    </>
  );
}

function TorneosStoryScene() {
  const copy = useTorneosContent();
  const story = copy.story;
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const nodesRef = React.useRef({
    bg: null as HTMLDivElement | null,
    dim: null as HTMLDivElement | null,
    glow: null as HTMLDivElement | null,
    heroCopy: null as HTMLDivElement | null,
    render: null as HTMLDivElement | null,
    laptop: null as HTMLDivElement | null,
    phone: null as HTMLDivElement | null,
    chip: null as HTMLDivElement | null,
    posters: [] as (HTMLDivElement | null)[],
    caps: [] as (HTMLDivElement | null)[],
    chapters: null as HTMLElement | null,
  });
  const progress = useSceneProgress(sectionRef);
  const active = useProgressValue(progress, (p) => TORNEOS_STORY_CHAPTERS.findIndex(([a, b]) => p >= a && p < b));
  // The public-page phone and the posters (and their photos) mount once the story starts.
  const started = useProgressValue(progress, (p) => p > 0.05);

  React.useEffect(() => {
    const stage = stageRef.current;
    const n = nodesRef.current;
    if (!stage) return;

    const measure = () => {
      const W = stage.clientWidth;
      // Portrait phones stack; short screens (landscape phones) use the side-by-side layout with CSS-scaled posters.
      const isMobile = W < 900 && stage.clientHeight > 500;
      const short = stage.clientHeight <= 500;
      // Elements centered with `translate: -50% -50%` have their visual center at offsetLeft/offsetTop.
      const laptop = n.laptop ? { x: n.laptop.offsetLeft, y: n.laptop.offsetTop } : { x: 0, y: 0 };
      const front = n.posters[0];
      // Desktop: shrink the poster pair so the back one (300px design, CSS gap 0.98×) fits on screen.
      const fit = !isMobile && !short && front ? clamp((W - 16 - front.offsetLeft) / (300 * (0.98 + 0.5)), 0.55, 1) : 1;
      const posters = n.posters.map((poster, i) => {
        if (!poster) return { dx: 0, dy: 0, shift: 0 };
        const shift = i === 1 ? -(1 - fit) * 300 * 0.98 : 0;
        return { dx: laptop.x - poster.offsetLeft, dy: laptop.y - poster.offsetTop, shift };
      });
      return { isMobile, posters, fit };
    };
    let g = measure();

    const apply = (p: number) => {
      const h = easeInOutCubic(seg(p, 0, TORNEOS_HERO_END));
      if (n.bg) {
        n.bg.style.transform = `scale(${1.04 + p * 0.25}) translateY(${-h * 3}%)`;
        n.bg.style.opacity = String(1 - h * 0.72);
      }
      if (n.dim) n.dim.style.opacity = String(h * 0.35);
      if (n.glow) n.glow.style.opacity = String(h);
      if (n.heroCopy) {
        n.heroCopy.style.opacity = String(1 - seg(p, 0, 0.07));
        n.heroCopy.style.transform = `translateY(${-seg(p, 0, 0.1) * 90}px)`;
        n.heroCopy.style.visibility = p > 0.11 ? "hidden" : "visible";
      }
      if (n.render) {
        const z = easeInOutCubic(seg(p, 0, 0.14));
        n.render.style.transform = `translateY(${-z * (g.isMobile ? 14 : 22)}vh) scale(${1 + z * 0.55})`;
        n.render.style.opacity = String(1 - seg(p, 0.07, 0.14));
      }
      if (n.laptop) {
        const li = easeOutCubic(seg(p, 0.1, 0.17));
        n.laptop.style.opacity = String(li);
        n.laptop.style.transform = `translateY(${(1 - li) * 40}px) scale(${0.9 + 0.1 * li})`;
      }

      TORNEOS_STORY_CHAPTERS.forEach(([a, b], i) => {
        const vin = seg(p, a, a + 0.03);
        const vout = i === 3 ? 1 : 1 - seg(p, b - 0.03, b);
        const cap = n.caps[i];
        if (cap) {
          cap.style.opacity = String(vin * vout);
          cap.style.transform = `translateY(${(1 - vin) * 28 - (1 - vout) * 28}px)`;
        }
      });

      const enter = easeOutCubic(seg(p, CH3[0], CH3[0] + 0.07));
      const leave = easeInOutCubic(seg(p, CH4[0], CH4[0] + 0.06));
      if (n.phone) {
        n.phone.style.opacity = String(enter * (1 - leave));
        n.phone.style.transform = `translateX(${(1 - enter) * 120 + leave * (g.isMobile ? 60 : 220)}px) rotate(${lerp(6, 0, enter)}deg) scale(${0.92 + 0.08 * enter})`;
      }
      if (n.chip) n.chip.style.opacity = String(easeOutCubic(seg(p, CH3[0] + 0.06, CH3[0] + 0.1)));

      n.posters.forEach((poster, i) => {
        if (!poster) return;
        const t = seg(p, CH4[0] + 0.02 + i * 0.05, CH4[0] + 0.12 + i * 0.05);
        const e = easeOutCubic(t);
        const { dx, dy, shift } = g.posters[i];
        poster.style.opacity = String(clamp(t * 2));
        poster.style.transform = `translate(${lerp(dx, shift, e)}px, ${lerp(dy, 0, e)}px) scale(${lerp(0.4, i ? 0.94 : 1, clamp(backOut(t), 0, 1.1)) * g.fit}) rotate(${lerp(0, i ? 6 : -5, e)}deg)`;
      });

      if (n.chapters) {
        const o = seg(p, 0.16, 0.19) * (1 - seg(p, 0.995, 1));
        n.chapters.style.opacity = String(o);
        n.chapters.style.visibility = o > 0.01 ? "visible" : "hidden";
      }
    };

    const refresh = () => {
      g = measure();
      apply(progress.get());
    };
    apply(progress.get());
    const unsubscribe = progress.on("change", apply);
    const observer = new ResizeObserver(refresh);
    [stage, n.laptop, ...n.posters].forEach((el) => el && observer.observe(el));
    window.addEventListener("orientationchange", refresh);
    return () => {
      unsubscribe();
      observer.disconnect();
      window.removeEventListener("orientationchange", refresh);
    };
  }, [progress, started]);

  const n = nodesRef;
  const howHref = `#${chapterAnchor(story.chapters[0].id)}`;

  return (
    <section ref={sectionRef} id={SECTION_ID} className={s.scene} style={{ scrollMarginTop: 0 }}>
      <span id="torneos-hero" className={s.anchor} style={{ top: 0 }} />
      {story.chapters.map((chapter, i) => (
        <span
          key={chapter.id}
          id={chapterAnchor(chapter.id)}
          className={s.anchor}
          style={{ top: `calc(${TORNEOS_STORY_CHAPTERS[i][0] + 0.04} * (100% - 100svh))` }}
        />
      ))}

      <div ref={stageRef} className={s.stage} data-scene="pinned">
        <div ref={(el) => { n.current.bg = el; }} className={s.bg}>
          {/* The render is the hero's main image; the photo behind it can arrive a moment later. */}
          <Image src={BRAND.bgStadium.src} alt="" fill loading="eager" fetchPriority="low" sizes="100vw" quality={65} />
          <div className={s.shade} />
        </div>
        <div ref={(el) => { n.current.glow = el; }} className={s.glow} />
        <div ref={(el) => { n.current.dim = el; }} className={s.dim} />

        <div className={s.heroLayout}>
          <div ref={(el) => { n.current.heroCopy = el; }} className={s.heroCopy} data-hero-copy>
            <HeroCopy copy={copy} howHref={howHref} />
          </div>
          <div ref={(el) => { n.current.render = el; }} className={s.render} data-hero-device>
            <RenderImage priority />
          </div>
        </div>

        {story.chapters.map((chapter, i) => (
          <div key={chapter.id} ref={(el) => { n.current.caps[i] = el; }} className={s.cap} data-caption>
            <ChapterCopy chapter={chapter} index={i} />
          </div>
        ))}

        <div ref={(el) => { n.current.laptop = el; }} className={s.laptop} data-story-device>
          <LaptopFrame>
            <DashboardResultado progress={progress} copy={story.dashboard} />
          </LaptopFrame>
        </div>

        {started && (
          <>
            <div ref={(el) => { n.current.phone = el; }} className={s.phone}>
              <DeviceFrame time="9:41">
                <PublicPagePhone copy={story.publicPage} />
              </DeviceFrame>
              <div ref={(el) => { n.current.chip = el; }} className={s.chip} aria-hidden="true" style={{ opacity: 0 }}>
                {story.linkChip}
              </div>
            </div>

            <div ref={(el) => { n.current.posters[1] = el; }} className={cn(s.poster, s.posterBack)} aria-hidden="true" data-poster>
              <Poster kind="standings" copy={story.posters} />
            </div>
            <div ref={(el) => { n.current.posters[0] = el; }} className={s.poster} aria-hidden="true" data-poster>
              <Poster kind="results" copy={story.posters} />
            </div>
          </>
        )}

        <p className={s.demoNote}>{copy.demoNote}</p>

        <nav ref={(el) => { n.current.chapters = el; }} aria-label={story.navLabel} className={s.chapters}>
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

/** Reduced motion: the hero and the four chapters in their final state, nothing pinned. */
export function TorneosStoryStatic() {
  const copy = useTorneosContent();
  const story = copy.story;
  const [done] = React.useState(() => motionValue(1));
  const visuals = [
    <LaptopFrame key="laptop-1" className="w-full">
      <DashboardResultado progress={done} copy={story.dashboard} />
    </LaptopFrame>,
    <LaptopFrame key="laptop-2" className="w-full">
      <DashboardResultado progress={done} copy={story.dashboard} />
    </LaptopFrame>,
    <DeviceFrame key="phone" className={s.staticPhone} time="9:41">
      <PublicPagePhone copy={story.publicPage} />
    </DeviceFrame>,
    <div key="posters" className={s.staticVisual}>
      <Poster kind="results" copy={story.posters} className={s.staticPoster} />
      <Poster kind="standings" copy={story.posters} className={s.staticPoster} />
    </div>,
  ];

  return (
    <section id={SECTION_ID} className={s.static}>
      <span id="torneos-hero" />
      <div className={s.staticHero}>
        <HeroCopy copy={copy} howHref={`#${chapterAnchor(story.chapters[0].id)}`} />
        <div className={s.render} aria-hidden="true">
          <RenderImage />
        </div>
        <p className={s.staticNote}>{copy.demoNote}</p>
      </div>
      {story.chapters.map((chapter, i) => (
        <div key={chapter.id} id={chapterAnchor(chapter.id)} className={s.staticRow}>
          <div>
            <ChapterCopy chapter={chapter} index={i} />
          </div>
          <div className={s.staticVisual}>{visuals[i]}</div>
        </div>
      ))}
    </section>
  );
}
