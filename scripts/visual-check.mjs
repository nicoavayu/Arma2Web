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
 *  2. English copy doesn't overflow the captions or the hero copy.
 *  3. Deep links (#mercado-arqueros, #faq, #torneos-planes) land on their
 *     target, and a reload mid-story shows that chapter's caption.
 *  4. Rotating a phone keeps the hero device on screen.
 *  5. Without JavaScript the h1 and the hero device are visible.
 *  Plus, per chapter (ES and EN, portrait and landscape phones, laptops): the
 *  caption never covers the device, the device stays on screen, posters are
 *  not clipped; awards show after a reload in chapter 4; the nav mark shows
 *  with reduced motion; galleries land pinned from their links; the hero mark
 *  doesn't jump at hydration; tablet store buttons are centered; the Torneos
 *  band doesn't move with reduced motion.
 *  6. Phones: the story and the gallery stay short (scroll length measured with
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
        [...document.querySelectorAll("[data-caption], [data-caption] *, [data-hero-copy], [data-hero-copy] h1, [data-hero-copy] p")]
          .filter((el) => el.scrollWidth > el.clientWidth + 1 && getComputedStyle(el).overflowX !== "visible")
          .map((el) => el.textContent.slice(0, 40)),
      );
      const wide = await page.evaluate(() =>
        [...document.querySelectorAll("[data-caption], [data-hero-copy]")].filter((el) => el.getBoundingClientRect().right > window.innerWidth + 1).length,
      );
      const english = await page.evaluate(() => document.documentElement.innerText.includes("Organise") || document.documentElement.innerText.includes("The whole tournament"));
      check(english && overflow.length === 0 && wide === 0, `${path} ${width}×${height} EN: no overflowing copy${overflow.length ? ` (${overflow.join(" | ")})` : ""}`);
      await page.close();
    }
  }


  // Per chapter: caption vs device, device on screen, posters inside the viewport.
  for (const path of PAGES) {
    for (const [width, height] of [[1440, 900], [1280, 720], [1024, 768], [390, 844], [375, 667], [320, 568], [844, 390]]) {
      for (const locale of ["es", "en"]) {
        const page = await browser.newPage({ viewport: { width, height } });
        await page.addInitScript((value) => localStorage.setItem("arma2-locale", value), locale);
        await page.goto(base + path, { waitUntil: "networkidle" });
        await settle(page);
        const targets = await page.evaluate(() => {
          const scene = document.querySelector('[data-scene="pinned"]').parentElement;
          const range = scene.offsetHeight - window.innerHeight;
          const anchors = [...scene.querySelectorAll(':scope > [id^="capitulo-"]')];
          // Mid-chapter for the first three; the very end for the last one (final positions).
          return anchors.map((anchor, i) => scene.offsetTop + anchor.offsetTop + range * (i === anchors.length - 1 ? 0.18 : 0.06));
        });
        for (const [index, top] of targets.entries()) {
          await page.evaluate((y) => window.scrollTo(0, y), top);
          await settle(page, 500);
          const state = await page.evaluate(() => {
            const rect = (el) => {
              const r = el.getBoundingClientRect();
              return { left: r.left, right: r.right, top: r.top, bottom: r.bottom, width: r.width, height: r.height };
            };
            const captions = [...document.querySelectorAll("[data-caption]")];
            const caption = captions.reduce((best, el) => (Number(getComputedStyle(el).opacity) > Number(getComputedStyle(best).opacity) ? el : best));
            const device = document.querySelector("[data-story-device]");
            const posters = [...document.querySelectorAll("[data-poster]")].filter((el) => Number(getComputedStyle(el).opacity) > 0.5).map(rect);
            return { caption: rect(caption), device: rect(device), posters, vw: window.innerWidth, vh: window.innerHeight };
          });
          const label = `${path} ${width}×${height} ${locale.toUpperCase()} chapter ${index + 1}`;
          const overlap = state.caption && state.device
            ? Math.max(0, Math.min(state.caption.bottom, state.device.bottom) - Math.max(state.caption.top, state.device.top)) *
              (Math.min(state.caption.right, state.device.right) > Math.max(state.caption.left, state.device.left) ? 1 : 0)
            : 0;
          check(overlap <= 4, `${label}: caption clear of the device (overlap ${Math.round(overlap)}px)`);
          check(state.device.top >= -2 && state.device.bottom <= state.vh + 2 && state.device.height >= 100, `${label}: device on screen`);
          check(state.posters.every((r) => r.left >= -2 && r.right <= state.vw + 2), `${label}: posters not clipped`);
        }
        await page.close();
      }
    }
  }

  // Awards after a reload in chapter 4 (players).
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base + "/", { waitUntil: "networkidle" });
    const y = await page.evaluate(() => {
      const scene = document.querySelector('[data-scene="pinned"]').parentElement;
      return scene.offsetTop + document.getElementById("capitulo-se-juega").offsetTop + (scene.offsetHeight - window.innerHeight) * 0.12;
    });
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await settle(page);
    await page.reload({ waitUntil: "networkidle" });
    await settle(page, 1500);
    const awards = await page.evaluate(() => [...document.querySelectorAll("[data-award]")].map((el) => Number(getComputedStyle(el).opacity)));
    check(awards.length === 3 && Math.min(...awards) > 0.5, `/: awards visible after reloading in chapter 4 (${awards.map((o) => o.toFixed(2)).join(", ")})`);
    const device = await page.evaluate(() => Number(getComputedStyle(document.querySelector("[data-story-device]")).opacity));
    check(device > 0.5, "/: device visible after reloading mid-story");
    await page.close();
  }

  // Reduced motion: the nav mark is the visible home link from the start; the Torneos band doesn't move.
  {
    const context = await browser.newContext({ reducedMotion: "reduce", viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + "/", { waitUntil: "networkidle" });
    await settle(page, 1000);
    const markOpacity = await page.evaluate(() => Number(getComputedStyle(document.querySelector('[data-brand-mark="nav"]')).opacity));
    check(markOpacity > 0.9, `/ reduced motion: nav mark visible at load (${markOpacity})`);
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

  // Galleries land pinned from their links.
  for (const url of ["/#funciones", "/torneos#torneos-funciones"]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base + url, { waitUntil: "networkidle" });
    await settle(page, 1200);
    const stage = await page.evaluate((id) => {
      const r = document.getElementById(id).querySelector('[data-scene="pinned"]').getBoundingClientRect();
      return { top: r.top, bottom: r.bottom, vh: window.innerHeight };
    }, url.split("#")[1]);
    check(Math.abs(stage.top) <= 2 && Math.abs(stage.bottom - stage.vh) <= 2, `${url}: gallery lands pinned (top ${Math.round(stage.top)})`);
    await page.close();
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

  // 3. Deep links and reload mid-story
  for (const [url, selector] of [
    ["/#mercado-arqueros", '[data-card="mercado-arqueros"]'],
    ["/#faq", "#preguntas h2"],
    ["/torneos#torneos-planes", "#torneos-planes h2"],
  ]) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base + url, { waitUntil: "networkidle" });
    await settle(page, 1200);
    const visible = await page.evaluate((sel) => {
      const el = document.querySelector(sel);
      if (!el) return false;
      const r = el.getBoundingClientRect();
      return r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
    }, selector);
    check(visible, `${url}: target on screen`);
    await page.close();
  }
  for (const path of PAGES) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(base + path, { waitUntil: "networkidle" });
    const y = await page.evaluate(() => {
      const scene = document.querySelector('[data-scene="pinned"]').parentElement;
      return scene.offsetTop + (scene.offsetHeight - window.innerHeight) * 0.47;
    });
    await page.evaluate((top) => window.scrollTo(0, top), y);
    await settle(page);
    await page.reload({ waitUntil: "networkidle" });
    await settle(page, 1200);
    const shown = await page.evaluate(() => Math.max(...[...document.querySelectorAll("[data-caption]")].map((el) => Number(getComputedStyle(el).opacity))));
    check(shown > 0.5, `${path}: reload mid-story shows the current chapter`);
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
    await context.close();
  }

  // 6. Phone journey length
  const PHONE_LIMITS = { story: 5.2, gallery: 1.6 };
  for (const path of PAGES) {
    for (const [width, height] of [[320, 568], [375, 667], [390, 844]]) {
      const context = await browser.newContext({ viewport: { width, height }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
      const page = await context.newPage();
      await page.goto(base + path, { waitUntil: "networkidle" });
      await settle(page);
      const m = await page.evaluate(() => {
        const scenes = [...document.querySelectorAll('[data-scene="pinned"]')].map((stage) => stage.parentElement);
        const screens = (el) => Math.round(((el.offsetHeight - innerHeight) / innerHeight) * 10) / 10;
        return { vw: innerWidth, vh: innerHeight, story: screens(scenes[0]), gallery: screens(scenes[1]) };
      });
      check(m.vw === width && m.vh === height, `${path} ${width}×${height}: viewport applied (got ${m.vw}×${m.vh})`);
      check(
        m.story <= PHONE_LIMITS.story && m.gallery <= PHONE_LIMITS.gallery,
        `${path} ${width}×${height}: short phone journey (story ${m.story} ≤ ${PHONE_LIMITS.story}, gallery ${m.gallery} ≤ ${PHONE_LIMITS.gallery} screens)`,
      );
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
