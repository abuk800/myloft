# Bild- und Video-Ranking (Stand: Dropbox-Ordner vom 19.11.2026)

Sortiert nach Qualität: Auflösung, gemessene Schärfe (Laplace-Varianz), Kompressionsartefakte und Eignung als Motiv.
Die Schlüssel stehen in `lib/images.ts`. Alle Dateien liegen in `public/studio` bzw. `public/video`.
Unsplash wird nirgends mehr verwendet.

## Bearbeitung
- **Zuschnitt:** Instagram-Rahmen (Sofa-Sessel), Scroll-Balken (Opening-Event) und Namens-Bogen (Geburtstag) entfernt; Wasserzeichen der Videos weggeschnitten (TikTok unten, Instagram rechts).
- **Korrektur:** Weißabgleich über die weißen Wände (begrenzt), Kontrast +3 %, Sättigung +5 %, leichte Schärfung. Farbige Eventfotos ohne Weißabgleich.
- **Hochgerechnet:** Nur `treppe-gelaender-hd.jpg` und `mete.jpg` (Real-ESRGAN, 80 % KI + 20 % Original + Korn).

## Stufe A: hohe Auflösung (1100–1600 px), große Flächen

| Rang | Datei | Schlüssel | Auflösung | Einsatz |
|---|---|---|---|---|
| 1 | `raum-logo-weihnachten.jpg` | `roomLogo` | 1600×1200 | Hero-Karte, „Das ist dein Loft“, Studio-Hero, Workshop-Kachel |
| 2 | `raum-roter-vorhang.jpg` | `roomCurtain` | 1600×1200 | Saison-Set, Events-Galerie |
| 3 | `raum-baum-vordergrund.jpg` | `roomTree` | 1600×1200 | „Das ist dein Loft“, Saison-Set |
| 4 | `raum-empore-sofas.jpg` | `roomMezzanine` | 1600×1200 | Hero-Karte, Treppen-Set, Events-Galerie |
| 5 | `familie-logo-wand.jpg` | `familyWall` | 1200×1600 | Galerie „Schwangerschaft & Familie“ |
| 6 | `raum-softbox-sofas.jpg` | `roomSoftbox` | 1600×1200 | White Set, Studiolicht, Content-Kachel |
| 7 | `event-opening-kerzen.jpg` | `eventOpening` | 1178×1583 | Events-Hero, Event-Teaser, Rundbogen-Set |
| 8 | `schwanger-tuell.jpg` | `pregnantTulle` | 1206×1432 | Rundbogen-Set, Anlass „Schwangerschaft“ |
| 9 | `model-weisse-wuerfel.jpg` | `cubeModel` | 1206×1393 | White Set, Galerie-Hero |
| 10 | `event-mal-workshop.jpg` | `eventPaint` | 1206×1452 | Workshop-Hero, Events-Galerie |
| 11 | `event-geburtstag-tafel.jpg` | `eventBirthday` | 1206×910 | Geburtstag-Hero, Event-Teaser, Events-Galerie |
| 12 | `produkt-haarmarke-model.jpg` | `hairModel` | 1097×1097 | Anlass „Brand & Team“ |
| 13 | `bts-softbox-weisses-set.jpg` | `btsSoftbox` | 1200×1600 | Set „Studiolicht“ (Zusatzbild) |
| 14 | `sofa-sessel.jpg` | `sofaChair` | 942×1250 | Sofa-Set, IG-Fächer |
| 15 | `treppe-gelaender-hd.jpg` | `shotStairs` | 1384×1800 (hochgerechnet) | Treppen-Set |
| 16 | `produkt-haare-boucle-sofa.jpg` | `hairSofa` | 1254×1254 | Sofa-Set, Wall |
| 17 | `kind-auf-wuerfel-weisses-set.jpg` | `kidCube` | 1200×1600 | Reserve (aktuell nicht eingesetzt) |
| – | `mete.jpg` | `meteGimbal` | 2000×1967 (hochgerechnet) | „Über uns“ |

## Stufe B: Standbilder aus den Reels (506×760), nur kleine Kacheln

| Datei | Schlüssel | Einsatz |
|---|---|---|
| `still-lila-softbox.jpg` | `stillLila` | Anlass „Content & Creator“, Studiolicht, Wall |
| `still-duo-pink.jpg` | `stillDuo` | Anlass „Bestie-Shoot“, Wall |
| `still-weisses-set.jpg` | `stillWeiss` | Treppen-Set, Wall |
| `still-mic-creator.jpg` | `stillMic` | Anlass „Podcast“, Wall (Creatorin ist eine externe TikTok-Creatorin) |
| `still-kinderparty.jpg` | `stillKinder` | Galerie Geburtstag |

## Stufe C: kleine Screenshots (0,3–0,5 MP), nur kleine Kacheln und Wall (`shots/`)

`masterclass-gruppe` (778×592), `chiavari-stuehle` (694×566), `white-set-dog`, `sport`, `portrait-bw`, `wuerfel-spotlight`, `schwanger-tuell` (alle ca. 420–510 px breit).

## Videos (`public/video`, jeweils MP4 + WebM + Poster, 540×810, ohne Ton)

| Datei | Quelle | Länge | Einsatz |
|---|---|---|---|
| `hero-farben` | TikTok-Reel (Farben), 4 Abschnitte | 12 s | Hero (Handy: Vollbild, Desktop: Karte) |
| `reel-shooting` | TikTok-Reel (Behind the Scenes) | 7,5 s | Reels-Abschnitt |
| `reel-farben` | TikTok-Reel (Farben) | 7,5 s | Reels-Abschnitt |
| `reel-geburtstag` | Instagram-Reel (Kindergeburtstag) | 7 s | Reels-Abschnitt |
| `reel-setup` | TikTok-Reel (Behind the Scenes) | 5,5 s | Reels-Abschnitt |

Nicht verwendet: das Studio-Tour-Video einer externen Creatorin (nur ein Standbild), die vier kurzen Kinder-Shooting-Clips, Duplikat „… 174708 – Kopie“.

## Hinweise
- Raum- und Eventfotos sind helle Handyaufnahmen. Sie stehen deshalb als freie Karten auf dunkler Fläche statt als Vollbild hinter Text.
- Bilder und Videos mit Personen (vor allem Kinder, Familie, externe Creatorin) brauchen vor einem Livegang geklärte Nutzungsrechte und Einwilligungen.
- Auf Dekoration sichtbare Vornamen: Kindergeburtstag im Reel (`reel-geburtstag`); der Namensbogen des anderen Geburtstags ist abgeschnitten.
