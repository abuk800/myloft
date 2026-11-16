"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { Photo, Lines, EASE, Stars } from "../ui";
import { SITE } from "@/lib/config";
import type { ImgKey } from "@/lib/images";

const SLIDES: ImgKey[] = ["sofaLounge", "stairsWhite", "studioCyc", "tableWhite"];
const LABELS = ["Sofa-Ecke", "Treppe", "White Set", "Event-Tafel"];

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [i, setI] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  useEffect(() => {
    const t = setInterval(() => setI((p) => (p + 1) % SLIDES.length), 5200);
    return () => clearInterval(t);
  }, []);

  return (
    <section ref={ref} className="relative isolate min-h-[100svh] overflow-hidden bg-night text-white">
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={i}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <div data-kenburns className="absolute inset-0" style={{ animation: "kenburns 9s ease-out forwards" }}>
              <Photo k={SLIDES[i]} priority={i === 0} sizes="100vw" w={2000} />
            </div>
          </motion.div>
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-black/75" />
      </motion.div>

      <motion.div style={{ opacity: fade }} className="mx-auto flex min-h-[100svh] max-w-[88rem] flex-col justify-end px-5 pb-24 pt-24 md:px-10 md:pb-20">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
          className="eyebrow mb-4 text-white/80 max-md:!text-[0.62rem] max-md:!tracking-[0.24em]"
        >
          Fotostudio · Content · Events · Oberursel bei Frankfurt
        </motion.p>

        <Lines
          as="h1"
          inView={false}
          delay={0.45}
          className="display max-w-5xl text-[2.75rem] leading-[1] sm:text-7xl md:text-[6.6rem]"
          lines={["Dein Studio in Frankfurt.", <em key="b">Für Shootings, Content</em>, "und Events."]}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: EASE }}
          className="mt-5 max-w-md text-base leading-relaxed text-white/85 md:text-lg"
        >
          Zwei Etagen, Profi-Equipment inklusive. Ab 190 €.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.25, duration: 0.9, ease: EASE }}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <Link href="/buchen" className="btn btn-light">Studio buchen</Link>
          <Link href="/events/anfragen" className="btn btn-line-light">Event anfragen</Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 1 }}
          className="mt-7 flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-t border-white/20 pt-4 text-[0.78rem] text-white/85"
        >
          <p className="flex flex-wrap items-center gap-x-2">
            <Stars /> <span>{SITE.google.rating} bei Google</span>
            <span aria-hidden>·</span> <span>{SITE.google.count} Bewertungen</span>
            <span aria-hidden>·</span> <span>{SITE.hoursShort}</span>
          </p>
          <div className="hidden items-center gap-3 md:flex" aria-hidden>
            {LABELS.map((l, n) => (
              <button
                key={l}
                tabIndex={-1}
                onClick={() => setI(n)}
                className={`eyebrow !text-[0.62rem] transition-opacity ${n === i ? "opacity-100" : "opacity-45 hover:opacity-80"}`}
              >
                {String(n + 1).padStart(2, "0")} {l}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="mt-4 flex gap-1.5 md:hidden" aria-hidden>
          {SLIDES.map((_, n) => (
            <span key={n} className="h-px flex-1 overflow-hidden bg-white/25">
              {n === i && <motion.span className="block h-full bg-white" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 5.2, ease: "linear" }} />}
              {n < i && <span className="block h-full w-full bg-white" />}
            </span>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
