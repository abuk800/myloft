# MYLOFT STUDIO – Pitch-Demo

Mobile-first Demo-Website für MYLOFT STUDIO (Oberursel / Frankfurt). Next.js 15 (App Router), Tailwind 4, Framer Motion.

## Starten

```bash
npm install
npm run dev
```

## Wo ändert man was?

| Was | Datei |
|---|---|
| Preise, Pakete, Texte, Kontakt, FAQ, Bewertungen, Anlässe, WhatsApp-Texte | `lib/config.ts` |
| Alle Bilder und Video-Loops (echte Studio-Aufnahmen in `public/studio` und `public/video`) | `lib/images.ts` |
| Beispiele der Customer-Cam-Wall und Instagram-Kacheln | `lib/cam.ts` |

Offene Fakten sind sichtbar als **TODO** markiert (Quadratmeter, Add-on-Preise, Wochentags-Preis, Preis ab 2027, Antwortzeit, Storno-/Hausregeln, Parken/ÖPNV).

## Demo-Umfang

Klickbare Attrappen ohne Backend: Buchungs-Flow (`/buchen`), Event-Anfrage (`/events/anfragen`), Gutscheine (`/gutscheine`), Customer-Cam-Upload (`/galerie/upload`). Der WhatsApp-Link (`wa.me`) funktioniert echt. Kein Tracking, kein Consent-Banner, keine Rechtstexte.
