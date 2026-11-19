/**
 * Zentrale Inhalte: Kontakt, Preise, Angebote, Texte.
 * Alles, was das Studio später selbst ändern können soll, steht hier.
 * Unbekannte Werte stehen NICHT hier, sondern in lib/content.ts (null = Block wird ausgeblendet).
 */
import type { ImgKey } from "./images";
import { OPEN } from "./content";

export const SITE = {
  name: "MYLOFT",
  suffix: "STUDIO",
  fullName: "MYLOFT STUDIO",
  tagline: "A place for everyone",
  address: {
    street: "Oberurseler Str. 81",
    zip: "61440",
    city: "Oberursel (Taunus)",
  },
  phone: "+49 1511 6519699",
  phoneHref: "tel:+4915116519699",
  whatsappNumber: "491511 6519699".replace(" ", ""),
  // Schreibweise prüfen: "oberusel" (ein r) so aus dem Briefing übernommen, bewusst nicht geändert.
  email: "myloftstudio.oberusel@gmail.com",
  instagram: { handle: "@my.loftstudio", url: "https://www.instagram.com/my.loftstudio/", followers: "ca. 1.200" },
  igBio: "Events | Foto | Video | Podcast | Content – a place for everyone",
  owner: "Mete",
  hours: "täglich 07:00–24:00",
  hoursShort: "täglich 7–24 Uhr",
  google: {
    rating: "5,0",
    count: 23,
    profileUrl: "https://www.google.com/maps/search/?api=1&query=MYLOFT+STUDIO+Oberurseler+Str.+81+61440+Oberursel",
    reviewUrl: "https://www.google.com/maps/search/?api=1&query=MYLOFT+STUDIO+Oberurseler+Str.+81+61440+Oberursel",
  },
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Oberurseler+Str.+81+61440+Oberursel",
  mapsEmbed: "https://maps.google.com/maps?q=Oberurseler+Str.+81,+61440+Oberursel&z=15&output=embed",
  hashtag: "#myloftmoment",
};

/** WhatsApp-Link mit vorausgefüllter Nachricht (funktioniert echt). */
export function waLink(message: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

export const WA = {
  default: "Hi! Ich interessiere mich für das MYLOFT STUDIO. Habt ihr noch Termine frei?",
  studio: "Hi! Ich möchte gern das Studio buchen. Habt ihr am … noch einen Slot frei?",
  events: "Hi! Ich interessiere mich für eine Feier im Loft am … mit ca. … Gästen.",
  babyparty: "Hi, ich interessiere mich für eine Babyparty am …",
  geburtstag: "Hi, ich interessiere mich für einen Geburtstag im Loft am …",
  gutschein: "Hi! Ich möchte gern einen Gutschein verschenken.",
};

// ── Studio-Pakete ───────────────────────────────────────
export const INCLUDED = [
  { icon: "building", label: "Studio mit zwei Etagen" },
  { icon: "camera", label: "Canon R6 + 24–70 mm f/2.8" },
  { icon: "light", label: "Dauerlicht" },
  { icon: "card", label: "128-GB-Speicherkarte" },
] as const;

export type Pkg = {
  id: "2h" | "4h" | "6h";
  hours: number;
  name: string;
  price: number;
  people: number;
  lights: number;
  featured?: boolean;
  blurb: string;
};

export const PACKAGES: Pkg[] = [
  { id: "2h", hours: 2, name: "2 Stunden", price: 190, people: 4, lights: 2, blurb: "Für den schnellen Content-Drop oder ein Portrait-Shooting." },
  { id: "4h", hours: 4, name: "4 Stunden", price: 315, people: 6, lights: 2, featured: true, blurb: "Genug Zeit für mehrere Sets, Outfits und Looks." },
  { id: "6h", hours: 6, name: "6 Stunden", price: 465, people: 8, lights: 3, blurb: "Der halbe Tag für Teams, Brand-Content und große Gruppen." },
];

export const WEEKDAY = {
  title: "Bestie-Day im Studio: das ganze Loft für euch.",
  text: "Dein Zeichen, das Studio mit deinen Besties zu buchen. Unter der Woche mietet ihr das Studio komplett allein, mit Profikamera und Lichtsetup.",
  /** null = Preis auf Anfrage */
  price: OPEN.weekdayPrice,
};

/** Preis eines Extras oder "auf Anfrage", solange kein Preis eingetragen ist. */
export const extraPrice = (id: string) => OPEN.extraPrices[id] ?? "auf Anfrage";

export const EXTRAS = [
  { id: "light", label: "Zusätzliches Licht" },
  { id: "photographer", label: "Fotograf / Videograf" },
  { id: "deco", label: "Deko-Paket" },
  { id: "hmu", label: "Hair & Make-up" },
  { id: "cleaning", label: "Reinigung nach Event" },
];

// ── Events ──────────────────────────────────────────────
export const EVENT = {
  price: 750,
  validUntil: "31.12.2026",
  title: "Feiern im Loft: 750 € für den ganzen Tag",
  items: [
    { icon: "chair", label: "66 Stühle" },
    { icon: "table", label: "6 große Bankett-Tische" },
    { icon: "linen", label: "Tischdecken" },
    { icon: "kitchen", label: "Küche" },
    { icon: "wc", label: "Zwei Toiletten" },
    { icon: "mirror", label: "Getting-Ready-Room" },
    { icon: "floors", label: "Zwei Stockwerke" },
    { icon: "clean", label: "Reinigung danach" },
  ],
};

export const EVENT_OCCASIONS = ["Geburtstag", "Babyparty", "Firmenevent", "Workshop", "Community-Event", "Sonstiges"] as const;
export const EVENT_EXTRAS = ["Fotograf", "Deko", "Catering-Küche", "Getting-Ready-Room"] as const;
export const MAX_GUESTS = 66; // Obergrenze des Reglers = Anzahl der Stühle (OPEN.maxGuests nennt die offizielle Kapazität, sobald bekannt)

// ── Sets ────────────────────────────────────────────────
export const SETS: { id: string; name: string; perfect: string; images: ImgKey[]; hero: ImgKey }[] = [
  { id: "treppe", name: "Die Treppe", perfect: "Perfekt für Fashion-Looks, Paar-Shootings und dramatische Bildkompositionen.", hero: "shotStairs", images: ["shotStairs", "stillWeiss"] },
  { id: "white", name: "White Set", perfect: "Perfekt für Portraits, Produkte und alles, was Fokus braucht.", hero: "cubeModel", images: ["cubeModel", "shotPet"] },
  { id: "sofa", name: "Sofa-Ecke", perfect: "Perfekt für Lifestyle, Familie und entspannte Besties-Fotos.", hero: "sofaChair", images: ["sofaChair", "roomSofa"] },
  { id: "bogen", name: "Rundbogen-Tür", perfect: "Perfekt für Babybauch, Hochzeits-Vibes und weiche Silhouetten.", hero: "eventOpening", images: ["eventOpening", "shotPregnant"] },
  { id: "licht", name: "Studiolicht", perfect: "Perfekt für Teams, Marken-Content und kontrollierte Looks.", hero: "btsSoftbox", images: ["btsSoftbox", "stillLila"] },
  { id: "saison", name: "Saisonset", perfect: "Perfekt für Weihnachts-Special, Mini-Sessions und Geschenk-Shootings.", hero: "roomCurtain", images: ["roomCurtain", "familyWall"] },
];

// ── Anlässe ─────────────────────────────────────────────
export type Occasion = {
  slug: string;
  title: string;
  short: string;
  image: ImgKey; // Hero (muss hochauflösend sein)
  tile?: ImgKey; // Kachel auf der Startseite (darf kleiner sein)
  pos?: string; // Bildausschnitt im Hero (CSS object-position)
  tilePos?: string; // Bildausschnitt in der Kachel
  gallery: ImgKey[];
  headline: string;
  intro: string;
  points: string[];
  faqs: { q: string; a: string }[];
  cta: "studio" | "event";
  waKey: keyof typeof WA;
  seoTitle: string;
  seoDesc: string;
  dark?: boolean;
};

export const OCCASIONS: Occasion[] = [
  {
    slug: "content-creator",
    title: "Content & Creator",
    short: "Viele Looks in kurzer Zeit",
    image: "stillLila",
    tile: "roomSoftbox",
    tilePos: "50% 55%",
    gallery: ["stillLila", "stillWeiss", "roomSoftbox", "shotStairs"],
    headline: "Kamera und Licht stehen bereit.",
    intro: "Reels, Fotos, BTS: Auf zwei Etagen wechselst du zwischen Treppe, White Set und Sofa-Ecke. Profikamera und Dauerlicht sind im Preis dabei.",
    points: ["Canon R6 mit 24–70 mm f/2.8 inklusive", "Dauerlicht und weißes Boden-Set", "Mehrere Sets in einer Session", "Ab 190 € für 2 Stunden"],
    faqs: [
      { q: "Muss ich eigene Technik mitbringen?", a: "Nein. Kamera, Objektiv, Dauerlicht und Speicherkarte sind im Paket enthalten. Eigene Technik darfst du natürlich trotzdem mitbringen." },
      { q: "Wie viele Personen dürfen mit?", a: "Je nach Paket bis zu 4, 6 oder 8 Personen." },
    ],
    cta: "studio", waKey: "studio",
    seoTitle: "Content Studio bei Frankfurt mieten",
    seoDesc: "Content Studio bei Frankfurt: Profikamera, Dauerlicht, mehrere Sets auf zwei Etagen. Ab 190 € online buchen.",
  },
  {
    slug: "bestie-shoot",
    title: "Bestie-Shoot",
    short: "Das ganze Loft für euch",
    image: "stillDuo",
    gallery: ["stillDuo", "sofaChair", "cubeModel", "roomSofa"],
    headline: "Bestie-Day im Studio: das ganze Loft für euch.",
    intro: "Dein Zeichen, das Studio mit deinen Besties zu buchen. Unter der Woche mietet ihr das Studio komplett allein, mit Profikamera und Lichtsetup. Ihr müsst keine Models sein, nur zusammen kommen.",
    points: ["Studio unter der Woche komplett für euch", "Profikamera und Lichtsetup inklusive", "Bis zu 4, 6 oder 8 Personen je nach Paket", OPEN.weekdayPrice ? `Wochentags-Preis: ${OPEN.weekdayPrice}` : "Wochentags-Preis auf Anfrage"],
    faqs: [
      { q: "Brauchen wir Foto-Erfahrung?", a: "Nein. Das Setup steht, ihr bringt gute Laune und eure Outfits mit." },
      { q: "Wann gilt der Wochentags-Deal?", a: OPEN.weekdayPrice ? `Unter der Woche. Der Preis: ${OPEN.weekdayPrice}.` : "Unter der Woche. Den Preis nennen wir dir auf Anfrage, schreib uns einfach auf WhatsApp." },
    ],
    cta: "studio", waKey: "studio",
    seoTitle: "Bestie-Shooting bei Frankfurt: Fotostudio mieten",
    seoDesc: "Fotostudio mit Freundinnen mieten: Unter der Woche das ganze Loft für euch, inklusive Profikamera.",
  },
  {
    slug: "schwangerschaft-familie",
    title: "Schwangerschaft & Familie",
    short: "Erinnerungen in weichem Licht",
    image: "pregnantTulle",
    pos: "50% 25%",
    gallery: ["pregnantTulle", "shotPregnant", "familyWall", "shotPet"],
    headline: "Weiches Licht für Momente, die bleiben.",
    intro: "Babybauch-Shooting, Familienfotos oder ein Portrait zu zweit: Der Rundbogen, helle Wände und Dauerlicht geben jedem Bild Raum. Ohne Hektik, in deinem Tempo.",
    points: ["Heller Raum mit Rundbogen-Tür und Sofa-Ecke", "Dauerlicht, gut für weiche Portraits", "Fotograf auf Anfrage", "Pakete ab 2 Stunden"],
    faqs: [
      { q: "Kann ich einen Fotografen dazubuchen?", a: "Fotograf und Videograf gibt es als Extra, Preis und Verfügbarkeit auf Anfrage." },
      { q: "Wie lange sollte ich einplanen?", a: "Für ein Babybauch- oder Familienshooting sind 2 Stunden ein guter Start." },
    ],
    cta: "studio", waKey: "studio",
    seoTitle: "Babybauch-Shooting bei Frankfurt, Familienfotos in Oberursel",
    seoDesc: "Babybauch- und Familienshooting im hellen Loft bei Frankfurt. Weiches Licht, Rundbogen und Sofa-Ecke, online buchbar.",
  },
  {
    slug: "brand-team",
    title: "Brand & Team",
    short: "Team-, Produkt- und Brand-Content",
    image: "hairModel",
    pos: "50% 30%",
    tilePos: "50% 0%",
    gallery: ["hairModel", "hairSofa", "shotBW", "stillLila"],
    headline: "Euer Team. Euer Look. Ein Nachmittag.",
    intro: "Teamfotos, Produktbilder, Recruiting-Content: Das weiße Set und kontrolliertes Licht liefern einen sauberen, einheitlichen Look. Bis zu 8 Personen im 6-Stunden-Paket.",
    points: ["Weißes Set mit Studioblitzen und Softboxen", "Platz für bis zu 8 Personen (6-Std.-Paket)", "Fotograf / Videograf als Extra auf Anfrage"],
    faqs: [
      { q: "Können wir Produkte shooten?", a: "Ja, das weiße Set eignet sich dafür. Bring deine Produkte einfach mit." },
    ],
    cta: "studio", waKey: "studio",
    seoTitle: "Teamfotos und Brand-Shooting bei Frankfurt",
    seoDesc: "Team- und Brand-Shootings im Fotostudio bei Frankfurt. Weißes Set, Profilicht, bis zu 8 Personen.",
  },
  {
    slug: "podcast",
    title: "Podcast",
    short: "Sofa-Ecke, Licht und Kamera",
    image: "stillMic",
    gallery: ["stillMic", "roomSofa", "roomSoftbox", "hairSofa"],
    headline: "Podcast aufnehmen, wo es gut aussieht.",
    intro: "Eine Sofa-Ecke, Licht und Kamera: Hier entstehen Gespräche, die gut aussehen. Nimm deinen Podcast auf und mach nebenbei Cover-Fotos und Reels.",
    points: ["Zwei Etagen mit mehreren Sets", "Dauerlicht für Video-Podcasts", "Sofa-Ecke als Gesprächs-Set", OPEN.podcastGear ?? "Podcast-Technik auf Anfrage"],
    faqs: [
      { q: "Ist Mikrofon-Technik vorhanden?", a: OPEN.podcastGear ?? "Das klären wir auf Anfrage. Schreib uns kurz auf WhatsApp, welche Technik du brauchst." },
      { q: "Kann ich gleichzeitig Fotos machen?", a: "Ja. Die Kamera ist im Paket enthalten." },
    ],
    cta: "studio", waKey: "studio",
    seoTitle: "Podcast Studio bei Frankfurt mieten",
    seoDesc: "Podcast Studio bei Frankfurt mieten: Sofa-Ecke, Licht und Kamera. Jetzt Termin online buchen.",
  },
  {
    slug: "babyparty",
    title: "Geburtstag & Babyparty",
    short: "Location ohne Deko-Stress",
    image: "eventBirthday",
    gallery: ["eventBirthday", "stillKinder", "eventPaint", "shotChairs"],
    headline: "Feiern, wo andere shooten.",
    intro: "66 Stühle, 6 große Bankett-Tische, Tischdecken, Küche und ein Getting-Ready-Room: Du bringst die Gäste mit, das Loft ist bereit. Für Geburtstage, Babypartys und alles dazwischen.",
    points: ["750 € ganztägig (gültig bis 31.12.2026)", "Küche, zwei Toiletten, Getting-Ready-Room", "Zwei Stockwerke, Reinigung danach inklusive", "Du bringst nur die Gäste mit"],
    faqs: [
      { q: "Was kostet die Location?", a: OPEN.price2027 ? `750 € ganztägig, gültig bis 31.12.2026. Ab 2027: ${OPEN.price2027}.` : "750 € ganztägig. Das Angebot gilt bis 31.12.2026." },
      { q: "Wie viele Gäste passen rein?", a: OPEN.maxGuests ? `Es stehen 66 Stühle bereit. Maximal: ${OPEN.maxGuests}.` : "Es stehen 66 Stühle bereit. Die maximale Gästezahl nennen wir dir auf Anfrage." },
      { q: "Muss ich nach der Feier putzen?", a: "Nein. Die Reinigung danach ist im Preis enthalten." },
    ],
    cta: "event", waKey: "babyparty", dark: true,
    seoTitle: "Babyparty-Location bei Frankfurt, Geburtstag feiern in Oberursel",
    seoDesc: "Location für Geburtstag und Babyparty bei Frankfurt: 66 Stühle, Küche, zwei Etagen, 750 € ganztägig.",
  },
  {
    slug: "workshop-community",
    title: "Workshop & Community-Event",
    short: "Masterclass, Ladies Event, Casting",
    image: "eventPaint",
    tile: "roomTree",
    tilePos: "50% 62%",
    gallery: ["eventPaint", "shotMasterclass", "eventOpening", "shotChairs"],
    headline: "Dein Format. Unser Loft.",
    intro: "Make-up-Masterclass, Ladies Event, Healing Circle oder Model-Casting: Der helle Raum auf zwei Etagen macht jedes Community-Format zum Erlebnis, mit Küche und Platz für 66 Gäste.",
    points: ["Zwei Etagen mit viel Licht", "Stühle, Tische und Küche vorhanden", "Als Anfrage mit Wunschdatum und Gästezahl", "Workshop-Raum im Taunus"],
    faqs: [
      { q: "Kann ich ein Ticket-Event veranstalten?", a: "Sprich uns einfach an. Wir klären den Ablauf gemeinsam in der Anfrage." },
      ...(OPEN.parking || OPEN.transit ? [{ q: "Gibt es Parkplätze?", a: [OPEN.parking, OPEN.transit].filter(Boolean).join(" ") }] : []),
    ],
    cta: "event", waKey: "events", dark: true,
    seoTitle: "Workshop-Raum im Taunus mieten, Eventlocation Oberursel",
    seoDesc: "Workshop-Raum und Eventlocation in Oberursel: zwei Etagen, 66 Stühle, Küche. Jetzt Termin anfragen.",
  },
];

// ── Bewertungen (echt, gekürzt) ─────────────────────────
export const REVIEWS = [
  { name: "Tante Tina", text: "Bestes Studio für Events und zum Shooten … Service ist eine 12/10 und die Location ist ein Traum." },
  { name: "Emmy Weiß", text: "So viele Möglichkeiten, verschiedene Shoots zu machen … lohnt sich richtig." },
  { name: "Nusayba Abdall", text: "Es war wirklich alles vorhanden … von verschiedenen Setups bis hin zu hilfreichen Accessoires." },
  { name: "Chrisa MO", text: "Der Inhaber ist unglaublich sympathisch und herzlich." },
  { name: "Cia Mehr", text: "Man fühlt sich direkt wohl und herzlich willkommen." },
];

// ── FAQ ─────────────────────────────────────────────────
export const FAQS = [
  { q: "Was ist im Studio-Paket enthalten?", a: "Das Studio, eine Canon R6 mit 24–70 mm f/2.8, Dauerlicht und eine 128-GB-Karte. 2 Stunden ab 190 €, 4 Stunden 315 €, 6 Stunden 465 €." },
  { q: "Wie viele Personen dürfen mit ins Studio?", a: "Je nach Paket bis zu 4 (2 Std.), 6 (4 Std.) oder 8 Personen (6 Std.)." },
  { q: "Muss ich Profi sein?", a: "Nein. Bei uns ist jeder willkommen: a place for everyone. Das Setup steht, du kommst einfach vorbei." },
  { q: "Was kostet eine Feier im Loft?", a: "750 € ganztägig, inklusive 66 Stühlen, 6 Bankett-Tischen, Tischdecken, Küche, zwei Toiletten, Getting-Ready-Room, zwei Stockwerken und Reinigung. Das Angebot gilt bis 31.12.2026." },
  { q: "Wann hat das Studio geöffnet?", a: "Täglich von 07:00 bis 24:00 Uhr." },
  ...(OPEN.cancellation ? [{ q: "Wie läuft die Stornierung?", a: OPEN.cancellation }] : []),
];

// ── Gutscheine ──────────────────────────────────────────
export const VOUCHER_VALUES = [50, 100, 190, 315];

export const NAV = [
  { href: "/studio", label: "Studio" },
  { href: "/events", label: "Events" },
  { href: "/anlaesse/content-creator", label: "Anlässe" },
  { href: "/galerie", label: "Galerie" },
  { href: "/gutscheine", label: "Gutscheine" },
  { href: "/#kontakt", label: "Kontakt" },
];

export const eur = (n: number) => `${n.toLocaleString("de-DE")} €`;
