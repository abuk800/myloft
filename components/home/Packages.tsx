"use client";

import Link from "next/link";
import { Check } from "lucide-react";
import { Ico, Lines, Reveal } from "../shared";
import { INCLUDED, PACKAGES, WEEKDAY, eur } from "@/lib/config";

export default function Packages({ compact = false }: { compact?: boolean }) {
  return (
    <section className="mx-auto max-w-[88rem] px-5 py-12 md:px-10 md:py-28">
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end md:gap-8">
        <div>
          <Lines className="display text-[2.3rem] leading-[1.05] md:text-7xl" lines={["Pakete ab 190 €,", "Kamera und Licht inklusive."]} />
        </div>
        <Reveal>
          <p className="max-w-sm text-base leading-relaxed text-ink-soft">Alle Preise stehen offen hier. Studio, Kamera und Dauerlicht sind in jedem Paket.</p>
        </Reveal>
      </div>

      <Reveal className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-y border-line py-4 md:mt-10 md:flex md:flex-wrap md:gap-x-8 md:gap-y-4 md:py-5">
        {INCLUDED.map((x) => (
          <span key={x.label} className="flex items-center gap-3 text-sm">
            <Ico name={x.icon} className="h-5 w-5 text-gold" /> {x.label}
          </span>
        ))}
      </Reveal>

      <div className="mt-6 grid gap-3 md:mt-10 md:grid-cols-3 md:gap-6">
        {PACKAGES.map((p, i) => (
          <Reveal key={p.id} delay={i * 0.1} className={p.featured ? "max-md:order-first" : ""}>
            <div
              className={`relative flex h-full flex-col rounded-2xl p-5 transition-transform duration-500 hover:-translate-y-1.5 md:p-9 ${
                p.featured ? "bg-ink text-white md:-mt-4 md:pb-12 md:pt-12" : "bg-cream/70"
              }`}
            >
              {p.featured && <span className="absolute right-5 top-5 rounded-full bg-champagne px-3 py-1.5 text-[0.8rem] font-medium text-ink md:right-6 md:top-6">Beliebt</span>}
              <p className={`text-sm ${p.featured ? "text-white/75" : "text-ink-soft"}`}>{p.name}</p>
              <p className="display mt-1 text-[3.4rem] leading-none md:mt-4 md:text-[4.5rem]">{eur(p.price)}</p>
              <p className={`mt-2 text-sm leading-relaxed md:mt-4 ${p.featured ? "text-white/75" : "text-ink-soft"}`}>{p.blurb}</p>
              <ul className="mt-4 space-y-1.5 text-sm md:mt-6 md:space-y-3">
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-gold" /> Bis {p.people} Personen</li>
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-gold" /> {p.lights} Dauerlichter</li>
                <li className="flex items-center gap-3"><Check className="h-4 w-4 text-gold" /> Studio, Canon R6, 128-GB-Karte</li>
              </ul>
              <Link href={`/buchen?paket=${p.id}`} className={`btn mt-5 md:mt-9 ${p.featured ? "btn-gold" : "btn-dark"}`}>
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
            <p className="text-sm text-ink-soft">{WEEKDAY.price ? `Wochentags-Preis: ${WEEKDAY.price}` : "Wochentags-Preis auf Anfrage"}</p>
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
