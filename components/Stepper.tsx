"use client";

import { AnimatePresence, m as motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { EASE } from "./shared";

/** Fortschrittsanzeige + animierter Schrittwechsel für Buchung und Event-Anfrage. */
export function StepHeader({ steps, current, onBack, dark = false }: { steps: string[]; current: number; onBack?: () => void; dark?: boolean }) {
  return (
    <div className="mb-10">
      <div className="mb-5 flex items-center justify-between">
        <button
          onClick={onBack}
          disabled={!onBack}
          className={`flex items-center gap-2 text-sm uppercase tracking-[0.2em] transition-opacity ${onBack ? "opacity-100" : "pointer-events-none opacity-0"}`}
        >
          <ArrowLeft className="h-4 w-4" /> Zurück
        </button>
        <p className={`eyebrow !text-[0.78rem] ${dark ? "text-white/70" : "text-ink-soft"}`}>
          Schritt {current + 1} / {steps.length} · {steps[current]}
        </p>
      </div>
      <div className="flex gap-1.5" role="progressbar" aria-valuemin={1} aria-valuemax={steps.length} aria-valuenow={current + 1}>
        {steps.map((s, i) => (
          <span key={s} className={`h-[3px] flex-1 overflow-hidden rounded-full ${dark ? "bg-white/15" : "bg-line"}`}>
            <motion.span
              className={`block h-full ${dark ? "bg-champagne" : "bg-ink"}`}
              initial={false}
              animate={{ width: i <= current ? "100%" : "0%" }}
              transition={{ duration: 0.7, ease: EASE }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}

export function StepBody({ stepKey, dir, children }: { stepKey: string | number; dir: 1 | -1; children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait" initial={false} custom={dir}>
      <motion.div
        key={stepKey}
        custom={dir}
        initial={{ opacity: 0, x: 40 * dir }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -40 * dir }}
        transition={{ duration: 0.45, ease: EASE }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
