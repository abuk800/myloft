import type { ImgKey } from "./images";

export const CAM_FILTERS = ["Alle", "Shooting", "Bestie", "Babybauch", "Team", "Podcast", "Party"] as const;
export type CamFilter = (typeof CAM_FILTERS)[number];

/** Beispielbilder für die Customer-Cam-Wall (echte Aufnahmen aus dem Studio; Handles werden nicht angezeigt). */
export const CAM_ITEMS: { k: ImgKey; tag: Exclude<CamFilter, "Alle">; ratio: string }[] = [
  { k: "shotSport", tag: "Shooting", ratio: "aspect-[3/4]" },
  { k: "stillDuo", tag: "Bestie", ratio: "aspect-[3/4]" },
  { k: "pregnantTulle", tag: "Babybauch", ratio: "aspect-[4/5]" },
  { k: "shotMasterclass", tag: "Team", ratio: "aspect-square" },
  { k: "eventBirthday", tag: "Party", ratio: "aspect-[4/3]" },
  { k: "stillMic", tag: "Podcast", ratio: "aspect-[3/4]" },
  { k: "shotStairs", tag: "Shooting", ratio: "aspect-[4/5]" },
  { k: "stillLila", tag: "Team", ratio: "aspect-[3/4]" },
  { k: "cubeModel", tag: "Shooting", ratio: "aspect-[4/5]" },
  { k: "eventOpening", tag: "Party", ratio: "aspect-[3/4]" },
  { k: "sofaChair", tag: "Shooting", ratio: "aspect-[3/4]" },
  { k: "hairModel", tag: "Team", ratio: "aspect-square" },
  { k: "shotBW", tag: "Shooting", ratio: "aspect-square" },
  { k: "shotPet", tag: "Shooting", ratio: "aspect-[4/5]" },
  { k: "eventPaint", tag: "Party", ratio: "aspect-[4/5]" },
  { k: "shotPregnant", tag: "Babybauch", ratio: "aspect-[4/5]" },
  { k: "stillWeiss", tag: "Team", ratio: "aspect-[3/4]" },
  { k: "hairSofa", tag: "Team", ratio: "aspect-square" },
];
