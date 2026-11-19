"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { EASE, Photo } from "../shared";
import { CAM_FILTERS, CAM_ITEMS, type CamFilter } from "@/lib/cam";
import { IMG, src } from "@/lib/images";
import Image from "next/image";

export default function Wall() {
  const [f, setF] = useState<CamFilter>("Alle");
  const [open, setOpen] = useState<number | null>(null);
  const items = CAM_ITEMS.map((it, idx) => ({ ...it, idx })).filter((it) => f === "Alle" || it.tag === f);

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);

  const cur = open !== null ? CAM_ITEMS[open] : null;

  return (
    <>
      <div className="no-scrollbar sticky top-[4.25rem] after:w-px after:shrink-0 after:content-[''] z-30 -mx-5 flex gap-2 overflow-x-auto bg-paper px-5 py-4 md:top-20 md:mx-0 md:px-0">
        {CAM_FILTERS.map((x) => (
          <button
            key={x}
            onClick={() => setF(x)}
            className={`eyebrow shrink-0 rounded-full border px-5 py-3 !text-[0.78rem] transition-all duration-300 ${f === x ? "border-ink bg-ink text-white" : "border-ink/20 hover:border-ink/50"}`}
          >
            {x}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-6 columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        <AnimatePresence mode="popLayout">
          {items.map((it, i) => (
            <motion.button
              key={it.k}
              layout
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.6, delay: i * 0.03, ease: EASE }}
              onClick={() => setOpen(it.idx)}
              aria-label={`Beispielbild ${it.tag} vergrößern`}
              className={`zoom group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-xl bg-cream md:mb-4 ${it.ratio}`}
            >
              <Photo k={it.k} sizes="(min-width:1024px) 25vw, (min-width:768px) 33vw, 50vw" w={900} />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/65 to-transparent p-3 pt-12 text-left text-sm text-white">
                <span>{it.tag}</span>
                <span className="hidden opacity-80 sm:inline">Beispiel</span>
              </span>
            </motion.button>
          ))}
        </AnimatePresence>
      </motion.div>

      <p className="mt-10 text-center text-sm text-ink-soft">Beispielbilder aus dem Studio. Eingereichte Bilder erscheinen mit @Handle erst nach Freigabe.</p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <Link href="/galerie/upload" className="btn btn-dark">Dein Bild hochladen</Link>
      </div>

      <AnimatePresence>
        {cur && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            className="fixed inset-0 z-[70] grid place-items-center bg-black/90 p-4" onClick={() => setOpen(null)} role="dialog" aria-modal="true"
          >
            <button aria-label="Schließen" className="absolute right-4 top-4 grid h-12 w-12 place-items-center rounded-full bg-white/10 text-white"><X className="h-6 w-6" /></button>
            <motion.figure initial={{ scale: 0.92, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.95 }} transition={{ duration: 0.5, ease: EASE }} className="relative max-h-[86vh] w-full max-w-xl" onClick={(e) => e.stopPropagation()}>
              <Image src={src(IMG[cur.k], 1600)} alt={IMG[cur.k].alt} width={1200} height={1500} className="max-h-[78vh] w-full rounded-2xl object-contain" />
              <figcaption className="mt-3 flex justify-between text-sm text-white/80"><span>{cur.tag}</span><span>Beispielbild</span></figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
