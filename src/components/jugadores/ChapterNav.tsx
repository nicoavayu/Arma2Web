"use client";

import { cn } from "@/lib/utils";

/** Sticky segmented control that follows the chapter in view. */
export function ChapterNav({
  label,
  items,
  active,
}: {
  label: string;
  items: readonly { id: string; label: string }[];
  active: string | null;
}) {
  return (
    <nav
      aria-label={label}
      className="sticky top-16 z-30 border-y border-white/[0.07] bg-[#070711]/95 backdrop-blur-sm md:top-[4.5rem]"
    >
      <ul className="mx-auto flex max-w-[1200px] gap-1 overflow-x-auto px-4 py-2 [scrollbar-width:none] md:px-6">
        {items.map((item) => {
          const current = active === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={current ? "true" : undefined}
                className={cn(
                  "inline-flex min-h-10 items-center rounded-lg px-3.5 text-sm font-semibold transition-colors",
                  current ? "bg-white text-[#070711]" : "text-white/65 hover:bg-white/[0.06] hover:text-white",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
