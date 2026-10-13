#!/usr/bin/env node
/**
 * Writes public/descargar-qr.svg, the QR shown to desktop visitors.
 * It points at /descargar, which redirects each phone to its store.
 */
import { writeFileSync } from "node:fs";
import QRCode from "qrcode";

const svg = await QRCode.toString("https://www.arma2.com.ar/descargar", {
  type: "svg",
  margin: 1,
  errorCorrectionLevel: "M",
  color: { dark: "#070711", light: "#ffffff" },
});

writeFileSync("public/descargar-qr.svg", svg);
console.log("public/descargar-qr.svg written");
