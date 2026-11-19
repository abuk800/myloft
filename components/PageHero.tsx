"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lines, Photo, EASE } from "./shared";
import type { ImgKey } from "@/lib/images";

/**
 * Seiten-Hero: Text links auf dunkler Fläche, Bild als Karte rechts.
 * Das Bild steht frei (ohne Overlay), damit helle Studiofotos strahlen und der Text immer lesbar bleibt.
 */
export default function PageHero({
  k, pos, lines, sub, children, aspect = "aspect-[4/5]",
}: {
  k: ImgKey; pos?: string; eyebrow?: string; lines: React.ReactNode[]; sub?: string; children?: React.ReactNode; aspect?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-night text-white">
      <div className="mx-auto grid max-w-[88rem] items-center gap-10 px-5 pb-14 pt-28 md:px-10 lg:min-h-[44rem] lg:grid-cols-12 lg:gap-16 lg:pb-20 lg:pt-32">
        <div className="lg:col-span-6">
          <Lines as="h1" inView={false} delay={0.2} className="display text-[2.7rem] leading-[1.02] sm:text-6xl lg:text-[4.6rem]" lines={lines} />
          {sub && (
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
              className="mt-6 max-w-lg text-base leading-relaxed text-white/80 md:text-lg"
            >
              {sub}
            </motion.p>
          )}
          {children && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.9, ease: EASE }}
              className="mt-8 flex flex-col gap-3 sm:flex-row"
            >
              {children}
            </motion.div>
          )}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 1.1, ease: EASE }}
          className="lg:col-span-6"
        >
          <motion.div style={{ y }} className={`relative mx-auto w-full overflow-hidden rounded-2xl bg-night-2 sm:max-w-xl lg:ml-auto lg:max-w-none ${aspect} lg:max-h-[38rem]`}>
            <Photo k={k} pos={pos} priority sizes="(min-width:1024px) 46vw, 100vw" w={1600} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
