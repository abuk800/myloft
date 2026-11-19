/**
 * Offene Werte des Studios.
 *
 * `null` = nicht bekannt. Blöcke, die einen Wert brauchen, werden dann NICHT gerendert
 * oder zeigen "auf Anfrage". Sobald das Studio einen Wert liefert, hier eintragen:
 * die Seite blendet den passenden Block automatisch ein.
 */
export type Maybe<T> = T | null;

export const OPEN = {
  /** Preis des Wochentags-Deals ("Bestie-Day"), z. B. "ab 150 €" */
  weekdayPrice: null as Maybe<string>,
  /** Preise der Extras (Schlüssel = id aus EXTRAS), z. B. "49 €" */
  extraPrices: { light: null, photographer: null, deco: null, hmu: null, cleaning: null } as Record<string, Maybe<string>>,
  /** Fläche beider Etagen, z. B. "280 m²" */
  sqm: null as Maybe<string>,
  /** Maximale Gästezahl, z. B. "80 Personen stehend, 66 sitzend" */
  maxGuests: null as Maybe<string>,
  /** Parken, z. B. "Parkplätze direkt vor dem Haus" */
  parking: null as Maybe<string>,
  /** ÖPNV-Anbindung, z. B. "S-Bahn Oberursel, 6 Min. zu Fuß" */
  transit: null as Maybe<string>,
  /** Event-Preis ab 2027 */
  price2027: null as Maybe<string>,
  /** Antwortzeit auf Anfragen, z. B. "24 Stunden" */
  responseTime: null as Maybe<string>,
  /** Storno-Regeln (Text aus den Buchungsbedingungen) */
  cancellation: null as Maybe<string>,
  /** Gültigkeit und Einlösung von Gutscheinen */
  voucherTerms: null as Maybe<string>,
  /** Ist Mete selbst als Fotograf buchbar? */
  meteBookable: null as Maybe<boolean>,
  /** Mikrofon-/Podcast-Technik vor Ort */
  podcastGear: null as Maybe<string>,
};
