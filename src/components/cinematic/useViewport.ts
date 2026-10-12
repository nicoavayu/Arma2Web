"use client";

import React from "react";

export interface Viewport {
  width: number;
  height: number;
  /** Phone layout of the prototypes (< 900px). */
  isMobile: boolean;
}

const SSR_VIEWPORT: Viewport = { width: 1440, height: 900, isMobile: false };

export const MOBILE_BREAKPOINT = 900;

/** Window size, updated on resize and orientation change. Desktop defaults on the server. */
export function useViewport(): Viewport {
  const [viewport, setViewport] = React.useState<Viewport>(SSR_VIEWPORT);

  React.useEffect(() => {
    const update = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setViewport((current) =>
        current.width === width && current.height === height
          ? current
          : { width, height, isMobile: width < MOBILE_BREAKPOINT },
      );
    };
    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
  }, []);

  return viewport;
}
