"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Photo, Lines, EASE, Stars } from "../shared";
import Image from "next/image";
import Loop from "../Loop";
import { SITE } from "@/lib/config";
import { VIDEO, type ImgKey } from "@/lib/images";

// Desktop: wechselnde Raumaufnahmen in der großen Karte
const SLIDES: { k: ImgKey; pos?: string }[] = [
  { k: "roomLogo" },
  { k: "roomMezzanine" },
];

/**
 * Handy: Vollbild-Video, deutlich abgedunkelt, damit weiße Schrift über jedem Frame mindestens 4,5:1 erreicht
 * (Verlauf unten am stärksten, zusätzlich brightness/saturate auf dem Video).
 * Desktop: Text steht auf der dunklen Fläche, Video und Foto liegen daneben (kein Text über Video).
 */
export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5600);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-night text-white">
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

        {/* Desktop: große Raumkarte + überlappende Video-Karte */}
        <div className="relative hidden lg:col-span-6 lg:block">
          <div className="relative ml-auto h-[40rem] w-full max-w-[40rem]">
            <motion.div style={{ y: yA }} className="absolute right-0 top-0 h-[84%] w-[84%] overflow-hidden rounded-2xl bg-night-2">
              <AnimatePresence initial={false}>
                <motion.div
                  key={i}
                  className="absolute inset-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.4, ease: "easeInOut" }}
                >
                  <div data-kenburns className="absolute inset-0" style={{ animation: "kenburns 9s ease-out forwards" }}>
                    <Photo k={SLIDES[i].k} pos={SLIDES[i].pos} priority={i === 0} sizes="40vw" w={1600} />
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>

            <motion.div
              style={{ y: yB }}
              transition={{ duration: 1.1, ease: EASE }}
              className="absolute bottom-0 left-0 w-[40%] overflow-hidden rounded-2xl border-[6px] border-night bg-night-2"
            >
              <Loop v="hero" className="aspect-[2/3]" label="Studio in Farbe: Hintergründe und Licht" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
