/**
 * Small math helpers for the scroll-driven scenes. Same curves as the
 * approved prototypes (docs/superpowers/specs/prototipos-cinematicos/).
 */

export function clamp(v: number, min = 0, max = 1): number {
  return v < min ? min : v > max ? max : v;
}

/** Progress of `p` inside the window [a, b], clamped to 0–1. */
export function seg(p: number, a: number, b: number): number {
  return clamp((p - a) / (b - a));
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export function easeOutCubic(t: number): number {
  return 1 - Math.pow(1 - t, 3);
}

/** Overshoots past 1 before settling, for pop-in effects. */
export function backOut(t: number): number {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}
