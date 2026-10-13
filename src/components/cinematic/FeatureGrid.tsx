import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";

import s from "./features.module.css";

export interface FeatureCard {
  id: string;
  label: string;
  title: string;
  /** Illustration, rendered above the text (it brings its own `flex: 1` box). */
  art: ReactNode;
}

export interface FeatureGridProps {
  id: string;
  /** Extra in-page anchors (old links): on the section, or on one card. */
  anchors?: { id: string; card?: string }[];
  eyebrow: string;
  title: ReactNode;
  titleClassName?: string;
  cards: FeatureCard[];
  /** Small label under the cards ("Ejemplo con datos ficticios"). */
  note?: string;
  /** Section background, its glow and the accent of the labels. */
  theme: { background: string; glow: string; accent: string };
}

/**
 * Every feature at once, in a grid that scrolls with the page. On wide screens
 * the cards zigzag (2-1 / 1-2 / 1-2) so it doesn't read as a wall of equal tiles.
 */
export function FeatureGrid({ id, anchors = [], eyebrow, title, titleClassName, cards, note, theme }: FeatureGridProps) {
  const sectionAnchors = anchors.filter((anchor) => !anchor.card);
  return (
    <section id={id} className={s.section} style={{ background: theme.background, "--feature-accent": theme.accent } as CSSProperties}>
      {sectionAnchors.map((anchor) => (
        <span key={anchor.id} id={anchor.id} className={s.anchor} />
      ))}
      <div className={s.glow} style={{ background: theme.glow }} />
      <div className={s.head}>
        <p className={s.eyebrow}>{eyebrow}</p>
        <h2 className={cn(s.title, titleClassName)}>{title}</h2>
      </div>
      <ul className={s.grid} data-feature-grid>
        {cards.map((card) => (
          <li key={card.id} className={s.cell}>
            {anchors
              .filter((anchor) => anchor.card === card.id)
              .map((anchor) => (
                <span key={anchor.id} id={anchor.id} className={s.cardAnchor} />
              ))}
            <article className={s.card} data-card={card.id}>
              {/* Example data: decorative; the card text says what it shows. */}
              <div aria-hidden="true" className={s.artSlot}>
                {card.art}
              </div>
              <div className={s.text}>
                <span className={s.label}>{card.label}</span>
                <h3 className={s.cardTitle}>{card.title}</h3>
              </div>
            </article>
          </li>
        ))}
      </ul>
      {note && <p className={s.note}>{note}</p>}
    </section>
  );
}
