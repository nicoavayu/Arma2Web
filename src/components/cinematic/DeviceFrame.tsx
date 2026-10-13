import type { CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/utils";
import styles from "./frames.module.css";

/**
 * Decorative phone. Its width comes from `className`/`style`; everything inside
 * (screen text included, via `em`) scales with it. Children are screen layers.
 */
export function DeviceFrame({
  children,
  className,
  style,
  time = "21:04",
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  time?: string;
}) {
  return (
    <div aria-hidden="true" className={cn(styles.phone, className)} style={style}>
      <div className={styles.shell}>
        <div className={styles.screen}>
          <div className={styles.island} />
          <div className={styles.glare} />
          <div className={styles.sbar}>
            <span>{time}</span>
            <span className={styles.icons}>
              <span className={styles.signal}>
                <i />
                <i />
                <i />
                <i />
              </span>
              <span className={styles.battery} />
            </span>
          </div>
          {children}
        </div>
      </div>
    </div>
  );
}
