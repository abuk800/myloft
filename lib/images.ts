/**
 * Zentrale Bildverwaltung.
 * Alle Bilder sind Unsplash-Platzhalter, die dem echten Raum nahekommen.
 * Zum Austausch gegen echte Studiofotos: nur die Werte hier ändern
 * (entweder eine Unsplash-ID oder eine komplette https-URL / lokaler Pfad wie "/studio/treppe.jpg").
 */

export type Img = { id: string; alt: string };

const UNSPLASH = "https://images.unsplash.com/photo-";

/** Baut aus einer Unsplash-ID oder einer fertigen URL/Pfad die finale Bild-URL. */
export function src(img: Img | string, w = 1200): string {
  const id = typeof img === "string" ? img : img.id;
  if (id.startsWith("http") || id.startsWith("/")) return id;
  return `${UNSPLASH}${id}?auto=format&fit=crop&w=${w}&q=75`;
}

export const IMG = {
  // ── Echte Studiofotos (public/studio) ───────────────────
  realStairs: { id: "/studio/treppe-gelaender.jpg", alt: "Model sitzt auf der offenen Treppe mit Metallgeländer im Studio" },
  realCube: { id: "/studio/wuerfel-spotlight.jpg", alt: "Model auf weißem Würfel im Spotlight" },
  realSofa: { id: "/studio/sofa-sessel.jpg", alt: "Frau sitzt auf dem cremefarbenen Sofa-Sessel vor weißem Hintergrund" },
  realPregnant: { id: "/studio/schwanger-tuell.jpg", alt: "Babybauch-Shooting im rosa Tüllkleid" },
  realPet: { id: "/studio/white-set-dog.jpg", alt: "Shooting mit Dackel auf dem weißen Set" },
  realBW: { id: "/studio/portrait-bw.jpg", alt: "Schwarz-Weiß-Portrait mit dramatischem Licht" },
  realSport: { id: "/studio/sport.jpg", alt: "Sport-Shooting vor hellem Hintergrund" },
  realCreator: { id: "/studio/creator-gimbal.jpg", alt: "Content Creator mit Kamera-Gimbal" },
  realWorkshop: { id: "/studio/masterclass-gruppe.jpg", alt: "Gruppenfoto bei der Make-up-Masterclass im Studio" },
  realChairs: { id: "/studio/chiavari-stuehle.jpg", alt: "Weiße Chiavari-Stühle an gedeckter Tafel beim Workshop" },

  // ── Raum ───────────────────────────────────────────────
  sofaLounge: { id: "1784653548770-23c8f9022c4c", alt: "Heller Loft-Raum mit cremefarbenen Sofas" },
  sofaLounge2: { id: "1784653548946-e7444b1d12d7", alt: "Cremefarbene Sofa-Ecke mit Marmortisch" },
  brightRoom: { id: "1633505899118-4ca6bd143043", alt: "Helles Wohnzimmer mit großen Fenstern" },
  brightRoom2: { id: "1788396408394-b8e46d19272c", alt: "Heller Raum mit Sofas und Sesseln" },
  whiteHall: { id: "1771371097061-3befd4b71b59", alt: "Großer weißer Saal mit Sofas" },
  stairsWhite: { id: "1776673449578-69107b0b9cb1", alt: "Weiße Treppe mit Laterne und Trockenblumen" },
  stairsSpiral: { id: "1711294545067-5693f948bc7b", alt: "Weiße Treppe mit sanfter Rundung" },
  stairsModern: { id: "1775644729932-96c35567f9ed", alt: "Moderne helle Treppe" },
  archWall: { id: "1786325492063-8967ed6ad88d", alt: "Studio mit Cremewand und Regiestuhl" },

  // ── Studio / Technik ───────────────────────────────────
  studioCyc: { id: "1471341971476-ae15ff5dd4ea", alt: "Weißes Fotostudio mit Softboxen und Studioblitzen" },
  studioSoftbox: { id: "1527011046414-4781f1f94f8c", alt: "Softbox neben Zimmerpflanzen im Studio" },
  studioShoot: { id: "1758613655304-48776efb25d8", alt: "Fotograf bei einem Shooting im Studio" },
  studioModel: { id: "1768818928341-3b31b8965c6d", alt: "Weißes Studio mit Dauerlicht" },
  studioLight: { id: "1763365894901-675a14ca8888", alt: "Dauerlicht im Studio" },
  cameraRig: { id: "1612548403247-aa2873e9422d", alt: "Profikamera mit Zoomobjektiv auf Stativ" },
  cameraBlue: { id: "1759393852314-59dc00faeed3", alt: "Content Creatorin filmt sich mit Smartphone und Stativ" },

  // ── Events / Tafel ─────────────────────────────────────
  tableWhite: { id: "1767070805821-60c701885151", alt: "Lange festlich gedeckte Tafel mit weißen Stühlen" },
  tableLong: { id: "1641834948278-449f060477fa", alt: "Lange Tafel, festlich eingedeckt" },
  tableCandles: { id: "1606659894125-40824878b6ce", alt: "Kerzenlicht auf einer Esstafel" },
  tableFlowers: { id: "1764161961082-dee05fcb731c", alt: "Lange Tafel mit Blumen und Früchten" },
  tableDetail: { id: "1767070806645-b0d595fa2c6a", alt: "Festlich gedeckter Tisch im Detail" },
  christmas: { id: "1543752330-bf0c7055f5bc", alt: "Weihnachtsbaum mit roten Kugeln und Lichtern" },
  christmasRed: { id: "1607184231297-2132ea7183d4", alt: "Roter Weihnachtsschmuck am Baum" },

  // ── Menschen / Anlässe ─────────────────────────────────
  portraitA: { id: "1770058443069-e384cd001e9b", alt: "Portrait vor hellem Hintergrund" },
  portraitB: { id: "1636153279424-cb5d1e00f5a2", alt: "Portrait einer Frau vor heller Wand" },
  portraitC: { id: "1582896911227-c966f6e7fb93", alt: "Portrait mit Blazer vor weißem Hintergrund" },
  portraitD: { id: "1695757002354-8bca71d087c7", alt: "Lächelndes Portrait vor weißem Hintergrund" },
  portraitE: { id: "1610659523060-816c02b94529", alt: "Lächelnde Frau im Studio" },
  portraitF: { id: "1645310371632-bec11db1971d", alt: "Frau vor weißer Wand" },
  portraitBW: { id: "1770862848042-b83c5381a679", alt: "Schwarz-Weiß-Portrait" },
  pregnancyA: { id: "1711313530954-39421910bc82", alt: "Schwangere hält ihren Babybauch" },
  pregnancyB: { id: "1711313533154-7dda5b155f88", alt: "Babybauch im weißen Pullover" },
  pregnancyC: { id: "1711313528753-616a2213c3f9", alt: "Schwangere lugt hinter einer Wand hervor" },
  pregnancyDark: { id: "1489674297774-eadf82cba14c", alt: "Babybauch-Portrait im Seitenlicht" },
  podcastA: { id: "1782274265689-4f10a91d4abb", alt: "Podcast-Setup mit zwei Mikrofonen" },
  podcastB: { id: "1559523161-0fc0d8b38a7a", alt: "Zwei Personen nehmen einen Podcast auf" },
  podcastC: { id: "1780642208543-7a84b61f13ca", alt: "Content-Setup mit Sofa und Licht" },
  micDark: { id: "1478737270239-2f02b77fc618", alt: "Studiomikrofon im Detail" },
  babyshower: { id: "1788462810835-7a36a2402dc4", alt: "Ballonbogen bei einer Babyparty" },
  babyLetters: { id: "1768776183122-95c7d3adbf3e", alt: "Beleuchtete BABY-Buchstaben" },
  babyArch: { id: "1788462811028-14d4e80bf6de", alt: "Ballonbogen in Rosa und Blau" },
  friendsLaugh: { id: "1681641095463-b4d3693a0ee3", alt: "Freundinnen lachen gemeinsam" },
  friendsParty: { id: "1511988617509-a57c8a288659", alt: "Gruppe lacht zusammen" },
  friendsCheers: { id: "1485872299829-c673f5194813", alt: "Zwei Freundinnen stoßen an" },
  friendsFun: { id: "1681641088246-b3e60e203ad1", alt: "Gruppe von Freundinnen am Tisch" },
  friendsFood: { id: "1671116810331-894618e447b8", alt: "Freunde teilen Essen am Tisch" },
} satisfies Record<string, Img>;

export type ImgKey = keyof typeof IMG;
