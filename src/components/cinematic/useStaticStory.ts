"use client";

import { useReducedMotion } from "framer-motion";

import { useMounted } from "./useMounted";

/** Static version of the scenes when the visitor asks for reduced motion. Always the scene on the server. */
export function useStaticStory(): boolean {
  const mounted = useMounted();
  const reduce = useReducedMotion();
  return mounted && reduce === true;
}
