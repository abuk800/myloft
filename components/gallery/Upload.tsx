"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { m as motion } from "framer-motion";
import { ImagePlus, X } from "lucide-react";
import { EASE, GoogleG } from "../shared";
import { SITE } from "@/lib/config";

const OCC = ["Shooting", "Bestie", "Babybauch", "Team", "Podcast", "Party", "Sonstiges"];

/** Pseudo-QR (nur Optik für die Demo). */
function FakeQr() {
  const n = 21;
  const cells: boolean[] = [];
  let s = 7;
  for (let i = 0; i < n * n; i++) { s = (s * 1103515245 + 12345) & 0x7fffffff; cells.push((s >> 16) % 2 === 0); }
  const finder = (x: number, y: number) => (x < 7 && y < 7) || (x > n - 8 && y < 7) || (x < 7 && y > n - 8);
  return (
    <svg viewBox={`0 0 ${n} ${n}`} className="h-full w-full" shapeRendering="crispEdges" aria-label="QR-Code Beispiel">
      {cells.map((on, i) => { const x = i % n, y = Math.floor(i / n); return on && !finder(x, y) ? <rect key={i} x={x} y={y} width="1" height="1" /> : null; })}
      {[[0, 0], [n - 7, 0], [0, n - 7]].map(([x, y]) => (
        <g key={`${x}${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="currentColor" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="currentColor" />
        </g>
      ))}
    </svg>
  );
}

export default function Upload() {
  const input = useRef<HTMLInputElement>(null);
  const [files, setFiles] = useState<{ url: string; name: string }[]>([]);
  const [handle, setHandle] = useState("");
  const [occ, setOcc] = useState("Shooting");
  const [consent, setConsent] = useState(false);
  const [sent, setSent] = useState(false);

  useEffect(() => () => files.forEach((f) => URL.revokeObjectURL(f.url)), [files]);

  const add = (list: FileList | null) => {
    if (!list) return;
    const imgs = Array.from(list).filter((f) => f.type.startsWith("image/")).slice(0, 5 - files.length);
    setFiles((p) => [...p, ...imgs.map((f) => ({ url: URL.createObjectURL(f), name: f.name }))].slice(0, 5));
  };

  if (sent) {
    return (
      <div className="mx-auto max-w-xl px-5 pb-24 pt-36 text-center md:pt-44">
        <motion.div initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.8, ease: EASE }} className="mx-auto grid h-24 w-24 place-items-center rounded-full bg-ink text-white">
          <svg viewBox="0 0 24 24" className="h-10 w-10" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 0.4, duration: 0.7, ease: EASE }} />
          </svg>
        </motion.div>
        <h1 className="display mt-8 text-6xl">Danke! <em>Wir schauen rein.</em></h1>
        <p className="mt-4 text-ink-soft">Deine Bilder erscheinen auf der Wand, sobald wir sie freigegeben haben.</p>
        <div className="mt-10 rounded-2xl bg-cream/70 p-7">
          <p className="font-serif text-3xl">Hat&apos;s dir gefallen?</p>
          <p className="mt-2 text-sm text-ink-soft">Eine Google-Bewertung hilft uns enorm.</p>
          <a href={SITE.google.reviewUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-6 w-full"><GoogleG className="h-5 w-5 rounded-full bg-white p-0.5" /> Bewerte uns auf Google</a>
        </div>
        <Link href="/galerie" className="btn btn-line mt-4 w-full">Zur Galerie</Link>
        <p className="mt-8 text-sm text-ink-soft">Demo-Modus: Es wurde nichts hochgeladen.</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-5 pb-28 pt-28 md:px-10 md:pt-36">
      <div className="grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5">
          <h1 className="display mt-4 text-5xl md:text-6xl">Zeig uns dein <em>Shooting.</em></h1>
          <p className="mt-5 text-ink-soft">Lade deine Lieblingsbilder hoch. Nach unserer Freigabe erscheinen sie mit deinem @Handle auf der Wand.</p>

          <div className="mt-8 flex items-center gap-5 rounded-2xl bg-cream/70 p-5">
            <div className="h-24 w-24 shrink-0 rounded-xl bg-white p-2 text-ink"><FakeQr /></div>
            <div>
              <p className="font-serif text-2xl leading-tight">Im Studio scannen</p>
              <p className="mt-1 text-sm text-ink-soft">„Zeig uns dein Shooting: Lade deine Lieblingsbilder hoch.“</p>
            </div>
          </div>
        </div>

        <form
          className="space-y-6 md:col-span-7"
          onSubmit={(e) => { e.preventDefault(); if (files.length && consent) setSent(true); }}
        >
          <div>
            <button
              type="button"
              onClick={() => input.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => { e.preventDefault(); add(e.dataTransfer.files); }}
              className="grid w-full place-items-center rounded-2xl border border-dashed border-ink/30 bg-white px-6 py-12 text-center transition-colors hover:border-ink hover:bg-cream/40"
            >
              <ImagePlus className="h-9 w-9 text-gold" strokeWidth={1.2} />
              <span className="mt-4 font-serif text-2xl">Bilder auswählen</span>
              <span className="mt-1 text-sm text-ink-soft">Bis zu 5 Bilder · antippen oder hierher ziehen</span>
            </button>
            <input ref={input} type="file" accept="image/*" multiple className="sr-only" onChange={(e) => add(e.target.files)} />
            {files.length > 0 && (
              <div className="mt-4 grid grid-cols-5 gap-2">
                {files.map((f, i) => (
                  <div key={f.url} className="relative aspect-square overflow-hidden rounded-xl bg-cream">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={f.url} alt={f.name} className="h-full w-full object-cover" />
                    <button type="button" aria-label="Entfernen" onClick={() => setFiles((p) => p.filter((_, n) => n !== i))} className="absolute right-1 top-1 grid h-6 w-6 place-items-center rounded-full bg-black/60 text-white"><X className="h-3.5 w-3.5" /></button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="block"><span className="eyebrow !text-[0.78rem] text-ink-soft">Instagram-Handle</span>
            <input value={handle} onChange={(e) => setHandle(e.target.value)} placeholder="@deinhandle" inputMode="text" autoCapitalize="none" autoCorrect="off" spellCheck={false} autoComplete="off" className="mt-2 h-14 w-full text-base rounded-xl border border-line bg-white px-4 text-base outline-none focus:border-ink" /></label>

          <div>
            <span className="eyebrow !text-[0.78rem] text-ink-soft">Anlass</span>
            <div className="mt-3 flex flex-wrap gap-2">
              {OCC.map((o) => (
                <button type="button" key={o} onClick={() => setOcc(o)} className={`eyebrow min-h-11 rounded-full border px-4 py-2.5 !text-[0.78rem] transition-colors ${occ === o ? "border-ink bg-ink text-white" : "border-ink/20"}`}>{o}</button>
              ))}
            </div>
          </div>

          <label className="flex cursor-pointer items-start gap-3 rounded-2xl bg-cream/60 p-4 text-sm leading-relaxed">
            <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-1 h-5 w-5 shrink-0 accent-black" />
            <span>Ich bin damit einverstanden, dass MYLOFT STUDIO meine Bilder auf der Website und auf Instagram veröffentlicht und mich dabei mit meinem @Handle nennt.</span>
          </label>

          <button type="submit" disabled={!files.length || !consent} className="btn btn-dark w-full disabled:opacity-30">Bilder einreichen</button>
        </form>
      </div>
    </div>
  );
}
