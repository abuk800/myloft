"use client";

import { useState } from "react";
import { AnimatePresence, m as motion } from "framer-motion";
import Link from "next/link";
import { Lines, Photo, EASE, ArrowLink } from "../shared";
import { SETS } from "@/lib/config";

export default function SetExplorer() {
  const [a, setA] = useState(0);
  const set = SETS[a];

  const cta = (
    <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center sm:gap-5">
      <Link href="/buchen" className="btn btn-dark">Dieses Set shooten</Link>
      <ArrowLink href="/studio">Alle Details</ArrowLink>
    </div>
  );

  return (
    <section className="bg-cream/60 py-14 md:py-36">
      <div className="mx-auto max-w-[88rem] px-5 md:px-10">
        <Lines className="display max-w-3xl text-[2.3rem] leading-[1.05] md:text-7xl" lines={["Das ist dein Loft: sechs Sets auf zwei Etagen"]} />
        <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-soft md:mt-6">
          Ein helles Loft auf zwei Ebenen mit weißem Set, Softboxen und Sofa-Ecke. Dazu kommen saisonale Sets, gerade das Weihnachts-Set.
        </p>

        {/* Handy: Sets als wischbare Chips über dem Bild */}
        <div
          role="tablist"
          aria-label="Sets"
          className="no-scrollbar -mx-5 mt-6 flex snap-x snap-mandatory scroll-px-5 gap-2 overflow-x-auto px-5 pb-1 after:w-px after:shrink-0 after:content-[''] md:hidden"
        >
          {SETS.map((s, n) => (
            <button
              key={s.id}
              role="tab"
              aria-selected={n === a}
              onClick={() => setA(n)}
              className={`min-h-11 shrink-0 snap-start rounded-full border px-4 text-[0.82rem] font-medium uppercase tracking-[0.12em] transition-colors ${
                n === a ? "border-ink bg-ink text-white" : "border-ink/25 text-ink"
              }`}
            >
              {s.name}
            </button>
          ))}
        </div>

        <div className="mt-4 grid gap-6 md:mt-16 md:grid-cols-12 md:gap-14">
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
            </div>

            {/* Handy: CTA direkt unter dem Bild, danach Beschreibung */}
            <div className="mt-4 md:hidden">
              {cta}
              <p className="mt-4 text-base leading-relaxed text-ink-soft">{set.perfect}</p>
            </div>

            {set.images.length > 1 && (
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
            )}
          </div>

          {/* Desktop: Liste mit Text und CTA */}
          <div className="hidden min-w-0 md:col-span-5 md:block md:pt-6">
            <ul role="tablist" aria-label="Sets">
              {SETS.map((s, n) => (
                <li key={s.id} role="presentation">
                  <button
                    role="tab"
                    aria-selected={n === a}
                    onClick={() => setA(n)}
                    onMouseEnter={() => setA(n)}
                    className={`group flex w-full items-baseline gap-5 border-b border-ink/10 py-4 text-left transition-opacity duration-500 ${n === a ? "opacity-100" : "opacity-50 hover:opacity-80"}`}
                  >
                    <span className="display text-5xl transition-transform duration-500 group-hover:translate-x-2">{s.name}</span>
                  </button>
                </li>
              ))}
            </ul>
            <AnimatePresence mode="wait">
              <motion.p
                key={set.id}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mt-10 max-w-sm text-base leading-relaxed text-ink-soft"
              >
                {set.perfect}
              </motion.p>
            </AnimatePresence>
            <div className="mt-8">{cta}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
