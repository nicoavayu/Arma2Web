#!/usr/bin/env node
/**
 * Converts raw product captures into the WebP files served by the site and
 * records their real size in public/shots/manifest.json.
 *
 *   node scripts/optimize-shots.mjs <rawDir>
 *
 * Raw files are named `<group>__<name>.png` (e.g. `jugadores__votacion.png`)
 * and must match an id already listed in the manifest; alt text and routes in
 * the manifest are kept as they are.
 */
import { readFileSync, readdirSync, writeFileSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import sharp from "sharp";

const rawDir = process.argv[2];
if (!rawDir) {
  console.error("usage: node scripts/optimize-shots.mjs <rawDir>");
  process.exit(1);
}

const publicDir = join(process.cwd(), "public/shots");
const manifestPath = join(publicDir, "manifest.json");
const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));

for (const fileName of readdirSync(rawDir).filter((name) => name.endsWith(".png"))) {
  const id = fileName.replace(/\.png$/, "").replace("__", "/");
  const entry = manifest.shots[id];
  if (!entry) {
    console.warn(`skip ${fileName}: ${id} is not in the manifest`);
    continue;
  }
  const outPath = join(publicDir, entry.file);
  mkdirSync(dirname(outPath), { recursive: true });
  const info = await sharp(join(rawDir, fileName)).webp({ quality: 82 }).toFile(outPath);
  entry.width = info.width;
  entry.height = info.height;
  console.log(`${id} → ${entry.file} (${info.width}×${info.height}, ${Math.round(info.size / 1024)} KB)`);
}

writeFileSync(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`);
