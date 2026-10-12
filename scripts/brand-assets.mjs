#!/usr/bin/env node
/**
 * Converts the brand source images into the WebP files the cinematic scenes
 * use, and prints their final sizes for `src/lib/brand-assets.ts`.
 *
 * Usage: npm run brand:assets -- <srcDir>
 *
 * <srcDir> must contain the masters:
 *   BG_HERO.png, mvp_award.png, goalkeeper_award.png, redcard_award.png,
 *   CardProfileCard.png, logo_arma2.png  (old site, tag `antes-del-rediseno`)
 *   BG_Torneos.png                        (Nico's stadium photo)
 *   pc-torneos.png                        (docs/assets/pc-torneos-corregido.png)
 */
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const srcDir = process.argv[2];
if (!srcDir) {
  console.error("Usage: npm run brand:assets -- <srcDir>");
  process.exit(1);
}

const publicDir = join(process.cwd(), "public");

const JOBS = [
  { src: "BG_HERO.png", out: "brand/bg-hero.webp", resize: { width: 1920 }, quality: 72 },
  { src: "mvp_award.png", out: "brand/award-mvp.webp", resize: { width: 400 }, quality: 82 },
  { src: "goalkeeper_award.png", out: "brand/award-goalkeeper.webp", resize: { width: 400 }, quality: 82 },
  { src: "redcard_award.png", out: "brand/award-redcard.webp", resize: { width: 400 }, quality: 82 },
  { src: "CardProfileCard.png", out: "brand/card-nico.webp", resize: { height: 600 }, quality: 82 },
  { src: "logo_arma2.png", out: "brand/logo-arma2.webp", resize: { width: 480 }, quality: 90 },
  { src: "BG_Torneos.png", out: "torneos/bg-stadium.webp", resize: { width: 1920 }, quality: 72 },
  { src: "pc-torneos.png", out: "torneos/pc-torneos.webp", resize: { width: 1400 }, quality: 80 },
];

for (const job of JOBS) {
  const target = join(publicDir, job.out);
  await mkdir(join(target, ".."), { recursive: true });
  const info = await sharp(join(srcDir, job.src))
    .resize({ ...job.resize, withoutEnlargement: true })
    .webp({ quality: job.quality, alphaQuality: 90, effort: 6 })
    .toFile(target);
  console.log(`${job.out}\t${info.width}x${info.height}\t${(info.size / 1024).toFixed(0)} KB`);
}
