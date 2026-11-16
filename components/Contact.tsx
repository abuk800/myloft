"use client";

import { Clock, MapPin, Phone } from "lucide-react";
import { Lines, Reveal, WhatsAppIcon } from "./ui";
import { SITE, WA, waLink } from "@/lib/config";

export default function Contact({ waMessage = WA.default }: { waMessage?: string }) {
  return (
    <section id="kontakt" className="mx-auto max-w-[88rem] scroll-mt-20 px-5 py-24 md:px-10 md:py-36">
      <Lines className="display mt-5 text-[2.7rem] md:text-7xl" lines={["So findest du uns."]} />

      <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-12 md:gap-6">
        <Reveal className="md:col-span-5">
          <div className="flex h-full flex-col justify-between rounded-2xl bg-cream/70 p-7 md:p-10">
            <ul className="space-y-6 text-[0.95rem]">
              <li className="flex gap-4"><MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.4} />
                <span>{SITE.fullName}<br />{SITE.address.street}<br />{SITE.address.zip} {SITE.address.city}</span></li>
              <li className="flex gap-4"><Clock className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.4} /><span>{SITE.hours}</span></li>
              <li className="flex gap-4"><Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.4} />
                <span><a className="hover:underline" href={SITE.phoneHref}>{SITE.phone}</a><br /><a className="hover:underline" href={`mailto:${SITE.email}`}>{SITE.email}</a></span></li>
            </ul>
            <div className="mt-10 flex flex-col gap-3">
              <a href={waLink(waMessage)} target="_blank" rel="noopener noreferrer" className="btn bg-[#25D366] text-white hover:brightness-95">
                <WhatsAppIcon className="h-5 w-5" /> Schreib uns auf WhatsApp
              </a>
              <a href={SITE.phoneHref} className="btn btn-line">Anrufen</a>
              <a href={SITE.mapsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-line">Route planen</a>
            </div>
          </div>
        </Reveal>
        <Reveal className="md:col-span-7" delay={0.1}>
          <div className="h-[22rem] overflow-hidden rounded-2xl bg-cream md:h-full md:min-h-[30rem]">
            <iframe
              title="Karte: MYLOFT STUDIO, Oberurseler Str. 81, Oberursel"
              src={SITE.mapsEmbed}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full w-full border-0 grayscale-[0.4]"
            />
          </div>
        </Reveal>
      </div>
      <p className="mt-4 text-sm text-ink-soft">TODO: Parken & ÖPNV-Anbindung ergänzen</p>
    </section>
  );
}
