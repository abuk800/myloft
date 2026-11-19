# Bild-Ranking (Stand: Dropbox-Ordner vom 19.11.2026)

Sortiert nach Qualität: Auflösung, gemessene Schärfe (Laplace-Varianz), Kompressionsartefakte und Eignung als Motiv.
Die Schlüssel stehen in `lib/images.ts`.

## Stufe A: hohe Auflösung (1200–1600 px), in voller Größe verwendet

| Rang | Datei in `public/studio/` | Schlüssel | Auflösung | Schärfe | Einsatz |
|---|---|---|---|---|---|
| 1 | `raum-logo-weihnachten.jpg` | `roomLogo` | 1600×1200 | 723 | Abschnitt „Das ist dein Loft“ (groß), Instagram-Kachel |
| 2 | `raum-roter-vorhang.jpg` | `roomCurtain` | 1600×1200 | 771 | Saison-Set |
| 3 | `raum-baum-vordergrund.jpg` | `roomTree` | 1600×1200 | 779 | „Das ist dein Loft“, Saison-Set |
| 4 | `raum-empore-sofas.jpg` | `roomMezzanine` | 1600×1200 | 733 | „Das ist dein Loft“ |
| 5 | `familie-logo-wand.jpg` | `familyWall` | 1200×1600 | 829 | Galerie „Schwangerschaft & Familie“ |
| 6 | `raum-softbox-sofas.jpg` | `roomSoftbox` | 1600×1200 | 642 | White Set |
| 7 | `produkt-haarmarke-model.jpg` | `hairModel` | 1097×1097 | 552 | Kachel und Galerie „Brand & Team“, Customer-Cam-Wall |
| 8 | `bts-softbox-weisses-set.jpg` | `btsSoftbox` | 1200×1600 | 548 | Set „Studiolicht“ |
| 9 | `produkt-haare-boucle-sofa.jpg` | `hairSofa` | 1254×1254 | 202 | Set „Sofa-Ecke“, Galerie „Brand & Team“ |
| 10 | `kind-auf-wuerfel-weisses-set.jpg` | `kidCube` | 1200×1600 | 387 | White Set (Zusatzbild) |

`mete.jpg` (`meteGimbal`): Porträt von Mete, aus dem 728-px-Screenshot mit Real-ESRGAN auf 2000 px hochgerechnet (80 % KI, 20 % Original, feines Korn). Einsatz: „Über uns“.

## Stufe B: kleine Screenshots (0,3–0,5 MP), nur in kleinen Kacheln

Native Größe, nicht hochgerechnet, nur für Customer-Cam-Wall, Instagram-Kacheln, Set-Vorschaubilder und Galerien (`public/studio/shots/`).

| Rang | Datei | Schlüssel | Auflösung |
|---|---|---|---|
| 11 | `masterclass-gruppe.jpg` | `shotMasterclass` | 778×592 |
| 12 | `chiavari-stuehle.jpg` (zugeschnitten, ohne Karussell-UI) | `shotChairs` | 694×566 |
| 13 | `sofa-sessel.jpg` | `shotSofaChair` | 525×681 |
| 14 | `white-set-dog.jpg` | `shotPet` | 509×687 |
| 15 | `sport.jpg` | `shotSport` | 466×745 |
| 16 | `treppe-gelaender.jpg` | `shotStairs` | 496×645 |
| 17 | `schwanger-tuell.jpg` | `shotPregnant` | 418×709 |
| 18 | `portrait-bw.jpg` | `shotBW` | 492×580 |
| 19 | `wuerfel-spotlight.jpg` | `shotCube` | 488×571 |

## Nicht verwendet
- 4 WhatsApp-Videos (Kinder-Shootings, 576×1024 bzw. 1024×576, stark komprimiert).
- Duplikat `Screenshot … 174708 - Kopie.png`.

## Hinweise
- Die Raum-Fotos sind Weitwinkel-Handyaufnahmen: als Hero hinter Text wirken sie flau, deshalb stehen sie ohne Overlay im Abschnitt „Das ist dein Loft“.
- Bilder mit Personen (vor allem Kinder, Familie, Kundin mit Markenware) brauchen vor einem Livegang geklärte Nutzungsrechte und Einwilligungen.
