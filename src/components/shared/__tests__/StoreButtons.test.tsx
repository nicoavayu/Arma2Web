import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { LanguageProvider } from "@/components/LanguageProvider";
import { StoreButtons } from "@/components/shared/StoreButtons";
import { STORE_LINKS } from "@/lib/store-links";

describe("StoreButtons (server render, no JS)", () => {
  it("shows both stores so visitors without JS can still download", () => {
    const html = renderToStaticMarkup(
      <LanguageProvider>
        <StoreButtons />
      </LanguageProvider>,
    );
    expect(html).toContain('data-store="appStore"');
    expect(html).toContain('data-store="googlePlay"');
    expect(html).toContain(STORE_LINKS.appStore);
    expect(html).toContain(STORE_LINKS.googlePlay);
  });
});
