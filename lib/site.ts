/**
 * Umgebungsabhängige Einstellungen.
 *  NEXT_PUBLIC_SITE_URL  : öffentliche Basis-URL (OG-Bild, canonical), z. B. https://myloft-eight.vercel.app
 *  NEXT_PUBLIC_IS_DEMO   : "1" (Standard) = Demo, wird nicht indexiert. Für den Livegang auf "0" setzen.
 */
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : null;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || fromVercel || "http://localhost:3000").replace(/\/$/, "");
export const IS_DEMO = !["0", "false"].includes((process.env.NEXT_PUBLIC_IS_DEMO ?? "1").toLowerCase());
