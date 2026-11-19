"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Lines, Photo, EASE } from "./shared";
import type { ImgKey } from "@/lib/images";

export default function PageHero({
  k, lines, sub, children, tall = false,
}: { k: ImgKey; eyebrow?: string; lines: React.ReactNode[]; sub?: string; children?: React.ReactNode; tall?: boolean }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section ref={ref} className={`relative isolate flex overflow-hidden bg-night text-white ${tall ? "min-h-[92svh]" : "min-h-[78svh]"}`}>
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <motion.div className="absolute inset-0" initial={{ scale: 1.12 }} animate={{ scale: 1 }} transition={{ duration: 2.2, ease: EASE }}>
          <Photo k={k} priority sizes="100vw" w={2000} />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/75" />
      </motion.div>
      <div className="mx-auto flex w-full max-w-[88rem] flex-col justify-end px-5 pb-16 pt-36 md:px-10 md:pb-24">
        <Lines as="h1" inView={false} delay={0.2} className="display max-w-5xl text-[2.7rem] leading-[1.02] sm:text-6xl md:text-[4.8rem]" lines={lines} />
        {sub && (
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9, ease: EASE }}
            className="mt-6 max-w-lg text-base leading-relaxed text-white/85 md:text-lg"
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
    </section>
  );
}
