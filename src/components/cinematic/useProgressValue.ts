"use client";

import React from "react";
import { useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * A discrete value derived from an animation's progress (a count, a step, a flag).
 * Starts from the current progress, so `motionValue(1)` renders the final state,
 * and only re-renders when the derived primitive changes.
 */
export function useProgressValue<T extends string | number | boolean | null>(
  progress: MotionValue<number>,
  derive: (value: number) => T,
): T {
  const [value, setValue] = React.useState<T>(() => derive(progress.get()));
  useMotionValueEvent(progress, "change", (latest) => setValue(derive(latest)));
  return value;
}
