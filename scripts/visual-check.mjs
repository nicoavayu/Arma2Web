#!/usr/bin/env node
/**
 * Layout checks for the cinematic homes that unit tests can't see.
 *
 * Usage: npm run check:visual -- [baseUrl]   (default http://localhost:3000)
 * Browser: CHROMIUM_PATH, or the first Playwright headless shell found in
 * ~/Library/Caches/ms-playwright.
 *
 * Checks (plan Review Focus):
 *  1. Short/wide viewports: the hero device is fully on screen and doesn't
 *     overlap the h1 or the hero CTAs.
 *  2. English copy doesn't overflow the step text or the hero copy.
 *  3. Deep links (#como-funciona, step anchors, #mercado-arqueros, #faq,
 *     #torneos-planes) land on their target, below the nav.
 *  4. Rotating a phone keeps the hero device on screen.
 *  5. Without JavaScript the hero, every step (in its final state) and every
 *     feature card are there.
 *  Plus (ES and EN, portrait and landscape phones, laptops): every step's text
 *  is visible at load, its illustration plays to the end on arrival, no phone
 *  or laptop leaves the screen; nothing is pinned or sticky; the nav mark and
 *  the final states show with reduced motion; the feature grids keep every
 *  card within the page; the hero mark doesn't jump at hydration; tablet store
 *  buttons are centered; the Torneos band doesn't move.
 *  6. Phones: no stretch of a screen or more without new text (measured with
 *     the viewport the page actually got, not just the one requested).
 *  7. Example tournament (/torneos/ejemplo): no sideways scroll, the made-up
 *     data label stays on screen, sections are reachable, nothing to submit.
 */
import { readdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { chromium } from "playwright-core";

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "");

function findChromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  const cache = join(homedir(), "Library/Caches/ms-playwright");
  const dir = readdirSync(cache).find((name) => name.startsWith("chromium_headless_shell-"));
  if (!dir) throw new Error("No Playwright Chromium found; set CHROMIUM_PATH.");
  const platform = readdirSync(join(cache, dir)).find((name) => name.startsWith("chrome-headless-shell-"));
  return join(cache, dir, platform, "chrome-headless-shell");
}

const failures = [];
const check = (ok, label) => {
  console.log(`${ok ? "✓" : "✗"} ${label}`);
  if (!ok) failures.push(label);
};

const PAGES = ["/", "/torneos"];
const VIEWPORTS = [
  [1440, 900],
  [1280, 720],
  [1920, 1080],
  [390, 844],
  [375, 667],
  [320, 568],
  [844, 390],
  [667, 375],
];

const intersects = (a, b) => a && b && a.left < b.right && b.left < a.right && a.top < b.bottom && b.top < a.bottom;

/** Rects of the hero device, the h1 and the hero CTAs (layout state at the top of the page). */
async function heroRects(page) {
  return page.evaluate(() => {
    const rect = (el) => {
      if (!el) return null;
      const r = el.getBoundingClientRect();
      return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
    };
    return {
      device: rect(document.querySelector("[data-hero-device]")),
      h1: rect(document.querySelector("h1")),
      ctas: [...document.querySelectorAll("[data-hero-copy] a")].map(rect),
      vw: window.innerWidth,
      vh: window.innerHeight,
    };
  });
}

function deviceOnScreen(r, slack = 2) {
  return r.device && r.device.top >= -slack && r.device.bottom <= r.vh + slack && r.device.width > 40;
}

async function settle(page, ms = 700) {
  await page.waitForTimeout(ms);
}

const browser = await chromium.launch({ executablePath: findChromium() });

try {
  // 1. Viewports
  for (const path of PAGES) {
    for (const [width, height] of VIEWPORTS) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.goto(base + path, { waitUntil: "networkidle" });
      await settle(page);
      const r = await heroRects(page);
      check(deviceOnScreen(r) && r.device.height >= 120, `${path} ${width}×${height}: hero device fully on screen (${Math.round(r.device?.height ?? 0)}px tall)`);
      check(!intersects(r.device, r.h1) && !r.ctas.some((cta) => intersects(r.device, cta)), `${path} ${width}×${height}: device clear of h1 and CTAs`);
      await page.close();
    }
  }

  // 2. English copy overflow
  for (const path of PAGES) {
    for (const [width, height] of [[1440, 900], [390, 844]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.addInitScript(() => localStorage.setItem("arma2-locale", "en"));
      await page.goto(base + path, { waitUntil: "networkidle" });
      await settle(page);
      const overflow = await page.evaluate(() =>
        [...document.querySelectorAll("[data-step] h3, [data-step] p, [data-hero-copy], [data-hero-copy] h1, [data-hero-copy] p")]
          .filter((el) => el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== "visible")
          .map((el) => el.textContent.slice(0, 40)),
      );
      const wide = await page.evaluate(() =>
        [...document.querySelectorAll("[data-step] h3, [data-step] p, [data-hero-copy]")].filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1).length,
      );
      const english = await page.evaluate(() => document.documentElement.innerText.includes("Organise") || document.documentElement.innerText.includes("The whole tournament"));
      check(english && overflow.length === 0 && wide === 0, `${path} ${width}×${height} EN: no overflowing copy${overflow.length ? ` (${overflow.join(" | ")})` : ""}`);
      await page.close();
    }
  }


  // Steps: text readable at load, illustrations end in their final state on arrival, nothing off screen.
  // [block to scroll to, block that holds the illustration, final-state marker per locale]
  const FINAL = {
    "/": ["#capitulo-convocas", "#capitulo-convocas", { es: "10/10", en: "10/10" }],
    "/torneos": ["#capitulo-cargas", "#torneos-como-funciona", { es: "Resultado guardado", en: "Result saved" }],
  };
  for (const path of PAGES) {
    for (const [width, height] of [[1440, 900], [1280, 720], [1024, 768], [390, 844], [375, 667], [320, 568], [844, 390]]) {
      for (const locale of ["es", "en"]) {
        const page = await browser.newPage({ viewport: { width, height } });
        await page.addInitScript((value) => localStorage.setItem("arma2-locale", value), locale);
        await page.goto(base + path, { waitUntil: "networkidle" });
        await settle(page);
        const label = `${path} ${width}×${height} ${locale.toUpperCase()}`;
        const text = await page.evaluate(() =>
          [...document.querySelectorAll("[data-step] h3, [data-step] p")].every((el) => {
            let node = el;
            while (node) {
              const cs = getComputedStyle(node);
              if (Number(cs.opacity) < 0.99 || cs.visibility === "hidden") return false;
              node = node.parentElement;
            }
            return true;
          }),
        );
        check(text, `${label}: every step's text is visible at load`);
        const [anchor, holder, markers] = FINAL[path];
        await page.evaluate((sel) => document.querySelector(sel).scrollIntoView({ block: "center" }), anchor);
        await settle(page, 4800);
        const state = await page.evaluate(([sel, marker]) => {
          const block = document.querySelector(sel);
          const devices = [...document.querySelectorAll("[data-step], [class*='pair']")]
            .flatMap((el) => [...el.querySelectorAll("[aria-hidden='true'] > [class*='phone'], [aria-hidden='true'] [class*='laptop']")])
            .map((el) => el.getBoundingClientRect())
            .filter((r) => r.width > 0);
          return {
            final: block.innerText.includes(marker),
            sideways: document.documentElement.scrollWidth > window.innerWidth,
            offscreen: devices.filter((r) => r.left < -2 || r.right > window.innerWidth + 2).length,
          };
        }, [holder, markers[locale]]);
        check(state.final, `${label}: the first step plays to its final state on arrival`);
        check(!state.sideways && state.offscreen === 0, `${label}: no sideways scroll, every phone and laptop on screen (${state.offscreen} off)`);
        await page.close();
      }
    }
  }

  // No scroll-driven scenes: nothing pinned or sticky on the homes.
  for (const path of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base + path, { waitUntil: "networkidle" });
    const pinned = await page.evaluate(
      // Sticky table headers that only stick sideways (plans comparison) are fine.
      () =>
        [...document.querySelectorAll("main *")].filter((el) => {
          const cs = getComputedStyle(el);
          return el.hasAttribute("data-scene") || (cs.position === "sticky" && cs.top !== "auto");
        }).length,
    );
    check(pinned === 0, `${path}: scrolls normally (no pinned or sticky blocks: ${pinned})`);
    await page.close();
  }

  // Reduced motion: final states and the nav mark from the start; the Torneos band doesn't move.
  {
    const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await settle(page, 1000);
    const markOpacity = await page.evaluate(() => Number(getComputedStyle(document.querySelector('[data-brand-mark="nav"]')).opacity));
    check(markOpacity > 0.9, `/ reduced motion: nav mark visible at load (${markOpacity})`);
    await page.evaluate(() => document.getElementById("capitulo-convocas").scrollIntoView({ block: "center" }));
    await settle(page, 300);
    const final = await page.evaluate(() => document.getElementById("capitulo-convocas").innerText.includes("10/10"));
    check(final, "/ reduced motion: steps show their final state right away");
    const bandTransform = async () =>
      page.evaluate(() => getComputedStyle(document.querySelector("#torneos > div")).transform);
    await page.evaluate(() => document.getElementById("torneos").scrollIntoView());
    await settle(page);
    const before = await bandTransform();
    await page.mouse.wheel(0, 300);
    await settle(page);
    check(before === (await bandTransform()), "/ reduced motion: Torneos band photo doesn't move");
    await context.close();
  }

  // Feature grids: every card visible side by side or stacked, never in a sideways scroller.
  for (const url of ["/#funciones", "/torneos#torneos-funciones"]) {
    for (const [width, height] of [[1440, 900], [375, 667]]) {
      const page = await browser.newPage({ viewport: { width, height } });
      await page.goto(base + url, { waitUntil: "networkidle" });
      await settle(page, 1200);
      const grid = await page.evaluate((id) => {
        const section = document.getElementById(id);
        const cards = [...section.querySelectorAll("[data-card]")].map((el) => el.getBoundingClientRect());
        const head = section.querySelector("h2").getBoundingClientRect();
        return {
          cards: cards.length,
          inside: cards.every((r) => r.left >= -1 && r.right <= window.innerWidth + 1),
          headOnScreen: head.top >= 0 && head.top < window.innerHeight,
        };
      }, url.split("#")[1]);
      check(grid.cards === 6 && grid.inside && grid.headOnScreen, `${url} ${width}×${height}: lands on the title, all ${grid.cards} cards within the page width`);
      await page.close();
    }
  }

  // The hero mark doesn't jump when the page hydrates on phones.
  {
    const center = async (javaScriptEnabled) => {
      const context = await browser.newContext({ javaScriptEnabled, viewport: { width: 390, height: 844 } });
      const page = await context.newPage();
      await page.goto(base + "/", { waitUntil: javaScriptEnabled ? "networkidle" : "load" });
      await settle(page);
      const c = await page.evaluate(() => {
        const r = document.querySelector('[data-brand-mark="hero"]').getBoundingClientRect();
        return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
      });
      await context.close();
      return c;
    };
    const server = await center(false);
    const hydrated = await center(true);
    const jump = Math.hypot(server.x - hydrated.x, server.y - hydrated.y);
    check(jump < 12, `/ 390×844: hero mark stays put at hydration (moved ${Math.round(jump)}px)`);
  }

  // Tablet: store buttons centered under the centered copy.
  {
    const page = await browser.newPage({ viewport: { width: 768, height: 1024 } });
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await settle(page);
    const gaps = await page.evaluate(() => {
      const stores = [...document.querySelectorAll("[data-hero-copy] [data-store]")].map((el) => el.getBoundingClientRect());
      const left = Math.min(...stores.map((r) => r.left));
      const right = Math.max(...stores.map((r) => r.right));
      return { left, right: window.innerWidth - right };
    });
    check(Math.abs(gaps.left - gaps.right) < 24, `/ 768×1024: store buttons centered (${Math.round(gaps.left)} vs ${Math.round(gaps.right)})`);
    await page.close();
  }

  // 3. Deep links
  for (const [url, selector] of [
    ["/#como-funciona", "#como-se-arman h2"],
    ["/#capitulo-se-arman", "#capitulo-se-arman h3"],
    ["/#mercado-arqueros", '[data-card="mercado-arqueros"]'],
    ["/#faq", "#preguntas h2"],
    ["/torneos#capitulo-cargas", "#capitulo-cargas h3"],
    ["/torneos#capitulo-se-comparte", "#capitulo-se-comparte h3"],
    ["/torneos#torneos-planes", "#torneos-planes h2"],
  ]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base + url, { waitUntil: "networkidle" });
    await settle(page, 1200);
    const visible = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.top >= 60 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
    }, selector);
    check(visible, `${url}: target on screen, below the nav`);
    await page.close();
  }

  // 4. Rotation
  for (const path of PAGES) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(base + path, { waitUntil: "networkidle" });
    await settle(page);
    await page.setViewportSize({ width: 844, height: 390 });
    await settle(page);
    const landscape = await heroRects(page);
    check(deviceOnScreen(landscape) && landscape.device.height >= 120, `${path}: hero device on screen in landscape`);
    await page.setViewportSize({ width: 390, height: 844 });
    await settle(page);
    check(deviceOnScreen(await heroRects(page)), `${path}: hero device back on screen after rotating`);
    await page.close();
  }

  // 5. No JavaScript
  for (const path of PAGES) {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + path, { waitUntil: "load" });
    const r = await heroRects(page);
    const h1Opacity = await page.evaluate(() => {
      let el = document.querySelector("h1");
      let opacity = 1;
      while (el) {
        opacity *= Number(getComputedStyle(el).opacity);
        el = el.parentElement;
      }
      return opacity;
    });
    check(h1Opacity > 0.9 && r.h1 && r.h1.top >= 0 && r.h1.bottom <= r.vh && deviceOnScreen(r), `${path}: h1 and hero device visible without JS`);
    const content = await page.evaluate((marker) => ({
      steps: document.querySelectorAll("[data-step] h3").length,
      final: document.body.innerText.includes(marker),
      cards: document.querySelectorAll("[data-card]").length,
    }), path === "/" ? "10/10" : "Resultado guardado");
    check(content.steps === 4 && content.final && content.cards === 6, `${path}: all four steps (final state) and six feature cards without JS`);
    await context.close();
  }

  // 6. Phones: every scroll shows something new (no stretch of a screen or more without text).
  for (const path of PAGES) {
    for (const [width, height] of [[320, 568], [375, 667], [390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
      const page = await context.newPage();
      await page.goto(base + path, { waitUntil: "networkidle" });
      await settle(page);
      const m = await page.evaluate(() => {
        const tops = [...document.querySelectorAll("main h1, main h2, main h3, main p, main li, main summary, footer p")]
          .map((el) => el.getBoundingClientRect())
          .filter((r) => r.height > 0)
          .map((r) => r.top + scrollY)
          .sort((a, b) => a - b);
        let gap = 0;
        for (let i = 1; i < tops.length; i++) gap = Math.max(gap, tops[i] - tops[i - 1]);
        const total = document.documentElement.scrollHeight - innerHeight;
        return { vw: innerWidth, vh: innerHeight, gap: Math.round((gap / innerHeight) * 100) / 100, screens: Math.round((total / innerHeight) * 10) / 10 };
      });
      check(m.vw === width && m.vh === height, `${path} ${width}×${height}: viewport applied (got ${m.vw}×${m.vh})`);
      check(m.gap < 1, `${path} ${width}×${height}: longest stretch without new text ${m.gap} screens (page: ${m.screens} screens)`);
      await context.close();
    }
  }

  // 7. Example tournament
  for (const [width, height] of [[320, 568], [375, 667], [1440, 900]]) {
    for (const locale of ["es", "en"]) {
      const context = await browser.newContext({ viewport: { width, height }, isMobile: width < 768, hasTouch: width < 768 });
      await context.addInitScript((value) => localStorage.setItem("arma2-locale", value), locale);
      const page = await context.newPage();
      await page.goto(`${base}/torneos/ejemplo`, { waitUntil: "networkidle" });
      await settle(page);
      const label = locale === "es" ? "Datos ficticios" : "Made-up data";
      const results = [];
      for (const id of ["tabla", "goleadores", "fixture", "resultados"]) {
        await page.evaluate((target) => (location.hash = target), `#${id}`);
        await settle(page, 400);
        results.push(
          await page.evaluate(([target, text]) => {
            const bar = document.querySelector(".sticky");
            const badge = [...bar.querySelectorAll("p")].find((p) => p.textContent.trim().toLowerCase() === text.toLowerCase());
            const badgeRect = badge?.getBoundingClientRect();
            const title = document.getElementById(`${target}-titulo`).getBoundingClientRect();
            return {
              labelOnScreen: !!badgeRect && badgeRect.top >= 0 && badgeRect.right <= innerWidth && badgeRect.width > 0,
              titleBelowBar: title.top >= bar.getBoundingClientRect().bottom - 1 && title.top < innerHeight,
            };
          }, [id, label]),
        );
      }
      const page2 = await page.evaluate(() => ({
        sideways: document.documentElement.scrollWidth > innerWidth,
        forms: document.querySelectorAll("main form, main button, main input").length,
      }));
      check(
        !page2.sideways && page2.forms === 0 && results.every((r) => r.labelOnScreen && r.titleBelowBar),
        `/torneos/ejemplo ${width}×${height} ${locale.toUpperCase()}: label on screen, sections land below it, no sideways scroll, nothing to submit`,
      );
      await context.close();
    }
  }
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll visual checks passed.");
