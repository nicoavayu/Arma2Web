import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { SiteSwitch } from "@/components/shared/SiteSwitch";

const render = (node: React.ReactNode) => renderToStaticMarkup(<LanguageProvider>{node}</LanguageProvider>);
const visibleText = (html: string) => html.replace(/<svg[\s\S]*?<\/svg>/g, "").replace(/<[^>]+>/g, "").trim();
const ariaLabel = (html: string) => html.match(/aria-label="([^"]*)"/)?.[1];

describe("SiteSwitch accessible name", () => {
  it.each(["torneos", "jugadores"] as const)("contains the visible text when linking to %s (WCAG 2.5.3)", (to) => {
    const html = render(<SiteSwitch to={to} />);
    const label = ariaLabel(html);
    if (label) expect(label).toContain(visibleText(html));
  });
});
