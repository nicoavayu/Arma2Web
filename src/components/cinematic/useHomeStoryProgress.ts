"use client";

import React from "react";

import { clamp } from "@/lib/motion-math";

/**
 * Scroll progress (0–1) of the pinned home story, read from the DOM so layout
 * pieces outside the page (the nav) can follow it. `null` when the page has no
 * pinned story (other pages, or the reduced-motion version).
 */
export function useHomeStoryProgress(sectionId = "como-se-arman"): number | null {
  const [progress, setProgress] = React.useState<number | null>(null);

  React.useEffect(() => {
    let frame = 0;
    const read = () => {
      frame = 0;
      const section = document.getElementById(sectionId);
      if (!section || !section.querySelector('[data-scene="pinned"]')) {
        setProgress(null);
        return;
      }
      const total = section.offsetHeight - window.innerHeight;
      const value = total > 0 ? clamp(-section.getBoundingClientRect().top / total) : 1;
      setProgress(Math.round(value * 1000) / 1000);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(read);
    };
    read();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [sectionId]);

  return progress;
}
