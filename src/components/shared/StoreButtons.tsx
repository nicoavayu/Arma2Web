"use client";

import React from "react";

import { useLanguage } from "@/components/LanguageProvider";
import { cn } from "@/lib/utils";
import { pickStore, STORE_LINKS, type Store } from "@/lib/store-links";

function AppleIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 22.773 22.773" className={className} fill="currentColor">
      <path d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z" />
    </svg>
  );
}

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" className={className}>
      <path fill="#00d7fe" d="M3.6 1.8 13.5 12l-9.9 10.2c-.4-.2-.6-.7-.6-1.2V3c0-.5.2-1 .6-1.2z" />
      <path fill="#ffce00" d="m16.8 8.6 3.6 2.1c.9.5.9 1.8 0 2.4l-3.6 2.1L13.5 12z" />
      <path fill="#00f076" d="M3.6 1.8c.4-.2.9-.2 1.4.1l11.8 6.7-3.3 3.4z" />
      <path fill="#f63448" d="M13.5 12l3.3 3.4L5 22.1c-.5.3-1 .3-1.4.1z" />
    </svg>
  );
}

const ORDER: Store[] = ["appStore", "googlePlay"];

/**
 * Both store buttons. Rendered equal on the server (no JS, desktop, unknown
 * device); after mount the visitor's own store becomes the primary button.
 */
export function StoreButtons({ tone = "ink", className }: { tone?: "ink" | "paper"; className?: string }) {
  const { t } = useLanguage();
  const [primary, setPrimary] = React.useState<Store | null>(null);

  React.useEffect(() => {
    setPrimary(pickStore(window.navigator.userAgent));
  }, []);

  const stores = primary ? [primary, ...ORDER.filter((store) => store !== primary)] : ORDER;

  return (
    <div className={cn("flex flex-wrap items-center gap-3", className)}>
      {stores.map((store) => {
        const copy = t.stores[store];
        const emphasized = primary === null || primary === store;
        return (
          <a
            key={store}
            data-store={store}
            href={STORE_LINKS[store]}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-12 items-center gap-2.5 rounded-xl border px-4 py-2 transition-colors duration-200",
              tone === "ink"
                ? emphasized
                  ? "border-white bg-white text-[#070711] hover:bg-white/90"
                  : "border-white/20 text-white hover:border-white/50"
                : emphasized
                  ? "border-[#070711] bg-[#070711] text-white hover:bg-[#070711]/90"
                  : "border-[#070711]/25 text-[#070711] hover:border-[#070711]/60",
            )}
          >
            {store === "appStore" ? <AppleIcon className="h-6 w-6" /> : <PlayIcon className="h-6 w-6" />}
            <span className="flex flex-col leading-none">
              <span className="text-[10px] font-medium opacity-75">{copy.eyebrow}</span>
              <span className="mt-1 text-[15px] font-semibold tracking-tight">{copy.label}</span>
            </span>
          </a>
        );
      })}
    </div>
  );
}
