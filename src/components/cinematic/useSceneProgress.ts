"use client";

import type { RefObject } from "react";
import { useScroll, type MotionValue } from "framer-motion";

/** Scroll progress (0–1) of a pinned scene: 0 when it reaches the top, 1 when its end leaves. */
export function useSceneProgress(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  return useScroll({ target: ref, offset: ["start start", "end end"] }).scrollYProgress;
}
