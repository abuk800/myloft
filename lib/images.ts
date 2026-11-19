/**
 * Zentrale Bildverwaltung. Alle Bilder liegen lokal in public/studio (echte Aufnahmen aus dem Studio).
 * Zum Austausch: Datei ersetzen oder den Pfad hier ändern.
 * Reihenfolge innerhalb der Gruppen = Qualitäts-Rang (siehe docs/bilder-ranking.md).
 */

export type Img = { id: string; alt: string };

/** Liefert die Bild-URL (lokaler Pfad oder komplette URL). */
export function src(img: Img | string, _w = 1200): string {
  void _w;
  return typeof img === "string" ? img : img.id;
}

export const IMG = {
  // ── Raum (1600×1200) ───────────────────────────────────
  roomLogo: { id: "/studio/raum-logo-weihnachten.jpg", alt: "MYLOFT STUDIO: Logo-Wand, Weihnachtsbaum, roter Vorhang, Bouclé-Sofas und weißes Set mit Softbox" },
  roomCurtain: { id: "/studio/raum-roter-vorhang.jpg", alt: "Weihnachts-Set mit rotem Vorhang, Baum und Bouclé-Sofas vor der MYLOFT-Logo-Wand" },
  roomTree: { id: "/studio/raum-baum-vordergrund.jpg", alt: "Studio-Halle mit Weihnachtsbaum, Empore, Sofa-Ecke und Studiolicht" },
  roomMezzanine: { id: "/studio/raum-empore-sofas.jpg", alt: "Blick in die Studio-Halle mit Empore, Weihnachts-Set und Sofa-Ecke" },
  roomSoftbox: { id: "/studio/raum-softbox-sofas.jpg", alt: "Studio mit Softbox, Bouclé-Sofa und weißem Hohlkehlen-Set" },
  roomSofa: { id: "/studio/raum-sofa-ecke.jpg", alt: "Sofa-Ecke aus cremefarbenen Bouclé-Sofas mit Couchtisch" },

  // ── Events ─────────────────────────────────────────────
  eventOpening: { id: "/studio/event-opening-kerzen.jpg", alt: "Opening-Event: lilafarbene Ballons, weiße Rundbögen und lange Tafeln mit Kerzen und Chiavari-Stühlen" },
  eventBirthday: { id: "/studio/event-geburtstag-tafel.jpg", alt: "Kindergeburtstag: lange weiße Tafel mit rosa Tischläufer, Ballons und Chiavari-Stühlen" },
  eventPaint: { id: "/studio/event-mal-workshop.jpg", alt: "Lange Tafel mit Malpaletten, Tüten und Chiavari-Stühlen bei einem Workshop" },
  shotMasterclass: { id: "/studio/shots/masterclass-gruppe.jpg", alt: "Gruppenfoto bei der Make-up-Masterclass im Studio" },
  shotChairs: { id: "/studio/shots/chiavari-stuehle.jpg", alt: "Weiße Chiavari-Stühle an gedeckter Tafel beim Workshop" },

  // ── Shootings ──────────────────────────────────────────
  pregnantTulle: { id: "/studio/schwanger-tuell.jpg", alt: "Babybauch-Shooting im rosa Tüllkleid vor hellem Hintergrund" },
  cubeModel: { id: "/studio/model-weisse-wuerfel.jpg", alt: "Model liegt auf weißen Würfeln vor der Hohlkehle" },
  sofaChair: { id: "/studio/sofa-sessel.jpg", alt: "Frau sitzt lachend auf dem cremefarbenen Bouclé-Sessel vor weißem Hintergrund" },
  hairModel: { id: "/studio/produkt-haarmarke-model.jpg", alt: "Produkt-Shooting: Model neben Kleiderständer mit Haarverlängerungen vor grauem Hintergrund" },
  hairSofa: { id: "/studio/produkt-haare-boucle-sofa.jpg", alt: "Vier glatte Haarsträhnen über der Lehne eines cremefarbenen Bouclé-Sofas" },
  familyWall: { id: "/studio/familie-logo-wand.jpg", alt: "Familie sitzt auf den cremefarbenen Bouclé-Sofas vor der MYLOFT-STUDIO-Wand" },
  btsSoftbox: { id: "/studio/bts-softbox-weisses-set.jpg", alt: "Behind the Scenes: Shooting auf dem weißen Set mit Softbox und Monitor" },
  kidCube: { id: "/studio/kind-auf-wuerfel-weisses-set.jpg", alt: "Kinder-Shooting auf weißem Würfel vor der Hohlkehle, Fotograf im Vordergrund" },
  shotStairs: { id: "/studio/treppe-gelaender-hd.jpg", alt: "Model sitzt auf der offenen Treppe mit Metallgeländer im Studio" },
  shotSport: { id: "/studio/shots/sport.jpg", alt: "Sport-Shooting vor hellem Hintergrund" },
  shotPet: { id: "/studio/shots/white-set-dog.jpg", alt: "Shooting mit Dackel auf dem weißen Set" },
  shotBW: { id: "/studio/shots/portrait-bw.jpg", alt: "Schwarz-Weiß-Portrait mit dramatischem Licht" },
  shotCube: { id: "/studio/shots/wuerfel-spotlight.jpg", alt: "Model auf weißem Würfel im Spotlight" },
  shotPregnant: { id: "/studio/shots/schwanger-tuell.jpg", alt: "Babybauch-Shooting im rosa Tüllkleid" },
  meteGimbal: { id: "/studio/mete.jpg", alt: "Mete, Inhaber von MYLOFT STUDIO, mit Kamera-Gimbal" },

  // ── Standbilder aus den Reels (klein, nur für Kacheln) ──
  stillDuo: { id: "/studio/still-duo-pink.jpg", alt: "Zwei Freundinnen tanzen vor pinkem Hintergrund im Studio" },
  stillLila: { id: "/studio/still-lila-softbox.jpg", alt: "Fotoshooting vor lila Hintergrund mit großer Softbox" },
  stillWeiss: { id: "/studio/still-weisses-set.jpg", alt: "Fotografin und Model auf dem weißen Set mit Regiestuhl" },
  stillKinder: { id: "/studio/still-kinderparty.jpg", alt: "Dekoration mit Ballons und Zielflaggen bei einem Kindergeburtstag" },
  stillMic: { id: "/studio/still-mic-creator.jpg", alt: "Creatorin mit Mikrofon und Kamera im Studio" },
} satisfies Record<string, Img>;

export type ImgKey = keyof typeof IMG;

/** Video-Loops (public/video): jeweils MP4 + WebM + Poster. */
export const VIDEO = {
  hero: { base: "/video/hero-farben", label: "Farbige Hintergründe" },
  shooting: { base: "/video/reel-shooting", label: "Shooting auf dem weißen Set" },
  farben: { base: "/video/reel-farben", label: "Farbige Hintergründe" },
  geburtstag: { base: "/video/reel-geburtstag", label: "Kindergeburtstag im Loft" },
  setup: { base: "/video/reel-setup", label: "Setup und Equipment" },
} as const;
export type VideoKey = keyof typeof VIDEO;
