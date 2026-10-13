"use client";

import React, { type CSSProperties, type ReactNode } from "react";

import { useSceneProgress } from "./useSceneProgress";
import { useStaticStory } from "./useStaticStory";
import s from "./gallery.module.css";

export interface GalleryCard {
  id: string;
  label: string;
  title: string;
  /** Illustration, rendered above the text (it brings its own `flex: 1` box). */
  art: ReactNode;
}

export interface HorizontalGalleryProps {
  id: string;
  /** Scene height, e.g. "330svh"; the scroll range is this minus one viewport. */
  height: string;
  /** Shorter scene height for portrait phones. Defaults to `height`. */
  phoneHeight?: string;
  /** Extra in-page anchors at a fraction of the scroll range (old links). */
  anchors?: { id: string; at: number }[];
  eyebrow: string;
  title: ReactNode;
  titleClassName?: string;
  cards: GalleryCard[];
  /** Small label under the cards ("Ejemplo con datos ficticios"). */
  note?: string;
  /** Section background color, accent and progress gradient. */
  theme: { background: string; glow: string; accent: string; gradient: string };
}

function Cards({ cards }: { cards: GalleryCard[] }) {
  return cards.map((card) => (
    <article key={card.id} className={s.card} data-card={card.id}>
      {/* Example data: decorative; the card text says what it shows. */}
      <div aria-hidden="true" className={s.artSlot}>
        {card.art}
      </div>
      <div className={s.text}>
        <span className={s.label}>{card.label}</span>
        <h3 className={s.cardTitle}>{card.title}</h3>
      </div>
    </article>
  ));
}

/**
 * Cards in a row that the vertical scroll slides sideways (pinned scene).
 * With reduced motion it becomes a plain swipeable row.
 */
export function HorizontalGallery(props: HorizontalGalleryProps) {
  return useStaticStory() ? <StaticGallery {...props} /> : <PinnedGallery {...props} />;
}

const themeStyle = (theme: HorizontalGalleryProps["theme"]): CSSProperties =>
  ({ background: theme.background, "--gallery-accent": theme.accent, "--gallery-grad": theme.gradient }) as CSSProperties;

function Heading({ eyebrow, title, titleClassName }: Pick<HorizontalGalleryProps, "eyebrow" | "title" | "titleClassName">) {
  return (
    <div className={s.head}>
      <p className={s.eyebrow}>{eyebrow}</p>
      <h2 className={`${s.title} ${titleClassName ?? ""}`}>{title}</h2>
    </div>
  );
}

function PinnedGallery({ id, height, phoneHeight = height, anchors = [], eyebrow, title, titleClassName, cards, note, theme }: HorizontalGalleryProps) {
  const sectionRef = React.useRef<HTMLElement>(null);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLElement>(null);
  const progress = useSceneProgress(sectionRef);

  React.useEffect(() => {
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!stage || !track) return;
    let max = 0;
    const apply = (p: number) => {
      track.style.transform = `translate3d(${-p * max}px,0,0)`;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
    };
    const refresh = () => {
      max = Math.max(0, track.scrollWidth - stage.clientWidth);
      apply(progress.get());
    };
    refresh();
    const unsubscribe = progress.on("change", apply);
    window.addEventListener("resize", refresh);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", refresh);
    };
  }, [progress]);

  return (
    <section ref={sectionRef} id={id} className={s.scene} style={{ ...themeStyle(theme), "--gallery-h": height, "--gallery-h-phone": phoneHeight, scrollMarginTop: 0 } as CSSProperties}>
      {anchors.map((anchor) => (
        <span key={anchor.id} id={anchor.id} className={s.anchor} style={{ top: `calc(${anchor.at} * (100% - 100svh))` }} />
      ))}
      <div ref={stageRef} className={s.stage} data-scene="pinned">
        <div className={s.bg} style={{ background: theme.glow }} />
        <Heading eyebrow={eyebrow} title={title} titleClassName={titleClassName} />
        <div ref={trackRef} className={s.track}>
          <Cards cards={cards} />
        </div>
        <div className={s.footer}>
          <div className={s.progress} aria-hidden="true">
            <i ref={barRef} />
          </div>
          {note && <p className={s.note}>{note}</p>}
        </div>
      </div>
    </section>
  );
}

function StaticGallery({ id, anchors = [], eyebrow, title, titleClassName, cards, note, theme }: HorizontalGalleryProps) {
  return (
    <section id={id} className={s.static} style={themeStyle(theme)}>
      {anchors.map((anchor) => (
        <span key={anchor.id} id={anchor.id} />
      ))}
      <Heading eyebrow={eyebrow} title={title} titleClassName={titleClassName} />
      <div className={s.track}>
        <Cards cards={cards} />
      </div>
      {note && <p className={s.note} style={{ marginLeft: "clamp(20px, 6vw, 104px)" }}>{note}</p>}
    </section>
  );
}

export { StaticGallery as HorizontalGalleryStatic };
