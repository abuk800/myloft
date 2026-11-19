"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Gift } from "lucide-react";
import { EASE, Logo } from "../shared";
import { PACKAGES, SITE, VOUCHER_VALUES, WA, eur, waLink } from "@/lib/config";

type Kind = "wert" | "paket";

export default function Vouchers() {
  const [kind, setKind] = useState<Kind>("paket");
  const [value, setValue] = useState(190);
  const [pkg, setPkg] = useState("2h");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [msg, setMsg] = useState("Zeit für dich und deine Besties. Viel Spaß im Studio!");
  const [bought, setBought] = useState(false);
  const [code, setCode] = useState("MYLOFT-XXXX-XXXX");
  useEffect(() => {
    const r = () => Math.random().toString(36).slice(2, 6).toUpperCase();
    setCode(`MYLOFT-${r()}-${r()}`);
  }, []);

  const p = PACKAGES.find((x) => x.id === pkg)!;
  const amount = kind === "wert" ? value : p.price;
  const title = kind === "wert" ? eur(value) : p.name;
  const sub = kind === "wert" ? "Wertgutschein" : `Studio-Shooting · bis ${p.people} Personen`;

  const Card = (
    <motion.div
      layout
      className="relative aspect-[1.6/1] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#f6efe2] via-[#efe5d1] to-[#e3d3b4] p-6 text-ink shadow-[0_40px_80px_-30px_rgba(60,40,10,0.45)] md:p-9"
    >
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/40 blur-2xl" />
      <div className="relative flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <Logo />
          <span className="eyebrow !text-[0.78rem] opacity-60">Gutschein</span>
        </div>
        <div>
          <AnimatePresence mode="popLayout">
            <motion.p key={title} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -20, opacity: 0 }} transition={{ duration: 0.5, ease: EASE }} className="display text-[3.4rem] leading-none md:text-7xl">
              {title}
            </motion.p>
          </AnimatePresence>
          <p className="mt-2 text-sm opacity-70 md:text-sm">{sub}</p>
        </div>
        <div className="flex items-end justify-between gap-4 text-[0.8rem] md:text-sm">
          <div className="min-w-0">
            {to && <p className="truncate">Für <strong className="font-medium">{to}</strong></p>}
            {from && <p className="truncate opacity-70">Von {from}</p>}
            {!to && !from && <p className="opacity-50">Für dich, von mir</p>}
          </div>
          <p className="shrink-0 font-mono tracking-wider opacity-70">{code}</p>
        </div>
      </div>
    </motion.div>
  );

  if (bought) {
    return (
      <div className="mx-auto max-w-xl px-5 pb-24 pt-36 text-center md:pt-44">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-ink text-white"><Gift className="h-9 w-9" strokeWidth={1.3} /></motion.div>
        <h1 className="display mt-8 text-6xl">Wunderbar. <em>Geschenk ist unterwegs.</em></h1>
        <p className="mt-4 text-ink-soft">Der Gutschein kommt als PDF mit Code per Mail.</p>
        <div className="mt-10">{Card}</div>
        <div className="mt-8 flex flex-col gap-3">
          <a href={waLink(WA.gutschein)} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white">Rückfrage auf WhatsApp</a>
          <Link href="/" className="btn btn-line">Zur Startseite</Link>
        </div>
        <p className="mt-8 text-sm text-ink-soft">Demo-Modus: Es wurde nichts gekauft und keine Zahlung ausgelöst.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-5 pb-28 pt-28 md:px-10 md:pt-36">
      <h1 className="display mt-4 max-w-3xl text-[3rem] md:text-7xl">Shooting <em>verschenken.</em></h1>
      <p className="mt-5 max-w-lg text-ink-soft">Ein Geschenk für Besties, Familie oder Team. Perfekt vor Weihnachten, aber das ganze Jahr passend.</p>

      <div className="mt-12 grid gap-10 md:grid-cols-12 md:gap-14">
        <div className="md:order-2 md:col-span-6">
          <div className="md:sticky md:top-28">{Card}<p className="mt-4 text-center text-sm text-ink-soft">Live-Vorschau deines Gutscheins</p></div>
        </div>

        <div className="space-y-8 md:order-1 md:col-span-6">
          <div className="grid grid-cols-2 gap-1 rounded-full bg-cream/70 p-1">
            {([["paket", "Paket-Gutschein"], ["wert", "Wertgutschein"]] as const).map(([k, l]) => (
              <button key={k} onClick={() => setKind(k)} className={`eyebrow rounded-full py-3.5 !text-[0.78rem] transition-all duration-400 ${kind === k ? "bg-ink text-white" : ""}`}>{l}</button>
            ))}
          </div>

          <div>
            <p className="eyebrow !text-[0.78rem] text-ink-soft">{kind === "paket" ? "Paket" : "Wert"}</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {kind === "paket"
                ? PACKAGES.map((x) => (
                    <button key={x.id} onClick={() => setPkg(x.id)} className={`rounded-2xl border p-4 text-left transition-all ${pkg === x.id ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/40"} ${x.id === "6h" ? "col-span-2" : ""}`}>
                      <span className="block font-serif text-2xl">{x.name}</span>
                      <span className={`text-sm ${pkg === x.id ? "text-white/65" : "text-ink-soft"}`}>{eur(x.price)} · bis {x.people} Pers.</span>
                    </button>
                  ))
                : VOUCHER_VALUES.map((v) => (
                    <button key={v} onClick={() => setValue(v)} className={`rounded-2xl border p-5 text-left font-serif text-3xl transition-all ${value === v ? "border-ink bg-ink text-white" : "border-line bg-white hover:border-ink/40"}`}>{eur(v)}</button>
                  ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="block"><span className="eyebrow !text-[0.78rem] text-ink-soft">Für</span>
              <input value={to} onChange={(e) => setTo(e.target.value)} maxLength={28} placeholder="Name der beschenkten Person" className="mt-2 h-14 w-full rounded-xl border border-line bg-white px-4 outline-none focus:border-ink" /></label>
            <label className="block"><span className="eyebrow !text-[0.78rem] text-ink-soft">Von</span>
              <input value={from} onChange={(e) => setFrom(e.target.value)} maxLength={28} placeholder="Dein Name" className="mt-2 h-14 w-full rounded-xl border border-line bg-white px-4 outline-none focus:border-ink" /></label>
            <label className="block"><span className="eyebrow !text-[0.78rem] text-ink-soft">Nachricht</span>
              <textarea value={msg} onChange={(e) => setMsg(e.target.value)} rows={3} maxLength={140} className="mt-2 w-full rounded-xl border border-line bg-white px-4 py-3 outline-none focus:border-ink" /></label>
          </div>

          <div className="flex items-end justify-between border-t border-line pt-6">
            <span className="text-sm text-ink-soft">Gesamt</span>
            <span className="display text-5xl">{eur(amount)}</span>
          </div>
          <button onClick={() => setBought(true)} className="btn btn-dark w-full">Gutschein kaufen</button>
          <p className="text-sm text-ink-soft">Zustellung als PDF mit Code per E-Mail. Gültigkeit und Einlöseregeln: TODO. Kontakt: {SITE.email}</p>
        </div>
      </div>
    </div>
  );
}
