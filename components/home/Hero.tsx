"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Photo, Lines, EASE, Stars } from "../shared";
import Loop from "../Loop";
import { SITE } from "@/lib/config";
import type { ImgKey } from "@/lib/images";

// Desktop: wechselnde Raumaufnahmen in der großen Karte
const SLIDES: { k: ImgKey; pos?: string }[] = [
  { k: "roomLogo" },
  { k: "roomSoftbox" },
  { k: "roomMezzanine" },
];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["0%", "6%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5600);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-night text-white">
      {/* Handy: Vollbild-Video */}
      <div className="absolute inset-0 -z-10 lg:hidden">
        <Loop v="hero" controls={false} className="h-full w-full" label="Studio in Farbe: Hintergründe, Licht und Shooting" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/10 to-black/75" />
      </div>

      <div className="mx-auto grid min-h-[100svh] max-w-[88rem] items-center px-5 md:px-10 lg:grid-cols-12 lg:gap-12">
        <motion.div style={{ opacity: fade }} className="flex flex-col justify-end pb-28 pt-28 lg:col-span-6 lg:justify-center lg:pb-16 lg:pt-32">
          <Lines
            as="h1"
            inView={false}
            delay={0.35}
            className="display max-w-3xl text-[2.6rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem]"
            lines={["Dein Studio in Frankfurt.", "Für Shootings, Content", "und Events."]}
          />

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.9, ease: EASE }}
            className="mt-5 max-w-md text-base leading-relaxed text-white/85 md:text-lg"
          >
            Zwei Etagen, Profi-Equipment inklusive. Ab 190 €.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.15, duration: 0.9, ease: EASE }}
            className="mt-6 flex flex-col gap-3 sm:flex-row"
          >
            <Link href="/buchen" className="btn btn-light">Studio buchen</Link>
            <Link href="/events/anfragen" className="btn btn-line-light">Event anfragen</Link>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 1 }}
            className="mt-7 flex flex-wrap items-center gap-x-2 border-t border-white/20 pt-4 text-[0.8rem] text-white/85"
          >
            <Stars /> <span>{SITE.google.rating} bei Google</span>
            <span aria-hidden>·</span> <span>{SITE.google.count} Bewertungen</span>
            <span aria-hidden>·</span> <span>{SITE.hoursShort}</span>
          </motion.p>
        </motion.div>

        {/* Desktop: große Raumkarte + überlappende Video-Karte */}
        <div className="relative hidden lg:col-span-6 lg:block">
          <div className="relative ml-auto h-[40rem] w-full max-w-[40rem]">
            <motion.div
              style={{ y: yA }}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1.2, ease: EASE }}
              className="absolute right-0 top-0 h-[84%] w-[84%] overflow-hidden rounded-2xl bg-night-2"
            >
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
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 1.1, ease: EASE }}
              className="absolute bottom-0 left-0 w-[40%] overflow-hidden rounded-2xl border-[6px] border-night bg-night-2"
            >
              <Loop v="hero" className="aspect-[2/3]" label="Studio in Farbe: Hintergründe, Licht und Shooting" />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
