"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Ico, Lines, Reveal, TodoTag } from "../ui";
import { INCLUDED, PACKAGES, WEEKDAY, eur } from "@/lib/config";

export default function Packages({ compact = false }: { compact?: boolean }) {
  return (
    <section className="mx-auto max-w-[88rem] px-5 py-16 md:px-10 md:py-28">
      <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <Lines className="display mt-5 text-[2.7rem] md:text-7xl" lines={["Pakete ab 190 €,", "Kamera und Licht inklusive."]} />
        </div>
        <Reveal>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">Alle Preise stehen offen hier. Studio, Kamera und Dauerlicht sind in jedem Paket.</p>
        </Reveal>
      </div>

      <Reveal className="mt-10 flex flex-wrap gap-x-8 gap-y-4 border-y border-line py-5">
        {INCLUDED.map((x) => (
          <span key={x.label} className="flex items-center gap-3 text-sm">
            <Ico name={x.icon} className="h-5 w-5 text-gold" /> {x.label}
          </span>
        ))}
      </Reveal>

      <div className="mt-10 grid gap-4 md:grid-cols-3 md:gap-6">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1}>
            <div
              className={`relative flex h-full flex-col rounded-2xl p-7 transition-transform duration-500 hover:-translate-y-1.5 md:p-9 ${
                p.featured ? "bg-ink text-white md:-mt-4 md:pb-12 md:pt-12" : "bg-cream/70"
              }`}
            >
              {p.featured && <span className="eyebrow absolute right-6 top-6 rounded-full bg-champagne px-3 py-1.5 !text-[0.78rem] text-ink">Beliebt</span>}
              <p className="eyebrow !text-[0.78rem] opacity-60">{p.name}</p>
              <p className="display mt-4 text-[4.5rem] leading-none">{eur(p.price)}</p>
              <p className={`mt-4 text-sm leading-relaxed ${p.featured ? "text-white/70" : "text-ink-soft"}`}>{p.blurb}</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-gold" /> Bis {p.people} Personen</li>
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-gold" /> {p.lights} Dauerlichter</li>
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-gold" /> Studio, Canon R6, 128-GB-Karte</li>
              </ul>
              <Link href={`/buchen?paket=${p.id}`} className={`btn mt-9 ${p.featured ? "btn-gold" : "btn-dark"}`}>
                {p.name} buchen
              </Link>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-6">
        <div className="flex flex-col gap-4 rounded-2xl border border-line p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <p className="display text-3xl md:text-4xl">{WEEKDAY.title}</p>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-soft">{WEEKDAY.text}</p>
          </div>
          <div className="flex shrink-0 flex-col items-start gap-3 md:items-end">
            <TodoTag>{WEEKDAY.price}</TodoTag>
            <Link href="/anlaesse/bestie-shoot" className="btn btn-line">Bestie-Day ansehen</Link>
          </div>
        </div>
      </Reveal>

      {!compact && (
        <p className="mt-6 text-sm text-ink-soft">
          Extras wie zusätzliches Licht, Fotograf/Videograf, Deko-Paket oder Hair & Make-up wählst du im Buchungsflow dazu.
        </p>
      )}
    </section>
  );
}
