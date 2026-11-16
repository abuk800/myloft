"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { EASE, TodoTag, WhatsAppIcon } from "../ui";
import { WA, waLink } from "@/lib/config";

export default function Danke() {
  const p = useSearchParams();
  const name = p.get("name") || "";
  const anlass = p.get("anlass") || "dein Event";
  const datum = p.get("datum");
  const date = datum ? new Date(datum + "T12:00:00").toLocaleDateString("de-DE", { day: "numeric", month: "long", year: "numeric" }) : "";
  const msg = `Hi! Ich habe gerade eine Anfrage für ${anlass}${date ? ` am ${date}` : ""} geschickt.`;

  return (
    <div className="min-h-screen bg-night text-white">
      <div className="mx-auto max-w-xl px-5 pb-24 pt-36 text-center md:pt-44">
        <motion.div initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-champagne text-ink">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.7, ease: EASE }} />
          </svg>
        </motion.div>
        <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease: EASE }} className="display mt-8 text-6xl md:text-7xl">
          Danke{name ? `, ${name}` : ""}. <em className="text-champagne">Anfrage ist raus.</em>
        </motion.h1>
        <p className="mt-5 text-white/70">
          Deine Anfrage für <strong className="font-medium text-white">{anlass}</strong>{date && <> am <strong className="font-medium text-white">{date}</strong></>} ist bei uns angekommen.
          Antwort meist innerhalb von <TodoTag>X</TodoTag> Stunden.
        </p>
        <div className="mt-10 rounded-2xl border border-white/12 p-6 text-left text-sm text-white/70">
          <p className="eyebrow !text-[0.78rem] text-champagne">Und jetzt?</p>
          <ol className="mt-4 space-y-3">
            <li>1. Wir prüfen den Termin und melden uns bei dir.</li>
            <li>2. Wir besprechen Ablauf und Extras persönlich.</li>
            <li>3. Du bringst die Gäste mit, das Loft ist bereit.</li>
          </ol>
        </div>
        <div className="mt-8 flex flex-col gap-3">
          <a href={waLink(msg || WA.events)} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white"><WhatsAppIcon className="h-5 w-5" /> Schneller auf WhatsApp</a>
          <Link href="/" className="btn btn-line-light">Zur Startseite</Link>
        </div>
        <p className="mt-8 text-sm text-white/70">Demo-Modus: Es wurde keine E-Mail verschickt.</p>
      </div>
    </div>
  );
}
