import type { ImgKey } from "./images";

export const CAM_FILTERS = ["Alle", "Shooting", "Bestie", "Babybauch", "Team", "Podcast", "Party"] as const;
export type CamFilter = (typeof CAM_FILTERS)[number];

/** Beispielbilder für die Customer-Cam-Wall (Demo). Handles werden nicht angezeigt. */
export const CAM_ITEMS: { k: ImgKey; tag: Exclude<CamFilter, "Alle">; handle: string; ratio: string }[] = [
  { k: "realSport", tag: "Shooting", handle: "@anna.moments", ratio: "aspect-[3/4]" },
  { k: "friendsLaugh", tag: "Bestie", handle: "@lena.und.co", ratio: "aspect-[4/3]" },
  { k: "realPregnant", tag: "Babybauch", handle: "@mama.to.be", ratio: "aspect-[4/5]" },
  { k: "realWorkshop", tag: "Team", handle: "@brandlab.ffm", ratio: "aspect-square" },
  { k: "babyshower", tag: "Party", handle: "@baby.on.board", ratio: "aspect-[3/4]" },
  { k: "podcastB", tag: "Podcast", handle: "@talk.taunus", ratio: "aspect-[4/3]" },
  { k: "realStairs", tag: "Shooting", handle: "@sara.visuals", ratio: "aspect-[4/5]" },
  { k: "friendsCheers", tag: "Bestie", handle: "@besties.ffm", ratio: "aspect-[3/4]" },
  { k: "pregnancyC", tag: "Babybauch", handle: "@nina.glow", ratio: "aspect-[3/4]" },
  { k: "tableWhite", tag: "Party", handle: "@feiern.im.loft", ratio: "aspect-[4/3]" },
  { k: "realCube", tag: "Shooting", handle: "@mira.creates", ratio: "aspect-[3/4]" },
  { k: "podcastC", tag: "Podcast", handle: "@content.club", ratio: "aspect-square" },
  { k: "friendsFun", tag: "Bestie", handle: "@girls.day.out", ratio: "aspect-[4/3]" },
  { k: "realSofa", tag: "Shooting", handle: "@baby.bump.diary", ratio: "aspect-[4/5]" },
  { k: "cameraBlue", tag: "Shooting", handle: "@reels.by.jo", ratio: "aspect-[3/4]" },
  { k: "tableCandles", tag: "Party", handle: "@hello.baby.party", ratio: "aspect-[4/5]" },
  { k: "realBW", tag: "Shooting", handle: "@team.portraits", ratio: "aspect-square" },
  { k: "realPet", tag: "Shooting", handle: "@dinner.with.us", ratio: "aspect-[4/3]" },
];

export const IG_TILES: { k: ImgKey; reel?: boolean }[] = [
  { k: "realStairs", reel: true },
  { k: "tableWhite" },
  { k: "podcastA", reel: true },
  { k: "realCube" },
  { k: "realSofa" },
  { k: "realPregnant", reel: true },
];
