"use client";

import React from "react";

/** False on the server and on the first client render, true after hydration. */
export function useMounted(): boolean {
  const [mounted, setMounted] = React.useState(false);
  React.useEffect(() => setMounted(true), []);
  return mounted;
}
