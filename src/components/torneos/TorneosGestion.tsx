"use client";

import React from "react";
import { Check, Users } from "lucide-react";

import { BrowserFrame } from "@/components/shared/BrowserFrame";
import { useTorneosContent } from "@/components/torneos/useTorneosContent";
import type { ShotId } from "@/lib/shots";
import { cn } from "@/lib/utils";

/** Real manager screens behind accessible tabs (arrow keys move between tabs). */
export function TorneosGestion() {
  const copy = useTorneosContent().gestion;
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const focusTab = (index: number) => {
    const next = (index + copy.tabs.length) % copy.tabs.length;
    setActive(next);
    tabRefs.current[next]?.focus();
  };

  const onKeyDown = (event: React.KeyboardEvent, index: number) => {
    if (event.key === "ArrowRight") focusTab(index + 1);
    else if (event.key === "ArrowLeft") focusTab(index - 1);
    else if (event.key === "Home") focusTab(0);
    else if (event.key === "End") focusTab(copy.tabs.length - 1);
    else return;
    event.preventDefault();
  };

  return (
    <section id="torneos-gestion" className="scroll-mt-16 bg-[#f5f1e9] text-[#070711]">
      <div className="mx-auto max-w-[1240px] px-4 py-20 md:px-6 md:py-28">
        <div className="max-w-3xl">
          <h2 className="text-[clamp(2rem,4.8vw,3.5rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.04em]">{copy.title}</h2>
          <p className="mt-4 text-lg text-[#44465a]">{copy.body}</p>
        </div>

        <div role="tablist" aria-label={copy.tabsLabel} className="mt-10 flex flex-wrap gap-2">
          {copy.tabs.map((tab, index) => (
            <button
              key={tab.id}
              ref={(element) => {
                tabRefs.current[index] = element;
              }}
              type="button"
              role="tab"
              id={`gestion-tab-${tab.id}`}
              aria-selected={active === index}
              aria-controls={`gestion-panel-${tab.id}`}
              tabIndex={active === index ? 0 : -1}
              onClick={() => setActive(index)}
              onKeyDown={(event) => onKeyDown(event, index)}
              className={cn(
                "min-h-11 rounded-lg px-4 text-sm font-semibold transition-colors",
                active === index ? "bg-[#070711] text-white" : "border border-[#070711]/20 text-[#070711]/75 hover:border-[#070711]/50",
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {copy.tabs.map((tab, index) => (
          <div
            key={tab.id}
            role="tabpanel"
            id={`gestion-panel-${tab.id}`}
            aria-labelledby={`gestion-tab-${tab.id}`}
            hidden={active !== index}
            className="mt-6 grid gap-8 lg:grid-cols-[1.7fr_1fr] lg:items-start"
          >
            <BrowserFrame id={tab.shot as ShotId} sizes="(max-width: 1024px) 92vw, 760px" />
            <div>
              <ul className="space-y-4">
                {tab.points.map((point) => (
                  <li key={point} className="grid grid-cols-[1.5rem_1fr] gap-3 leading-relaxed">
                    <Check aria-hidden="true" className="mt-1 h-4 w-4 text-[#5b4bff]" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="mt-6 flex items-center gap-2 border-t border-[#070711]/15 pt-5 text-sm text-[#44465a]">
                <Users aria-hidden="true" className="h-4 w-4 text-[#5b4bff]" />
                {copy.team}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
