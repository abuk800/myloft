import Link from "next/link";
import { Lines, Stars } from "../shared";
import Image from "next/image";
import Loop from "../Loop";
import { SITE } from "@/lib/config";
import { VIDEO } from "@/lib/images";

/**
 * Handy: Vollbild-Video, deutlich abgedunkelt, damit weiße Schrift über jedem Frame mindestens 4,5:1 erreicht
 * (Verlauf unten am stärksten, zusätzlich brightness/saturate auf dem Video).
 * Desktop: Video läuft dauerhaft als Hintergrund rechts, links liegt ein dunkler Verlauf unter dem Text.
 */
export default function Hero() {
  return (
    <section className="relative isolate min-h-[100svh] overflow-hidden bg-night text-white">
      {/* Poster des Hero-Videos früh laden (nur Handy) */}
      <link rel="preload" as="image" href={`${VIDEO.hero.base}.jpg`} media="(max-width: 1023px)" fetchPriority="high" />

      {/* Handy: Vollbild-Video mit Overlay */}
      <div className="absolute inset-0 -z-10 lg:hidden" aria-hidden>
        <Image src={`${VIDEO.hero.base}.jpg`} alt="" fill priority unoptimized sizes="100vw" className="object-cover" style={{ filter: "brightness(.8) saturate(.9)" }} />
        <Loop v="hero" controls={false} className="h-full w-full" label="Studio in Farbe: Hintergründe und Licht" style={{ filter: "brightness(.8) saturate(.9)" }} />
        <div
          data-hero-overlay
          className="absolute inset-0"
          style={{ background: "linear-gradient(to top, rgba(0,0,0,.70) 0%, rgba(0,0,0,.58) 50%, rgba(0,0,0,.32) 100%)" }}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 -z-[5] hidden h-40 lg:block" style={{ background: "linear-gradient(to bottom, rgba(0,0,0,.5), transparent)" }} aria-hidden />

      {/* Desktop: Video läuft dauerhaft im Hintergrund (rechte Seite, Kante zu Kante), Text links auf dunklem Verlauf */}
      <div className="absolute inset-y-0 right-0 -z-10 hidden w-[68%] lg:block" aria-hidden>
        <Image src={`${VIDEO.hero.base}.jpg`} alt="" fill unoptimized sizes="68vw" className="object-cover" style={{ filter: "brightness(.85) saturate(.95)" }} />
        <Loop v="hero" eager controls={false} className="h-full w-full" label="Studio in Farbe: Hintergründe und Licht" style={{ filter: "brightness(.85) saturate(.95)" }} />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to right, #15100c 0%, rgba(21,16,12,.82) 22%, rgba(21,16,12,.25) 60%, rgba(21,16,12,.1) 100%)" }} />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-[88rem] items-center px-5 md:px-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col justify-end pb-24 pt-24 lg:col-span-6 lg:justify-center lg:pb-16 lg:pt-32">
          <p data-contrast="eyebrow" className="text-[0.8rem] font-medium uppercase tracking-[0.16em] text-white/90">A place for everyone</p>

          <Lines
            as="h1"
            immediate
            className="display mt-3 max-w-3xl text-[clamp(1.75rem,7.2vw,2.5rem)] leading-[1.06] sm:text-5xl lg:text-[3.3rem] xl:text-[3.7rem]"
            lines={["Ein Loft. Zwei Etagen.", "Für alles, was du festhalten oder feiern willst."]}
          />

          <p data-contrast="sub" className="mt-4 max-w-md text-base leading-relaxed text-white md:text-lg">
            Fotostudio &amp; Eventlocation in Oberursel bei Frankfurt. Kamera und Licht inklusive, ab 190 €.
          </p>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link href="/buchen" className="btn btn-light">Studio buchen</Link>
            <Link href="/events/anfragen" data-contrast="cta2" className="btn btn-line-light">Event anfragen</Link>
          </div>

          <p data-contrast="trust" className="mt-6 flex flex-wrap items-center gap-x-2 border-t border-white/25 pt-4 text-[0.82rem] text-white">
            <Stars className="!text-champagne" /> <span>{SITE.google.rating} bei Google</span>
            <span aria-hidden>·</span> <span>{SITE.google.count} Bewertungen</span>
            <span aria-hidden>·</span> <span>{SITE.hoursShort}</span>
          </p>
        </div>

      </div>
    </section>
  );
}
