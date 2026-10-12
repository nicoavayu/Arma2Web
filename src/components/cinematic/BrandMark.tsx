import type { CSSProperties } from "react";

import { cn } from "@/lib/utils";

/**
 * The Arma2 ball mark with the animated brand gradient (`.brand-mark` in
 * globals.css). Decorative: the link around it carries the accessible name.
 */
export function BrandMark({
  className,
  style,
  "data-brand-mark": marker,
}: {
  className?: string;
  style?: CSSProperties;
  "data-brand-mark"?: string;
}) {
  return <span aria-hidden="true" data-brand-mark={marker} className={cn("brand-mark", className)} style={style} />;
}
