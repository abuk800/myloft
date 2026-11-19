"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE } from "./shared";

export default function Faq({ items, dark = false, initialOpen = 0 }: { items: { q: string; a: string }[]; dark?: boolean; initialOpen?: number | null }) {
  const [open, setOpen] = useState<number | null>(initialOpen);
  return (
    <div className={`divide-y ${dark ? "divide-white/15 border-y border-white/15" : "divide-line border-y border-line"}`}>
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex min-h-11 w-full items-center justify-between gap-5 py-4 text-left md:py-6"
            >
              <span className="font-serif text-[1.3rem] leading-tight md:text-3xl">{f.q}</span>
              <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease: EASE }} className="shrink-0">
                <Plus className="h-5 w-5" strokeWidth={1.3} />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="overflow-hidden"
                >
                  <p className={`max-w-2xl pb-5 text-base leading-relaxed md:pb-7 ${dark ? "text-white/75" : "text-ink-soft"}`}>{f.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
