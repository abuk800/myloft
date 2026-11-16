/**
 * Zentrale Inhalte: Kontakt, Preise, Angebote, Texte.
 * Alles, was das Studio später selbst ändern können soll, steht hier.
 * Offene Fakten sind mit TODO markiert und werden auf der Seite sichtbar als "TODO" angezeigt.
 */
import type { ImgKey } from "./images";

export const SITE = {
  name: "MYLOFT",
  suffix: "STUDIO",
  fullName: "MYLOFT STUDIO",
  tagline: "A place for everyone",
  url: "https://myloft-studio.vercel.app",
  address: {
    street: "Oberurseler Str. 81",
    zip: "61440",
    city: "Oberursel (Taunus)",
  },
  phone: "+49 1511 6519699",
  phoneHref: "tel:+4915116519699",
  whatsappNumber: "491511 6519699".replace(" ", ""),
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
  text: "Your sign to book a studio with your besties. Unter der Woche mietet ihr das Studio komplett allein, mit Profikamera und Lichtsetup.",
  price: "TODO: Wochentags-Preis",
};

export const EXTRAS = [
  { id: "light", label: "Zusätzliches Licht", note: "Preis folgt" },
  { id: "photographer", label: "Fotograf / Videograf", note: "Preis folgt" },
  { id: "deco", label: "Deko-Paket", note: "Preis folgt" },
  { id: "hmu", label: "Hair & Make-up", note: "Preis folgt" },
  { id: "cleaning", label: "Reinigung nach Event", note: "Preis folgt" },
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
  todo: {
    sqm: "TODO: Quadratmeter beider Etagen",
    capacity: "TODO: max. Gäste stehend / sitzend",
    parking: "TODO: Parken & ÖPNV",
    price2027: "TODO: Preis ab 2027",
    response: "TODO: Antwortzeit",
  },
};

export const EVENT_OCCASIONS = ["Geburtstag", "Babyparty", "Firmenevent", "Workshop", "Community-Event", "Sonstiges"] as const;
export const EVENT_EXTRAS = ["Fotograf", "Deko", "Catering-Küche", "Getting-Ready-Room"] as const;
export const MAX_GUESTS = 66; // aus der Stuhlanzahl; TODO: offizielle Kapazität bestätigen

// ── Sets ────────────────────────────────────────────────
export const SETS: { id: string; name: string; perfect: string; images: ImgKey[]; hero: ImgKey }[] = [
  { id: "treppe", name: "Die Treppe", perfect: "Perfekt für Fashion-Looks, Paar-Shootings und dramatische Bildkompositionen.", hero: "phStairs", images: ["phStairs", "stairsSpiral", "portraitB"] },
  { id: "white", name: "White Set", perfect: "Perfekt für Portraits, Produkte und alles, was Fokus braucht.", hero: "phPet", images: ["phPet", "studioCyc", "portraitC"] },
  { id: "sofa", name: "Sofa-Ecke", perfect: "Perfekt für Lifestyle, Familie und entspannte Besties-Fotos.", hero: "phSofa", images: ["phSofa", "sofaLounge", "sofaLounge2"] },
  { id: "bogen", name: "Rundbogen-Tür", perfect: "Perfekt für Babybauch, Hochzeits-Vibes und weiche Silhouetten.", hero: "phPregnant", images: ["phPregnant", "pregnancyC", "pregnancyA"] },
  { id: "licht", name: "Studiolicht", perfect: "Perfekt für Teams, Marken-Content und kontrollierte Looks.", hero: "phCube", images: ["phCube", "phBW", "studioSoftbox"] },
  { id: "saison", name: "Saisonset", perfect: "Perfekt für Weihnachts-Special, Mini-Sessions und Geschenk-Shootings.", hero: "christmas", images: ["christmas", "christmasRed", "portraitD"] },
];

// ── Anlässe ─────────────────────────────────────────────
export type Occasion = {
  slug: string;
  title: string;
  short: string;
  image: ImgKey; // Hero (muss hochauflösend sein)
  tile?: ImgKey; // Kachel auf der Startseite (darf kleiner sein)
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
    image: "cameraBlue",
    gallery: ["phSport", "phCreator", "phStairs", "cameraBlue"],
    headline: "Kamera und Licht stehen bereit.",
    intro: "Reels, Fotos, BTS: In zwei Etagen wechselst du in Minuten zwischen Treppe, White Set und Sofa-Ecke. Profikamera und Dauerlicht sind im Preis dabei.",
    points: ["Canon R6 mit 24–70 mm f/2.8 inklusive", "Dauerlicht und weißer Boden-Set", "Mehrere Sets ohne Umbau in einer Session", "Ab 190 € für 2 Stunden"],
    faqs: [
      { q: "Muss ich eigene Technik mitbringen?", a: "Nein. Kamera, Objektiv, Dauerlicht und Speicherkarte sind im Paket enthalten. Eigene Technik darfst du natürlich trotzdem mitbringen." },
      { q: "Wie viele Personen dürfen mit?", a: "Je nach Paket bis zu 4, 6 oder 8 Personen." },
    ],
    cta: "studio", waKey: "studio",
    seoTitle: "Content Studio Frankfurt mieten | MYLOFT STUDIO Oberursel",
    seoDesc: "Content Studio bei Frankfurt: Profikamera, Dauerlicht, mehrere Sets auf zwei Etagen. Ab 190 € online buchen.",
  },
  {
    slug: "bestie-shoot",
    title: "Bestie-Shoot",
    short: "Das ganze Loft für euch",
    image: "friendsLaugh",
    gallery: ["friendsLaugh", "phSofa", "friendsCheers", "sofaLounge2"],
    headline: "Bestie-Day im Studio: das ganze Loft für euch.",
    intro: "Your sign to book a studio with your besties. Unter der Woche mietet ihr das Studio komplett allein, mit Profikamera und Lichtsetup. Ihr müsst keine Models sein, nur zusammen kommen.",
    points: ["Studio unter der Woche komplett für euch", "Profikamera und Lichtsetup inklusive", "Bis zu 4, 6 oder 8 Personen je nach Paket", "Wochentags-Preis: TODO"],
    faqs: [
      { q: "Brauchen wir Foto-Erfahrung?", a: "Nein. Das Setup steht, ihr bringt gute Laune und eure Outfits mit." },
      { q: "Wann gilt der Wochentags-Deal?", a: "Unter der Woche. Den genauen Preis tragen wir hier noch ein (TODO)." },
    ],
    cta: "studio", waKey: "studio",
    seoTitle: "Bestie-Shooting Frankfurt | Fotostudio mieten Oberursel",
    seoDesc: "Fotostudio mit Freundinnen mieten: Unter der Woche das ganze Loft für euch, inklusive Profikamera.",
  },
  {
    slug: "schwangerschaft-familie",
    title: "Schwangerschaft & Familie",
    short: "Erinnerungen in weichem Licht",
    image: "pregnancyA",
    tile: "phPregnant",
    gallery: ["phPregnant", "pregnancyC", "phPet", "pregnancyB"],
    headline: "Weiches Licht für Momente, die bleiben.",
    intro: "Babybauch-Shooting, Familienfotos oder ein Portrait zu zweit: Der Rundbogen, helle Wände und ruhiges Studiolicht geben jedem Bild Raum. Ohne Hektik, in deinem Tempo.",
    points: ["Heller Raum mit Rundbogen-Tür und Sofa-Ecke", "Ruhiges Dauerlicht, gut für sanfte Portraits", "Option mit Fotograf (TODO: Preis und Verfügbarkeit)", "Pakete ab 2 Stunden"],
    faqs: [
      { q: "Kann ich einen Fotografen dazubuchen?", a: "Ja, das ist als Extra vorgesehen. Preis und Verfügbarkeit ergänzen wir hier (TODO)." },
      { q: "Wie lange sollte ich einplanen?", a: "Für ein Babybauch- oder Familienshooting sind 2 Stunden ein guter Start." },
    ],
    cta: "studio", waKey: "studio",
    seoTitle: "Babybauch-Shooting Frankfurt | Familienfotos Oberursel",
    seoDesc: "Babybauch- und Familienshooting im hellen Loft bei Frankfurt. Weiches Licht, ruhige Atmosphäre, online buchbar.",
  },
  {
    slug: "brand-team",
    title: "Brand & Team",
    short: "Team-, Produkt- und Brand-Content",
    image: "studioCyc",
    gallery: ["phBW", "studioCyc", "phCube", "portraitC"],
    headline: "Euer Team. Euer Look. Ein Nachmittag.",
    intro: "Teamfotos, Produktbilder, Recruiting-Content: Das weiße Set und kontrolliertes Licht liefern einen sauberen, einheitlichen Look. Bis zu 8 Personen im 6-Stunden-Paket.",
    points: ["Weißes Set mit Studioblitzen und Softboxen", "Platz für bis zu 8 Personen (6-Std.-Paket)", "Rechnung auf Anfrage (TODO: bestätigen)", "Fotograf / Videograf als Extra"],
    faqs: [
      { q: "Bekommen wir eine Rechnung?", a: "Das klären wir in der Anfrage. Details ergänzen wir hier (TODO)." },
      { q: "Können wir Produkte shooten?", a: "Ja, das weiße Set eignet sich dafür. Bring deine Produkte einfach mit." },
    ],
    cta: "studio", waKey: "studio",
    seoTitle: "Teamfotos & Brand Shooting Frankfurt | MYLOFT STUDIO",
    seoDesc: "Team- und Brand-Shootings im Fotostudio bei Frankfurt. Weißes Set, Profilicht, bis zu 8 Personen.",
  },
  {
    slug: "podcast",
    title: "Podcast",
    short: "Raum, Ton und Licht",
    image: "podcastA",
    gallery: ["podcastA", "podcastB", "podcastC", "micDark"],
    headline: "Podcast aufnehmen, wo es gut aussieht.",
    intro: "Ein ruhiger Raum, gutes Licht und Sofas, auf denen Gespräche entstehen. Nimm deinen Podcast auf und mach nebenbei Cover-Fotos und Reels.",
    points: ["Ruhiger Raum auf zwei Etagen", "Dauerlicht für Video-Podcasts", "Sofa-Ecke als Gesprächs-Set", "Podcast-Technik: TODO bestätigen"],
    faqs: [
      { q: "Ist Mikrofon-Technik vorhanden?", a: "Das Podcast-Setup ergänzen wir hier (TODO). Frag uns bei der Buchung kurz auf WhatsApp." },
      { q: "Kann ich gleichzeitig Fotos machen?", a: "Ja. Die Kamera ist im Paket enthalten." },
    ],
    cta: "studio", waKey: "studio",
    seoTitle: "Podcast Studio mieten Frankfurt | MYLOFT STUDIO Oberursel",
    seoDesc: "Podcast Studio bei Frankfurt mieten: ruhiger Raum, Licht und Kamera. Jetzt Termin online buchen.",
  },
  {
    slug: "babyparty",
    title: "Geburtstag & Babyparty",
    short: "Location ohne Deko-Stress",
    image: "tableWhite",
    gallery: ["tableWhite", "babyshower", "babyLetters", "phChairs"],
    headline: "Feiern, wo andere shooten.",
    intro: "66 Stühle, 6 große Bankett-Tische, Tischdecken, Küche und ein Getting-Ready-Room: Du bringst die Gäste mit, das Loft ist bereit. Für Geburtstage, Babypartys und alles dazwischen.",
    points: ["750 € ganztägig (gültig bis 31.12.2026)", "Küche, zwei Toiletten, Getting-Ready-Room", "Zwei Stockwerke, Reinigung danach inklusive", "Fotowand: der Raum ist selbst die Kulisse"],
    faqs: [
      { q: "Was kostet die Location?", a: "750 € ganztägig. Das Angebot gilt bis 31.12.2026. Der Preis ab 2027 steht noch nicht fest (TODO)." },
      { q: "Wie viele Gäste passen rein?", a: "Es stehen 66 Stühle bereit. Die maximale Gästezahl bestätigen wir hier noch (TODO)." },
      { q: "Muss ich nach der Feier putzen?", a: "Nein. Die Reinigung danach ist im Preis enthalten." },
    ],
    cta: "event", waKey: "babyparty", dark: true,
    seoTitle: "Babyparty Location Frankfurt | Geburtstag feiern in Oberursel",
    seoDesc: "Location für Geburtstag und Babyparty bei Frankfurt: 66 Stühle, Küche, zwei Etagen, 750 € ganztägig.",
  },
  {
    slug: "workshop-community",
    title: "Workshop & Community-Event",
    short: "Masterclass, Ladies Event, Casting",
    image: "whiteHall",
    tile: "phWorkshop",
    gallery: ["phWorkshop", "phChairs", "whiteHall", "tableLong"],
    headline: "Dein Format. Unser Loft.",
    intro: "Make-up-Masterclass, Ladies Event, Healing Circle oder Model-Casting: Der helle Raum auf zwei Etagen macht jedes Community-Format zum Erlebnis, mit Küche und Platz für 66 Gäste.",
    points: ["Zwei Etagen mit viel Licht", "Stühle, Tische und Küche vorhanden", "Als Anfrage mit Wunschdatum und Gästezahl", "Workshop-Raum im Taunus"],
    faqs: [
      { q: "Kann ich ein Ticket-Event veranstalten?", a: "Sprich uns einfach an. Wir klären Ablauf und Regeln in der Anfrage (TODO: Hausregeln)." },
      { q: "Gibt es Parkplätze?", a: "Parken und ÖPNV ergänzen wir hier (TODO)." },
    ],
    cta: "event", waKey: "events", dark: true,
    seoTitle: "Workshop-Raum mieten Taunus | Eventlocation Oberursel",
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
  { q: "Wie läuft Storno / Hausregeln?", a: "TODO: Storno- und Hausregeln aus den Buchungsbedingungen übernehmen." },
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
