"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { Lines, Photo, EASE, ArrowLink } from "../shared";
import { SETS } from "@/lib/config";

export default function SetExplorer() {
  const [a, setA] = useState(0);
  const set = SETS[a];

  return (
    <section className="bg-cream/60 py-24 md:py-36">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Lines className="display mt-5 max-w-3xl text-[2.7rem] md:text-7xl" lines={["Sechs Sets auf zwei Etagen"]} />

        <div className="mt-12 grid gap-8 md:mt-16 md:grid-cols-12 md:gap-14">
          {/* Bühne */}
          <div className="min-w-0 md:col-span-7">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-cream-deep md:aspect-[5/5]">
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={set.id}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.9, ease: EASE }}
                >
                  <Photo k={set.images[0]} sizes="(min-width:768px) 58vw, 100vw" w={1400} />
                </motion.div>
              </AnimatePresence>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3">
              {set.images.slice(1).map((k, n) => (
                <motion.div
                  key={set.id + k}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + n * 0.1, duration: 0.8, ease: EASE }}
                  className="zoom relative aspect-[4/3] overflow-hidden rounded-xl bg-cream-deep"
                >
                  <Photo k={k} sizes="(min-width:768px) 28vw, 50vw" w={900} />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Liste */}
          <div className="min-w-0 md:col-span-5 md:pt-6">
            <div className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:hidden after:w-px after:shrink-0 after:content-['']">
              {SETS.map((s, n) => (
                <button
                  key={s.id}
                  onClick={() => setA(n)}
                  className={`eyebrow shrink-0 rounded-full border px-4 py-3 !text-[0.78rem] transition-colors ${
                    n === a ? "border-ink bg-ink text-white" : "border-ink/20 text-ink"
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>

            <ul className="hidden md:block" role="tablist" aria-label="Sets">
              {SETS.map((s, n) => (
                <li key={s.id} role="presentation">
                  <button
                    role="tab"
                    aria-selected={n === a}
                    onClick={() => setA(n)}
                    onMouseEnter={() => setA(n)}
                    className={`group flex w-full items-baseline gap-5 border-b border-ink/10 py-4 text-left transition-opacity duration-500 ${n === a ? "opacity-100" : "opacity-35 hover:opacity-70"}`}
                  >
                    <span className="display text-5xl transition-transform duration-500 group-hover:translate-x-2">{s.name}</span>
                  </button>
                </li>
              ))}
            </ul>

            <AnimatePresence mode="wait">
              <motion.div
                key={set.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-7 md:mt-10"
              >
                <p className="display text-4xl md:hidden">{set.name}</p>
                <p className="mt-2 max-w-sm text-base leading-relaxed text-ink-soft md:mt-0">{set.perfect}</p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:flex-wrap sm:items-center">
              <Link href="/buchen" className="btn btn-dark">Dieses Set shooten</Link>
              <ArrowLink href="/studio">Alle Details</ArrowLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
