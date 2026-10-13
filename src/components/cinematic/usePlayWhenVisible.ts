"use client";

import React from "react";
import { animate, motionValue, useReducedMotion, type MotionValue } from "framer-motion";

/**
 * Only a block that starts below the fold replays; one already on screen or
 * scrolled past stays in its final state, so nothing flashes on load.
 */
export function replaysOnArrival(rect: { top: number; bottom: number }, viewportHeight: number): boolean {
  return rect.top >= viewportHeight;
}

/**
 * Progress (0–1) for an illustration that plays once, on its own, when it comes
 * into view. It starts at 1, so the server, no-JS and reduced-motion renders
 * show the final state; scrolling never drives it.
 */
export function usePlayWhenVisible<T extends HTMLElement>(duration = 2.2): [React.RefObject<T | null>, MotionValue<number>] {
  const ref = React.useRef<T>(null);
  const [progress] = React.useState(() => motionValue(1));
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduce || !replaysOnArrival(el.getBoundingClientRect(), window.innerHeight)) return;
    progress.set(0);
    let controls: ReturnType<typeof animate> | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        controls = animate(progress, 1, { duration, ease: "easeInOut" });
      },
      // Plays once its top reaches the upper three quarters of the screen, however tall the block is.
      { rootMargin: "0px 0px -25% 0px" },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      controls?.stop();
      progress.set(1);
    };
  }, [duration, progress, reduce]);

  return [ref, progress];
}
