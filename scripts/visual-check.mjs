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
      check(deviceOnScreen(r), `${path} ${width}×${height}: hero device fully on screen`);
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
} finally {
  await browser.close();
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll visual checks passed.");
