"use client";

import { useState } from "react";
import { Clock, MapPin, Phone } from "lucide-react";
import { Lines, Reveal, WhatsAppIcon } from "./shared";
import { SITE, WA, waLink } from "@/lib/config";
import { OPEN } from "@/lib/content";

/** Die Google-Karte wird erst nach Klick geladen (DSGVO: vorher keine Verbindung zu Google). */
export default function Contact({ waMessage = WA.default }: { waMessage?: string }) {
  const [mapOn, setMapOn] = useState(false);

  return (
    <section id="kontakt" className="mx-auto max-w-[88rem] scroll-mt-20 px-5 py-12 md:px-10 md:py-28">
      <Lines className="display text-[2.2rem] leading-[1.05] md:text-7xl" lines={["So findest du uns"]} />

      <div className="mt-6 grid gap-4 md:mt-14 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-5">
          <div className="flex h-full flex-col justify-between rounded-2xl bg-cream/70 p-6 md:p-10">
            <ul className="space-y-5 text-[0.95rem]">
              <li className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.4} aria-hidden />
                <span>{SITE.fullName}<br />{SITE.address.street}<br />{SITE.address.zip} {SITE.address.city}</span></li>
              <li className="flex gap-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.4} aria-hidden /><span>{SITE.hours}</span></li>
              <li className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold-deep" strokeWidth={1.4} aria-hidden />
                <span><a className="underline-offset-4 hover:underline" href={SITE.phoneHref}>{SITE.phone}</a><br /><a className="break-all underline-offset-4 hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></span></li>
            </ul>
            {(OPEN.parking || OPEN.transit) && <p className="mt-5 text-sm text-ink-soft">{[OPEN.parking, OPEN.transit].filter(Boolean).join(" · ")}</p>}
            <div className="mt-7 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
              <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-ink hover:brightness-95 sm:col-span-2 md:col-span-1">
                <WhatsAppIcon className="h-5 w-5" /> Schreib uns auf WhatsApp
              </a>
              <a href={SITE.phoneHref} className="btn btn-line">Anrufen</a>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line">Route planen</a>
            </div>
          </div>
        </Reveal>

        <Reveal className="md:col-span-7" delay={0.1}>
          <div className="relative h-[14rem] overflow-hidden rounded-2xl bg-cream md:h-full md:min-h-[26rem]">
            {mapOn ? (
              <iframe
                title="Karte: MYLOFT STUDIO, Oberurseler Str. 81, Oberursel"
                src={SITE.mapsEmbed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
              />
            ) : (
              <div className="grid h-full place-items-center bg-cream-deep/40 p-6 text-center">
                <div>
                  <MapPin className="mx-auto h-8 w-8 text-gold-deep" strokeWidth={1.3} aria-hidden />
                  <p className="mt-3 max-w-xs text-sm text-ink-soft">Beim Laden der Karte werden Daten an Google übertragen.</p>
                  <button onClick={() => setMapOn(true)} className="btn btn-dark mt-4 !min-h-11">Karte laden</button>
                </div>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
