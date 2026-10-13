import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { BrandMark } from "@/components/cinematic/BrandMark";
import { DeviceFrame } from "@/components/cinematic/DeviceFrame";
import { LaptopFrame } from "@/components/cinematic/LaptopFrame";

describe("device frames", () => {
  it("hide the decorative phone from assistive tech and render its screen", () => {
    const html = renderToStaticMarkup(<DeviceFrame><p>hola</p></DeviceFrame>);
    expect(html).toMatch(/aria-hidden="true"[\s\S]*21:04[\s\S]*hola/);
  });

  it("hide the decorative laptop from assistive tech and render its screen", () => {
    expect(renderToStaticMarkup(<LaptopFrame><p>hola</p></LaptopFrame>)).toMatch(/aria-hidden="true"[\s\S]*hola/);
  });

  it("render the brand mark as a decorative element with its data marker", () => {
    const html = renderToStaticMarkup(<BrandMark data-brand-mark="nav" className="h-9 w-9" />);
    expect(html).toContain('data-brand-mark="nav"');
    expect(html).toContain("brand-mark");
    expect(html).toContain('aria-hidden="true"');
  });
});
