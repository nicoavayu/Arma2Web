import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";
import styles from "./frames.module.css";

/** Decorative laptop (front view). Width from `className`/`style`; the 16:10 screen scales with it. */
export function LaptopFrame({ children, className, style }: { children?: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <div aria-hidden="true" className={cn(styles.laptop, className)} style={style}>
      <div className={styles.lid}>
        <div className={styles.lscreen}>
          {children}
          <div className={styles.lglare} />
        </div>
      </div>
      <div className={styles.base} />
    </div>
  );
}
