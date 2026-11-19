"use client";

import Link from "next/link";
import { Lines, Photo, Reveal, ArrowLink } from "../shared";

/** Echte Aufnahmen der Halle, ohne Overlay, damit der Raum für sich spricht. */
export default function RoomShowcase() {
  return (
    <section className="mx-auto max-w-[88rem] px-5 py-16 md:px-10 md:py-28">
      <div className="grid gap-6 md:grid-cols-12 md:gap-8">
        <div className="md:col-span-5 md:pr-6">
          <Lines className="display text-[2.5rem] md:text-6xl" lines={["Das ist dein Loft"]} />
          <Reveal>
            <p className="mt-6 max-w-md text-base leading-relaxed text-ink-soft">
              Helle Halle mit Empore, weißem Set, Softboxen und Sofa-Ecke. Dazu wechselnde Sets, gerade steht das Weihnachts-Set mit Baum und rotem Vorhang. Alles echte Aufnahmen aus dem Studio.
            </p>
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/buchen" className="btn btn-dark">Studio buchen</Link>
              <ArrowLink href="/studio">Studio im Detail</ArrowLink>
            </div>
          </Reveal>
        </div>

        <Reveal className="md:col-span-7">
          <div className="zoom relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream">
            <Photo k="roomLogo" sizes="(min-width:768px) 58vw, 100vw" w={1600} />
          </div>
        </Reveal>

        <Reveal delay={0.05} className="md:col-span-6">
          <div className="zoom relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream">
            <Photo k="roomTree" sizes="(min-width:768px) 48vw, 100vw" w={1400} />
          </div>
        </Reveal>
        <Reveal delay={0.1} className="md:col-span-6">
          <div className="zoom relative aspect-[4/3] overflow-hidden rounded-2xl bg-cream">
            <Photo k="roomMezzanine" sizes="(min-width:768px) 48vw, 100vw" w={1400} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
